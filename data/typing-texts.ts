export interface TypingText {
  id: string
  text: string
  rank: "e" | "d" | "c" | "b" | "a" | "s"
}

// E Rank - Simple words and short sentences
const eRankTexts: TypingText[] = [
  { id: "e1", text: "The sun is bright. I can see it. It is a nice day today.", rank: "e" },
  { id: "e2", text: "I like to type fast. It is fun to learn. We can all get better.", rank: "e" },
  { id: "e3", text: "Cats and dogs are pets. Birds can fly high. Fish swim in water.", rank: "e" },
  { id: "e4", text: "I want to be the best. Type with me now. Let us practice more.", rank: "e" },
  { id: "e5", text: "Books are fun to read. Music is nice to hear. Food is good to eat.", rank: "e" },
  { id: "e6", text: "The sky is blue. Grass is green. Roses are red. Snow is white.", rank: "e" },
  { id: "e7", text: "I walk to school. She runs fast. They play games. We work hard.", rank: "e" },
  { id: "e8", text: "My name is Jin. I am a hunter. I want to be strong. I will try hard.", rank: "e" },
  { id: "e9", text: "The moon is out. Stars shine bright. Night is dark. Day is light.", rank: "e" },
  { id: "e10", text: "Type with care. Go slow at first. Speed will come. Just keep at it.", rank: "e" },
]

// D Rank - Basic sentence structures, slightly longer
const dRankTexts: TypingText[] = [
  {
    id: "d1",
    text: "Typing practice helps improve speed and accuracy. The more you practice, the better you will become at typing.",
    rank: "d",
  },
  {
    id: "d2",
    text: "Hunters must train every day to improve their skills. Only through constant practice can they hope to rank up.",
    rank: "d",
  },
  {
    id: "d3",
    text: "The dungeon appeared suddenly in the middle of the city. People were afraid of what might come out of it.",
    rank: "d",
  },
  {
    id: "d4",
    text: "Learning to type without looking at the keyboard is an important skill. It will help you type much faster in the long run.",
    rank: "d",
  },
  {
    id: "d5",
    text: "The Hunter Association monitors all dungeon activity. They assign ranks to both dungeons and hunters based on power level.",
    rank: "d",
  },
  {
    id: "d6",
    text: "Finger placement is key to typing efficiently. Your fingers should rest on the home row when not actively typing.",
    rank: "d",
  },
  {
    id: "d7",
    text: "E-rank hunters often struggle to make a living. The dungeons they can enter provide minimal rewards for significant risk.",
    rank: "d",
  },
  {
    id: "d8",
    text: "Regular practice sessions are more effective than occasional long sessions. Try to practice typing for at least 15 minutes each day.",
    rank: "d",
  },
  {
    id: "d9",
    text: "The monsters in the dungeon grew stronger as the hunters descended deeper. Each level presented new challenges to overcome.",
    rank: "d",
  },
  {
    id: "d10",
    text: "Typing tests measure both speed and accuracy. While speed is important, making too many errors will reduce your overall score.",
    rank: "d",
  },
]

// C Rank - Medium-length sentences with some punctuation
const cRankTexts: TypingText[] = [
  {
    id: "c1",
    text: "The Hunter Association has strict rules about dungeon clearance; all hunters must register before entering a dungeon. Failure to comply with these regulations can result in severe penalties, including license suspension.",
    rank: "c",
  },
  {
    id: "c2",
    text: "Typing efficiently requires practice and patience; it's not something you can master overnight. Many professional typists spend years refining their technique, focusing on both speed and accuracy.",
    rank: "c",
  },
  {
    id: "c3",
    text: "C-rank hunters are considered mid-tier in the hunter hierarchy. They can handle moderate threats and earn a decent living, but the truly lucrative jobs are reserved for B-rank and above.",
    rank: "c",
  },
  {
    id: "c4",
    text: "When typing, it's important to maintain good posture; sitting up straight helps prevent fatigue and repetitive strain injuries. Your wrists should hover above the keyboard, not rest on the desk or keyboard.",
    rank: "c",
  },
  {
    id: "c5",
    text: "The dungeon's inner structure shifted constantly, making mapping nearly impossible. Hunters had to rely on their instincts and experience to navigate the labyrinthine passages without getting lost forever.",
    rank: "c",
  },
  {
    id: "c6",
    text: "Touch typing is the ability to type without looking at the keyboard; it significantly increases typing speed and efficiency. Most professional typists can achieve speeds of 60-80 words per minute using this technique.",
    rank: "c",
  },
  {
    id: "c7",
    text: "The magic crystal extracted from the dungeon core glowed with an eerie blue light. Researchers studied its properties extensively, hoping to understand the source of its mysterious power.",
    rank: "c",
  },
  {
    id: "c8",
    text: "Improving your typing speed requires consistent practice; focus on accuracy first, then gradually increase your pace. Many typing experts recommend daily practice sessions of 15-30 minutes for optimal results.",
    rank: "c",
  },
  {
    id: "c9",
    text: "The hunter's guild hall buzzed with activity as new dungeon locations were announced. Teams quickly formed, with members negotiating their shares of potential rewards before heading out.",
    rank: "c",
  },
  {
    id: "c10",
    text: "Ergonomic keyboards are designed to reduce strain on your hands and wrists; they position your hands at a more natural angle. While they may take some getting used to, many typists find them more comfortable for extended use.",
    rank: "c",
  },
]

