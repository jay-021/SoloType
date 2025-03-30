export interface TypingText {
  id: string
  text: string
  rank: "e" | "d" | "c" | "b" | "a" | "s"
}

// E Rank - Simple words and short sentences (75-100 words per text)
const eRankTexts: TypingText[] = [
  {
    id: "e1",
    text: "The cat sat on the mat. The dog ran in the park. Birds fly in the sky. Fish swim in the sea. The sun is bright. The moon is round. Stars shine at night. Rain falls from clouds. Wind blows in trees. Flowers grow in gardens.",
    rank: "e"
  },
  {
    id: "e2",
    text: "I like to read books. Books are fun to read. They tell great stories. Stories take us places. We learn new things. Things we never knew. Reading makes us smart. Smart people read a lot. A lot of books to read. Read books every day.",
    rank: "e"
  },
  {
    id: "e3",
    text: "The house is big. The car is fast. The tree is tall. The bird is small. The sky is blue. The grass is green. The sun is yellow. The cloud is white. The night is dark. The day is bright.",
    rank: "e"
  }
]

// D Rank - Basic sentence structures, slightly longer (100-120 words per text)
const dRankTexts: TypingText[] = [
  {
    id: "d1",
    text: "The young hunter trained hard every day. He wanted to become stronger. His friends helped him practice. They shared tips and advice. The training was not easy. But he never gave up. His skills improved slowly. He learned new techniques. His confidence grew each day. Soon he was ready for his first mission.",
    rank: "d"
  },
  {
    id: "d2",
    text: "The garden was full of beautiful flowers. Roses bloomed in bright colors. Butterflies flew between the plants. Bees collected sweet nectar. Birds sang in the trees. The air smelled fresh and clean. Children played on the grass. Parents watched from benches. It was a perfect summer day. Everyone enjoyed the peaceful scene.",
    rank: "d"
  },
  {
    id: "d3",
    text: "The library was quiet and peaceful. Books lined the tall shelves. Students studied at wooden tables. Librarians helped find information. Computers were available for research. The air smelled of old paper. Sunlight streamed through windows. People whispered softly. Time seemed to stand still. It was a perfect place to learn.",
    rank: "d"
  }
]

// C Rank - Medium-length sentences with some punctuation (120-150 words per text)
const cRankTexts: TypingText[] = [
  {
    id: "c1",
    text: "The experienced hunter carefully surveyed the dungeon entrance. His team stood ready behind him, weapons drawn. The air was thick with anticipation as they prepared to enter. Each member had their assigned role; some would scout ahead, others would guard the rear. The dungeon's dark walls seemed to pulse with an eerie energy. They had trained for this moment for months, studying maps and practicing formations. The leader gave a silent signal, and they began their descent into the unknown.",
    rank: "c"
  },
  {
    id: "c2",
    text: "The ancient castle stood proudly on the hilltop, its stone walls weathered by centuries of wind and rain. Inside, the grand hall echoed with the footsteps of visitors. Tapestries depicting historical battles hung from the walls, while suits of armor stood guard in the corners. The castle's library housed thousands of books, each containing stories of the past. The gardens outside were carefully maintained, with paths winding through colorful flower beds. It was a place where history came alive.",
    rank: "c"
  },
  {
    id: "c3",
    text: "The research team worked tirelessly in their laboratory, analyzing data from their latest experiment. Their equipment hummed softly as they processed samples. The team leader reviewed the results carefully, making notes in her journal. Her colleagues discussed their findings, debating different interpretations. The project had taken months of preparation, and now they were seeing the first signs of success. Their work could change how we understand the world.",
    rank: "c"
  }
]

// B Rank - Complex sentences with technical terms (150-180 words per text)
const bRankTexts: TypingText[] = [
  {
    id: "b1",
    text: "The quantum computing research team developed a new algorithm for processing complex data sets. Their breakthrough involved manipulating quantum bits through precise electromagnetic pulses. The team's innovative approach to error correction significantly improved the stability of their quantum system. They implemented advanced cooling mechanisms to maintain the required near-absolute zero temperatures. The results showed unprecedented processing speeds for certain types of calculations. Their work could revolutionize fields from cryptography to drug discovery.",
    rank: "b"
  },
  {
    id: "b2",
    text: "The archaeological expedition uncovered evidence of an advanced ancient civilization. Their discovery included sophisticated irrigation systems and complex architectural structures. The team's analysis of pottery fragments revealed detailed patterns of trade and cultural exchange. They found inscriptions in a previously unknown script, which they began to decipher. The site's preservation was remarkable, with many artifacts still intact. Their findings challenged previous assumptions about early human development.",
    rank: "b"
  },
  {
    id: "b3",
    text: "The environmental research team studied the impact of climate change on marine ecosystems. They collected data from various ocean depths using specialized equipment. Their analysis revealed significant changes in water temperature and acidity levels. The team documented shifts in species distribution and population dynamics. They developed new models to predict future environmental changes. Their research highlighted the urgent need for conservation efforts.",
    rank: "b"
  }
]

