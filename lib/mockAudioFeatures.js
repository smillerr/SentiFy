/**
 * Generador de audio features simuladas basado en metadatos de las canciones
 * Simula las características que normalmente proporcionaría Spotify API
 */

// Patrones de audio features por género (basados en datos reales de Spotify)
const GENRE_PATTERNS = {
  // Géneros energéticos
  rock: { 
    energy: [0.7, 0.95], 
    valence: [0.4, 0.8], 
    danceability: [0.3, 0.7], 
    acousticness: [0.0, 0.3],
    tempo: [120, 180],
    loudness: [-8, -3],
    mode: 0.7 // 70% mayor
  },
  pop: { 
    energy: [0.6, 0.9], 
    valence: [0.5, 0.9], 
    danceability: [0.5, 0.9], 
    acousticness: [0.0, 0.4],
    tempo: [100, 140],
    loudness: [-6, -2],
    mode: 0.8
  },
  electronic: { 
    energy: [0.7, 0.95], 
    valence: [0.3, 0.8], 
    danceability: [0.7, 0.95], 
    acousticness: [0.0, 0.1],
    tempo: [120, 180],
    loudness: [-5, -1],
    mode: 0.6
  },
  reggaeton: { 
    energy: [0.6, 0.9], 
    valence: [0.6, 0.9], 
    danceability: [0.8, 0.95], 
    acousticness: [0.0, 0.2],
    tempo: [85, 105],
    loudness: [-4, -1],
    mode: 0.5
  },
  
  // Géneros relajados
  jazz: { 
    energy: [0.2, 0.6], 
    valence: [0.3, 0.7], 
    danceability: [0.2, 0.6], 
    acousticness: [0.3, 0.8],
    tempo: [60, 120],
    loudness: [-12, -6],
    mode: 0.6
  },
  classical: { 
    energy: [0.1, 0.7], 
    valence: [0.2, 0.8], 
    danceability: [0.1, 0.4], 
    acousticness: [0.7, 0.95],
    tempo: [60, 140],
    loudness: [-15, -8],
    mode: 0.7
  },
  ambient: { 
    energy: [0.1, 0.4], 
    valence: [0.2, 0.6], 
    danceability: [0.1, 0.3], 
    acousticness: [0.4, 0.9],
    tempo: [60, 100],
    loudness: [-20, -10],
    mode: 0.4
  },
  
  // Géneros melancólicos
  blues: { 
    energy: [0.2, 0.6], 
    valence: [0.1, 0.4], 
    danceability: [0.2, 0.5], 
    acousticness: [0.3, 0.8],
    tempo: [60, 120],
    loudness: [-12, -6],
    mode: 0.2
  },
  indie: { 
    energy: [0.3, 0.7], 
    valence: [0.2, 0.6], 
    danceability: [0.3, 0.6], 
    acousticness: [0.2, 0.7],
    tempo: [80, 140],
    loudness: [-10, -4],
    mode: 0.4
  },
  
  // Géneros latinos
  salsa: { 
    energy: [0.7, 0.9], 
    valence: [0.7, 0.9], 
    danceability: [0.8, 0.95], 
    acousticness: [0.1, 0.4],
    tempo: [150, 200],
    loudness: [-6, -2],
    mode: 0.8
  },
  bachata: { 
    energy: [0.4, 0.7], 
    valence: [0.4, 0.8], 
    danceability: [0.6, 0.8], 
    acousticness: [0.2, 0.6],
    tempo: [120, 140],
    loudness: [-8, -4],
    mode: 0.6
  },
  
  // Default para géneros no identificados
  default: { 
    energy: [0.3, 0.8], 
    valence: [0.3, 0.7], 
    danceability: [0.3, 0.7], 
    acousticness: [0.1, 0.6],
    tempo: [80, 140],
    loudness: [-10, -4],
    mode: 0.5
  }
};

