/**
 * Clasificador gratuito de artistas por estado de ánimo
 * Base de datos hardcodeada con artistas populares
 */

import { MOOD_CATEGORIES } from './moodClassifier.js';

// Base de datos de artistas conocidos clasificados por mood
const ARTIST_MOOD_DATABASE = {
  // FELIZ
  'Pharrell Williams': MOOD_CATEGORIES.FELIZ,
  'Bruno Mars': MOOD_CATEGORIES.FELIZ,
  'Justin Timberlake': MOOD_CATEGORIES.FELIZ,
  'Dua Lipa': MOOD_CATEGORIES.FELIZ,
  'The Weeknd': MOOD_CATEGORIES.FELIZ,
  'Lizzo': MOOD_CATEGORIES.FELIZ,
  'Doja Cat': MOOD_CATEGORIES.FELIZ,
  'Harry Styles': MOOD_CATEGORIES.FELIZ,
  'Ed Sheeran': MOOD_CATEGORIES.FELIZ,
  'Taylor Swift': MOOD_CATEGORIES.FELIZ,
  'Ariana Grande': MOOD_CATEGORIES.FELIZ,
  'Camila Cabello': MOOD_CATEGORIES.FELIZ,
  'Shawn Mendes': MOOD_CATEGORIES.FELIZ,
  'Katy Perry': MOOD_CATEGORIES.FELIZ,
  'Lady Gaga': MOOD_CATEGORIES.FELIZ,
  'Beyoncé': MOOD_CATEGORIES.FELIZ,
  'Rihanna': MOOD_CATEGORIES.FELIZ,
  'Selena Gomez': MOOD_CATEGORIES.FELIZ,
  'Justin Bieber': MOOD_CATEGORIES.FELIZ,
  'Charlie Puth': MOOD_CATEGORIES.FELIZ,
  'Meghan Trainor': MOOD_CATEGORIES.FELIZ,
  'Jason Mraz': MOOD_CATEGORIES.FELIZ,
  'Jack Johnson': MOOD_CATEGORIES.FELIZ,
  'OneRepublic': MOOD_CATEGORIES.FELIZ,
  'Maroon 5': MOOD_CATEGORIES.FELIZ,
  'The Beatles': MOOD_CATEGORIES.FELIZ,
  'ABBA': MOOD_CATEGORIES.FELIZ,
  'Michael Jackson': MOOD_CATEGORIES.FELIZ,
  'Stevie Wonder': MOOD_CATEGORIES.FELIZ,
  'Elton John': MOOD_CATEGORIES.FELIZ,

  // FIESTA
  'Bad Bunny': MOOD_CATEGORIES.FIESTA,
  'J Balvin': MOOD_CATEGORIES.FIESTA,
  'Karol G': MOOD_CATEGORIES.FIESTA,
  'Daddy Yankee': MOOD_CATEGORIES.FIESTA,
  'Ozuna': MOOD_CATEGORIES.FIESTA,
  'Maluma': MOOD_CATEGORIES.FIESTA,
  'Anuel AA': MOOD_CATEGORIES.FIESTA,
  'Farruko': MOOD_CATEGORIES.FIESTA,
  'Nicky Jam': MOOD_CATEGORIES.FIESTA,
  'Wisin': MOOD_CATEGORIES.FIESTA,
  'Yandel': MOOD_CATEGORIES.FIESTA,
  'Pitbull': MOOD_CATEGORIES.FIESTA,
  'David Guetta': MOOD_CATEGORIES.FIESTA,
  'Calvin Harris': MOOD_CATEGORIES.FIESTA,
  'Martin Garrix': MOOD_CATEGORIES.FIESTA,
  'Tiësto': MOOD_CATEGORIES.FIESTA,
  'Swedish House Mafia': MOOD_CATEGORIES.FIESTA,
  'Avicii': MOOD_CATEGORIES.FIESTA,
  'Marshmello': MOOD_CATEGORIES.FIESTA,
  'The Chainsmokers': MOOD_CATEGORIES.FIESTA,
  'Skrillex': MOOD_CATEGORIES.FIESTA,
  'Deadmau5': MOOD_CATEGORIES.FIESTA,
  'Daft Punk': MOOD_CATEGORIES.FIESTA,
  'Steve Aoki': MOOD_CATEGORIES.FIESTA,
  'Zedd': MOOD_CATEGORIES.FIESTA,
  'Diplo': MOOD_CATEGORIES.FIESTA,
  'Major Lazer': MOOD_CATEGORIES.FIESTA,
  'DJ Snake': MOOD_CATEGORIES.FIESTA,
  'Kygo': MOOD_CATEGORIES.FIESTA,
  'Alan Walker': MOOD_CATEGORIES.FIESTA,
  'Don Omar': MOOD_CATEGORIES.FIESTA,
  'Tego Calderón': MOOD_CATEGORIES.FIESTA,
  'Arcángel': MOOD_CATEGORIES.FIESTA,
  'De La Ghetto': MOOD_CATEGORIES.FIESTA,
  'Plan B': MOOD_CATEGORIES.FIESTA,
  'Rauw Alejandro': MOOD_CATEGORIES.FIESTA,
  'Myke Towers': MOOD_CATEGORIES.FIESTA,
  'Jhay Cortez': MOOD_CATEGORIES.FIESTA,
  'Sech': MOOD_CATEGORIES.FIESTA,
  'Rosalía': MOOD_CATEGORIES.FIESTA,
  'C. Tangana': MOOD_CATEGORIES.FIESTA,

  // MOTIVADORA
  'Eminem': MOOD_CATEGORIES.MOTIVADORA,
  'Drake': MOOD_CATEGORIES.MOTIVADORA,
  'Kendrick Lamar': MOOD_CATEGORIES.MOTIVADORA,
  'Post Malone': MOOD_CATEGORIES.MOTIVADORA,
  'Travis Scott': MOOD_CATEGORIES.MOTIVADORA,
  'Queen': MOOD_CATEGORIES.MOTIVADORA,
  'AC/DC': MOOD_CATEGORIES.MOTIVADORA,
  'Linkin Park': MOOD_CATEGORIES.MOTIVADORA,
  'Imagine Dragons': MOOD_CATEGORIES.MOTIVADORA,
  'Fall Out Boy': MOOD_CATEGORIES.MOTIVADORA,
  'Panic! At The Disco': MOOD_CATEGORIES.MOTIVADORA,
  'Foo Fighters': MOOD_CATEGORIES.MOTIVADORA,
  'Green Day': MOOD_CATEGORIES.MOTIVADORA,
  'Jay-Z': MOOD_CATEGORIES.MOTIVADORA,
  'Kanye West': MOOD_CATEGORIES.MOTIVADORA,
  'The Notorious B.I.G.': MOOD_CATEGORIES.MOTIVADORA,
  '50 Cent': MOOD_CATEGORIES.MOTIVADORA,
  'Tupac': MOOD_CATEGORIES.MOTIVADORA,
  'Nas': MOOD_CATEGORIES.MOTIVADORA,
  'Ice Cube': MOOD_CATEGORIES.MOTIVADORA,
  'Snoop Dogg': MOOD_CATEGORIES.MOTIVADORA,
  'Dr. Dre': MOOD_CATEGORIES.MOTIVADORA,
  'Lil Wayne': MOOD_CATEGORIES.MOTIVADORA,
  'Future': MOOD_CATEGORIES.MOTIVADORA,
  'Migos': MOOD_CATEGORIES.MOTIVADORA,
  'Cardi B': MOOD_CATEGORIES.MOTIVADORA,
  'Nicki Minaj': MOOD_CATEGORIES.MOTIVADORA,
  'Megan Thee Stallion': MOOD_CATEGORIES.MOTIVADORA,
  'Led Zeppelin': MOOD_CATEGORIES.MOTIVADORA,
  'The Rolling Stones': MOOD_CATEGORIES.MOTIVADORA,
  'Guns N\' Roses': MOOD_CATEGORIES.MOTIVADORA,
  'Aerosmith': MOOD_CATEGORIES.MOTIVADORA,
  'Bon Jovi': MOOD_CATEGORIES.MOTIVADORA,
  'U2': MOOD_CATEGORIES.MOTIVADORA,
  'Coldplay': MOOD_CATEGORIES.MOTIVADORA,

  // TRISTE
  'Adele': MOOD_CATEGORIES.TRISTE,
  'Sam Smith': MOOD_CATEGORIES.TRISTE,
  'Billie Eilish': MOOD_CATEGORIES.TRISTE,
  'Lana Del Rey': MOOD_CATEGORIES.TRISTE,
  'Sia': MOOD_CATEGORIES.TRISTE,
  'XXXTentacion': MOOD_CATEGORIES.TRISTE,
  'Juice WRLD': MOOD_CATEGORIES.TRISTE,
  'Mac Miller': MOOD_CATEGORIES.TRISTE,
  'Johnny Cash': MOOD_CATEGORIES.TRISTE,
  'Leonard Cohen': MOOD_CATEGORIES.TRISTE,
  'Radiohead': MOOD_CATEGORIES.TRISTE,
  'The National': MOOD_CATEGORIES.TRISTE,
  'Lorde': MOOD_CATEGORIES.TRISTE,
  'Hozier': MOOD_CATEGORIES.TRISTE,
  'James Blake': MOOD_CATEGORIES.TRISTE,
  'Frank Ocean': MOOD_CATEGORIES.TRISTE,
  'The 1975': MOOD_CATEGORIES.TRISTE,
  'Phoebe Bridgers': MOOD_CATEGORIES.TRISTE,
  'Clairo': MOOD_CATEGORIES.TRISTE,
  'Rex Orange County': MOOD_CATEGORIES.TRISTE,
  'Daniel Caesar': MOOD_CATEGORIES.TRISTE,
  'H.E.R.': MOOD_CATEGORIES.TRISTE,
  'SZA': MOOD_CATEGORIES.TRISTE,
  'The Weeknd': MOOD_CATEGORIES.TRISTE,
  'Khalid': MOOD_CATEGORIES.TRISTE,
  'Brent Favre': MOOD_CATEGORIES.TRISTE,
  'Summer Walker': MOOD_CATEGORIES.TRISTE,
  'Giveon': MOOD_CATEGORIES.TRISTE,
  'Bryson Tiller': MOOD_CATEGORIES.TRISTE,
  'Tory Lanez': MOOD_CATEGORIES.TRISTE,
  'PartyNextDoor': MOOD_CATEGORIES.TRISTE,
  '6LACK': MOOD_CATEGORIES.TRISTE,
  'Kali Uchis': MOOD_CATEGORIES.TRISTE,
  'Jorja Smith': MOOD_CATEGORIES.TRISTE,
  'Solange': MOOD_CATEGORIES.TRISTE,
  'FKA twigs': MOOD_CATEGORIES.TRISTE,
  'Kelela': MOOD_CATEGORIES.TRISTE,
  'Sade': MOOD_CATEGORIES.TRISTE,
  'Erykah Badu': MOOD_CATEGORIES.TRISTE,
  'Lauryn Hill': MOOD_CATEGORIES.TRISTE,
  'Alicia Keys': MOOD_CATEGORIES.TRISTE,

  // ROMÁNTICA
  'John Legend': MOOD_CATEGORIES.ROMANTICA,
  'John Mayer': MOOD_CATEGORIES.ROMANTICA,
  'Norah Jones': MOOD_CATEGORIES.ROMANTICA,
  'Michael Bublé': MOOD_CATEGORIES.ROMANTICA,
  'Frank Sinatra': MOOD_CATEGORIES.ROMANTICA,
  'Amy Winehouse': MOOD_CATEGORIES.ROMANTICA,
  'Marvin Gaye': MOOD_CATEGORIES.ROMANTICA,
  'Al Green': MOOD_CATEGORIES.ROMANTICA,
  'Barry White': MOOD_CATEGORIES.ROMANTICA,
  'Romeo Santos': MOOD_CATEGORIES.ROMANTICA,
  'Prince Royce': MOOD_CATEGORIES.ROMANTICA,
  'Aventura': MOOD_CATEGORIES.ROMANTICA,
  'Marc Anthony': MOOD_CATEGORIES.ROMANTICA,
  'Luis Miguel': MOOD_CATEGORIES.ROMANTICA,
  'Ricardo Arjona': MOOD_CATEGORIES.ROMANTICA,
  'Jesse & Joy': MOOD_CATEGORIES.ROMANTICA,
  'Mau y Ricky': MOOD_CATEGORIES.ROMANTICA,
  'Camilo': MOOD_CATEGORIES.ROMANTICA,
  'Sebastián Yatra': MOOD_CATEGORIES.ROMANTICA,
  'Manuel Turizo': MOOD_CATEGORIES.ROMANTICA,
  'Reik': MOOD_CATEGORIES.ROMANTICA,
  'Sin Bandera': MOOD_CATEGORIES.ROMANTICA,
  'Maná': MOOD_CATEGORIES.ROMANTICA,
  'Carlos Vives': MOOD_CATEGORIES.ROMANTICA,
  'Julieta Venegas': MOOD_CATEGORIES.ROMANTICA,
  'Natalia Lafourcade': MOOD_CATEGORIES.ROMANTICA,
  'Mon Laferte': MOOD_CATEGORIES.ROMANTICA,
  'Álvaro Soler': MOOD_CATEGORIES.ROMANTICA,
  'Pablo Alborán': MOOD_CATEGORIES.ROMANTICA,
  'David Bisbal': MOOD_CATEGORIES.ROMANTICA,
  'Alejandro Sanz': MOOD_CATEGORIES.ROMANTICA,
  'Manu Chao': MOOD_CATEGORIES.ROMANTICA,
  'Jarabe de Palo': MOOD_CATEGORIES.ROMANTICA,
  'Ed Sheeran': MOOD_CATEGORIES.ROMANTICA,
  'Sam Smith': MOOD_CATEGORIES.ROMANTICA,
  'Adele': MOOD_CATEGORIES.ROMANTICA,
  'John Newman': MOOD_CATEGORIES.ROMANTICA,
  'James Arthur': MOOD_CATEGORIES.ROMANTICA,
  'Lewis Capaldi': MOOD_CATEGORIES.ROMANTICA,
  'Calum Scott': MOOD_CATEGORIES.ROMANTICA,
  'Dean Lewis': MOOD_CATEGORIES.ROMANTICA,
  'Bazzi': MOOD_CATEGORIES.ROMANTICA,
  'Lauv': MOOD_CATEGORIES.ROMANTICA,
  'Jeremy Zucker': MOOD_CATEGORIES.ROMANTICA,
  'Troye Sivan': MOOD_CATEGORIES.ROMANTICA,
  'Conan Gray': MOOD_CATEGORIES.ROMANTICA,
  'Shawn Mendes': MOOD_CATEGORIES.ROMANTICA,
  'Charlie Puth': MOOD_CATEGORIES.ROMANTICA,
  'Bruno Mars': MOOD_CATEGORIES.ROMANTICA,

  // RELAJADA
  'Bon Iver': MOOD_CATEGORIES.RELAJADA,
  'Sufjan Stevens': MOOD_CATEGORIES.RELAJADA,
  'Iron & Wine': MOOD_CATEGORIES.RELAJADA,
  'The Paper Kites': MOOD_CATEGORIES.RELAJADA,
  'Daughter': MOOD_CATEGORIES.RELAJADA,
  'Ólafur Arnalds': MOOD_CATEGORIES.RELAJADA,
  'Ludovico Einaudi': MOOD_CATEGORIES.RELAJADA,
  'Max Richter': MOOD_CATEGORIES.RELAJADA,
  'Nils Frahm': MOOD_CATEGORIES.RELAJADA,
  'Kiasmos': MOOD_CATEGORIES.RELAJADA,
  'Bonobo': MOOD_CATEGORIES.RELAJADA,
  'Tycho': MOOD_CATEGORIES.RELAJADA,
  'Emancipator': MOOD_CATEGORIES.RELAJADA,

  // OSCURA
  'Nine Inch Nails': MOOD_CATEGORIES.OSCURA,
  'Tool': MOOD_CATEGORIES.OSCURA,
  'Metallica': MOOD_CATEGORIES.OSCURA,
  'Black Sabbath': MOOD_CATEGORIES.OSCURA,
  'Marilyn Manson': MOOD_CATEGORIES.OSCURA,
  'Rob Zombie': MOOD_CATEGORIES.OSCURA,
  'Rammstein': MOOD_CATEGORIES.OSCURA,
  'System of a Down': MOOD_CATEGORIES.OSCURA,
  'Korn': MOOD_CATEGORIES.OSCURA,
  'Slipknot': MOOD_CATEGORIES.OSCURA,
  'Disturbed': MOOD_CATEGORIES.OSCURA,
  'Alice in Chains': MOOD_CATEGORIES.OSCURA,
  'Soundgarden': MOOD_CATEGORIES.OSCURA,
  'Pearl Jam': MOOD_CATEGORIES.OSCURA,

  // MELANCÓLICA
  'Radiohead': MOOD_CATEGORIES.MELANCOLICA,
  'Pink Floyd': MOOD_CATEGORIES.MELANCOLICA,
  'The Smiths': MOOD_CATEGORIES.MELANCOLICA,
  'Joy Division': MOOD_CATEGORIES.MELANCOLICA,
  'The Cure': MOOD_CATEGORIES.MELANCOLICA,
  'Depeche Mode': MOOD_CATEGORIES.MELANCOLICA,
  'Portishead': MOOD_CATEGORIES.MELANCOLICA,
  'Massive Attack': MOOD_CATEGORIES.MELANCOLICA,
  'Thom Yorke': MOOD_CATEGORIES.MELANCOLICA,
  'Sigur Rós': MOOD_CATEGORIES.MELANCOLICA,
  'Godspeed You! Black Emperor': MOOD_CATEGORIES.MELANCOLICA,
  'Swans': MOOD_CATEGORIES.MELANCOLICA,
  'Nick Cave': MOOD_CATEGORIES.MELANCOLICA
};

