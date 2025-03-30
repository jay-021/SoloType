import { getMultipleRandomTextsByRank, type TypingText } from "@/data/typing-texts"

// Estimate how many texts we need based on duration and typing speed
export const estimateTextCount = (durationMinutes: number, averageWPM = 40): number => {
  // Average word length in English is about 5 characters
  // We add 20% buffer to ensure we don't run out of text
  const wordsNeeded = durationMinutes * averageWPM * 1.2

  // Estimate how many of our sample texts we need
  // Assuming average text length of 50 words
  return Math.ceil(wordsNeeded / 50)
}

// Get texts for a full test
export const getTextsForTest = (rank: string, durationMinutes: number): TypingText[] => {
  const textCount = estimateTextCount(durationMinutes)
  return getMultipleRandomTextsByRank(rank, textCount)
}

// Fallback texts in case the main system fails
const fallbackTexts: Record<string, string[]> = {
  e: [
    "The quick brown fox jumps over the lazy dog.",
    "Simple words make typing easy and fun.",
    "Practice makes perfect when learning to type.",
  ],
  d: [
    "Typing practice helps improve your speed and accuracy over time.",
    "The more you practice typing, the better you will become at it.",
    "Regular practice sessions are more effective than occasional long ones.",
  ],
  c: [
    "Touch typing is the ability to type without looking at the keyboard; it significantly increases typing speed and efficiency.",
    "Many professional typists can achieve speeds of 60-80 words per minute using proper techniques.",
    "Improving your typing speed requires consistent practice; focus on accuracy first, then gradually increase your pace.",
  ],
  b: [
    "The hunter's enhanced senses allowed him to detect the subtle shifts in mana concentration throughout the dungeon; this ability gave him a significant advantage when navigating the treacherous environment.",
    "Developing proper typing habits early is crucial for long-term efficiency; many self-taught typists develop bad habits that significantly limit their potential speed.",
    "Advanced typing techniques often focus on rhythm and flow rather than raw speed; experienced typists develop a natural cadence to their typing.",
  ],
  a: [
    "The clandestine conclave of S-rank hunters convened surreptitiously in the penumbra of the ancient citadel, their hushed deliberations concerning the unprecedented proliferation of high-level dungeons manifesting globally.",
    "The meticulous cultivation of exemplary typing methodology necessitates assiduous attention to ergonomic considerations and biomechanical efficiency.",
    "The quintessential attributes distinguishing exceptional typists from their mediocre counterparts encompass not merely celerity of finger movement but also precision, consistency, and adaptability.",
  ],
  s: [
    "The Æthereal Nexus—a convergence point of multidimensional realities first theorized by Dr. Eliza Vön-Harkness in 2142—manifested unexpectedly within the Chernobyl Exclusion Zone at 03:27 GMT.",
    "The 97th Annual World Typing Championship in Zürich attracted 342 competitors from 78 countries, including defending champion Mikaela Järvinen (Finland, 187 WPM) and rising star Zhao Wei-Ting (Taiwan, 192 WPM in qualifiers).",
    "The Yggdrasil Protocol—classified as &quot;Omega-Black&quot; within the Hunter Association's archives—was developed by the enigmatic S-rank hunter known only as &quot;Fenrir&quot; after the catastrophic breach of Dungeon #ES-001.",
  ],
}

// Get fallback text if the main system fails
export const getFallbackText = (rank: string): string => {
  const textsForRank = fallbackTexts[rank] || fallbackTexts["e"]
  const randomIndex = Math.floor(Math.random() * textsForRank.length)
  return textsForRank[randomIndex]
}