// B Rank - More complex sentences with commas and semicolons
const bRankTexts: TypingText[] = [
  {
    id: "b1",
    text: "The S-rank dungeon, which had remained dormant for centuries, suddenly awakened with a surge of magical energy that shook the entire city; the Hunter Association immediately issued an emergency alert, calling all available A-rank and S-rank hunters to assemble at headquarters for a briefing on the potential catastrophe that could unfold if the dungeon breach wasn't contained quickly.",
    rank: "b",
  },
  {
    id: "b2",
    text: "Efficient typing techniques, such as touch typing and proper finger positioning, can dramatically improve both speed and accuracy; professional typists often achieve speeds of over 100 words per minute without sacrificing precision, a skill that requires years of dedicated practice and muscle memory development.",
    rank: "b",
  },
  {
    id: "b3",
    text: "The hunter's enhanced senses allowed him to detect the subtle shifts in mana concentration throughout the dungeon; this ability, which he had developed after countless near-death experiences, gave him a significant advantage when navigating the treacherous environment filled with traps and hidden passages designed to confuse and separate hunting parties.",
    rank: "b",
  },
  {
    id: "b4",
    text: "Developing proper typing habits early is crucial for long-term efficiency; many self-taught typists develop bad habits, such as using only a few fingers or constantly looking at the keyboard, which significantly limits their potential speed and increases the risk of repetitive strain injuries that can become chronic problems.",
    rank: "b",
  },
  {
    id: "b5",
    text: "The magical barrier, which had protected the city for generations, began to flicker and fade as the mana stones powering it were depleted; the council of mages worked frantically to reinforce the weakening shield, knowing that if it failed completely, the horde of monsters gathering beyond the city walls would descend upon the unprepared citizens with devastating consequences.",
    rank: "b",
  },
  {
    id: "b6",
    text: "Advanced typing techniques often focus on rhythm and flow rather than raw speed; experienced typists develop a natural cadence to their typing, allowing their fingers to move across the keyboard in smooth, efficient patterns that minimize unnecessary movement and reduce fatigue during extended typing sessions.",
    rank: "b",
  },
  {
    id: "b7",
    text: "The hunter's guild, which had stood in the center of the city for centuries, served as both a gathering place for job assignments and a repository of knowledge about dungeons and monsters; new hunters would often spend weeks studying the extensive archives before attempting even an E-rank dungeon, understanding that proper preparation could mean the difference between life and death.",
    rank: "b",
  },
  {
    id: "b8",
    text: "Ergonomic keyboard designs vary widely, from split keyboards that separate the keys for each hand to contoured models that match the natural arc of finger movement; finding the right keyboard for your specific needs and typing style can significantly reduce strain and discomfort, especially for those who type for many hours each day.",
    rank: "b",
  },
  {
    id: "b9",
    text: "The ancient artifact, recovered from the deepest level of the dungeon, pulsed with an energy that seemed almost sentient; researchers worked day and night to decipher the intricate runes carved into its surface, hoping to understand its purpose before its power could fully awaken and potentially unleash forces beyond their control.",
    rank: "b",
  },
  {
    id: "b10",
    text: "Competitive typing events attract participants from around the world who compete for speed and accuracy under standardized conditions; these competitions often use specialized software that measures performance metrics such as words per minute, keystroke accuracy, and consistency, allowing for fair comparison between typists with different styles and techniques.",
    rank: "b",
  },
]

