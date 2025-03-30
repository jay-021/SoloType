export interface TypingText {
  id: string
  text: string
  rank: "e" | "d" | "c" | "b" | "a" | "s"
}

// E Rank - Simple words and short sentences (75-100 words per text)
const eRankTexts: TypingText[] = [
  {
    id: "e1",
    text: "The ancient Egyptians built the Great Pyramid of Giza around 2560 BCE. It was the tallest man-made structure for over 3,800 years. The pyramid was built as a tomb for Pharaoh Khufu. Workers used simple tools and ramps to move the heavy stones. Each stone weighed about 2.5 tons. The pyramid has three main chambers. The King's Chamber is at the center. The Queen's Chamber is smaller. The Grand Gallery is a long passage.",
    rank: "e"
  },
  {
    id: "e2",
    text: "The Wright brothers made the first successful airplane flight in 1903. They flew for 12 seconds and covered 120 feet. The flight took place at Kitty Hawk, North Carolina. The brothers built and tested many gliders before their powered flight. They used a simple engine they built themselves. The airplane was called the Wright Flyer. It was made of wood and fabric. The brothers took turns flying the plane. They made several flights that day.",
    rank: "e"
  },
  {
    id: "e3",
    text: "The first computer mouse was invented in the 1960s by Douglas Engelbart. It was made of wood and had two metal wheels. The mouse got its name because the wire looked like a tail. The first mouse was very simple. It could only move in two directions. Modern mice use optical sensors. They work on almost any surface. The mouse changed how people use computers. It made computers easier to use.",
    rank: "e"
  }
]

// D Rank - Basic sentence structures, slightly longer (100-120 words per text)
const dRankTexts: TypingText[] = [
  {
    id: "d1",
    text: "The Industrial Revolution began in Britain in the late 18th century. It transformed manufacturing from hand production to machine production. Factories replaced small workshops. Steam power replaced human and animal power. The textile industry was the first to industrialize. New machines could spin and weave cloth much faster than humans. This led to mass production of clothing. The revolution spread to other industries like iron and steel. Cities grew as people moved to work in factories. Working conditions were often dangerous and unhealthy.",
    rank: "d"
  },
  {
    id: "d2",
    text: "The first successful heart transplant was performed in 1967 by Dr. Christiaan Barnard. The patient was Louis Washkansky, who had heart disease. The surgery took nine hours to complete. The donor was a young woman who died in a car accident. The patient lived for 18 days after the surgery. He died from pneumonia, not from heart rejection. This surgery paved the way for modern heart transplants. Today, thousands of heart transplants are performed each year. Survival rates have improved significantly.",
    rank: "d"
  },
  {
    id: "d3",
    text: "The first computer programmer was Ada Lovelace, who lived in the 1800s. She worked with Charles Babbage on his mechanical computer. Lovelace wrote the first algorithm for the machine. She saw that computers could do more than just math. She predicted they could create music and art. Her notes were published in 1843. They contained what is now considered the first computer program. The programming language Ada was named after her. She is often called the first computer programmer.",
    rank: "d"
  }
]

// C Rank - Medium-length sentences with some punctuation (120-150 words per text)
const cRankTexts: TypingText[] = [
  {
    id: "c1",
    text: "The discovery of penicillin in 1928 by Alexander Fleming revolutionized medicine. While studying bacteria, he noticed that a mold had killed the bacteria in one of his petri dishes. This mold was Penicillium notatum. Fleming published his findings in 1929, but it took over a decade before penicillin was mass-produced. Howard Florey and Ernst Chain developed methods to purify and produce penicillin in large quantities. By 1945, penicillin was widely available and saved countless lives during World War II. This discovery marked the beginning of the antibiotic era in medicine.",
    rank: "c"
  },
  {
    id: "c2",
    text: "The first successful DNA sequencing was completed in 1977 by Frederick Sanger and his team. They developed a method called the Sanger sequencing technique. This breakthrough allowed scientists to read the genetic code of living organisms. The first complete genome sequenced was that of a virus. The human genome project, completed in 2003, used this technology. It took 13 years and cost billions of dollars. Today, sequencing a human genome takes just a few days and costs much less. This technology has revolutionized medicine and biology.",
    rank: "c"
  },
  {
    id: "c3",
    text: "The first successful moon landing occurred on July 20, 1969. Apollo 11 astronauts Neil Armstrong and Buzz Aldrin landed on the moon's surface. Michael Collins remained in orbit around the moon. Armstrong was the first human to walk on the moon. He famously said, 'That's one small step for man, one giant leap for mankind.' The astronauts collected moon rocks and conducted experiments. They spent about 21 hours on the moon's surface. The mission was a major achievement in human history.",
    rank: "c"
  }
]

