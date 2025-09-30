/**
 * Clasificador de estado de ánimo basado en audio features de Spotify
 * Clasifica canciones en 8 categorías: feliz, triste, motivadora, relajada, romántica, oscura, fiesta, melancólica
 */

export const MOOD_CATEGORIES = {
  FELIZ: 'feliz',
  TRISTE: 'triste', 
  MOTIVADORA: 'motivadora',
  RELAJADA: 'relajada',
  ROMANTICA: 'romántica',
  OSCURA: 'oscura',
  FIESTA: 'fiesta',
  MELANCOLICA: 'melancólica',
  SIN_CLASIFICAR: 'sin clasificar'
};

export const MOOD_COLORS = {
  [MOOD_CATEGORIES.FELIZ]: '#FFD700', // Dorado
  [MOOD_CATEGORIES.TRISTE]: '#4682B4', // Azul acero
  [MOOD_CATEGORIES.MOTIVADORA]: '#FF4500', // Rojo naranja
  [MOOD_CATEGORIES.RELAJADA]: '#98FB98', // Verde pálido
  [MOOD_CATEGORIES.ROMANTICA]: '#FFB6C1', // Rosa claro
  [MOOD_CATEGORIES.OSCURA]: '#2F2F2F', // Gris oscuro
  [MOOD_CATEGORIES.FIESTA]: '#FF69B4', // Rosa fuerte
  [MOOD_CATEGORIES.MELANCOLICA]: '#9370DB', // Púrpura medio
  [MOOD_CATEGORIES.SIN_CLASIFICAR]: '#CCCCCC' // Gris claro
};

export const MOOD_EMOJIS = {
  [MOOD_CATEGORIES.FELIZ]: '😊',
  [MOOD_CATEGORIES.TRISTE]: '😢',
  [MOOD_CATEGORIES.MOTIVADORA]: '💪',
  [MOOD_CATEGORIES.RELAJADA]: '😌',
  [MOOD_CATEGORIES.ROMANTICA]: '💕',
  [MOOD_CATEGORIES.OSCURA]: '🖤',
  [MOOD_CATEGORIES.FIESTA]: '🎉',
  [MOOD_CATEGORIES.MELANCOLICA]: '🌧️',
  [MOOD_CATEGORIES.SIN_CLASIFICAR]: '❓'
};

/**
 * Clasifica una canción basada en sus audio features
 * @param {Object} audioFeatures - Audio features de Spotify
 * @returns {string} - Categoría de estado de ánimo
 */
