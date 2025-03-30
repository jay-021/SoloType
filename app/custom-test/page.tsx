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
const testDurations = [0.5, 1, 2, 3, 5, 10, 15]

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
          // Calculate WPM based on total characters typed (1 word = 5 characters)
          const totalCharactersTyped = totalCharsRef.current
          const currentWpm = Math.round((totalCharactersTyped / 5) / elapsedMinutes)
          setWpm(currentWpm)

          // Update typing speed category for dynamic effects
          if (currentWpm >= 35) {
            setTypingSpeed("fast")
          } else {
            setTypingSpeed("slow")
          }

          // Store last WPM update time
          lastWpmUpdateRef.current = Date.now()
        }

        // Calculate accuracy
        if (totalCharsRef.current > 0) {
          setAccuracy(Math.round((correctCharsRef.current / totalCharsRef.current) * 100))
        }

        // Update progress
        const progressPercent = (typed.length / currentText.length) * 100
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

    // Focus input and prevent default browser behavior
    if (inputRef.current) {
      inputRef.current.focus()
      // Prevent any default browser behavior
      inputRef.current.blur()
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

    // Check if user just typed a space (moved to next word)
    const justTypedSpace = typed.length > 0 && typed[typed.length - 1] === " "

    // Calculate correct characters for the current word only
    let correct = 0
    let lastSpaceIndex = typed.lastIndexOf(" ")
    let currentWordStart = lastSpaceIndex + 1
    let targetWordStart = currentText.lastIndexOf(" ", lastSpaceIndex) + 1

    // If we're at the start of the text
    if (lastSpaceIndex === -1) {
      currentWordStart = 0
      targetWordStart = 0
    }

    // Calculate accuracy for current word
    for (let i = currentWordStart; i < typed.length; i++) {
      const targetIndex = targetWordStart + (i - currentWordStart)
      if (targetIndex < currentText.length && typed[i] === currentText[targetIndex]) {
        correct++
      }
    }

    // Update the character counts
    if (justTypedSpace) {
      // When completing a word, add its stats to the total
      correctCharsRef.current += correct
      totalCharsRef.current += (typed.length - currentWordStart - 1) // -1 to exclude the space
    } else {
      // During word typing, combine completed words' stats with current word stats
      correctCharsRef.current = (currentWordStart > 0 ? correctCharsRef.current : 0) + correct
      totalCharsRef.current = (currentWordStart > 0 ? totalCharsRef.current : 0) + (typed.length - currentWordStart)
    }

    // Update WPM more frequently for responsive color changes
    const now = Date.now()
    if (now - lastWpmUpdateRef.current > 500) {
      const elapsedMinutes = (now - startTimeRef.current) / 60000
      if (elapsedMinutes > 0) {
        const currentWpm = Math.round((totalCharsRef.current / 5) / elapsedMinutes)
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

    // Calculate accuracy
    if (totalCharsRef.current > 0) {
      setAccuracy(Math.round((correctCharsRef.current / totalCharsRef.current) * 100))
    }

    // Check if test is completed
    if (typed.length >= currentText.length) {
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
    
    // Start test on Enter key if not active
    if (key === 'enter' && !isTestActive && isTestReady) {
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

  // Format duration for display
  const formatDuration = (duration: number) => {
    if (duration === 0.5) return "30s"
    return `${duration}m`
  }

  // Render text with highlighting
  const renderText = () => {
    if (!currentText) return null

    const words = currentText.split(" ")
    const typedWords = typedText.split(" ")

    return words.map((word, wordIndex) => {
      const isLastWord = wordIndex === words.length - 1
      const currentTypedWord = typedWords[wordIndex] || ""
      const isCurrentWord = wordIndex === typedWords.length - 1

      // Handle characters within the word
      const wordSpan = word.split("").map((char, charIndex) => {
        let className = "text-gray-400" // default untyped color

        if (wordIndex < typedWords.length - 1) {
          // For completed words
          const typedChar = typedWords[wordIndex][charIndex]
          className = typedChar === char ? "text-green-500" : "text-red-500"
        } else if (isCurrentWord) {
          // For current word
          if (charIndex < currentTypedWord.length) {
            // For typed characters in current word
            className = currentTypedWord[charIndex] === char ? "text-green-500" : "text-red-500"
          } else if (charIndex === currentTypedWord.length) {
            // Current character to type
            className = "text-solo-purple-light underline"
          }
        }

        return (
          <span 
            key={`${wordIndex}-${charIndex}`} 
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
      })

      // Add space between words
      return (
        <span key={`word-${wordIndex}`} className="word-container" style={{ whiteSpace: 'pre' }}>
          {wordSpan}
          {!isLastWord && (
            <span 
              className={
                wordIndex < typedWords.length - 1 
                  ? typedWords[wordIndex].length === word.length 
                    ? "text-green-500" 
                    : "text-red-500"
                  : "text-gray-400"
              }
              style={{ 
                fontFamily: 'monospace',
                fontSize: '1.1rem',
                letterSpacing: '0.05rem'
              }}
            >
              {" "}
            </span>
          )}
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

  // Add effect for updating global typing speed
  useEffect(() => {
    setGlobalTypingSpeed(typingSpeed)
  }, [typingSpeed, setGlobalTypingSpeed])

  // Add effect for resetting global typing speed when test ends
  useEffect(() => {
    if (!isTestActive) {
      setGlobalTypingSpeed("slow")
    }
  }, [isTestActive, setGlobalTypingSpeed])

  // Add effect to focus input when test becomes active
  useEffect(() => {
    if (isTestActive && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isTestActive])

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
                  {formatDuration(duration)}
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
                You've selected a {formatDuration(selectedDuration)} test with your custom text. Press Enter or click the button below to start.
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
    </div>
  )
}