// Patrones de géneros musicales para clasificación automática
const GENRE_PATTERNS = {
  // Reggaeton y urbano latino
  reggaeton: {
    keywords: ['reggaeton', 'perreo', 'dembow', 'urbano', 'trap latino', 'latin trap'],
    mood: MOOD_CATEGORIES.FIESTA
  },
  // Géneros latinos bailables
  salsa: {
    keywords: ['salsa', 'mambo', 'son', 'merengue', 'cumbia', 'vallenato'],
    mood: MOOD_CATEGORIES.FIESTA
  },
  // Géneros románticos latinos
  bachata: {
    keywords: ['bachata', 'bolero', 'balada', 'balada pop'],
    mood: MOOD_CATEGORIES.ROMANTICA
  },
  // Rock y metal
  rock: {
    keywords: ['rock', 'metal', 'punk', 'grunge', 'hardcore', 'metalcore', 'hard rock', 'heavy metal'],
    mood: MOOD_CATEGORIES.MOTIVADORA
  },
  // Pop comercial
  pop: {
    keywords: ['pop', 'dance pop', 'electropop', 'synth pop', 'teen pop'],
    mood: MOOD_CATEGORIES.FELIZ
  },
  // Hip hop y rap
  rap: {
    keywords: ['rap', 'hip hop', 'hip-hop', 'trap', 'drill', 'grime', 'freestyle'],
    mood: MOOD_CATEGORIES.MOTIVADORA
  },
  // Música electrónica bailable
  electronic: {
    keywords: ['electronic', 'edm', 'house', 'techno', 'trance', 'dubstep', 'bass', 'progressive house', 'deep house'],
    mood: MOOD_CATEGORIES.FIESTA
  },
  // Géneros relajados
  jazz: {
    keywords: ['jazz', 'blues', 'swing', 'smooth jazz', 'neo soul'],
    mood: MOOD_CATEGORIES.RELAJADA
  },
  classical: {
    keywords: ['classical', 'orchestra', 'symphony', 'piano', 'violin', 'opera', 'chamber'],
    mood: MOOD_CATEGORIES.RELAJADA
  },
  ambient: {
    keywords: ['ambient', 'chillout', 'downtempo', 'lounge', 'new age'],
    mood: MOOD_CATEGORIES.RELAJADA
  },
  // Géneros melancólicos
  indie: {
    keywords: ['indie', 'alternative', 'folk', 'indie rock', 'indie pop', 'shoegaze'],
    mood: MOOD_CATEGORIES.MELANCOLICA
  },
  // Géneros tristes
  emo: {
    keywords: ['emo', 'post-rock', 'slowcore', 'sad rap'],
    mood: MOOD_CATEGORIES.TRISTE
  },
  // Géneros oscuros
  dark: {
    keywords: ['black metal', 'death metal', 'doom', 'gothic', 'dark ambient', 'industrial'],
    mood: MOOD_CATEGORIES.OSCURA
  }
};

