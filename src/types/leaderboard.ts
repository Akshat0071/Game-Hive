// Leaderboard Types

// Player score entry
export interface LeaderboardEntry {
  id: string;
  playerId: string;
  playerName: string;
  playerAvatar: string;
  gameId: string;
  gameName: string;
  score: number;
  date: string;
  rank: number;
  change: number;
  category: string;
  timeRange: 'all' | 'today' | 'week' | 'month' | 'year';
}

// Historical data for a player
export interface PlayerHistory {
  playerId: string;
  gameId: string;
  scores: {
    score: number;
    date: string;
    rank: number;
  }[];
  bestScore: number;
  averageScore: number;
  totalGames: number;
  improvementRate: number; // Percentage improvement over time
}

// Category-based leaderboard
export interface CategoryLeaderboard {
  category: string;
  entries: LeaderboardEntry[];
  totalPlayers: number;
  averageScore: number;
}

// Rewards system
export interface Reward {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'badge' | 'title' | 'theme' | 'feature';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirements: {
    type: 'rank' | 'score' | 'achievement' | 'time';
    value: number;
    gameId?: string;
    category?: string;
  };
  unlocked: boolean;
  unlockedDate?: string;
}

// Season data
export interface Season {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  active: boolean;
  rewards: Reward[];
  leaderboards: {
    global: LeaderboardEntry[];
    categories: CategoryLeaderboard[];
  };
}

// Player stats
export interface PlayerStats {
  playerId: string;
  totalScore: number;
  averageScore: number;
  gamesPlayed: number;
  topRank: number;
  topGame: string;
  topCategory: string;
  rankHistory: {
    date: string;
    rank: number;
    game: string;
  }[];
  rewards: Reward[];
  seasons: {
    seasonId: string;
    rank: number;
    score: number;
    rewards: Reward[];
  }[];
} 