// A Rank - Longer sentences with advanced vocabulary
const aRankTexts: TypingText[] = [
  {
    id: "a1",
    text: "The clandestine conclave of S-rank hunters convened surreptitiously in the penumbra of the ancient citadel, their hushed deliberations concerning the unprecedented proliferation of high-level dungeons manifesting globally; the implications of this phenomenon were potentially cataclysmic, as each dungeon breach exponentially increased the probability of a catastrophic monster wave that could decimate the fragile equilibrium between the human realm and the abyssal dimensions from which these eldritch entities emerged.",
    rank: "a",
  },
  {
    id: "a2",
    text: "The meticulous cultivation of exemplary typing methodology necessitates assiduous attention to ergonomic considerations and biomechanical efficiency; professional stenographers and transcriptionists invariably emphasize the paramount importance of proper posture, optimal keyboard positioning, and rhythmic keystroke patterns to mitigate the deleterious effects of repetitive strain and to maximize sustainable productivity during protracted typing sessions.",
    rank: "a",
  },
  {
    id: "a3",
    text: "The arcane sigils inscribed upon the dungeon's obsidian walls pulsated with an ethereal luminescence that seemed to resonate with the fluctuating mana concentrations permeating the cavernous chamber; the veteran hunter, whose perspicacious analysis of ancient languages had proven invaluable on countless expeditions, scrutinized the cryptic glyphs with mounting trepidation as he gradually deciphered their ominous portent regarding the imminent awakening of the primordial entity slumbering within the dungeon's innermost sanctum.",
    rank: "a",
  },
  {
    id: "a4",
    text: "The quintessential attributes distinguishing exceptional typists from their mediocre counterparts encompass not merely celerity of finger movement but also precision, consistency, and adaptability to diverse textual contexts; the neurological pathways established through deliberate practice facilitate the automaticity of keystroke execution, thereby liberating cognitive resources for higher-order processing of content rather than the mechanical aspects of text production.",
    rank: "a",
  },
  {
    id: "a5",
    text: "The Hunter Association's hierarchical classification system categorizes practitioners based on a multifaceted assessment of their combat prowess, magical aptitude, tactical acumen, and previous dungeon clearance records; this meritocratic framework ensures that only the most formidable individuals attain the coveted S-rank designation, which confers both tremendous prestige and the concomitant responsibility of confronting existential threats that transcend the capabilities of lower-ranked hunters.",
    rank: "a",
  },
  {
    id: "a6",
    text: "The ergonomic optimization of keyboard interfaces has evolved substantially through interdisciplinary collaboration among computer scientists, industrial designers, and occupational health specialists; contemporary keyboard architectures frequently incorporate split designs, tenting mechanisms, and customizable key layouts to accommodate the anthropometric diversity of users and to minimize the biomechanical stressors associated with conventional typing configurations.",
    rank: "a",
  },
  {
    id: "a7",
    text: "The phantasmagorical manifestations materializing within the S-rank dungeon defied conventional taxonomic classification, exhibiting morphological characteristics and thaumaturgical signatures previously undocumented in the Hunter Association's comprehensive bestiary; the reconnaissance team, comprised exclusively of veteran A-rank hunters with specialized sensory abilities, transmitted fragmentary observations to headquarters before their communication devices succumbed to the dungeon's reality-distorting miasma.",
    rank: "a",
  },
  {
    id: "a8",
    text: "The acquisition of transcendent typing proficiency necessitates the harmonious integration of physical dexterity, cognitive processing efficiency, and proprioceptive awareness; elite typists cultivate a state of flow in which the boundary between intention and execution dissolves, enabling a seemingly effortless translation of thought into text that approaches the theoretical limits of human performance in this domain.",
    rank: "a",
  },
  {
    id: "a9",
    text: "The cataclysmic rupture of the dimensional barrier separating the mortal realm from the abyssal planes precipitated an unprecedented incursion of eldritch entities whose very presence warped the fabric of reality; the consortium of S-rank hunters and archmages mobilized their collective resources to establish a thaumaturgical quarantine zone, knowing that the fate of humanity hinged upon their ability to contain and neutralize this existential threat before it metastasized beyond their sphere of influence.",
    rank: "a",
  },
  {
    id: "a10",
    text: "The psychophysiological mechanisms underlying expert typing performance encompass sophisticated motor control systems, procedural memory consolidation, and attentional resource allocation; longitudinal research indicates that the development of typing expertise follows a power law learning curve characterized by rapid initial improvement followed by progressively diminishing returns, necessitating increasingly deliberate and targeted practice methodologies to overcome performance plateaus.",
    rank: "a",
  },
]

