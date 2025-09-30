/**
 * Clasificador de estado de ánimo basado en Spotify Audio Analysis API
 * Utiliza datos detallados como tempo, key, mode, timbre, pitch, etc.
 */

import { MOOD_CATEGORIES } from './moodClassifier.js';

/**
 * Analiza las características de tempo y ritmo
 */
function analyzeTempo(track) {
  const tempo = track.tempo;
  const timeSignature = track.time_signature;
  
  // Clasificación por tempo
  let tempoEnergy = 0;
  let tempoDanceability = 0;
  
  if (tempo < 70) {
    // Muy lento - baladas, ambient
    tempoEnergy = 0.1;
    tempoDanceability = 0.1;
  } else if (tempo < 90) {
    // Lento - hip hop, R&B, algunas baladas
    tempoEnergy = 0.3;
    tempoDanceability = 0.4;
  } else if (tempo < 110) {
    // Moderado - reggaeton, algunas pop
    tempoEnergy = 0.5;
    tempoDanceability = 0.7;
  } else if (tempo < 130) {
    // Medio-rápido - pop, rock moderado
    tempoEnergy = 0.7;
    tempoDanceability = 0.8;
  } else if (tempo < 150) {
    // Rápido - dance, pop energético, rock
    tempoEnergy = 0.8;
    tempoDanceability = 0.9;
  } else {
    // Muy rápido - EDM, metal, punk
    tempoEnergy = 0.9;
    tempoDanceability = 0.7; // Puede ser difícil de bailar si es demasiado rápido
  }
  
  return { tempoEnergy, tempoDanceability };
}

/**
 * Analiza la tonalidad y modo para determinar valencia emocional
 */
function analyzeKeyAndMode(track) {
  const key = track.key;
  const mode = track.mode; // 0 = minor, 1 = major
  
  // Tonalidades menores tienden a ser más melancólicas
  let modeValence = mode === 1 ? 0.6 : 0.3;
  
  // Algunas tonalidades tienen características emocionales específicas
  const keyCharacteristics = {
    0: { name: 'C', valenceBoost: 0.0 },      // Neutral
    1: { name: 'C#/Db', valenceBoost: -0.1 }, // Algo oscura
    2: { name: 'D', valenceBoost: 0.1 },      // Brillante
    3: { name: 'D#/Eb', valenceBoost: -0.05 },// Melancólica
    4: { name: 'E', valenceBoost: 0.1 },      // Energética
    5: { name: 'F', valenceBoost: 0.0 },      // Neutral
    6: { name: 'F#/Gb', valenceBoost: -0.1 }, // Misteriosa
    7: { name: 'G', valenceBoost: 0.05 },     // Cálida
    8: { name: 'G#/Ab', valenceBoost: -0.05 },// Dramática
    9: { name: 'A', valenceBoost: 0.1 },      // Brillante
    10: { name: 'A#/Bb', valenceBoost: 0.0 }, // Neutral
    11: { name: 'B', valenceBoost: -0.05 }    // Intensa
  };
  
  const keyInfo = keyCharacteristics[key] || { valenceBoost: 0 };
  const finalValence = Math.max(0, Math.min(1, modeValence + keyInfo.valenceBoost));
  
  return {
    keyValence: finalValence,
    keyName: keyInfo.name,
    isMinor: mode === 0
  };
}

/**
 * Analiza las secciones de la canción para detectar variabilidad y estructura
 */
function analyzeSections(sections) {
  if (!sections || sections.length === 0) return { variety: 0.5, energy: 0.5 };
  
  // Calcular variabilidad en loudness y tempo
  const loudnessValues = sections.map(s => s.loudness);
  const tempoValues = sections.map(s => s.tempo);
  
  const loudnessVariance = calculateVariance(loudnessValues);
  const tempoVariance = calculateVariance(tempoValues);
  
  // Mayor variabilidad = más dinámico = más energético
  const variety = Math.min(1, (loudnessVariance + tempoVariance) / 20);
  
  // Promedio de energía de las secciones
  const avgLoudness = loudnessValues.reduce((a, b) => a + b, 0) / loudnessValues.length;
  const energy = Math.max(0, Math.min(1, (avgLoudness + 60) / 60)); // Normalizar dB
  
  return { variety, energy };
}

/**
 * Analiza los segmentos para detectar características tímbricas
 */
function analyzeSegments(segments) {
  if (!segments || segments.length === 0) return { brightness: 0.5, roughness: 0.5 };
  
  // Analizar timbres promedio
  let totalBrightness = 0;
  let totalRoughness = 0;
  let validSegments = 0;
  
  segments.forEach(segment => {
    if (segment.timbre && segment.timbre.length >= 12) {
      // Timbre[0] = brightness/spectral centroid
      // Timbre[1] = roughness/spectral rolloff
      totalBrightness += segment.timbre[0];
      totalRoughness += Math.abs(segment.timbre[1]);
      validSegments++;
    }
  });
  
  if (validSegments === 0) return { brightness: 0.5, roughness: 0.5 };
  
  const avgBrightness = totalBrightness / validSegments;
  const avgRoughness = totalRoughness / validSegments;
  
  // Normalizar valores (basado en rangos típicos)
  const brightness = Math.max(0, Math.min(1, (avgBrightness + 50) / 100));
  const roughness = Math.max(0, Math.min(1, avgRoughness / 100));
  
  return { brightness, roughness };
}

/**
 * Calcula la varianza de un array de números
 */
function calculateVariance(values) {
  if (values.length === 0) return 0;
  
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const squaredDiffs = values.map(value => Math.pow(value - mean, 2));
  return squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
}