/**
 * Clasifica un artista basado en la base de datos o patrones
 */
function classifyArtist(artistName) {
  // 1. Buscar en la base de datos exacta
  if (ARTIST_MOOD_DATABASE[artistName]) {
    return {
      mood: ARTIST_MOOD_DATABASE[artistName],
      method: 'database',
      confidence: 1.0
    };
  }

  // 2. Buscar coincidencias parciales (útil para featuring)
  const lowerArtist = artistName.toLowerCase();
  for (const [dbArtist, mood] of Object.entries(ARTIST_MOOD_DATABASE)) {
    if (lowerArtist.includes(dbArtist.toLowerCase()) || 
        dbArtist.toLowerCase().includes(lowerArtist)) {
      return {
        mood: mood,
        method: 'partial_match',
        confidence: 0.8
      };
    }
  }

  // 3. Clasificar por patrones de género (si el nombre del artista contiene pistas)
  for (const [genre, pattern] of Object.entries(GENRE_PATTERNS)) {
    for (const keyword of pattern.keywords) {
      if (lowerArtist.includes(keyword)) {
        return {
          mood: pattern.mood,
          method: 'genre_pattern',
          confidence: 0.6
        };
      }
    }
  }

  // 4. Patrones por sufijos y prefijos comunes
  const lowerName = artistName.toLowerCase();
  
  // Patrones de reggaeton/trap latino
  if (lowerName.includes('lil ') || lowerName.includes('young ') || 
      lowerName.includes('big ') || lowerName.includes('el ') || 
      lowerName.includes('la ') || lowerName.includes('los ') ||
      lowerName.includes('mc ') || lowerName.includes('dj ')) {
    return {
      mood: MOOD_CATEGORIES.FIESTA,
      method: 'name_pattern',
      confidence: 0.5
    };
  }
  
  // Patrones de rock/metal
  if (lowerName.includes('death') || lowerName.includes('black') ||
      lowerName.includes('iron') || lowerName.includes('fire') ||
      lowerName.includes('blood') || lowerName.includes('dark') ||
      lowerName.includes('metal') || lowerName.includes('steel')) {
    return {
      mood: MOOD_CATEGORIES.OSCURA,
      method: 'name_pattern',
      confidence: 0.6
    };
  }
  
  // Patrones de DJ/Electronic
  if (lowerName.startsWith('dj ') || lowerName.includes('electronic') ||
      lowerName.includes('beats') || lowerName.includes('sound')) {
    return {
      mood: MOOD_CATEGORIES.FIESTA,
      method: 'name_pattern',
      confidence: 0.6
    };
  }
  
  // 5. Clasificación por origen/idioma
  const spanishPattern = /[ñáéíóúü]/i;
  if (spanishPattern.test(artistName)) {
    return {
      mood: MOOD_CATEGORIES.FIESTA,
      method: 'language_pattern',
      confidence: 0.4
    };
  }
  
  // Nombres que suenan a artistas indie/alternativos
  if (lowerName.includes('the ') && lowerName.length > 10) {
    return {
      mood: MOOD_CATEGORIES.MELANCOLICA,
      method: 'indie_pattern',
      confidence: 0.3
    };
  }

  // 5. Sin clasificar - mejor ser honesto que inventar
  return {
    mood: MOOD_CATEGORIES.SIN_CLASIFICAR,
    method: 'unclassified',
    confidence: 0.0
  };
}