// A Rank - Advanced technical content with complex terminology (180-200 words per text)
const aRankTexts: TypingText[] = [
  {
    id: "a1",
    text: "The research team's investigation into quantum entanglement phenomena yielded groundbreaking results. Their experimental setup utilized sophisticated photon detectors and precise timing mechanisms. The team observed unprecedented levels of quantum coherence in their specially prepared materials. Their analysis revealed complex patterns of quantum state evolution that challenged existing theoretical models. The implications for quantum computing and secure communication were significant. Their findings opened new possibilities for quantum information processing.",
    rank: "a"
  },
  {
    id: "a2",
    text: "The astrophysics team's analysis of gravitational wave data revealed previously unknown properties of black hole mergers. Their sophisticated algorithms processed signals from multiple interferometers, identifying subtle patterns in the spacetime ripples. The team's theoretical models predicted the formation of intermediate-mass black holes in certain galactic environments. Their research provided new insights into the evolution of the universe. The implications for our understanding of dark matter and dark energy were profound.",
    rank: "a"
  },
  {
    id: "a3",
    text: "The molecular biology research team developed a novel approach to protein folding prediction. Their computational models incorporated advanced machine learning algorithms and quantum mechanical principles. The team's analysis of protein structure dynamics revealed previously unknown folding pathways. Their methodology significantly improved the accuracy of structure prediction. The implications for drug design and disease treatment were substantial. Their work represented a major advance in structural biology.",
    rank: "a"
  }
]

// S Rank - Expert-level content with highly technical terminology (200-250 words per text)
const sRankTexts: TypingText[] = [
  {
    id: "s1",
    text: "The quantum computing research team achieved a major breakthrough in topological quantum computation. Their experimental setup utilized exotic quasiparticles called anyons, which exist in two-dimensional materials at extremely low temperatures. The team's innovative approach to quantum state manipulation involved precise control of electromagnetic fields and careful management of quantum decoherence. Their results demonstrated unprecedented stability in quantum information storage, with error rates below 0.001%. The implications for fault-tolerant quantum computing were revolutionary. Their methodology could lead to practical quantum computers capable of solving currently intractable problems.",
    rank: "s"
  },
  {
    id: "s2",
    text: "The advanced materials science team developed a new class of superconductors operating at room temperature. Their synthesis process involved precise control of atomic layer deposition and careful manipulation of electronic band structures. The team's analysis revealed unique quantum mechanical properties that enabled superconductivity at 298K. Their materials exhibited critical current densities exceeding 10^6 A/cm² and magnetic field tolerances above 100T. The implications for power transmission and magnetic levitation were transformative. Their work represented a paradigm shift in superconducting materials research.",
    rank: "s"
  },
  {
    id: "s3",
    text: "The neuroengineering team achieved a breakthrough in brain-computer interface technology. Their system utilized advanced neural recording arrays with 10,000 electrodes and sophisticated signal processing algorithms. The team's methodology involved precise mapping of neural circuits and development of biocompatible materials. Their results demonstrated unprecedented resolution in neural activity recording and stimulation. The implications for treating neurological disorders and enhancing human capabilities were profound. Their work opened new possibilities for human-machine integration.",
    rank: "s"
  }
]

// Helper function to get texts by rank
export const getTextsByRank = (rank: string): TypingText[] => {
  switch (rank) {
    case "e":
      return eRankTexts
    case "d":
      return dRankTexts
    case "c":
      return cRankTexts
    case "b":
      return bRankTexts
    case "a":
      return aRankTexts
    case "s":
      return sRankTexts
    default:
      return eRankTexts
  }
}

// Helper function to get a random text by rank
export const getRandomTextByRank = (rank: string): TypingText => {
  const texts = getTextsByRank(rank)
  const randomIndex = Math.floor(Math.random() * texts.length)
  return texts[randomIndex]
}

// Helper function to get multiple random texts by rank
export const getMultipleRandomTextsByRank = (rank: string, count: number): TypingText[] => {
  const texts = getTextsByRank(rank)
  const result: TypingText[] = []
  const usedIndices = new Set<number>()

  while (result.length < count) {
    const randomIndex = Math.floor(Math.random() * texts.length)
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex)
      result.push(texts[randomIndex])
    }
  }

  return result
}

// Helper function to estimate how many texts we need based on duration
export const estimateTextCount = (durationMinutes: number, averageWPM = 40): number => {
  // Calculate total words needed based on duration and average WPM
  const totalWords = durationMinutes * averageWPM

  // Get average words per text based on rank
  const wordsPerText = 150 // Average words per text

  // Calculate number of texts needed, rounding up
  return Math.ceil(totalWords / wordsPerText)
}

// Main function to get texts for a test
export const getTextsForTest = (rank: string, durationMinutes: number): TypingText[] => {
  // Get number of texts needed based on duration
  const textCount = estimateTextCount(durationMinutes)

  // Get random texts for the specified rank
  return getMultipleRandomTextsByRank(rank, textCount)
}