// S Rank - Complex sentence structures with rare words, proper nouns, and special characters
const sRankTexts: TypingText[] = [
  {
    id: "s1",
    text: "The Æthereal Nexus—a convergence point of multidimensional realities first theorized by Dr. Eliza Vön-Harkness in 2142—manifested unexpectedly within the Chernobyl Exclusion Zone at 03:27 GMT; the International Hunter-Mage Consortium (IHMC) immediately dispatched their Omega-7 containment squad, led by Arch-Magister Kwan Ji-Hyun, to establish a Class-IV thaumaturgical barrier before the quantum-entangled anomalies could propagate beyond the initial 12.8km radius of effect.",
    rank: "s",
  },
  {
    id: "s2",
    text: 'The 97th Annual World Typing Championship in Zürich attracted 342 competitors from 78 countries, including defending champion Mikaela Järvinen (Finland, 187 WPM) and rising star Zhao Wei-Ting (Taiwan, 192 WPM in qualifiers); the competition\'s technical director, Jean-Pierre Beaumont, implemented controversial new anti-cheating measures including real-time keystroke analysis algorithms and specialized "Quantum-Lock™" keyboards that reportedly cost €4,750 each and required participants to sign non-disclosure agreements regarding the proprietary technology.',
    rank: "s",
  },
  {
    id: "s3",
    text: 'The Yggdrasil Protocol—classified as "Omega-Black" within the Hunter Association\'s archives—was developed by the enigmatic S-rank hunter known only as "Fenrir" after the catastrophic breach of Dungeon #ES-001 (colloquially: "The Abyss of Nyx") in 2031; this last-resort countermeasure involves the synchronized activation of 13 thaumaturgical arrays positioned at ley line intersections across the globe, creating a cascading resonance pattern that can temporarily sever the connection between our dimension and the source of the dungeon\'s eldritch energies at the cost of potentially destabilizing Earth\'s geomagnetic field for 72-96 hours.',
    rank: "s",
  },
  {
    id: "s4",
    text: 'The revolutionary "NeuraSynch™" typing interface—developed by Dr. Hiroshi Nakamura at MIT\'s Human-Computer Symbiosis Laboratory—utilizes a non-invasive brain-computer interface (BCI) that interprets motor cortex signals at 1,250Hz with 99.7% accuracy; early adopters report typing speeds exceeding 300 WPM after the 6-8 week neural calibration period, though the $12,995 price tag and requirement for bi-monthly recalibration sessions has limited adoption to professional transcriptionists, competitive e-athletes, and high-frequency traders whose ROI justifies the substantial investment.',
    rank: "s",
  },
  {
    id: "s5",
    text: 'The Lazarus Codex—an ancient grimoire recovered from Dungeon #AS-137 by the legendary S-rank hunter team "Chimera"—contains 1,247 pages of text written in 17 different languages (including 3 previously unknown to modern linguistics); the most disturbing aspect, according to Dr. Fatima al-Zahawi of the Thaumaturgical Artifacts Division, is that carbon dating indicates the manuscript predates human civilization by approximately 27,000 years, yet contains detailed anatomical diagrams of human neural pathways alongside mathematical formulas that align perfectly with cutting-edge quantum field theory.',
    rank: "s",
  },
  {
    id: "s6",
    text: 'The 2023 International Ergonomics Symposium in Copenhagen featured the unveiling of the "Æther-X" keyboard—designed by Norwegian biomechanics specialist Dr. Bjørn Østergaard—which incorporates a revolutionary 3D-printed exoskeletal support system that reduces typing-related muscle activation by 78.3% compared to traditional keyboards; the device\'s most controversial feature is its "neural feedback loop" that utilizes mild (0.5-2.7mA) transcutaneous electrical nerve stimulation (TENS) to reinforce optimal finger positioning and movement patterns, which critics have likened to "Pavlovian conditioning for typists."',
    rank: "s",
  },
  {
    id: "s7",
    text: 'The cataclysmic event designated "Convergence Omega" by the Hunter Association began at precisely 15:42 local time when all 27 known S-rank dungeons worldwide simultaneously emitted a distinctive resonance pattern measuring 7.83Hz—identical to Earth\'s Schumann resonance; within 17 minutes, unprecedented thaumaturgical phenomena were reported on all 7 continents, including gravitational anomalies in Buenos Aires (objects floating upward at 1/3 normal gravity), spontaneous transmutation of inorganic materials in Cairo (glass transforming into unidentified crystalline structures), and temporal distortions in Osaka (localized areas experiencing time at 0.37x normal flow).',
    rank: "s",
  },
  {
    id: "s8",
    text: 'The controversial "Quantum Finger-Mapping" technique—pioneered by former concert pianist turned typing coach Maestro Vittorio Castellani—challenges conventional touch-typing methodology by incorporating principles from Chopin\'s "Revolutionary Étude" (Op. 10, No. 12) to optimize finger trajectory and reduce travel distance by an estimated 42.7%; proponents claim sustained speeds of 150+ WPM with error rates below 0.5%, while critics argue that the technique\'s steep learning curve (estimated at 300+ hours to proficiency) and high risk of developing tendinitis during the adaptation phase (affecting 28.3% of practitioners according to a 2022 study) outweigh its potential benefits for all but the most dedicated typists.',
    rank: "s",
  },
  {
    id: "s9",
    text: 'The Hunter Association\'s Thaumaturgical Research Division (TRD) published their analysis of the "Crimson Equinox" event—when Dungeon #EU-073 (designation: "Muspelheim") experienced a catastrophic containment failure resulting in a 47-second "reality bleed" affecting a 3.8km radius; the report details how S-rank hunter Aleksandra Volkov single-handedly prevented a potential XK-class end-of-reality scenario by channeling 97.4% of her life force into a modified Schwarzschild barrier, containing the breach at the cost of reducing her own remaining lifespan to approximately 13 months according to medical thaumaturges at the Association\'s Helsinki facility.',
    rank: "s",
  },
  {
    id: "s10",
    text: "The definitive meta-analysis of typing methodologies published in the Journal of Human-Computer Interaction (Vol. 43, Issue 7) synthesized data from 178 studies conducted between 1987-2023, encompassing 24,731 participants across diverse demographics; the researchers identified 17 distinct factors that significantly influence typing proficiency (p<0.001), with the most surprising finding being that practitioners of certain musical instruments (particularly pipe organ, harp, and marimba) demonstrated 22-31% faster adaptation to novel keyboard layouts compared to non-musicians, which the authors attribute to enhanced inter-hemispheric communication and superior proprioceptive mapping capabilities.",
    rank: "s",
  },
]

// Combine all texts
export const allTypingTexts: TypingText[] = [
  ...eRankTexts,
  ...dRankTexts,
  ...cRankTexts,
  ...bRankTexts,
  ...aRankTexts,
  ...sRankTexts,
]

// Get texts by rank
export const getTextsByRank = (rank: string): TypingText[] => {
  return allTypingTexts.filter((text) => text.rank === rank)
}

// Get random text by rank
export const getRandomTextByRank = (rank: string): TypingText => {
  const textsForRank = getTextsByRank(rank)
  const randomIndex = Math.floor(Math.random() * textsForRank.length)
  return textsForRank[randomIndex]
}

// Get multiple random texts by rank
export const getMultipleRandomTextsByRank = (rank: string, count: number): TypingText[] => {
  const textsForRank = getTextsByRank(rank)
  const result: TypingText[] = []

  // If we need more texts than available, we'll need to repeat some
  if (count > textsForRank.length) {
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * textsForRank.length)
      result.push(textsForRank[randomIndex])
    }
  } else {
    // Otherwise, get unique random texts
    const shuffled = [...textsForRank].sort(() => 0.5 - Math.random())
    result.push(...shuffled.slice(0, count))
  }

  return result
}

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