/**
 * Extrae artistas únicos y los clasifica usando la base de datos gratuita
 */
export function classifyTracksByArtistFree(tracks) {
  console.log('🆓 Using free artist classification...');
  
  const artistMoods = {};
  const trackClassifications = {};
  const moodCounts = {};
  const classificationDetails = {};
  
  // Inicializar contadores
  Object.values(MOOD_CATEGORIES).forEach(mood => {
    moodCounts[mood] = 0;
  });
  
  // Extraer artistas únicos
  const uniqueArtists = [...new Set(tracks.map(track => track.artist.trim()))];
  console.log(`🎤 Found ${uniqueArtists.length} unique artists`);
  
  // Clasificar cada artista
  uniqueArtists.forEach(artist => {
    const classification = classifyArtist(artist);
    artistMoods[artist] = classification.mood;
    classificationDetails[artist] = classification;
    
    console.log(`🎭 ${artist} -> ${classification.mood} (${classification.method}, confidence: ${classification.confidence})`);
  });
  
  // Aplicar clasificación a todas las canciones
  tracks.forEach(track => {
    const artist = track.artist.trim();
    const mood = artistMoods[artist];
    
    if (mood) {
      trackClassifications[track.id] = mood;
      moodCounts[mood]++;
    }
  });
  
  // Calcular estadísticas
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
  
  console.log('🎯 Free classification completed:', {
    totalArtists: uniqueArtists.length,
    totalClassified,
    moodCounts
  });
  
  return {
    classifications: trackClassifications,
    statistics,
    artistMoods,
    classificationDetails,
    method: 'free_database'
  };
}
