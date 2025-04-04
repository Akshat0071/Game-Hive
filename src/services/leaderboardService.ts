import { 
  LeaderboardEntry, 
  PlayerHistory, 
  CategoryLeaderboard, 
  Reward, 
  Season, 
  PlayerStats 
} from "@/types/leaderboard";

// Mock data for development
const MOCK_LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    id: "1",
    playerId: "user1",
    playerName: "ProGamer123",
    playerAvatar: "/placeholder.svg",
    gameId: "tetris",
    gameName: "Tetris Classic",
    score: 99875,
    date: "2025-04-03",
    rank: 1,
    change: 0,
    category: "Puzzle",
    timeRange: "all"
  },
  {
    id: "2",
    playerId: "user2",
    playerName: "ShadowHunter",
    playerAvatar: "/placeholder.svg",
    gameId: "snake",
    gameName: "Snake.io",
    score: 95642,
    date: "2025-04-02",
    rank: 2,
    change: 1,
    category: "Arcade",
    timeRange: "all"
  },
  // Add more mock data as needed
];

const MOCK_REWARDS: Reward[] = [
  {
    id: "reward1",
    title: "Top 10 Player",
    description: "Reach the top 10 in any game leaderboard",
    icon: "🏆",
    type: "badge",
    rarity: "rare",
    requirements: {
      type: "rank",
      value: 10
    },
    unlocked: false
  },
  {
    id: "reward2",
    title: "Puzzle Master",
    description: "Score 100,000 points in any puzzle game",
    icon: "🧩",
    type: "title",
    rarity: "epic",
    requirements: {
      type: "score",
      value: 100000,
      category: "Puzzle"
    },
    unlocked: false
  },
  {
    id: "reward3",
    title: "Arcade Champion",
    description: "Win first place in any arcade game",
    icon: "👑",
    type: "badge",
    rarity: "legendary",
    requirements: {
      type: "rank",
      value: 1,
      category: "Arcade"
    },
    unlocked: false
  }
];

const MOCK_SEASON: Season = {
  id: "season1",
  name: "Spring Championship 2025",
  startDate: "2025-03-01",
  endDate: "2025-05-31",
  active: true,
  rewards: MOCK_REWARDS,
  leaderboards: {
    global: MOCK_LEADERBOARD_DATA,
    categories: [
      {
        category: "Puzzle",
        entries: MOCK_LEADERBOARD_DATA.filter(entry => entry.category === "Puzzle"),
        totalPlayers: 5,
        averageScore: 85000
      },
      {
        category: "Arcade",
        entries: MOCK_LEADERBOARD_DATA.filter(entry => entry.category === "Arcade"),
        totalPlayers: 5,
        averageScore: 82000
      }
    ]
  }
};

// Service functions
export const leaderboardService = {
  // Get leaderboard entries with filtering
  getLeaderboard: async (
    gameId?: string, 
    category?: string, 
    timeRange: 'all' | 'today' | 'week' | 'month' | 'year' = 'all'
  ): Promise<LeaderboardEntry[]> => {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    let filteredData = [...MOCK_LEADERBOARD_DATA];
    
    if (gameId) {
      filteredData = filteredData.filter(entry => entry.gameId === gameId);
    }
    
    if (category && category !== 'all') {
      filteredData = filteredData.filter(entry => entry.category === category);
    }
    
    if (timeRange !== 'all') {
      // Filter by time range (simplified for demo)
      const now = new Date();
      const ranges = {
        today: 1,
        week: 7,
        month: 30,
        year: 365
      };
      
      const daysAgo = ranges[timeRange];
      const cutoffDate = new Date(now.setDate(now.getDate() - daysAgo));
      
      filteredData = filteredData.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= cutoffDate;
      });
    }
    
    // Sort by score (descending)
    return filteredData.sort((a, b) => b.score - a.score);
  },
  
  // Get player history
  getPlayerHistory: async (playerId: string, gameId?: string): Promise<PlayerHistory> => {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    // Mock data for player history
    const mockHistory: PlayerHistory = {
      playerId,
      gameId: gameId || "all",
      scores: [
        { score: 85000, date: "2025-03-15", rank: 5 },
        { score: 92000, date: "2025-03-20", rank: 3 },
        { score: 95000, date: "2025-03-25", rank: 2 },
        { score: 99875, date: "2025-04-03", rank: 1 }
      ],
      bestScore: 99875,
      averageScore: 92968.75,
      totalGames: 4,
      improvementRate: 17.5 // Percentage improvement from first to last score
    };
    
    return mockHistory;
  },
  
  // Get category leaderboards
  getCategoryLeaderboards: async (): Promise<CategoryLeaderboard[]> => {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    return MOCK_SEASON.leaderboards.categories;
  },
  
  // Get available rewards
  getRewards: async (): Promise<Reward[]> => {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    return MOCK_REWARDS;
  },
  
  // Get current season
  getCurrentSeason: async (): Promise<Season> => {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    return MOCK_SEASON;
  },
  
  // Get player stats
  getPlayerStats: async (playerId: string): Promise<PlayerStats> => {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    // Mock data for player stats
    const mockStats: PlayerStats = {
      playerId,
      totalScore: 382500,
      averageScore: 95625,
      gamesPlayed: 4,
      topRank: 1,
      topGame: "Tetris Classic",
      topCategory: "Puzzle",
      rankHistory: [
        { date: "2025-03-15", rank: 5, game: "Tetris Classic" },
        { date: "2025-03-20", rank: 3, game: "Tetris Classic" },
        { date: "2025-03-25", rank: 2, game: "Tetris Classic" },
        { date: "2025-04-03", rank: 1, game: "Tetris Classic" }
      ],
      rewards: [MOCK_REWARDS[0]], // Player has unlocked the "Top 10 Player" reward
      seasons: [
        {
          seasonId: "season1",
          rank: 1,
          score: 99875,
          rewards: [MOCK_REWARDS[0]]
        }
      ]
    };
    
    return mockStats;
  },
  
  // Submit a new score
  submitScore: async (
    playerId: string, 
    gameId: string, 
    score: number
  ): Promise<LeaderboardEntry> => {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    // Create a new leaderboard entry
    const newEntry: LeaderboardEntry = {
      id: `new-${Date.now()}`,
      playerId,
      playerName: "Current User", // This would come from user context
      playerAvatar: "/placeholder.svg", // This would come from user context
      gameId,
      gameName: "Game Name", // This would come from game data
      score,
      date: new Date().toISOString().split('T')[0],
      rank: 0, // This would be calculated on the server
      change: 0, // This would be calculated on the server
      category: "Category", // This would come from game data
      timeRange: "all"
    };
    
    // In a real app, this would update the database
    console.log("Score submitted:", newEntry);
    
    return newEntry;
  },
  
  // Check and award rewards
  checkRewards: async (playerId: string): Promise<Reward[]> => {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    // This would check player stats against reward requirements
    // For demo purposes, we'll just return the first reward
    return [MOCK_REWARDS[0]];
  }
}; 