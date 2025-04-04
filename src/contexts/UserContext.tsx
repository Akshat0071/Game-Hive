import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { leaderboardService } from "@/services/leaderboardService";
import { Reward, PlayerStats } from "@/types/leaderboard";

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
  stats: {
    gamesPlayed: number;
    totalPlaytime: number;
    achievements: number;
    level: number;
    experience: number;
  };
  recentGames: {
    id: string;
    title: string;
    lastPlayed: string;
    playtime: number;
    highScore: number;
  }[];
  achievements: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: string;
  }[];
  rewards: Reward[];
  leaderboardStats: PlayerStats | null;
}

// User context interface
interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateGameProgress: (gameId: string, score: number) => Promise<void>;
  unlockAchievement: (achievementId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user data for development
const MOCK_USER: User = {
  id: "user1",
  name: "GameMaster",
  email: "gamer@example.com",
  avatar: "/placeholder.svg",
  isLoggedIn: true,
  stats: {
    gamesPlayed: 15,
    totalPlaytime: 120, // in minutes
    achievements: 8,
    level: 5,
    experience: 750
  },
  recentGames: [
    {
      id: "tetris",
      title: "Tetris Classic",
      lastPlayed: "2025-04-03",
      playtime: 45,
      highScore: 99875
    },
    {
      id: "snake",
      title: "Snake.io",
      lastPlayed: "2025-04-02",
      playtime: 30,
      highScore: 95642
    }
  ],
  achievements: [
    {
      id: "ach1",
      title: "First Victory",
      description: "Win your first game",
      icon: "🏆",
      unlockedAt: "2025-03-15"
    },
    {
      id: "ach2",
      title: "Puzzle Master",
      description: "Score 100,000 points in any puzzle game",
      icon: "🧩",
      unlockedAt: "2025-03-20"
    }
  ],
  rewards: [],
  leaderboardStats: null
};

// User provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load user data from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          
          // Load leaderboard stats
          const stats = await leaderboardService.getPlayerStats(parsedUser.id);
          setUser(prev => prev ? { ...prev, leaderboardStats: stats } : null);
          
          // Load rewards
          const rewards = await leaderboardService.getRewards();
          setUser(prev => prev ? { ...prev, rewards } : null);
        }
      } catch (err) {
        console.error("Error loading user data:", err);
        setError("Failed to load user data");
      }
    };
    
    loadUser();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // For demo purposes, we'll just use the mock user
      const loggedInUser = { ...MOCK_USER };
      
      // Load leaderboard stats
      const stats = await leaderboardService.getPlayerStats(loggedInUser.id);
      loggedInUser.leaderboardStats = stats;
      
      // Load rewards
      const rewards = await leaderboardService.getRewards();
      loggedInUser.rewards = rewards;
      
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      
      // Update state
      setUser(loggedInUser);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to log in");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // For demo purposes, we'll just create a new user with the provided name
      const newUser: User = {
        ...MOCK_USER,
        id: `user-${Date.now()}`,
        name,
        email,
        stats: {
          ...MOCK_USER.stats,
          gamesPlayed: 0,
          totalPlaytime: 0,
          achievements: 0,
          level: 1,
          experience: 0
        },
        recentGames: [],
        achievements: [],
        rewards: [],
        leaderboardStats: null
      };
      
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(newUser));
      
      // Update state
      setUser(newUser);
      toast.success("Account created successfully");
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Failed to register");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update game progress
  const updateGameProgress = async (gameId: string, score: number) => {
    if (!user) return;
    
    try {
      // Submit score to leaderboard
      await leaderboardService.submitScore(user.id, gameId, score);
      
      // Check for new rewards
      const newRewards = await leaderboardService.checkRewards(user.id);
      
      // Update user's recent games
      const updatedRecentGames = [...user.recentGames];
      const gameIndex = updatedRecentGames.findIndex(game => game.id === gameId);
      
      if (gameIndex >= 0) {
        // Update existing game
        updatedRecentGames[gameIndex] = {
          ...updatedRecentGames[gameIndex],
          lastPlayed: new Date().toISOString().split('T')[0],
          highScore: Math.max(updatedRecentGames[gameIndex].highScore, score)
        };
      } else {
        // Add new game
        updatedRecentGames.unshift({
          id: gameId,
          title: "Game Title", // This would come from game data
          lastPlayed: new Date().toISOString().split('T')[0],
          playtime: 0, // This would be tracked during gameplay
          highScore: score
        });
      }
      
      // Keep only the 5 most recent games
      const trimmedRecentGames = updatedRecentGames.slice(0, 5);
      
      // Update user stats
      const updatedUser = {
        ...user,
        stats: {
          ...user.stats,
          gamesPlayed: user.stats.gamesPlayed + 1,
          totalPlaytime: user.stats.totalPlaytime + 10 // Assuming 10 minutes per game
        },
        recentGames: trimmedRecentGames,
        rewards: [...user.rewards, ...newRewards]
      };
      
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
    } catch (err) {
      console.error("Error updating game progress:", err);
      setError("Failed to update game progress");
    }
  };

  // Unlock achievement
  const unlockAchievement = async (achievementId: string) => {
    if (!user) return;
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      // Check if achievement is already unlocked
      const achievementExists = user.achievements.some(a => a.id === achievementId);
      if (achievementExists) return;
      
      // For demo purposes, we'll just add a mock achievement
      const newAchievement = {
        id: achievementId,
        title: "New Achievement",
        description: "You've unlocked a new achievement!",
        icon: "🌟",
        unlockedAt: new Date().toISOString()
      };
      
      // Update user
      const updatedUser = {
        ...user,
        achievements: [...user.achievements, newAchievement],
        stats: {
          ...user.stats,
          achievements: user.stats.achievements + 1
        }
      };
      
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
    } catch (err) {
      console.error("Error unlocking achievement:", err);
      setError("Failed to unlock achievement");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateGameProgress,
        unlockAchievement,
        isLoading,
        error
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the user context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
} 