/**
 * Clasifica el estado de ánimo basado en audio analysis
 */
export function classifyMoodFromAudioAnalysis(audioAnalysis) {
  const { track, sections, segments } = audioAnalysis;
  
  // Analizar diferentes aspectos
  const tempoAnalysis = analyzeTempo(track);
  const keyAnalysis = analyzeKeyAndMode(track);
  const sectionAnalysis = analyzeSections(sections);
  const segmentAnalysis = analyzeSegments(segments);
  
  // Calcular características combinadas
  const energy = (tempoAnalysis.tempoEnergy * 0.4) + (sectionAnalysis.energy * 0.6);
  const valence = keyAnalysis.keyValence;
  const danceability = tempoAnalysis.tempoDanceability;
  const acousticness = 1 - segmentAnalysis.brightness; // Menos brillo = más acústico
  const loudness = track.loudness;
  
  // Características adicionales para clasificación
  const variety = sectionAnalysis.variety;
  const roughness = segmentAnalysis.roughness;
  const isMinor = keyAnalysis.isMinor;
  
  console.log('🎵 Audio Analysis Features:', {
    energy: energy.toFixed(2),
    valence: valence.toFixed(2),
    danceability: danceability.toFixed(2),
    acousticness: acousticness.toFixed(2),
    tempo: track.tempo,
    key: keyAnalysis.keyName,
    mode: isMinor ? 'minor' : 'major',
    variety: variety.toFixed(2),
    roughness: roughness.toFixed(2)
  });
  
  // Calcular puntajes para cada estado de ánimo
  const scores = {};
  
  // FELIZ: Alta valencia, energía moderada-alta, modo mayor, alta variabilidad
  scores[MOOD_CATEGORIES.FELIZ] = 
    (valence * 0.4) + 
    (energy * 0.2) + 
    (danceability * 0.2) + 
    (!isMinor ? 0.1 : 0) +
    (variety * 0.1);
  
  // TRISTE: Baja valencia, baja energía, modo menor, alta acousticness
  scores[MOOD_CATEGORIES.TRISTE] = 
    ((1 - valence) * 0.4) + 
    ((1 - energy) * 0.3) + 
    (isMinor ? 0.2 : 0) +
    (acousticness * 0.1);
  
  // MOTIVADORA: Alta energía, alta variabilidad, tempo alto, baja acousticness
  scores[MOOD_CATEGORIES.MOTIVADORA] = 
    (energy * 0.3) + 
    (variety * 0.2) +
    (valence * 0.2) + 
    ((track.tempo > 120 ? 1 : track.tempo / 120) * 0.2) +
    ((1 - acousticness) * 0.1);
  
  // RELAJADA: Baja energía, alta acousticness, baja variabilidad, tempo lento
  scores[MOOD_CATEGORIES.RELAJADA] = 
    ((1 - energy) * 0.3) + 
    (acousticness * 0.3) + 
    ((1 - variety) * 0.2) +
    ((track.tempo < 100 ? 1 : 100 / track.tempo) * 0.2);
  
  // ROMÁNTICA: Valencia moderada, alta acousticness, modo mayor, baja variabilidad
  scores[MOOD_CATEGORIES.ROMANTICA] = 
    (valence * 0.25) + 
    (acousticness * 0.25) + 
    (!isMinor ? 0.2 : 0) +
    ((1 - variety) * 0.15) +
    ((1 - roughness) * 0.15);
  
  // OSCURA: Baja valencia, modo menor, alta roughness, baja brightness
  scores[MOOD_CATEGORIES.OSCURA] = 
    ((1 - valence) * 0.3) + 
    (isMinor ? 0.3 : 0) +
    (roughness * 0.2) +
    ((1 - segmentAnalysis.brightness) * 0.2);
  
  // FIESTA: Alta danceability, alta energía, alta variabilidad, tempo medio-alto
  scores[MOOD_CATEGORIES.FIESTA] = 
    (danceability * 0.3) + 
    (energy * 0.25) + 
    (variety * 0.2) +
    (valence * 0.15) +
    ((track.tempo > 100 && track.tempo < 140 ? 1 : 0.5) * 0.1);
  
  // MELANCÓLICA: Baja valencia, modo menor, baja energía, alta acousticness
  scores[MOOD_CATEGORIES.MELANCOLICA] = 
    ((1 - valence) * 0.3) + 
    (isMinor ? 0.25 : 0) +
    ((1 - energy) * 0.2) + 
    (acousticness * 0.15) +
    ((1 - variety) * 0.1);
  
  // Encontrar el estado de ánimo con mayor puntaje
  let maxScore = 0;
  let predictedMood = MOOD_CATEGORIES.FELIZ;
  
  Object.entries(scores).forEach(([mood, score]) => {
    if (score > maxScore) {
      maxScore = score;
      predictedMood = mood;
    }
  });
  
  console.log('🎭 Mood Scores:', Object.fromEntries(
    Object.entries(scores).map(([mood, score]) => [mood, score.toFixed(3)])
  ));
  console.log('🏆 Winner:', predictedMood, 'with score:', maxScore.toFixed(3));
  
  return {
    mood: predictedMood,
    confidence: maxScore,
    scores: scores,
    features: {
      energy,
      valence,
      danceability,
      acousticness,
      tempo: track.tempo,
      key: keyAnalysis.keyName,
      mode: isMinor ? 'minor' : 'major',
      loudness: track.loudness,
      variety,
      roughness
    }
  };
}