export function classifyMood(audioFeatures) {
  if (!audioFeatures) {
    return null;
  }

  const {
    valence, // Positividad musical (0.0-1.0)
    energy, // Intensidad y poder (0.0-1.0)
    danceability, // Aptitud para bailar (0.0-1.0)
    acousticness, // Confianza acústica (0.0-1.0)
    tempo, // BPM
    loudness, // Volumen en dB (típicamente -60 a 0)
    speechiness, // Presencia de palabras habladas (0.0-1.0)
    instrumentalness, // Predicción de si no tiene voces (0.0-1.0)
    mode // Mayor (1) o menor (0)
  } = audioFeatures;

  // Normalizar loudness (convertir de dB a escala 0-1)
  const normalizedLoudness = Math.max(0, (loudness + 60) / 60);

  // Calcular puntajes para cada estado de ánimo
  const scores = {};

  // FELIZ: Alta valencia, energía moderada-alta, modo mayor
  scores[MOOD_CATEGORIES.FELIZ] = 
    (valence * 0.4) + 
    (energy * 0.2) + 
    (danceability * 0.2) + 
    (mode * 0.1) + 
    (normalizedLoudness * 0.1);

  // TRISTE: Baja valencia, baja energía, modo menor, alta acousticness
  scores[MOOD_CATEGORIES.TRISTE] = 
    ((1 - valence) * 0.4) + 
    ((1 - energy) * 0.2) + 
    ((1 - mode) * 0.2) + 
    (acousticness * 0.2);

  // MOTIVADORA: Alta energía, alta valencia, tempo alto
  const tempoScore = Math.min(1, tempo / 140); // Normalizar tempo (140+ BPM es alto)
  scores[MOOD_CATEGORIES.MOTIVADORA] = 
    (energy * 0.3) + 
    (valence * 0.2) + 
    (tempoScore * 0.2) + 
    (normalizedLoudness * 0.2) + 
    ((1 - acousticness) * 0.1);

  // RELAJADA: Baja energía, alta acousticness, tempo bajo
  const relaxedTempoScore = Math.max(0, (120 - tempo) / 120); // Tempo bajo
  scores[MOOD_CATEGORIES.RELAJADA] = 
    ((1 - energy) * 0.3) + 
    (acousticness * 0.3) + 
    (relaxedTempoScore * 0.2) + 
    (valence * 0.1) + 
    ((1 - normalizedLoudness) * 0.1);

  // ROMÁNTICA: Valencia moderada-alta, acousticness moderada, modo mayor
  scores[MOOD_CATEGORIES.ROMANTICA] = 
    (valence * 0.25) + 
    (acousticness * 0.25) + 
    (mode * 0.2) + 
    ((1 - energy) * 0.15) + 
    ((1 - speechiness) * 0.15);

  // OSCURA: Baja valencia, modo menor, baja acousticness
  scores[MOOD_CATEGORIES.OSCURA] = 
    ((1 - valence) * 0.3) + 
    ((1 - mode) * 0.3) + 
    ((1 - acousticness) * 0.2) + 
    (energy * 0.1) + 
    (normalizedLoudness * 0.1);

  // FIESTA: Alta danceability, alta energía, alta valencia, tempo alto
  scores[MOOD_CATEGORIES.FIESTA] = 
    (danceability * 0.3) + 
    (energy * 0.25) + 
    (valence * 0.2) + 
    (tempoScore * 0.15) + 
    (normalizedLoudness * 0.1);

  // MELANCÓLICA: Baja valencia, energía moderada, modo menor, acousticness moderada
  scores[MOOD_CATEGORIES.MELANCOLICA] = 
    ((1 - valence) * 0.3) + 
    ((1 - mode) * 0.25) + 
    (acousticness * 0.2) + 
    ((1 - energy) * 0.15) + 
    (instrumentalness * 0.1);

  // Encontrar el estado de ánimo con mayor puntaje
  let maxScore = 0;
  let predictedMood = MOOD_CATEGORIES.FELIZ; // Default

  Object.entries(scores).forEach(([mood, score]) => {
    if (score > maxScore) {
      maxScore = score;
      predictedMood = mood;
    }
  });

  return predictedMood;
}

/**
 * Clasifica múltiples canciones y devuelve estadísticas
 * @param {Object} audioFeaturesMap - Mapa de ID -> audio features
 * @returns {Object} - Clasificaciones y estadísticas
 */
export function classifyMultipleTracks(audioFeaturesMap) {
  const classifications = {};
  const moodCounts = {};
  
  // Inicializar contadores
  Object.values(MOOD_CATEGORIES).forEach(mood => {
    moodCounts[mood] = 0;
  });

  // Clasificar cada track
  Object.entries(audioFeaturesMap).forEach(([trackId, audioFeatures]) => {
    const mood = classifyMood(audioFeatures);
    if (mood) {
      classifications[trackId] = mood;
      moodCounts[mood]++;
    }
  });

  // Calcular porcentajes
  const totalClassified = Object.keys(classifications).length;
  const moodPercentages = {};
  
  Object.entries(moodCounts).forEach(([mood, count]) => {
    moodPercentages[mood] = totalClassified > 0 ? (count / totalClassified) * 100 : 0;
  });

  return {
    classifications,
    statistics: {
      moodCounts,
      moodPercentages,
      totalClassified,
      totalTracks: Object.keys(audioFeaturesMap).length
    }
  };
}

/**
 * Obtiene el color asociado a un estado de ánimo
 * @param {string} mood - Estado de ánimo
 * @returns {string} - Color hexadecimal
 */
export function getMoodColor(mood) {
  return MOOD_COLORS[mood] || '#CCCCCC';
}

/**
 * Obtiene el emoji asociado a un estado de ánimo
 * @param {string} mood - Estado de ánimo
 * @returns {string} - Emoji
 */
export function getMoodEmoji(mood) {
  return MOOD_EMOJIS[mood] || '🎵';
}
