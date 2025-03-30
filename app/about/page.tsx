"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Heart } from "lucide-react"
import { motion } from "framer-motion"

export default function AboutPage() {
  const [isLogoAnimating, setIsLogoAnimating] = useState(false)

  // Toggle logo animation on hover
  const handleLogoHover = () => {
    setIsLogoAnimating(true)
  }

  const handleLogoLeave = () => {
    setIsLogoAnimating(false)
  }

  return (
    <div className="container px-4 py-12 md:py-16">
      <div className="flex items-center mb-8">
        <Button asChild variant="ghost" className="mr-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="solo-font text-3xl md:text-4xl font-bold glow-text">About SoloType</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Main Content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="p-6 bg-solo-darkgray/80 border-solo-purple/20">
              <h2 className="text-2xl font-bold mb-4 text-solo-purple-light">The Project</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Welcome to the Solo Leveling Typing Test! Inspired by the legendary manhwa, this site challenges your
                typing speed like a true hunter leveling up. Choose your dungeon rank and start your quest!
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our typing test adapts to your skill level, offering different difficulty ranks from E to S. Just like
                hunters in Solo Leveling, you'll face increasingly difficult challenges as you rank up. Track your
                progress, improve your speed and accuracy, and become an S-rank typist!
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 bg-solo-darkgray/80 border-solo-purple/20">
              <h2 className="text-2xl font-bold mb-4 text-solo-purple-light">Disclaimer</h2>
              <p className="text-gray-300 leading-relaxed">
                This website is a fan-made project inspired by Solo Leveling. We are{" "}
                <strong>not affiliated with the official series</strong> or its creators. This is purely a tribute to
                the amazing world of hunters and dungeons!
              </p>
              <p className="text-gray-300 mt-4 leading-relaxed">
                Solo Leveling (나 혼자만 레벨업) is a South Korean web novel written by Chugong. It was adapted into a
                webtoon illustrated by DUBU (REDICE Studio) and serialized in KakaoPage. The series has gained immense
                popularity worldwide for its unique storyline and stunning artwork.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6 bg-solo-darkgray/80 border-solo-purple/20">
              <h2 className="text-2xl font-bold mb-4 text-solo-purple-light">Special Thanks</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                We would like to express our gratitude to Chugong, DUBU, and everyone involved in creating the
                incredible world of Solo Leveling. Their creativity and storytelling have inspired millions of fans
                around the world, including us.
              </p>

              <div className="flex justify-center">
                <Button
                  asChild
                  className="bg-solo-purple hover:bg-solo-purple-dark text-white group relative overflow-hidden"
                >
                  <a
                    href="https://www.crunchyroll.com/series/G79H23VD0/solo-leveling"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-6 py-3"
                  >
                    <Heart className="mr-2 h-5 w-5 group-hover:text-red-400 transition-colors" />
                    <span>Thanks to the Creators – Watch Solo Leveling on Crunchyroll</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-6 bg-solo-darkgray/80 border-solo-purple/20">
              <h2 className="text-xl font-bold mb-4 text-solo-purple-light">Features</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-solo-purple-light mr-2">•</span>
                  <span>Multiple difficulty levels (E to S Rank)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-solo-purple-light mr-2">•</span>
                  <span>Unlimited typing tests with dynamic content</span>
                </li>
                <li className="flex items-start">
                  <span className="text-solo-purple-light mr-2">•</span>
                  <span>Real-time WPM and accuracy tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-solo-purple-light mr-2">•</span>
                  <span>Solo Leveling-inspired UI and animations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-solo-purple-light mr-2">•</span>
                  <span>Performance rating system</span>
                </li>
                <li className="flex items-start">
                  <span className="text-solo-purple-light mr-2">•</span>
                  <span>Virtual keyboard visualization</span>
                </li>
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="p-6 bg-solo-darkgray/80 border-solo-purple/20">
              <h2 className="text-xl font-bold mb-4 text-solo-purple-light">How It Works</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Our typing test adapts to your selected dungeon rank:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="dungeon-rank e-rank mr-2 w-6 h-6 flex items-center justify-center">E</span>
                  <span>Simple words and short sentences</span>
                </li>
                <li className="flex items-center">
                  <span className="dungeon-rank d-rank mr-2 w-6 h-6 flex items-center justify-center">D</span>
                  <span>Basic sentence structures</span>
                </li>
                <li className="flex items-center">
                  <span className="dungeon-rank c-rank mr-2 w-6 h-6 flex items-center justify-center">C</span>
                  <span>Medium-length sentences with punctuation</span>
                </li>
                <li className="flex items-center">
                  <span className="dungeon-rank b-rank mr-2 w-6 h-6 flex items-center justify-center">B</span>
                  <span>Complex sentences with semicolons</span>
                </li>
                <li className="flex items-center">
                  <span className="dungeon-rank a-rank mr-2 w-6 h-6 flex items-center justify-center">A</span>
                  <span>Advanced vocabulary and long sentences</span>
                </li>
                <li className="flex items-center">
                  <span className="dungeon-rank s-rank mr-2 w-6 h-6 flex items-center justify-center">S</span>
                  <span>Rare words, proper nouns, and special characters</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Animated Logo */}
      <motion.div
        className="mt-16 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <div
          className="relative w-32 h-32 cursor-pointer"
          onMouseEnter={handleLogoHover}
          onMouseLeave={handleLogoLeave}
        >
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${isLogoAnimating ? "scale-110" : "scale-100"}`}
          >
            <div className="solo-font text-4xl font-bold text-solo-purple-light glow-text">ST</div>
          </div>
          <div
            className={`absolute inset-0 rounded-full border-2 border-solo-purple-light transition-all duration-700 ${isLogoAnimating ? "scale-100 opacity-0" : "scale-90 opacity-50"}`}
          ></div>
          <div
            className={`absolute inset-0 rounded-full border border-solo-purple/50 transition-all duration-1000 ${isLogoAnimating ? "scale-150 opacity-0" : "scale-100 opacity-30"}`}
          ></div>
          {isLogoAnimating && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border border-solo-purple/30"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              ></motion.div>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-solo-purple-light/50"
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 1.3, opacity: 0 }}
                transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
              ></motion.div>
            </>
          )}
        </div>
      </motion.div>

      {/* Footer Note */}
      <div className="text-center mt-8 text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} SoloType. All rights reserved.</p>
        <p className="mt-1">
          Solo Leveling is a trademark of D&C Media Co., Ltd. This is a fan project and is not affiliated with the
          official Solo Leveling franchise.
        </p>
      </div>
    </div>
  )
}

