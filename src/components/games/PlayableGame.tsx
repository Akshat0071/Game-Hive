import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ThumbsUp, 
  ThumbsDown, 
  Trophy, 
  Star, 
  Target, 
  Clock, 
  Award 
} from "lucide-react";

interface PlayableGameProps {
  gameUrl: string;
  gameId: string;
  gameName: string;
  gameCategory: string;
  gameDescription: string;
  gameControls: string[];
  gameAchievements: {
    id: string;
    title: string;
    description: string;
    icon: string;
    requirement: string;
  }[];
}

export default function PlayableGame({
  gameUrl,
  gameId,
  gameName,
  gameCategory,
  gameDescription,
  gameControls,
  gameAchievements
}: PlayableGameProps) {
  const { user, updateGameProgress, unlockAchievement } = useUser();
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [activeTab, setActiveTab] = useState("play");
  const [gameWindow, setGameWindow] = useState<Window | null>(null);

  // Start timer when game is playing
  useEffect(() => {
    if (isPlaying && !timer) {
      const newTimer = setInterval(() => {
        setGameTime(prev => prev + 1);
      }, 1000);
      setTimer(newTimer);
    } else if (!isPlaying && timer) {
      clearInterval(timer);
      setTimer(null);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isPlaying, timer]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle play game
  const handlePlayGame = () => {
    if (!user) {
      toast.error("Please sign in to play games");
      return;
    }

    // Open game in new window
    const newWindow = window.open(gameUrl, '_blank', 'width=800,height=600');
    setGameWindow(newWindow);
    setIsPlaying(true);
    
    // Track game start
    toast.success(`Playing ${gameName}`);
  };

  // Handle pause game
  const handlePauseGame = () => {
    if (gameWindow) {
      gameWindow.focus();
      setIsPlaying(false);
      toast.info("Game paused");
    }
  };

  // Handle reset game
  const handleResetGame = () => {
    if (gameWindow) {
      gameWindow.close();
      setGameWindow(null);
    }
    setIsPlaying(false);
    setGameScore(0);
    setGameTime(0);
    toast.info("Game reset");
  };

  // Handle game end
  const handleGameEnd = async (finalScore: number) => {
    if (!user) return;
    
    try {
      // Update game progress
      await updateGameProgress(gameId, finalScore);
      
      // Check for achievements
      if (finalScore >= 10000) {
        await unlockAchievement("high_score");
      }
      
      if (gameTime >= 300) { // 5 minutes
        await unlockAchievement("marathon");
      }
      
      toast.success(`Game completed! Score: ${finalScore}`);
    } catch (error) {
      console.error("Error updating game progress:", error);
      toast.error("Failed to save game progress");
    }
  };

  // Handle like game
  const handleLikeGame = () => {
    if (!user) {
      toast.error("Please sign in to like games");
      return;
    }
    
    setLiked(!liked);
    if (disliked) setDisliked(false);
    
    toast.success(liked ? "Removed like" : "Liked game");
  };

  // Handle dislike game
  const handleDislikeGame = () => {
    if (!user) {
      toast.error("Please sign in to dislike games");
      return;
    }
    
    setDisliked(!disliked);
    if (liked) setLiked(false);
    
    toast.success(disliked ? "Removed dislike" : "Disliked game");
  };

  // Simulate score update (in a real game, this would come from the game)
  useEffect(() => {
    if (isPlaying) {
      const scoreInterval = setInterval(() => {
        setGameScore(prev => {
          const newScore = prev + Math.floor(Math.random() * 100);
          
          // Simulate game end at 100,000 points
          if (newScore >= 100000) {
            clearInterval(scoreInterval);
            setIsPlaying(false);
            handleGameEnd(newScore);
          }
          
          return newScore;
        });
      }, 5000);
      
      return () => clearInterval(scoreInterval);
    }
  }, [isPlaying]);

  return (
    <Card className="bg-gaming-card border-gaming-border">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{gameName}</CardTitle>
            <CardDescription>{gameDescription}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-gaming-card-dark">
            {gameCategory}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="play" className="flex items-center">
              <Play className="h-4 w-4 mr-2" />
              Play
            </TabsTrigger>
            <TabsTrigger value="controls" className="flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Controls
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center">
              <Trophy className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center">
              <Star className="h-4 w-4 mr-2" />
              Stats
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="play" className="space-y-4">
            <div className="aspect-video bg-gaming-card-dark rounded-lg flex items-center justify-center">
              {!isPlaying ? (
                <Button 
                  size="lg" 
                  className="bg-gaming-primary hover:bg-gaming-primary/90 text-black"
                  onClick={handlePlayGame}
                >
                  <Play className="h-5 w-5 mr-2" />
                  Play Now
                </Button>
              ) : (
                <div className="text-center">
                  <p className="text-xl mb-4">Game in progress</p>
                  <div className="flex justify-center space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={handlePauseGame}
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleResetGame}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gaming-card-dark p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Trophy className="h-4 w-4 mr-2 text-gaming-accent" />
                  <span className="text-sm text-gray-400">Score</span>
                </div>
                <div className="text-2xl font-bold">{gameScore.toLocaleString()}</div>
              </div>
              
              <div className="bg-gaming-card-dark p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 mr-2 text-gaming-accent" />
                  <span className="text-sm text-gray-400">Time</span>
                </div>
                <div className="text-2xl font-bold">{formatTime(gameTime)}</div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4 mt-4">
              <Button 
                variant="outline" 
                size="sm"
                className={liked ? "text-green-500 border-green-500" : ""}
                onClick={handleLikeGame}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                Like
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className={disliked ? "text-red-500 border-red-500" : ""}
                onClick={handleDislikeGame}
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                Dislike
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="controls">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Game Controls</h3>
              <ul className="space-y-2">
                {gameControls.map((control, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gaming-accent mr-2">•</span>
                    {control}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="achievements">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gameAchievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className="bg-gaming-card-dark p-4 rounded-lg flex items-start"
                  >
                    <div className="text-2xl mr-3">{achievement.icon}</div>
                    <div>
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-gray-400">{achievement.description}</p>
                      <p className="text-xs text-gaming-accent mt-1">
                        Requirement: {achievement.requirement}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Game Stats</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gaming-card-dark p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Trophy className="h-4 w-4 mr-2 text-gaming-accent" />
                    <span className="text-sm text-gray-400">High Score</span>
                  </div>
                  <div className="text-2xl font-bold">98,765</div>
                </div>
                
                <div className="bg-gaming-card-dark p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 mr-2 text-gaming-accent" />
                    <span className="text-sm text-gray-400">Total Playtime</span>
                  </div>
                  <div className="text-2xl font-bold">2h 15m</div>
                </div>
                
                <div className="bg-gaming-card-dark p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Award className="h-4 w-4 mr-2 text-gaming-accent" />
                    <span className="text-sm text-gray-400">Achievements</span>
                  </div>
                  <div className="text-2xl font-bold">3/5</div>
                  <Progress value={60} className="mt-2" />
                </div>
                
                <div className="bg-gaming-card-dark p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 mr-2 text-gaming-accent" />
                    <span className="text-sm text-gray-400">Average Score</span>
                  </div>
                  <div className="text-2xl font-bold">45,678</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="text-sm text-gray-400">
          {user ? `Playing as ${user.name}` : "Sign in to track your progress"}
        </div>
        <Button 
          variant="outline" 
          onClick={() => window.open(gameUrl, '_blank')}
        >
          Play on GameHive 🐝
        </Button>
      </CardFooter>
    </Card>
  );
}