// Palabras clave que influyen en el estado de ánimo
const MOOD_KEYWORDS = {
  happy: ['happy', 'joy', 'celebration', 'party', 'dance', 'love', 'summer', 'sunshine', 'good', 'amazing'],
  sad: ['sad', 'cry', 'tear', 'broken', 'heart', 'alone', 'miss', 'goodbye', 'sorry', 'hurt'],
  energetic: ['power', 'strong', 'fight', 'run', 'energy', 'fire', 'rock', 'wild', 'crazy', 'loud'],
  calm: ['calm', 'peace', 'quiet', 'soft', 'gentle', 'slow', 'dream', 'sleep', 'rest', 'chill'],
  romantic: ['love', 'heart', 'kiss', 'beautiful', 'forever', 'together', 'romance', 'sweet', 'tender', 'darling'],
  dark: ['dark', 'black', 'death', 'pain', 'evil', 'shadow', 'nightmare', 'hell', 'devil', 'fear']
};

/**
 * Detecta el género musical basado en el artista y nombre de la canción
 */
function detectGenre(artist, trackName) {
  const text = `${artist} ${trackName}`.toLowerCase();
  
  // Artistas conocidos por género
  const artistGenres = {
    'bad bunny': 'reggaeton',
    'j balvin': 'reggaeton',
    'karol g': 'reggaeton',
    'daddy yankee': 'reggaeton',
    'ozuna': 'reggaeton',
    'maluma': 'reggaeton',
    'rosalía': 'reggaeton',
    'marc anthony': 'salsa',
    'celia cruz': 'salsa',
    'romeo santos': 'bachata',
    'aventura': 'bachata',
    'the beatles': 'rock',
    'queen': 'rock',
    'led zeppelin': 'rock',
    'pink floyd': 'rock',
    'ac/dc': 'rock',
    'taylor swift': 'pop',
    'ariana grande': 'pop',
    'billie eilish': 'pop',
    'dua lipa': 'pop',
    'ed sheeran': 'pop',
    'calvin harris': 'electronic',
    'david guetta': 'electronic',
    'deadmau5': 'electronic',
    'skrillex': 'electronic',
    'daft punk': 'electronic',
    'miles davis': 'jazz',
    'john coltrane': 'jazz',
    'ella fitzgerald': 'jazz',
    'beethoven': 'classical',
    'mozart': 'classical',
    'bach': 'classical',
    'radiohead': 'indie',
    'arctic monkeys': 'indie',
    'the strokes': 'indie'
  };
  
  // Buscar por artista
  for (const [artistName, genre] of Object.entries(artistGenres)) {
    if (text.includes(artistName)) {
      return genre;
    }
  }
  
  // Buscar por palabras clave en el nombre de la canción
  if (text.includes('reggaeton') || text.includes('perreo')) return 'reggaeton';
  if (text.includes('rock') || text.includes('metal')) return 'rock';
  if (text.includes('jazz') || text.includes('swing')) return 'jazz';
  if (text.includes('classical') || text.includes('symphony')) return 'classical';
  if (text.includes('electronic') || text.includes('edm') || text.includes('techno')) return 'electronic';
  if (text.includes('pop')) return 'pop';
  if (text.includes('salsa')) return 'salsa';
  if (text.includes('bachata')) return 'bachata';
  if (text.includes('blues')) return 'blues';
  if (text.includes('indie') || text.includes('alternative')) return 'indie';
  
  return 'default';
}

/**
 * Analiza palabras clave en el nombre de la canción para ajustar características
 */
