'use client';

import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { TestResultRecord } from '@/services/test-results';

interface TestHistoryStatsProps {
  results: TestResultRecord[];
}

/**
 * Component to visualize test history statistics with charts
 */
export default function TestHistoryStats({ results }: TestHistoryStatsProps) {
  // Skip if no results
  if (!results.length) {
    return null;
  }

  // Calculate overall stats
  const stats = useMemo(() => {
    // Sort results by date (newest first for display)
    const sortedResults = [...results].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Calculate personal bests
    const bestWpm = Math.max(...results.map((r) => r.wpm));
    const bestAccuracy = Math.max(...results.map((r) => r.accuracy));
    const bestWords = Math.max(...results.map((r) => r.wordsTyped));

    // Calculate averages
    const avgWpm = results.reduce((sum, r) => sum + r.wpm, 0) / results.length;
    const avgAccuracy =
      results.reduce((sum, r) => sum + r.accuracy, 0) / results.length;

    // Format data for time series chart (recent 15 tests, chronological order)
    const timeSeriesData = sortedResults
      .slice(0, 15)
      .reverse()
      .map((result) => ({
        date: format(new Date(result.timestamp), 'MMM d'),
        wpm: Math.round(result.wpm),
        accuracy: Math.round(result.accuracy),
        rank: result.rank.toUpperCase(),
        duration: result.testDuration,
      }));

    // Group data by rank for comparison
    const rankData = Object.entries(
      results.reduce(
        (grouped, result) => {
          const rank = result.rank;
          if (!grouped[rank]) {
            grouped[rank] = { tests: 0, totalWpm: 0, totalAccuracy: 0 };
          }
          grouped[rank].tests++;
          grouped[rank].totalWpm += result.wpm;
          grouped[rank].totalAccuracy += result.accuracy;
          return grouped;
        },
        {} as Record<
          string,
          { tests: number; totalWpm: number; totalAccuracy: number }
        >
      )
    )
      .map(([rank, data]) => ({
        rank: rank.toUpperCase(),
        avgWpm: Math.round(data.totalWpm / data.tests),
        avgAccuracy: Math.round(data.totalAccuracy / data.tests),
        tests: data.tests,
      }))
      .sort((a, b) => {
        // Sort ranks from S to E
        const rankOrder = { S: 0, A: 1, B: 2, C: 3, D: 4, E: 5 };
        return (
          rankOrder[a.rank as keyof typeof rankOrder] -
          rankOrder[b.rank as keyof typeof rankOrder]
        );
      });

    // Group data by duration for comparison
    const durationData = Object.entries(
      results.reduce(
        (grouped, result) => {
          const duration = result.testDuration.toString();
          if (!grouped[duration]) {
            grouped[duration] = { tests: 0, totalWpm: 0, totalAccuracy: 0 };
          }
          grouped[duration].tests++;
          grouped[duration].totalWpm += result.wpm;
          grouped[duration].totalAccuracy += result.accuracy;
          return grouped;
        },
        {} as Record<
          string,
          { tests: number; totalWpm: number; totalAccuracy: number }
        >
      )
    )
      .map(([duration, data]) => ({
        duration: duration === '0.5' ? '30s' : `${duration}m`,
        avgWpm: Math.round(data.totalWpm / data.tests),
        avgAccuracy: Math.round(data.totalAccuracy / data.tests),
        tests: data.tests,
      }))
      .sort((a, b) => {
        // Convert duration to seconds for sorting
        const getDurationInSeconds = (dur: string) => {
          if (dur === '30s') return 30;
          return parseInt(dur) * 60;
        };
        return (
          getDurationInSeconds(a.duration) - getDurationInSeconds(b.duration)
        );
      });

    return {
      bestWpm,
      bestAccuracy,
      bestWords,
      avgWpm,
      avgAccuracy,
      recentTests: sortedResults.slice(0, 5),
      timeSeriesData,
      rankData,
      durationData,
    };
  }, [results]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Performance Statistics</h2>

      {/* Personal bests cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-solo-purple">
              {Math.round(stats.bestWpm)}
            </CardTitle>
            <CardDescription>Best WPM</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-solo-purple">
              {Math.round(stats.bestAccuracy)}%
            </CardTitle>
            <CardDescription>Best Accuracy</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-solo-purple">
              {stats.bestWords}
            </CardTitle>
            <CardDescription>Most Words Typed</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Trend charts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Performance Trends</CardTitle>
          <CardDescription>Your last 15 tests</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="wpm">
            <TabsList className="mb-4">
              <TabsTrigger value="wpm">WPM</TabsTrigger>
              <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
            </TabsList>

            <TabsContent value="wpm" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={stats.timeSeriesData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                  <Tooltip
                    formatter={(value, name) => [
                      `${value} ${name === 'wpm' ? 'WPM' : '%'}`,
                      name === 'wpm' ? 'Words Per Minute' : 'Accuracy',
                    ]}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="wpm"
                    name="WPM"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="accuracy" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={stats.timeSeriesData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    domain={[
                      Math.max(
                        70,
                        Math.min(
                          ...stats.timeSeriesData.map((d) => d.accuracy)
                        ) - 5
                      ),
                      100,
                    ]}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      `${value} ${name === 'wpm' ? 'WPM' : '%'}`,
                      name === 'wpm' ? 'Words Per Minute' : 'Accuracy',
                    ]}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    name="Accuracy"
                    stroke="#82ca9d"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Comparisons */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Rank comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Performance by Rank</CardTitle>
            <CardDescription>
              Average WPM across difficulty levels
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.rankData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rank" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    `${value} ${name === 'avgWpm' ? 'WPM' : '%'}`,
                    name === 'avgWpm'
                      ? 'Avg. Words Per Minute'
                      : 'Avg. Accuracy',
                  ]}
                  labelFormatter={(label) => `${label} Rank`}
                />
                <Legend />
                <Bar dataKey="avgWpm" name="Avg. WPM" fill="#8884d8" />
                <Bar dataKey="tests" name="Tests" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Duration comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Performance by Duration</CardTitle>
            <CardDescription>Average WPM across test durations</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.durationData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="duration" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    `${value} ${name === 'avgWpm' ? 'WPM' : '%'}`,
                    name === 'avgWpm'
                      ? 'Avg. Words Per Minute'
                      : 'Avg. Accuracy',
                  ]}
                  labelFormatter={(label) => `Duration: ${label}`}
                />
                <Legend />
                <Bar dataKey="avgWpm" name="Avg. WPM" fill="#8884d8" />
                <Bar dataKey="tests" name="Tests" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