// B Rank - Complex sentences with technical terms (150-180 words per text)
const bRankTexts: TypingText[] = [
  {
    id: "b1",
    text: "The development of quantum computing represents a paradigm shift in computational power. Unlike classical computers that use bits, quantum computers use quantum bits or qubits. These qubits can exist in multiple states simultaneously through quantum superposition. The first quantum computer was built in 1998, but it could only handle two qubits. Modern quantum computers can handle dozens of qubits. They use complex cooling systems to maintain near-absolute zero temperatures. Quantum computing has potential applications in cryptography, drug discovery, and climate modeling. However, maintaining quantum coherence remains a major challenge.",
    rank: "b"
  },
  {
    id: "b2",
    text: "The discovery of gravitational waves confirmed a major prediction of Einstein's theory of general relativity. These ripples in spacetime were first detected in 2015 by LIGO. The waves came from two black holes merging 1.3 billion light-years away. The detection required extremely sensitive instruments that could measure changes smaller than an atomic nucleus. The discovery opened a new window into observing the universe. Scientists can now study cosmic events that don't emit light. This has led to new insights into black holes, neutron stars, and the early universe.",
    rank: "b"
  },
  {
    id: "b3",
    text: "The development of CRISPR gene editing technology has revolutionized genetic engineering. CRISPR allows scientists to precisely edit DNA sequences. It works like molecular scissors, cutting DNA at specific locations. The technology was adapted from a bacterial immune system. It's much cheaper and more precise than previous gene editing methods. CRISPR has potential applications in treating genetic diseases, improving crops, and combating climate change. However, it also raises ethical concerns about genetic modification.",
    rank: "b"
  }
]

// A Rank - Advanced technical content with complex terminology (180-200 words per text)
const aRankTexts: TypingText[] = [
  {
    id: "a1",
    text: "The development of artificial neural networks has transformed machine learning capabilities. These networks mimic the structure of biological neural networks in the human brain. They consist of layers of interconnected nodes that process and transmit information. Deep learning, a subset of machine learning, uses multiple layers of neural networks. The training process involves adjusting weights and biases through backpropagation. Modern neural networks can process vast amounts of data and learn complex patterns. They've achieved remarkable success in image recognition, natural language processing, and game playing. However, they still face challenges in common-sense reasoning and transfer learning.",
    rank: "a"
  },
  {
    id: "a2",
    text: "The discovery of the Higgs boson particle completed the Standard Model of particle physics. This elusive particle was predicted in 1964 by Peter Higgs and others. The Large Hadron Collider at CERN confirmed its existence in 2012. The Higgs boson gives mass to other particles through the Higgs field. Its discovery required the most powerful particle accelerator ever built. The experiment involved thousands of scientists and cost billions of dollars. The discovery helped explain why particles have mass. It's considered one of the most important discoveries in physics.",
    rank: "a"
  },
  {
    id: "a3",
    text: "The development of fusion power technology aims to replicate the energy production of stars. Fusion reactions combine light atomic nuclei to form heavier ones, releasing massive amounts of energy. The main challenge is containing the extremely hot plasma required for fusion. Magnetic confinement and inertial confinement are two main approaches. The ITER project in France is building the world's largest fusion reactor. It uses superconducting magnets to contain the plasma. If successful, fusion could provide nearly limitless clean energy. However, technical challenges remain in achieving sustained fusion reactions.",
    rank: "a"
  }
]

// S Rank - Expert-level content with highly technical terminology (200-250 words per text)
const sRankTexts: TypingText[] = [
  {
    id: "s1",
    text: "The development of quantum entanglement-based communication systems represents the cutting edge of quantum information science. These systems utilize the phenomenon of quantum entanglement, where particles remain connected regardless of distance. When one particle's state is measured, the other instantly reflects this change. This property enables theoretically unbreakable encryption through quantum key distribution. The technology requires sophisticated quantum state preparation and measurement techniques. Current implementations use photons as quantum bits, transmitted through optical fibers or free space. Major challenges include maintaining entanglement over long distances and developing reliable quantum repeaters. Despite these challenges, quantum communication networks are being developed for secure government and financial communications.",
    rank: "s"
  },
  {
    id: "s2",
    text: "The development of brain-computer interfaces (BCIs) has opened new frontiers in neurotechnology. These devices create direct communication pathways between the brain and external devices. Invasive BCIs require surgical implantation of electrodes into the brain tissue. Non-invasive methods use external sensors to detect brain activity. The technology has applications in medical rehabilitation, allowing paralyzed patients to control prosthetic limbs. Advanced BCIs can decode neural patterns to reconstruct speech and movement intentions. However, challenges remain in improving signal resolution, reducing tissue damage, and developing biocompatible materials. Ethical concerns about privacy and cognitive enhancement also need to be addressed.",
    rank: "s"
  },
  {
    id: "s3",
    text: "The development of topological quantum computing represents a revolutionary approach to quantum computation. This technology uses anyons, particles that exist in two dimensions and have unique exchange properties. The quantum information is stored in the braiding patterns of these particles, making it inherently protected from local errors. This topological protection could solve the major problem of decoherence in quantum computers. The implementation requires materials with specific topological properties, such as certain types of superconductors. Major challenges include creating and manipulating anyons at practical temperatures. Despite these challenges, topological quantum computing could lead to fault-tolerant quantum computers.",
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

