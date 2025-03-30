"use client"

import type React from "react"

import { useState, useEffect, useRef, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ArrowLeft, Clock, Send, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import TestResults from "@/components/test-results"
import DynamicKeyboard from "@/components/dynamic-keyboard"
// Add this import at the top
import { useTypingSpeed } from "@/context/typing-speed-context"

// Test durations in minutes
const testDurations = [1, 2, 3, 5, 10, 15]

export default function CustomTypingTest() {
  const [customText, setCustomText] = useState("")
  const [selectedDuration, setSelectedDuration] = useState(1)
  const [isTestActive, setIsTestActive] = useState(false)
  const [isTestReady, setIsTestReady] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [activeKeys, setActiveKeys] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [testCompleted, setTestCompleted] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState<"slow" | "fast">("slow")

  // Text management
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

  // Add this inside the component
  const { setTypingSpeed: setGlobalTypingSpeed } = useTypingSpeed()

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
            setGlobalTypingSpeed("fast")
          } else {
            setTypingSpeed("slow")
            setGlobalTypingSpeed("slow")
          }

          // Store last WPM update time
          lastWpmUpdateRef.current = Date.now()
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

  // Prepare test
  const prepareTest = () => {
    if (customText.trim().length < 10) {
      alert("Please enter at least 10 characters of text to practice with.")
      return
    }

    setCurrentText(customText.trim())
    setTotalCharacters(customText.trim().length)
    setIsTestReady(true)
  }

  // Start test
  const startTest = () => {
    // Reset stats
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
    setGlobalTypingSpeed("slow")

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

  // Reset test
  const resetTest = () => {
    setIsTestReady(false)
    setIsTestActive(false)
    setTestCompleted(false)
    setCustomText("")
    setCurrentText("")
    setTypedText("")
    setWpm(0)
    setAccuracy(100)
    setProgress(0)
    setCompletedCharacters(0)
    correctCharsRef.current = 0
    totalCharsRef.current = 0
    totalWordsTypedRef.current = 0
    setTypingSpeed("slow")
    setGlobalTypingSpeed("slow")

    if (timerRef.current) {
      clearInterval(timerRef.current)
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

    correctCharsRef.current = correct
    totalCharsRef.current = typed.length

    // Update WPM more frequently for responsive color changes
    const now = Date.now()
    if (now - lastWpmUpdateRef.current > 500) {
      // Update every 500ms
      const elapsedMinutes = (now - startTimeRef.current) / 60000
      if (elapsedMinutes > 0) {
        // Estimate words typed based on characters (1 word ≈ 5 characters)
        const wordsTyped = typed.length / 5
        const currentWpm = Math.round(wordsTyped / elapsedMinutes)
        setWpm(currentWpm)

        // Update typing speed category for dynamic effects
        if (currentWpm >= 35) {
          setTypingSpeed("fast")
          setGlobalTypingSpeed("fast")
        } else {
          setTypingSpeed("slow")
          setGlobalTypingSpeed("slow")
        }

        lastWpmUpdateRef.current = now
      }
    }

    // Check if test is completed
    if (typed.length >= currentText.length) {
      // Count words typed (approximation: words are separated by spaces)
      const wordsInCurrentText = currentText.split(/\s+/).length
      totalWordsTypedRef.current = wordsInCurrentText

      // End test after a short delay
      setTimeout(() => {
        endTest()
      }, 300)
    }

    // Update progress
    const progressPercent = (typed.length / currentText.length) * 100
    setProgress(Math.min(progressPercent, 100))
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

  const handleRetry = () => {
    setTestCompleted(false)
    startTest()
  }

  const handleNewTest = () => {
    setIsTestReady(false)
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
        <h1 className="solo-font text-3xl font-bold glow-text">Custom Typing Test</h1>
      </div>

      {!isTestReady ? (
        // Text input form
        <Card className="p-6 mb-8 bg-solo-darkgray/80 border-solo-purple/20">
          <h2 className="text-xl font-semibold mb-4">Enter Your Custom Text</h2>
          <p className="text-gray-300 mb-6">
            Paste or type the text you want to practice with. The test will begin once you click "Prepare Test".
          </p>

          <Textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Enter your custom text here... (minimum 10 characters)"
            className="min-h-[200px] mb-6 bg-solo-black/50 border-solo-purple/30 focus:border-solo-purple-light"
          />

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Test Duration</h3>
            <div className="flex flex-wrap gap-2">
              {testDurations.map((duration) => (
                <Button
                  key={duration}
                  variant={selectedDuration === duration ? "default" : "outline"}
                  className={selectedDuration === duration ? "bg-solo-purple hover:bg-solo-purple-dark" : ""}
                  onClick={() => setSelectedDuration(duration)}
                >
                  {duration} min
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={prepareTest} className="bg-solo-purple hover:bg-solo-purple-dark text-white">
            <Send className="mr-2 h-4 w-4" />
            Prepare Test
          </Button>
        </Card>
      ) : testCompleted ? (
        // Test results
        <TestResults
          wpm={wpm}
          accuracy={accuracy}
          duration={selectedDuration}
          rank="custom"
          charactersTyped={totalCharsRef.current}
          onRetry={handleRetry}
          onNewTest={handleNewTest}
        />
      ) : (
        // Test area
        <Card
          className={`p-6 mb-8 bg-solo-darkgray/80 border-solo-purple/20 transition-all duration-500 ${
            typingSpeed === "fast" ? "shadow-[0_0_30px_rgba(59,130,246,0.3)]" : "shadow-[0_0_30px_rgba(139,92,246,0.3)]"
          }`}
        >
          {!isTestActive ? (
            <div className="flex flex-col items-center justify-center py-12">
              <h2 className="text-2xl font-bold mb-6">Ready to test your typing skills?</h2>
              <p className="text-gray-300 mb-8 text-center max-w-2xl">
                You've selected a {selectedDuration}-minute test with your custom text. Click the button below when
                you're ready to start.
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-solo-purple hover:bg-solo-purple-dark text-white px-8 py-6 text-lg"
                  onClick={startTest}
                >
                  Start Test
                </Button>
                <Button
                  variant="outline"
                  onClick={resetTest}
                  className="border-solo-purple-light text-solo-purple-light hover:bg-solo-purple hover:text-white px-8 py-6 text-lg"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
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
    </div>
  )
}

