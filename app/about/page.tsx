'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const [isLogoAnimating, setIsLogoAnimating] = useState(false);

  // Toggle logo animation on hover
  const handleLogoHover = () => {
    setIsLogoAnimating(true);
  };

  const handleLogoLeave = () => {
    setIsLogoAnimating(false);
  };

  return (
    <div className="container px-4 py-12 md:py-16">
      <div className="mb-8 flex items-center">
        <Button asChild variant="ghost" className="mr-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="solo-font glow-text text-3xl font-bold md:text-4xl">
          About SoloType
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-8 md:col-span-2">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-solo-purple/20 bg-solo-darkgray/80 p-6">
              <h2 className="mb-4 text-2xl font-bold text-solo-purple-light">
                The Project
              </h2>
              <p className="mb-4 leading-relaxed text-gray-300">
                Welcome to the Solo Leveling Typing Test! Inspired by the
                legendary manhwa, this site challenges your typing speed like a
                true hunter leveling up. Choose your dungeon rank and start your
                quest!
              </p>
              <p className="leading-relaxed text-gray-300">
                Our typing test adapts to your skill level, offering different
                difficulty ranks from E to S. Just like hunters in Solo
                Leveling, you'll face increasingly difficult challenges as you
                rank up. Track your progress, improve your speed and accuracy,
                and become an S-rank typist!
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-solo-purple/20 bg-solo-darkgray/80 p-6">
              <h2 className="mb-4 text-2xl font-bold text-solo-purple-light">
                Disclaimer
              </h2>
              <p className="leading-relaxed text-gray-300">
                This website is a fan-made project inspired by Solo Leveling. We
                are <strong>not affiliated with the official series</strong> or
                its creators. This is purely a tribute to the amazing world of
                hunters and dungeons!
              </p>
              <p className="mt-4 leading-relaxed text-gray-300">
                Solo Leveling (나 혼자만 레벨업) is a South Korean web novel
                written by Chugong. It was adapted into a webtoon illustrated by
                DUBU (REDICE Studio) and serialized in KakaoPage. The series has
                gained immense popularity worldwide for its unique storyline and
                stunning artwork.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-solo-purple/20 bg-solo-darkgray/80 p-6">
              <h2 className="mb-4 text-2xl font-bold text-solo-purple-light">
                Special Thanks
              </h2>
              <p className="mb-6 leading-relaxed text-gray-300">
                We would like to express our gratitude to Chugong, DUBU, and
                everyone involved in creating the incredible world of Solo
                Leveling. Their creativity and storytelling have inspired
                millions of fans around the world, including us.
              </p>

              <div className="flex justify-center">
                <Button
                  asChild
                  className="group relative overflow-hidden bg-solo-purple text-white hover:bg-solo-purple-dark"
                >
                  <a
                    href="https://www.crunchyroll.com/series/G79H23VD0/solo-leveling"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-6 py-3"
                  >
                    <Heart className="mr-2 h-5 w-5 transition-colors group-hover:text-red-400" />
                    <span>
                      Thanks to the Creators – Watch Solo Leveling on
                      Crunchyroll
                    </span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                    <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100"></span>
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
            <Card className="border-solo-purple/20 bg-solo-darkgray/80 p-6">
              <h2 className="mb-4 text-xl font-bold text-solo-purple-light">
                Features
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 text-solo-purple-light">•</span>
                  <span>Multiple difficulty levels (E to S Rank)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-solo-purple-light">•</span>
                  <span>Unlimited typing tests with dynamic content</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-solo-purple-light">•</span>
                  <span>Real-time WPM and accuracy tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-solo-purple-light">•</span>
                  <span>Solo Leveling-inspired UI and animations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-solo-purple-light">•</span>
                  <span>Performance rating system</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-solo-purple-light">•</span>
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
            <Card className="border-solo-purple/20 bg-solo-darkgray/80 p-6">
              <h2 className="mb-4 text-xl font-bold text-solo-purple-light">
                How It Works
              </h2>
              <p className="mb-4 leading-relaxed text-gray-300">
                Our typing test adapts to your selected dungeon rank:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="dungeon-rank e-rank mr-2 flex h-6 w-6 items-center justify-center">
                    E
                  </span>
                  <span>Simple words and short sentences</span>
                </li>
                <li className="flex items-center">
                  <span className="dungeon-rank d-rank mr-2 flex h-6 w-6 items-center justify-center">
                    D
                  </span>
                  <span>Basic sentence structures</span>
                </li>
                <li className="flex items-center">
                  <span className="dungeon-rank c-rank mr-2 flex h-6 w-6 items-center justify-center">
                    C
                  </span>
                  <span>Medium-length sentences with punctuation</span>
                </li>
                <li className="flex items-center">
                  <span className="dungeon-rank b-rank mr-2 flex h-6 w-6 items-center justify-center">
                    B
                  </span>
                  <span>Complex sentences with semicolons</span>
                </li>
                <li className="flex items-center">
                  <span className="dungeon-rank a-rank mr-2 flex h-6 w-6 items-center justify-center">
                    A
                  </span>
                  <span>Advanced vocabulary and long sentences</span>
                </li>
                <li className="flex items-center">
                  <span className="dungeon-rank s-rank mr-2 flex h-6 w-6 items-center justify-center">
                    S
                  </span>
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
          className="relative h-32 w-32 cursor-pointer"
          onMouseEnter={handleLogoHover}
          onMouseLeave={handleLogoLeave}
        >
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${isLogoAnimating ? 'scale-110' : 'scale-100'}`}
          >
            <div className="solo-font glow-text text-4xl font-bold text-solo-purple-light">
              ST
            </div>
          </div>
          <div
            className={`absolute inset-0 rounded-full border-2 border-solo-purple-light transition-all duration-700 ${isLogoAnimating ? 'scale-100 opacity-0' : 'scale-90 opacity-50'}`}
          ></div>
          <div
            className={`absolute inset-0 rounded-full border border-solo-purple/50 transition-all duration-1000 ${isLogoAnimating ? 'scale-150 opacity-0' : 'scale-100 opacity-30'}`}
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
                transition={{
                  duration: 1.2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.3,
                }}
              ></motion.div>
            </>
          )}
        </div>
      </motion.div>

      {/* Footer Note */}
      <div className="mt-8 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} SoloType. All rights reserved.</p>
        <p className="mt-1">
          Solo Leveling is a trademark of D&C Media Co., Ltd. This is a fan
          project and is not affiliated with the official Solo Leveling
          franchise.
        </p>
      </div>
    </div>
  );
}
