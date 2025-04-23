'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Target,
  Trophy,
  Award,
  Gift,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function GuidePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to SoloType',
      description:
        'Your journey to become an S-Rank typing hunter begins here. This guide will help you understand how the system works.',
      icon: <Trophy className="h-12 w-12 text-cyan-300" />,
      content: (
        <div className="space-y-4">
          <p>
            Congratulations on becoming a Player in the SoloType system! As a
            Player, you now have the ability to take on typing quests, earn
            experience, and level up your skills.
          </p>
          <p>
            The SoloType system is designed to help you improve your typing
            speed and accuracy through gamified challenges inspired by Solo
            Leveling.
          </p>
          <p>
            Follow this guide to learn how to navigate the system and make the
            most of your typing journey.
          </p>
        </div>
      ),
    },
    {
      title: 'Starting Quests',
      description:
        'Learn how to take on typing challenges and complete quests to earn experience.',
      icon: <Target className="h-12 w-12 text-cyan-300" />,
      content: (
        <div className="space-y-4">
          <h3 className="mb-2 text-xl font-bold text-cyan-300">
            How to Start a Quest
          </h3>
          <ol className="list-inside list-decimal space-y-2">
            <li>Navigate to the home page and click on "Start Your Quest"</li>
            <li>Select your preferred dungeon rank (difficulty level)</li>
            <li>Choose a test duration that fits your schedule</li>
            <li>Click "Start Test" to begin your typing challenge</li>
          </ol>

          <h3 className="mb-2 mt-6 text-xl font-bold text-cyan-300">
            Quest Types
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-md border border-cyan-900/50 bg-gray-800/50 p-4">
              <h4 className="mb-1 font-bold">Standard Quests</h4>
              <p className="text-sm">
                Timed typing tests with predefined texts based on your selected
                rank.
              </p>
            </div>
            <div className="rounded-md border border-cyan-900/50 bg-gray-800/50 p-4">
              <h4 className="mb-1 font-bold">Custom Quests</h4>
              <p className="text-sm">
                Create your own typing challenges with custom texts (coming
                soon).
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Leveling Up',
      description:
        'Understand how the leveling system works and how to advance through the ranks.',
      icon: <Award className="h-12 w-12 text-cyan-300" />,
      content: (
        <div className="space-y-4">
          <h3 className="mb-2 text-xl font-bold text-cyan-300">
            Experience Points (XP)
          </h3>
          <p>
            You earn XP based on your typing performance in quests. The factors
            that determine XP gain include:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>Words Per Minute (WPM) - Higher speed means more XP</li>
            <li>Accuracy - More accurate typing yields bonus XP</li>
            <li>Quest Difficulty - Higher rank quests provide more XP</li>
            <li>Quest Duration - Longer tests offer more XP opportunities</li>
          </ul>

          <h3 className="mb-2 mt-6 text-xl font-bold text-cyan-300">
            Ranking System
          </h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            <div className="rounded-md border border-gray-600/50 bg-gray-800/50 p-3">
              <div className="dungeon-rank e-rank mx-auto mb-2">E</div>
              <p className="text-center text-sm">Beginner</p>
            </div>
            <div className="rounded-md border border-gray-600/50 bg-gray-800/50 p-3">
              <div className="dungeon-rank d-rank mx-auto mb-2">D</div>
              <p className="text-center text-sm">Novice</p>
            </div>
            <div className="rounded-md border border-gray-600/50 bg-gray-800/50 p-3">
              <div className="dungeon-rank c-rank mx-auto mb-2">C</div>
              <p className="text-center text-sm">Intermediate</p>
            </div>
            <div className="rounded-md border border-gray-600/50 bg-gray-800/50 p-3">
              <div className="dungeon-rank b-rank mx-auto mb-2">B</div>
              <p className="text-center text-sm">Advanced</p>
            </div>
            <div className="rounded-md border border-gray-600/50 bg-gray-800/50 p-3">
              <div className="dungeon-rank a-rank mx-auto mb-2">A</div>
              <p className="text-center text-sm">Expert</p>
            </div>
            <div className="rounded-md border border-gray-600/50 bg-gray-800/50 p-3">
              <div className="dungeon-rank s-rank mx-auto mb-2">S</div>
              <p className="text-center text-sm">Master</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Rewards & Achievements',
      description:
        'Discover the rewards and achievements you can earn as you progress.',
      icon: <Gift className="h-12 w-12 text-cyan-300" />,
      content: (
        <div className="space-y-4">
          <h3 className="mb-2 text-xl font-bold text-cyan-300">
            Leaderboard Rankings
          </h3>
          <p>
            Top performers are featured on the global leaderboard. Compete with
            other hunters to claim your spot among the elite.
          </p>

          <h3 className="mb-2 mt-6 text-xl font-bold text-cyan-300">
            Achievements
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-md border border-cyan-900/50 bg-gray-800/50 p-4">
              <h4 className="mb-1 font-bold">Speed Demon</h4>
              <p className="text-sm">Achieve 100+ WPM on any test</p>
            </div>
            <div className="rounded-md border border-cyan-900/50 bg-gray-800/50 p-4">
              <h4 className="mb-1 font-bold">Perfectionist</h4>
              <p className="text-sm">Complete a test with 100% accuracy</p>
            </div>
            <div className="rounded-md border border-cyan-900/50 bg-gray-800/50 p-4">
              <h4 className="mb-1 font-bold">Dedicated Hunter</h4>
              <p className="text-sm">Complete 50 typing quests</p>
            </div>
            <div className="rounded-md border border-cyan-900/50 bg-gray-800/50 p-4">
              <h4 className="mb-1 font-bold">S-Rank Achiever</h4>
              <p className="text-sm">Reach S-Rank status</p>
            </div>
          </div>

          <p className="mt-4">
            More achievements and rewards will be added as the system evolves.
            Keep improving your skills to unlock all possibilities!
          </p>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="system-background"></div>

      <div className="container relative z-10 mx-auto flex flex-1 flex-col justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Button
            asChild
            variant="ghost"
            className="mb-6 text-cyan-300 hover:bg-transparent hover:text-cyan-100"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Skip Guide
            </Link>
          </Button>
          <h1 className="system-text mb-2 text-center text-3xl font-bold">
            HUNTER GUIDE
          </h1>
          <p className="mb-8 text-center text-gray-400">
            Learn how to navigate the SoloType system
          </p>
        </motion.div>

        <div className="mb-8 flex justify-center">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${index === currentStep ? 'bg-cyan-300' : 'bg-gray-600'}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="system-container mx-auto max-w-3xl"
        >
          <div className="system-border-top"></div>

          <div className="system-content p-6">
            <div className="mb-6 flex items-center">
              <div className="system-icon-container mr-4">
                {steps[currentStep].icon}
              </div>
              <div>
                <h2 className="system-text text-2xl font-bold">
                  {steps[currentStep].title}
                </h2>
                <p className="text-gray-400">
                  {steps[currentStep].description}
                </p>
              </div>
            </div>

            <Card className="border-gray-800 bg-gray-900/50 p-6">
              {steps[currentStep].content}
            </Card>

            <div className="mt-8 flex justify-between">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="outline"
                className="border-cyan-900 text-cyan-300 hover:bg-cyan-900/20"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <Button onClick={handleNext} className="system-button">
                {currentStep < steps.length - 1 ? (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  'Start Your Journey'
                )}
              </Button>
            </div>
          </div>

          <div className="system-border-bottom"></div>
        </motion.div>
      </div>
    </div>
  );
}
