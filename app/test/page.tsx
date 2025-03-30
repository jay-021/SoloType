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
const testDurations = [1, 2, 3, 5, 10, 15]

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

        // Calculate total characters for progress tracking
        const total = texts.reduce((sum, text) => sum + text.text.length, 0)
        setTotalCharacters(total)
      } catch (error) {
        console.error("Error loading texts:", error)
        // Fallback to empty array, we'll handle this later
        setTestTexts([])
      }
    }
  }, [selectedRank, selectedDuration, isTestActive])

  // Set current text when test starts or when moving to next text
  useEffect(() => {
    if (testTexts.length > 0 && currentTextIndex < testTexts.length) {
      setCurrentText(testTexts[currentTextIndex].text)
    } else if (isTestActive && testTexts.length === 0) {
      // Fallback if no texts are available
      setCurrentText("Error loading text. Please try again.")
    }
  }, [testTexts, currentTextIndex, isTestActive])

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
            // Update global context
            setGlobalTypingSpeed("fast")
          } else {
            setTypingSpeed("slow")
            // Update global context
            setGlobalTypingSpeed("slow")
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
      // Reset global typing speed when test ends
      setGlobalTypingSpeed("slow")
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

    // Focus input
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // End test
  const endTest = () => {
    setIsTestActive(false)
    setTestCompleted(true)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  // Move to next text
  const moveToNextText = () => {
    // Add completed text length to the completed characters count
    setCompletedCharacters((prev) => prev + currentText.length)

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

  // Handle typing
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTestActive) return

    const typed = e.target.value
    setTypedText(typed)

    // Calculate correct characters
    let correct = 0
    for (let i = 0; i < typed.length; i++) {
      if (i < currentText.length && typed[i] === currentText[i]) {
        correct++
      }
    }

    correctCharsRef.current = completedCharacters + correct
    totalCharsRef.current = completedCharacters + typed.length

    // Update WPM more frequently for responsive color changes
    const now = Date.now()
    if (now - lastWpmUpdateRef.current > 500) {
      // Update every 500ms
      const elapsedMinutes = (now - startTimeRef.current) / 60000
      if (elapsedMinutes > 0) {
        const wordsTyped = totalWordsTypedRef.current + typed.length / 5 // Approximate
        const currentWpm = Math.round(wordsTyped / elapsedMinutes)
        setWpm(currentWpm)

        // Update typing speed category for dynamic effects
        if (currentWpm >= 35) {
          setTypingSpeed("fast")
        } else {
          setTypingSpeed("slow")
        }

        lastWpmUpdateRef.current = now
      }
    }

    // Check if current text is completed
    if (typed === currentText) {
      // Count words typed (approximation: words are separated by spaces)
      const wordsInCurrentText = currentText.split(/\s+/).length
      totalWordsTypedRef.current += wordsInCurrentText

      // Move to next text after a short delay
      setTimeout(() => {
        moveToNextText()
      }, 300)
    }
  }

  // Handle key press for keyboard visualization
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.key.toLowerCase()
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

  // Render text with highlighting
  const renderText = () => {
    return currentText.split("").map((char, index) => {
      let className = ""
      if (index < typedText.length) {
        className = typedText[index] === char ? "correct" : "incorrect"
      } else if (index === typedText.length) {
        className = "current"
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      )
    })
  }

  // Get background effect based on rank
  const getRankEffect = () => {
    if (typingSpeed === "fast") {
      return "shadow-[0_0_30px_rgba(59,130,246,0.3)]"
    }

    switch (selectedRank) {
      case "s":
        return "shadow-[0_0_30px_rgba(245,158,11,0.2)]"
      case "a":
        return "shadow-[0_0_30px_rgba(236,72,153,0.2)]"
      case "b":
        return "shadow-[0_0_30px_rgba(139,92,246,0.2)]"
      case "c":
        return "shadow-[0_0_30px_rgba(59,130,246,0.2)]"
      case "d":
        return "shadow-[0_0_30px_rgba(16,185,129,0.2)]"
      default:
        return "shadow-[0_0_30px_rgba(107,114,128,0.2)]"
    }
  }

  const handleRetry = () => {
    setTestCompleted(false)
    startTest()
  }

  const handleNewTest = () => {
    setTestCompleted(false)
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
                  {duration} min
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
                You've selected a {selectedDuration}-minute test at{" "}
                {dungeonRanks.find((r) => r.id === selectedRank)?.label}-Rank difficulty. Click the button below when
                you're ready to start.
              </p>
              <Button
                size="lg"
                className="bg-solo-purple hover:bg-solo-purple-dark text-white px-8 py-6 text-lg"
                onClick={startTest}
              >
                Start Test
              </Button>
            </div>
          ) : (
            <div>
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

              <div
                className={`p-4 rounded-md mb-4 transition-colors duration-500 ${
                  typingSpeed === "fast" ? "bg-blue-950/50 border border-blue-500/30" : "bg-solo-black/50"
                }`}
              >
                <p className="typing-text">{renderText()}</p>
              </div>

              <input
                ref={inputRef}
                type="text"
                className="sr-only"
                value={typedText}
                onChange={handleTyping}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                autoFocus
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

