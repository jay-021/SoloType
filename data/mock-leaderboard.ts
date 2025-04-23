export interface LeaderboardEntry {
  id: string;
  rank: 's' | 'a' | 'b' | 'c' | 'd' | 'e';
  username: string;
  wpm: number;
  accuracy: number;
  testType: string;
  testDuration: number;
  dateCompleted: string;
  position?: number;
}

// Generate mock leaderboard data
export const mockLeaderboardData: LeaderboardEntry[] = [
  {
    id: '1',
    rank: 's',
    username: 'Shadow_Monarch',
    wpm: 142,
    accuracy: 99.2,
    testType: 'S-Rank',
    testDuration: 5,
    dateCompleted: '2023-11-15',
  },
  {
    id: '2',
    rank: 's',
    username: 'BeruTheFast',
    wpm: 138,
    accuracy: 98.7,
    testType: 'S-Rank',
    testDuration: 5,
    dateCompleted: '2023-11-16',
  },
  {
    id: '3',
    rank: 's',
    username: 'IgrisTypeMaster',
    wpm: 135,
    accuracy: 97.9,
    testType: 'S-Rank',
    testDuration: 5,
    dateCompleted: '2023-11-14',
  },
  {
    id: '4',
    rank: 'a',
    username: 'ChaHaeInSpeedster',
    wpm: 128,
    accuracy: 96.5,
    testType: 'A-Rank',
    testDuration: 3,
    dateCompleted: '2023-11-17',
  },
  {
    id: '5',
    rank: 'a',
    username: 'BlazingFingers',
    wpm: 125,
    accuracy: 95.8,
    testType: 'A-Rank',
    testDuration: 5,
    dateCompleted: '2023-11-13',
  },
  {
    id: '6',
    rank: 'a',
    username: 'WPM_Warrior',
    wpm: 120,
    accuracy: 94.7,
    testType: 'S-Rank',
    testDuration: 3,
    dateCompleted: '2023-11-12',
  },
  {
    id: '7',
    rank: 'b',
    username: 'GoGunheeElite',
    wpm: 115,
    accuracy: 93.2,
    testType: 'B-Rank',
    testDuration: 5,
    dateCompleted: '2023-11-11',
  },
  {
    id: '8',
    rank: 'b',
    username: 'TankTopTyper',
    wpm: 110,
    accuracy: 92.8,
    testType: 'B-Rank',
    testDuration: 3,
    dateCompleted: '2023-11-10',
  },
  {
    id: '9',
    rank: 'b',
    username: 'KeyboardKnight',
    wpm: 105,
    accuracy: 91.5,
    testType: 'A-Rank',
    testDuration: 5,
    dateCompleted: '2023-11-09',
  },
  {
    id: '10',
    rank: 'c',
    username: 'HungryJinho',
    wpm: 95,
    accuracy: 90.2,
    testType: 'C-Rank',
    testDuration: 3,
    dateCompleted: '2023-11-08',
  },
  {
    id: '11',
    rank: 'c',
    username: 'CasualTyper123',
    wpm: 90,
    accuracy: 89.7,
    testType: 'C-Rank',
    testDuration: 5,
    dateCompleted: '2023-11-07',
  },
  {
    id: '12',
    rank: 'c',
    username: 'SpeedyFingers',
    wpm: 85,
    accuracy: 88.5,
    testType: 'B-Rank',
    testDuration: 3,
    dateCompleted: '2023-11-06',
  },
  {
    id: '13',
    rank: 'd',
    username: 'NoviceHunter',
    wpm: 75,
    accuracy: 87.3,
    testType: 'D-Rank',
    testDuration: 2,
    dateCompleted: '2023-11-05',
  },
  {
    id: '14',
    rank: 'd',
    username: 'KeyboardApprentice',
    wpm: 70,
    accuracy: 86.8,
    testType: 'D-Rank',
    testDuration: 3,
    dateCompleted: '2023-11-04',
  },
  {
    id: '15',
    rank: 'e',
    username: 'BeginnerTypist',
    wpm: 60,
    accuracy: 85.1,
    testType: 'E-Rank',
    testDuration: 2,
    dateCompleted: '2023-11-03',
  },
  {
    id: '16',
    rank: 'e',
    username: 'SlowButSteady',
    wpm: 55,
    accuracy: 84.5,
    testType: 'E-Rank',
    testDuration: 1,
    dateCompleted: '2023-11-02',
  },
  {
    id: '17',
    rank: 's',
    username: 'TypeLordSupreme',
    wpm: 132,
    accuracy: 97.1,
    testType: 'S-Rank',
    testDuration: 5,
    dateCompleted: '2023-11-01',
  },
  {
    id: '18',
    rank: 'a',
    username: 'RankUpHunter',
    wpm: 118,
    accuracy: 94.2,
    testType: 'A-Rank',
    testDuration: 3,
    dateCompleted: '2023-10-31',
  },
  {
    id: '19',
    rank: 'b',
    username: 'DungeonClearer',
    wpm: 102,
    accuracy: 91.0,
    testType: 'B-Rank',
    testDuration: 3,
    dateCompleted: '2023-10-30',
  },
  {
    id: '20',
    rank: 'c',
    username: 'GateKeeper',
    wpm: 82,
    accuracy: 88.0,
    testType: 'C-Rank',
    testDuration: 2,
    dateCompleted: '2023-10-29',
  },
];

// Helper function to get ranked and sorted leaderboard data
export function getLeaderboardData(
  timeFilter: 'all' | 'week' | 'month' = 'all',
  rankFilter: 'all' | 's' | 'a' | 'b' | 'c' | 'd' | 'e' = 'all'
): LeaderboardEntry[] {
  // Apply time filter
  let filteredData = [...mockLeaderboardData];

  if (timeFilter !== 'all') {
    const now = new Date();
    const cutoffDate = new Date();

    if (timeFilter === 'week') {
      cutoffDate.setDate(now.getDate() - 7);
    } else if (timeFilter === 'month') {
      cutoffDate.setMonth(now.getMonth() - 1);
    }

    filteredData = filteredData.filter((entry) => {
      const entryDate = new Date(entry.dateCompleted);
      return entryDate >= cutoffDate;
    });
  }

  // Apply rank filter
  if (rankFilter !== 'all') {
    filteredData = filteredData.filter((entry) => entry.rank === rankFilter);
  }

  // Sort by WPM (primary) and accuracy (secondary)
  filteredData.sort((a, b) => {
    if (b.wpm !== a.wpm) {
      return b.wpm - a.wpm;
    }
    return b.accuracy - a.accuracy;
  });

  // Add position property
  return filteredData.map((entry, index) => ({
    ...entry,
    position: index + 1,
  }));
}

// Get rank display name
export function getRankDisplayName(rank: string): string {
  switch (rank) {
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
    default:
      return 'Unknown';
  }
}
