'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy, BarChart2, Clock, Target } from 'lucide-react';

interface TestResultsProps {
  wpm: number;
  accuracy: number;
  duration: number;
  rank: string;
  charactersTyped: number;
  onRetry: () => void;
  onNewTest: () => void;
}

export default function TestResults({
  wpm,
  accuracy,
  duration,
  rank,
  charactersTyped,
  onRetry,
  onNewTest,
}: TestResultsProps) {
  // Calculate performance score (weighted combination of WPM and accuracy)
  const performanceScore = Math.round(wpm * 0.6 + accuracy * 0.4);

  // Get rank display name
  const getRankName = (rankId: string) => {
    switch (rankId) {
      case 's':
        return 'S-Rank';
      case 'a':
        return 'A-Rank';
      case 'b':
        return 'B-Rank';
      case 'c':
        return 'C-Rank';
      case 'd':
        return 'D-Rank';
      case 'e':
        return 'E-Rank';
      case 'custom':
        return 'Custom';
      default:
        return 'Unknown Rank';
    }
  };

  // Get performance rating based on WPM and accuracy
  const getPerformanceRating = () => {
    if (wpm >= 80 && accuracy >= 95) return 'S-Rank Hunter';
    if (wpm >= 70 && accuracy >= 92) return 'A-Rank Hunter';
    if (wpm >= 60 && accuracy >= 90) return 'B-Rank Hunter';
    if (wpm >= 50 && accuracy >= 85) return 'C-Rank Hunter';
    if (wpm >= 40 && accuracy >= 80) return 'D-Rank Hunter';
    return 'E-Rank Hunter';
  };

  return (
    <Card className="border-solo-purple/20 bg-solo-darkgray/80 p-6">
      <div className="mb-8 text-center">
        <h2 className="solo-font glow-text mb-2 text-3xl font-bold">
          Test Complete!
        </h2>
        <p className="text-gray-300">
          You've completed a{' '}
          {duration === 0.5 ? '30-second' : `${duration}-minute`} typing test at{' '}
          {getRankName(rank)} difficulty.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center rounded-md bg-solo-black/50 p-4">
          <BarChart2 className="mb-2 h-8 w-8 text-solo-purple-light" />
          <div className="text-sm text-gray-300">Words Per Minute</div>
          <div className="font-mono text-3xl">{wpm}</div>
        </div>

        <div className="flex flex-col items-center rounded-md bg-solo-black/50 p-4">
          <Target className="mb-2 h-8 w-8 text-solo-purple-light" />
          <div className="text-sm text-gray-300">Accuracy</div>
          <div className="font-mono text-3xl">{accuracy}%</div>
        </div>

        <div className="flex flex-col items-center rounded-md bg-solo-black/50 p-4">
          <Clock className="mb-2 h-8 w-8 text-solo-purple-light" />
          <div className="text-sm text-gray-300">Duration</div>
          <div className="font-mono text-3xl">{duration} min</div>
        </div>

        <div className="flex flex-col items-center rounded-md bg-solo-black/50 p-4">
          <Trophy className="mb-2 h-8 w-8 text-solo-purple-light" />
          <div className="text-sm text-gray-300">Characters Typed</div>
          <div className="font-mono text-3xl">{charactersTyped}</div>
        </div>
      </div>

      <div className="mb-8 rounded-md bg-solo-black/50 p-6 text-center">
        <div className="mb-2 text-sm text-gray-300">
          Your Performance Rating
        </div>
        <div className="solo-font glow-text mb-4 text-4xl font-bold">
          {getPerformanceRating()}
        </div>
        <div className="text-sm text-gray-300">
          Performance Score: {performanceScore}
        </div>
      </div>

      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Button
          onClick={onRetry}
          className="bg-solo-purple text-white hover:bg-solo-purple-dark"
        >
          Retry Same Test
        </Button>
        <Button
          onClick={onNewTest}
          variant="outline"
          className="border-solo-purple-light text-solo-purple-light hover:bg-solo-purple hover:text-white"
        >
          Try Different Test
        </Button>
      </div>
    </Card>
  );
}
