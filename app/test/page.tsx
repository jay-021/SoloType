"use client"

import type React from "react"

import { useState, useEffect, useRef, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Clock, Trophy, BarChart } from "lucide-react"
import { getTextsForTest, type TypingText } from "@/data/typing-texts"
import { Progress } from "@/components/ui/progress"
import TestResults from "@/components/test-results"
import DynamicKeyboard from "@/components/dynamic-keyboard"
import { useTypingSpeed } from "@/context/typing-speed-context"

// Dungeon ranks
const dungeonRanks = [
  { id: "e", label: "E", className: "dungeon-rank e-rank" },
  { id: "d", label: "D", className: "dungeon-rank d-rank" },
  { id: "c", label: "C", className: "dungeon-rank c-rank" },
  { id: "b", label: "B", className: "dungeon-rank b-rank" },
  { id: "a", label: "A", className: "dungeon-rank a-rank" },
  { id: "s", label: "S", className: "dungeon-rank s-rank" },
]

// Test durations in minutes
const testDurations = [0.5, 1, 2, 3, 5, 10, 15]

export default function TypingTest() {
  const [selectedDuration, setSelectedDuration] = useState(1)
  const [selectedRank, setSelectedRank] = useState("e")
  const [isTestActive, setIsTestActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [activeKeys, setActiveKeys] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [testCompleted, setTestCompleted] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState<"slow" | "fast">("slow")

  // Text management
  const [testTexts, setTestTexts] = useState<TypingText[]>([])
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [typedText, setTypedText] = useState("")
  const [completedCharacters, setCompletedCharacters] = useState(0)
  const [totalCharacters, setTotalCharacters] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)
  const correctCharsRef = useRef<number>(0)
  const totalCharsRef = useRef<number>(0)
  const totalWordsTypedRef = useRef<number>(0)
  const lastWpmUpdateRef = useRef<number>(0)

  const { setTypingSpeed: setGlobalTypingSpeed } = useTypingSpeed()

  // Load texts when rank or duration changes
  useEffect(() => {
    if (!isTestActive) {
      try {
        const texts = getTextsForTest(selectedRank, selectedDuration)
        setTestTexts(texts)
        // Set initial text
        if (texts.length > 0) {
          const firstText = texts[0].text
          setCurrentText(firstText)
          // Calculate total characters for progress tracking
          const total = texts.reduce((sum, text) => sum + text.text.length, 0)
          setTotalCharacters(total)
        }
      } catch (error) {
        console.error("Error loading texts:", error)
        setTestTexts([])
      }
    }
  }, [selectedRank, selectedDuration, isTestActive])

  // Handle typing
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTestActive) return

    const typed = e.target.value
    setTypedText(typed)

    // Calculate correct characters and update stats
    const chars = typed.split("")
    let correctCount = 0
    chars.forEach((char, index) => {
      if (currentText[index] === char) {
        correctCount++
      }
    })

    // Update character counts
    correctCharsRef.current = correctCount
    totalCharsRef.current = typed.length

    // Update WPM
    const now = Date.now()
    if (now - lastWpmUpdateRef.current > 500) {
      const elapsedMinutes = (now - startTimeRef.current) / 60000
      if (elapsedMinutes > 0) {
        const currentWpm = Math.round((totalCharsRef.current / 5) / elapsedMinutes)
        setWpm(currentWpm)

        // Update typing speed category
        if (currentWpm >= 35) {
          setTypingSpeed("fast")
        } else {
          setTypingSpeed("slow")
        }

        lastWpmUpdateRef.current = now
      }
    }

    // Calculate accuracy
    if (totalCharsRef.current > 0) {
      setAccuracy(Math.round((correctCharsRef.current / totalCharsRef.current) * 100))
    }

    // Update progress
    const progressPercent = (typed.length / currentText.length) * 100
    setProgress(Math.min(progressPercent, 100))

    // Check if current text is completed
    if (typed.length >= currentText.length) {
      // Add completed text length to the completed characters count
      setCompletedCharacters((prev) => prev + currentText.length)

      // Move to next text
      const nextIndex = currentTextIndex + 1
      if (nextIndex < testTexts.length) {
        const nextText = testTexts[nextIndex].text
        setCurrentTextIndex(nextIndex)
        setCurrentText(nextText)
      } else {
        // Load new texts
        try {
          const newTexts = getTextsForTest(selectedRank, selectedDuration)
          setTestTexts((prev) => [...prev, ...newTexts])
          const nextText = newTexts[0].text
          setCurrentTextIndex(0)
          setCurrentText(nextText)
          
          // Update total characters
          const additionalChars = newTexts.reduce((sum, text) => sum + text.text.length, 0)
          setTotalCharacters((prev) => prev + additionalChars)
        } catch (error) {
          console.error("Error loading new texts:", error)
          endTest()
          return
        }
      }
      
      // Reset typed text and refocus input
      setTypedText("")
      if (inputRef.current) {
        inputRef.current.value = ""
        inputRef.current.focus()
      }

      // Reset progress for new text
      setProgress(0)
    }
  }

  // Handle timer
  useEffect(() => {
    if (isTestActive) {
      setTimeLeft(selectedDuration * 60)
      startTimeRef.current = Date.now()

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endTest()
            return 0
          }
          return prev - 1
        })

        // Calculate WPM
        const elapsedMinutes = (Date.now() - startTimeRef.current) / 60000
        if (elapsedMinutes > 0) {
          const currentWpm = Math.round(totalWordsTypedRef.current / elapsedMinutes)
          setWpm(currentWpm)

          // Update typing speed category for dynamic effects
          if (currentWpm >= 35) {
            setTypingSpeed("fast")
          } else {
            setTypingSpeed("slow")
          }
        }

        // Calculate accuracy
        if (totalCharsRef.current > 0) {
          setAccuracy(Math.round((correctCharsRef.current / totalCharsRef.current) * 100))
        }

        // Update progress
        const progressPercent = (completedCharacters / totalCharacters) * 100
        setProgress(Math.min(progressPercent, 100))
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isTestActive, selectedDuration, completedCharacters, totalCharacters, setGlobalTypingSpeed])

  // Start test
  const startTest = () => {
    // Reset stats
    setCurrentTextIndex(0)
    setTypedText("")
    setWpm(0)
    setAccuracy(100)
    setProgress(0)
    setCompletedCharacters(0)
    correctCharsRef.current = 0
    totalCharsRef.current = 0
    totalWordsTypedRef.current = 0
    setTestCompleted(false)
    setTypingSpeed("slow")

    setIsTestActive(true)

    // Focus input and prevent default browser behavior
    if (inputRef.current) {
      inputRef.current.focus()
      // Prevent any default browser behavior
      inputRef.current.blur()
      inputRef.current.focus()
    }
  }

  // Add effect for updating global typing speed
  useEffect(() => {
    setGlobalTypingSpeed(typingSpeed)
  }, [typingSpeed, setGlobalTypingSpeed])

  // End test
  const endTest = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    // Calculate final WPM
    const elapsedMinutes = (Date.now() - startTimeRef.current) / 60000
    if (elapsedMinutes > 0) {
      // Calculate WPM based on total characters typed (1 word = 5 characters)
      const totalCharactersTyped = totalCharsRef.current
      const finalWpm = Math.round((totalCharactersTyped / 5) / elapsedMinutes)
      setWpm(finalWpm)
    }

    setIsTestActive(false)
    setTestCompleted(true)
    setTypedText("")
    setActiveKeys([])
    setProgress(0)
    setCurrentTextIndex(0)
    setTypingSpeed("slow")
  }

  // Add effect for resetting global typing speed when test ends
  useEffect(() => {
    if (!isTestActive) {
      setGlobalTypingSpeed("slow")
    }
  }, [isTestActive, setGlobalTypingSpeed])

  // Move to next text
  const moveToNextText = () => {
    // Add completed text length to the completed characters count
    setCompletedCharacters((prev) => prev + currentText.length)

    // Count words in the completed text
    const wordsInCurrentText = currentText.split(/\s+/).filter(word => word.length > 0).length
    totalWordsTypedRef.current += wordsInCurrentText

    // Move to next text
    setCurrentTextIndex((prev) => prev + 1)
    setTypedText("")

    // If we've reached the end of our texts, get more
    if (currentTextIndex >= testTexts.length - 1) {
      try {
        const newTexts = getTextsForTest(selectedRank, 5) // Get more texts
        setTestTexts((prev) => [...prev, ...newTexts])

        // Update total characters
        const additionalChars = newTexts.reduce((sum, text) => sum + text.text.length, 0)
        setTotalCharacters((prev) => prev + additionalChars)
      } catch (error) {
        console.error("Error loading additional texts:", error)
      }
    }
  }

  // Handle key press for keyboard visualization
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.key.toLowerCase()
    
    // Start test on Enter key if not active
    if (key === 'enter' && !isTestActive) {
      e.preventDefault()
      startTest()
      return
    }

    if (!activeKeys.includes(key)) {
      setActiveKeys([...activeKeys, key])
    }
  }

  // Handle key release
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.key.toLowerCase()
    setActiveKeys(activeKeys.filter((k) => k !== key))
  }

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Format duration
  const formatDuration = (duration: number) => {
    if (duration === 0.5) return "30s"
    return `${duration}m`
  }

  // Render text with highlighting
  const renderText = () => {
    if (!currentText) return null

    return (
      <div className="whitespace-pre-wrap break-words">
        {currentText.split("").map((char, index) => {
          let className = "text-gray-400" // default untyped color

          if (index < typedText.length) {
            // For typed characters
            className = typedText[index] === char ? "text-green-500" : "text-red-500"
          } else if (index === typedText.length) {
            // Current character to type
            className = "text-solo-purple-light underline"
          }

          return (
            <span 
              key={index} 
              className={className}
              style={{ 
                fontFamily: 'monospace',
                fontSize: '1.1rem',
                letterSpacing: '0.05rem'
              }}
            >
              {char}
            </span>
          )
        })}
      </div>
    )
  }

  // Get background effect based on rank
  const getRankEffect = () => {
    switch (selectedRank) {
      case "s":
        return "s-rank-glow"
      case "a":
        return "a-rank-glow"
      case "b":
        return "b-rank-glow"
      case "c":
        return "c-rank-glow"
      case "d":
        return "d-rank-glow"
      case "e":
        return "e-rank-glow"
      default:
        return ""
    }
  }

  const handleRetry = () => {
    setTestCompleted(false)
    setWpm(0)
    setAccuracy(100)
    setCompletedCharacters(0)
    setTypedText("")
    setActiveKeys([])
    setProgress(0)
    setCurrentTextIndex(0)
    setTimeLeft(selectedDuration * 60)
    setTypingSpeed("slow")
  }

  const handleNewTest = () => {
    setTestCompleted(false)
    setWpm(0)
    setAccuracy(100)
    setCompletedCharacters(0)
    setTypedText("")
    setActiveKeys([])
    setProgress(0)
    setCurrentTextIndex(0)
    setTimeLeft(selectedDuration * 60)
    setTypingSpeed("slow")
  }

  return (
    <div
      className={`container px-4 py-8 md:py-12 transition-colors duration-1000 ${
        typingSpeed === "fast" ? "hunter-mode" : "shadow-mode"
      }`}
    >
      <div className="flex items-center mb-8">
        <Button asChild variant="ghost" className="mr-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="solo-font text-3xl font-bold glow-text">Typing Test</h1>
      </div>

      {/* Test settings */}
      <Card className="p-6 mb-8 bg-solo-darkgray/80 border-solo-purple/20">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Clock className="mr-2 h-5 w-5 text-solo-purple-light" />
              Test Duration
            </h2>
            <div className="flex flex-wrap gap-2">
              {testDurations.map((duration) => (
                <Button
                  key={duration}
                  variant={selectedDuration === duration ? "default" : "outline"}
                  className={selectedDuration === duration ? "bg-solo-purple hover:bg-solo-purple-dark" : ""}
                  onClick={() => setSelectedDuration(duration)}
                  disabled={isTestActive}
                >
                  {formatDuration(duration)}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-solo-purple-light" />
              Dungeon Rank
            </h2>
            <div className="flex gap-4">
              {dungeonRanks.map((rank) => (
                <button
                  key={rank.id}
                  className={`${rank.className} ${selectedRank === rank.id ? "selected" : ""}`}
                  onClick={() => setSelectedRank(rank.id)}
                  disabled={isTestActive}
                >
                  {rank.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Test area */}
      {testCompleted ? (
        <TestResults
          wpm={wpm}
          accuracy={accuracy}
          duration={selectedDuration}
          rank={selectedRank}
          charactersTyped={totalCharsRef.current}
          onRetry={handleRetry}
          onNewTest={handleNewTest}
        />
      ) : (
        <Card
          className={`p-6 mb-8 bg-solo-darkgray/80 border-solo-purple/20 transition-all duration-500 ${getRankEffect()}`}
        >
          {!isTestActive ? (
            <div className="flex flex-col items-center justify-center py-12">
              <h2 className="text-2xl font-bold mb-6">Ready to test your typing skills?</h2>
              <p className="text-gray-300 mb-8 text-center max-w-2xl">
                You've selected a {formatDuration(selectedDuration)} test at{" "}
                {dungeonRanks.find((r) => r.id === selectedRank)?.label}-Rank difficulty.
              </p>
              <div className="flex flex-col items-center gap-4">
                <p className="text-solo-purple-light text-lg font-semibold animate-pulse">
                  Press Enter to start the test
                </p>
                <p className="text-gray-400 text-sm">or</p>
                <Button
                  size="lg"
                  className="bg-solo-purple hover:bg-solo-purple-dark text-white px-8 py-6 text-lg"
                  onClick={startTest}
                >
                  Click to Start Test
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="flex justify-between mb-4">
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-solo-purple-light" />
                  <span className="text-xl font-mono">{formatTime(timeLeft)}</span>
                </div>
                <div className="flex gap-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-300">WPM</div>
                    <div
                      className={`text-xl font-mono ${
                        typingSpeed === "fast" ? "text-blue-400" : "text-solo-purple-light"
                      }`}
                    >
                      {wpm}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-300">Accuracy</div>
                    <div className="text-xl font-mono">{accuracy}%</div>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-300">Progress</span>
                  <span className="text-sm text-gray-300">{Math.round(progress)}%</span>
                </div>
                <Progress
                  value={progress}
                  className="h-2"
                  indicatorClassName={typingSpeed === "fast" ? "bg-blue-500" : "bg-solo-purple"}
                />
              </div>

              <div className="flex-1 relative">
                {/* Text container with proper wrapping */}
                <div className="max-w-[800px] mx-auto p-4">
                  <div 
                    className="typing-text-container relative bg-solo-black/30 rounded-lg p-6"
                    style={{ 
                      minHeight: "150px",
                      maxHeight: "200px",
                      overflowY: "auto",
                      overflowX: "hidden",
                      lineHeight: "2",
                      fontFamily: "monospace",
                      fontSize: "1.1rem",
                      letterSpacing: "0.05rem"
                    }}
                  >
                    {renderText()}
                  </div>
                </div>
              </div>

              <input
                ref={inputRef}
                type="text"
                className="absolute inset-0 w-full h-full opacity-0 cursor-text"
                value={typedText}
                onChange={handleTyping}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                autoFocus
                spellCheck="false"
                autoComplete="off"
                tabIndex={0}
              />

              <DynamicKeyboard activeKeys={activeKeys} typingSpeed={typingSpeed} />
            </div>
          )}
        </Card>
      )}

      {/* Stats visualization - only show during active test */}
      {isTestActive && (
        <Card
          className={`p-6 bg-solo-darkgray/80 border-solo-purple/20 transition-colors duration-500 ${
            typingSpeed === "fast" ? "border-blue-500/30" : "border-solo-purple/20"
          }`}
        >
          <h2
            className={`text-xl font-semibold mb-4 flex items-center ${
              typingSpeed === "fast" ? "text-blue-400" : "text-solo-purple-light"
            }`}
          >
            <BarChart className="mr-2 h-5 w-5" />
            Live Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`p-4 rounded-md transition-colors duration-500 ${
                typingSpeed === "fast" ? "bg-blue-950/50" : "bg-solo-black/50"
              }`}
            >
              <div className="text-sm text-gray-300 mb-1">Words Per Minute</div>
              <div
                className={`text-3xl font-mono ${typingSpeed === "fast" ? "text-blue-400" : "text-solo-purple-light"}`}
              >
                {wpm}
              </div>
            </div>
            <div
              className={`p-4 rounded-md transition-colors duration-500 ${
                typingSpeed === "fast" ? "bg-blue-950/50" : "bg-solo-black/50"
              }`}
            >
              <div className="text-sm text-gray-300 mb-1">Accuracy</div>
              <div className="text-3xl font-mono">{accuracy}%</div>
            </div>
            <div
              className={`p-4 rounded-md transition-colors duration-500 ${
                typingSpeed === "fast" ? "bg-blue-950/50" : "bg-solo-black/50"
              }`}
            >
              <div className="text-sm text-gray-300 mb-1">Characters Typed</div>
              <div className="text-3xl font-mono">{totalCharsRef.current}</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

