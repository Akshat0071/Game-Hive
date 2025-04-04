import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PlayableGame from "@/components/games/PlayableGame";
import GameAchievements from "@/components/games/GameAchievements";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad, Trophy, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

// Updated games data with achievements
const GAMES_DATA = [
  {
    id: "tetris",
    title: "Tetris Classic",
    description: "The classic puzzle game where you arrange falling blocks to create complete rows. Test your spatial awareness and quick thinking in this timeless favorite!",
    gameUrl: "https://tetris.com/play-tetris",
    category: "Puzzle",
    tags: ["Classic", "Strategy"],
    controls: "Use arrow keys to move blocks, up arrow to rotate, spacebar to drop quickly",
    achievements: [
      {
        id: "tetris-1",
        title: "First Line",
        description: "Complete your first line",
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        icon: "🎯"
      },
      {
        id: "tetris-2",
        title: "Tetris Master",
        description: "Clear 10 lines in a single game",
        progress: 5,
        maxProgress: 10,
        unlocked: false,
        icon: "🏆"
      },
      {
        id: "tetris-3",
        title: "Speed Demon",
        description: "Score 1000 points in under 2 minutes",
        progress: 0,
        maxProgress: 1,
        unlocked: false,
        icon: "⚡"
      }
    ]
  },
  {
    id: "snake",
    title: "Snake.io",
    description: "Control a snake and eat food to grow longer. Avoid hitting walls or your own tail in this modern take on the classic Snake game!",
    gameUrl: "https://playsnake.org/",
    category: "Arcade",
    tags: ["Classic", "Multiplayer"],
    controls: "Use arrow keys or WASD to change direction",
    achievements: [
      {
        id: "snake-1",
        title: "First Bite",
        description: "Eat your first food",
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        icon: "🍎"
      },
      {
        id: "snake-2",
        title: "Growing Strong",
        description: "Grow your snake to length 10",
        progress: 5,
        maxProgress: 10,
        unlocked: false,
        icon: "🐍"
      },
      {
        id: "snake-3",
        title: "Survival Expert",
        description: "Survive for 5 minutes without dying",
        progress: 0,
        maxProgress: 1,
        unlocked: false,
        icon: "⏱️"
      }
    ]
  },
  {
    id: "2048",
    title: "2048",
    description: "Merge tiles with the same number to create a tile with the value 2048. A simple yet addictive puzzle game that tests your strategic thinking!",
    gameUrl: "https://play2048.co/",
    category: "Puzzle",
    tags: ["Strategy", "Math"],
    controls: "Use arrow keys to move all tiles in one direction",
    achievements: [
      {
        id: "2048-1",
        title: "First Merge",
        description: "Complete your first tile merge",
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        icon: "🎯"
      },
      {
        id: "2048-2",
        title: "Power of 2",
        description: "Reach the 1024 tile",
        progress: 0,
        maxProgress: 1,
        unlocked: false,
        icon: "🏆"
      }
    ]
  },
  {
    id: "pacman",
    title: "Pac-Man",
    description: "Navigate through a maze while eating dots and avoiding ghosts in this iconic arcade game that defined a generation of gaming!",
    gameUrl: "https://www.google.com/logos/2010/pacman10-i.html",
    category: "Arcade",
    tags: ["Classic", "Maze"],
    controls: "Use arrow keys to move Pac-Man through the maze",
    achievements: [
      {
        id: "pacman-1",
        title: "First Dot",
        description: "Eat your first dot",
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        icon: "🍎"
      },
      {
        id: "pacman-2",
        title: "Ghost Hunter",
        description: "Eat 5 ghosts in one game",
        progress: 0,
        maxProgress: 5,
        unlocked: false,
        icon: "👻"
      }
    ]
  },
  {
    id: "flappybird",
    title: "Flappy Bird",
    description: "Guide a bird through a series of pipes without touching them. Simple but challenging gameplay that became a worldwide phenomenon!",
    gameUrl: "https://flappybird.io/",
    category: "Arcade",
    tags: ["Casual", "Challenging"],
    controls: "Tap or click to make the bird flap its wings and gain height",
    achievements: [
      {
        id: "flappy-1",
        title: "First Flight",
        description: "Complete your first pipe",
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        icon: "🐦"
      },
      {
        id: "flappy-2",
        title: "Pipe Master",
        description: "Get through 10 pipes",
        progress: 0,
        maxProgress: 10,
        unlocked: false,
        icon: "🎯"
      }
    ]
  }
];

export default function GamePage() {
  const { gameId } = useParams<{ gameId: string }>();
  
  // Find the game by ID
  const game = GAMES_DATA.find(g => g.id === gameId);
  
  // If no game is found, redirect to games page
  if (!game) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 cyber-bg">
          <div className="container mx-auto px-4 py-8">
            <div className="bg-card rounded-lg p-6 text-center">
              <h2 className="text-2xl font-bold mb-4">Game Not Found</h2>
              <p className="text-muted-foreground mb-6">The game you're looking for doesn't exist or has been removed.</p>
              <Button asChild>
                <Link to="/games">Browse All Games</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 cyber-bg">
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="play" className="space-y-6">
            <TabsList>
              <TabsTrigger value="play" className="flex items-center gap-2">
                <Gamepad className="h-4 w-4" />
                Play
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="info" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Info
              </TabsTrigger>
            </TabsList>

            <TabsContent value="play" className="mt-0">
              <PlayableGame 
                gameUrl={game.gameUrl}
                gameId={game.id}
                gameName={game.title}
                gameCategory={game.category}
                gameDescription={game.description}
                gameControls={game.controls ? [game.controls] : []}
                gameAchievements={game.achievements || []}
              />
            </TabsContent>

            <TabsContent value="achievements" className="mt-0">
              <div className="bg-card rounded-lg p-6">
                <GameAchievements achievements={game.achievements} />
              </div>
            </TabsContent>

            <TabsContent value="info" className="mt-0">
              <div className="bg-card rounded-lg p-6 space-y-4">
                <h2 className="text-2xl font-bold">{game.title}</h2>
                <p className="text-muted-foreground">{game.description}</p>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Controls</h3>
                  <p className="text-muted-foreground">{game.controls}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}

