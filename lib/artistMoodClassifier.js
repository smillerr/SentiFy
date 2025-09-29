/**
 * Clasificador de estado de ánimo basado en artistas usando ChatGPT API
 * Extrae artistas únicos y los clasifica usando IA
 */

import { MOOD_CATEGORIES } from './moodClassifier.js';

/**
 * Extrae la lista única de artistas de todas las canciones
 */
export function extractUniqueArtists(tracks) {
  const artistsSet = new Set();
  const artistToTracks = {};
  
  tracks.forEach(track => {
    const artist = track.artist.trim();
    artistsSet.add(artist);
    
    if (!artistToTracks[artist]) {
      artistToTracks[artist] = [];
    }
    artistToTracks[artist].push(track.id);
  });
  
  const uniqueArtists = Array.from(artistsSet);
  
  console.log(`🎤 Extracted ${uniqueArtists.length} unique artists from ${tracks.length} tracks`);
  console.log('🎵 Sample artists:', uniqueArtists.slice(0, 10));
  
  return {
    artists: uniqueArtists,
    artistToTracks
  };
}

/**
 * Crea el prompt para ChatGPT con los artistas y moods disponibles
 */
export function createArtistMoodPrompt(artists) {
  const moodsList = Object.values(MOOD_CATEGORIES).join(', ');
  
  const prompt = `Eres un experto en música que debe clasificar artistas según el estado de ánimo predominante de su música.

ESTADOS DE ÁNIMO DISPONIBLES:
- feliz: Música alegre, positiva, que transmite alegría
- triste: Música melancólica, emotiva, que transmite tristeza  
- motivadora: Música energética que inspira y motiva
- relajada: Música tranquila, suave, para relajarse
- romántica: Música de amor, suave, emotiva para parejas
- oscura: Música intensa, misteriosa, con temas profundos
- fiesta: Música bailable, para celebrar, alta energía
- melancólica: Música nostálgica, reflexiva, contemplativa

ARTISTAS A CLASIFICAR:
${artists.map(artist => `- ${artist}`).join('\n')}

INSTRUCCIONES:
1. Para cada artista, asigna EL ESTADO DE ÁNIMO MÁS REPRESENTATIVO de su música en general
2. Considera su estilo musical predominante, no canciones específicas
3. Responde SOLO con el formato: "Artista: estado_de_animo"
4. Usa exactamente los nombres de estados de ánimo de la lista
5. Si un artista tiene estilos muy variados, elige el más conocido/popular

EJEMPLO DE RESPUESTA:
Bad Bunny: fiesta
Adele: triste
Queen: motivadora

RESPUESTA:`;

  return prompt;
}

/**
 * Parsea la respuesta de ChatGPT y extrae las clasificaciones
 */
export function parseArtistMoodResponse(response) {
  const artistMoods = {};
  const lines = response.split('\n');
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && trimmedLine.includes(':')) {
      const [artistPart, moodPart] = trimmedLine.split(':');
      const artist = artistPart.trim();
      const mood = moodPart.trim().toLowerCase();
      
      // Verificar que el mood es válido
      if (Object.values(MOOD_CATEGORIES).includes(mood)) {
        artistMoods[artist] = mood;
      } else {
        console.warn(`⚠️ Invalid mood "${mood}" for artist "${artist}"`);
      }
    }
  });
  
  console.log(`🎭 Parsed ${Object.keys(artistMoods).length} artist mood classifications`);
  return artistMoods;
}

/**
 * Aplica los moods de artistas a todas sus canciones
 */
export function applyArtistMoodsToTracks(tracks, artistMoods) {
  const trackClassifications = {};
  const moodCounts = {};
  
  // Inicializar contadores
  Object.values(MOOD_CATEGORIES).forEach(mood => {
    moodCounts[mood] = 0;
  });
  
  tracks.forEach(track => {
    const artist = track.artist.trim();
    const mood = artistMoods[artist];
    
    if (mood) {
      trackClassifications[track.id] = mood;
      moodCounts[mood]++;
    } else {
      console.warn(`⚠️ No mood found for artist: ${artist}`);
    }
  });
  
  // Calcular porcentajes
  const totalClassified = Object.keys(trackClassifications).length;
  const moodPercentages = {};
  Object.entries(moodCounts).forEach(([mood, count]) => {
    moodPercentages[mood] = totalClassified > 0 ? (count / totalClassified) * 100 : 0;
  });
  
  const statistics = {
    moodCounts,
    moodPercentages,
    totalClassified,
    totalTracks: tracks.length
  };
  
  console.log('🎯 Final classification statistics:', statistics);
  
  return {
    classifications: trackClassifications,
    statistics,
    artistMoods
  };
}

/**
 * Función principal que coordina todo el proceso
 */
export async function classifyTracksByArtistMood(tracks, openaiApiKey) {
  console.log('🎤 Starting artist-based mood classification...');
  
  // 1. Extraer artistas únicos
  const { artists, artistToTracks } = extractUniqueArtists(tracks);
  
  // 2. Crear prompt para ChatGPT
  const prompt = createArtistMoodPrompt(artists);
  
  // 3. Llamar a OpenAI API
  console.log('🤖 Calling OpenAI API...');
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.3 // Baja temperatura para respuestas más consistentes
    })
  });
  
  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }
  
  const data = await response.json();
  const aiResponse = data.choices[0].message.content;
  
  console.log('✅ OpenAI response received');
  console.log('🎭 AI Classification Response:', aiResponse);
  
  // 4. Parsear respuesta
  const artistMoods = parseArtistMoodResponse(aiResponse);
  
  // 5. Aplicar a todas las canciones
  const result = applyArtistMoodsToTracks(tracks, artistMoods);
  
  return {
    ...result,
    aiResponse,
    artistToTracks
  };
}