function analyzeMoodKeywords(trackName) {
  const text = trackName.toLowerCase();
  const adjustments = {
    valence: 0,
    energy: 0,
    danceability: 0,
    acousticness: 0
  };
  
  // Palabras que aumentan la valencia (positividad)
  MOOD_KEYWORDS.happy.forEach(word => {
    if (text.includes(word)) adjustments.valence += 0.15;
  });
  
  // Palabras que disminuyen la valencia
  MOOD_KEYWORDS.sad.forEach(word => {
    if (text.includes(word)) adjustments.valence -= 0.2;
  });
  
  // Palabras que aumentan la energía
  MOOD_KEYWORDS.energetic.forEach(word => {
    if (text.includes(word)) adjustments.energy += 0.1;
  });
  
  // Palabras que disminuyen la energía
  MOOD_KEYWORDS.calm.forEach(word => {
    if (text.includes(word)) {
      adjustments.energy -= 0.15;
      adjustments.acousticness += 0.1;
    }
  });
  
  // Palabras románticas
  MOOD_KEYWORDS.romantic.forEach(word => {
    if (text.includes(word)) {
      adjustments.valence += 0.1;
      adjustments.acousticness += 0.05;
    }
  });
  
  // Palabras oscuras
  MOOD_KEYWORDS.dark.forEach(word => {
    if (text.includes(word)) {
      adjustments.valence -= 0.15;
      adjustments.energy += 0.05;
    }
  });
  
  return adjustments;
}

/**
 * Genera un valor aleatorio dentro de un rango
 */
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Limita un valor entre 0 y 1
 */
function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Genera audio features simuladas para una canción
 */
export function generateMockAudioFeatures(track) {
  const { id, name, artist, album } = track;
  
  // Detectar género
  const genre = detectGenre(artist, name);
  const pattern = GENRE_PATTERNS[genre] || GENRE_PATTERNS.default;
  
  // Analizar palabras clave
  const moodAdjustments = analyzeMoodKeywords(name);
  
  // Generar características base
  let features = {
    id: id,
    valence: randomInRange(pattern.valence[0], pattern.valence[1]),
    energy: randomInRange(pattern.energy[0], pattern.energy[1]),
    danceability: randomInRange(pattern.danceability[0], pattern.danceability[1]),
    acousticness: randomInRange(pattern.acousticness[0], pattern.acousticness[1]),
    tempo: randomInRange(pattern.tempo[0], pattern.tempo[1]),
    loudness: randomInRange(pattern.loudness[0], pattern.loudness[1]),
    speechiness: randomInRange(0.02, 0.15), // Generalmente bajo
    instrumentalness: randomInRange(0.0, 0.3), // Generalmente bajo para música popular
    liveness: randomInRange(0.05, 0.25), // Generalmente bajo
    mode: Math.random() < pattern.mode ? 1 : 0, // Mayor o menor
    key: Math.floor(Math.random() * 12), // 0-11
    time_signature: Math.random() < 0.9 ? 4 : 3 // 90% en 4/4
  };
  
  // Aplicar ajustes basados en palabras clave
  features.valence = clamp(features.valence + moodAdjustments.valence);
  features.energy = clamp(features.energy + moodAdjustments.energy);
  features.danceability = clamp(features.danceability + moodAdjustments.danceability);
  features.acousticness = clamp(features.acousticness + moodAdjustments.acousticness);
  
  // Ajustes adicionales basados en el año (si disponible)
  // Música más antigua tiende a ser más acústica
  if (album && album.includes('19')) { // Décadas pasadas
    features.acousticness += 0.1;
    features.acousticness = clamp(features.acousticness);
  }
  
  return features;
}

/**
 * Genera audio features para múltiples canciones
 */
export function generateMultipleMockAudioFeatures(tracks) {
  const audioFeaturesMap = {};
  
  tracks.forEach(track => {
    audioFeaturesMap[track.id] = generateMockAudioFeatures(track);
  });
  
  return audioFeaturesMap;
}

/**
 * Simula la respuesta de la API de Spotify con datos mock
 */
export function mockSpotifyAudioFeaturesResponse(tracks) {
  const audioFeatures = tracks.map(track => generateMockAudioFeatures(track));
  
  return {
    audio_features: audioFeatures
  };
}
