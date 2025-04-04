export interface User {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  createdAt: string;
  lastLogin: string;
  stats: {
    gamesPlayed: number;
    achievementsUnlocked: number;
    totalPlaytime: number; // in minutes
    averageScore: number;
  };
  achievements?: Achievement[];
  recentActivity?: Activity[];
  settings?: {
    notifications: {
      email: boolean;
      push: boolean;
      achievements: boolean;
      leaderboard: boolean;
    };
    privacy: {
      profileVisibility: "public" | "friends" | "private";
      showOnlineStatus: boolean;
      showGameActivity: boolean;
    };
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon?: "trophy" | "star" | "target" | "zap" | "crown";
  unlocked: boolean;
  unlockedAt?: string;
  gameId?: string;
  points: number;
}

export interface Activity {
  id: string;
  type: "achievement" | "game" | "leaderboard";
  title: string;
  description: string;
  timestamp: string;
  gameId?: string;
  achievementId?: string;
} 