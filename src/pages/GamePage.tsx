
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PlayableGame } from "@/components/games/PlayableGame";

// Sample games data - in a real app, this would come from an API
const GAMES_DATA = [
  {
    id: "tetris",
    title: "Tetris Classic",
    description: "The classic puzzle game where you arrange falling blocks to create complete rows. Test your spatial awareness and quick thinking in this timeless favorite!",
    gameUrl: "https://tetris.com/play-tetris",
    category: "Puzzle",
    tags: ["Classic", "Strategy"],
    controls: "Use arrow keys to move blocks, up arrow to rotate, spacebar to drop quickly"
  },
  {
    id: "snake",
    title: "Snake.io",
    description: "Control a snake and eat food to grow longer. Avoid hitting walls or your own tail in this modern take on the classic Snake game!",
    gameUrl: "https://playsnake.org/",
    category: "Arcade",
    tags: ["Classic", "Multiplayer"],
    controls: "Use arrow keys or WASD to change direction"
  },
  {
    id: "2048",
    title: "2048",
    description: "Merge tiles with the same number to create a tile with the value 2048. A simple yet addictive puzzle game that tests your strategic thinking!",
    gameUrl: "https://play2048.co/",
    category: "Puzzle",
    tags: ["Strategy", "Math"],
    controls: "Use arrow keys to move all tiles in one direction"
  },
  {
    id: "pacman",
    title: "Pac-Man",
    description: "Navigate through a maze while eating dots and avoiding ghosts in this iconic arcade game that defined a generation of gaming!",
    gameUrl: "https://freepacman.org/",
    category: "Arcade",
    tags: ["Classic", "Maze"],
    controls: "Use arrow keys to move Pac-Man through the maze"
  },
  {
    id: "flappybird",
    title: "Flappy Bird",
    description: "Guide a bird through a series of pipes without touching them. Simple but challenging gameplay that became a worldwide phenomenon!",
    gameUrl: "https://flappybird.io/",
    category: "Arcade",
    tags: ["Casual", "Challenging"],
    controls: "Tap or click to make the bird flap its wings and gain height"
  }
];

export default function GamePage() {
  const { gameId } = useParams<{ gameId: string }>();
  
  // Find the game by ID
  const game = GAMES_DATA.find(g => g.id === gameId);
  
  // Fallback game if the ID doesn't match (for demo purposes)
  const fallbackGame = GAMES_DATA[0];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 cyber-bg">
        {game ? (
          <PlayableGame {...game} />
        ) : (
          <PlayableGame {...fallbackGame} />
        )}
      </main>
      <Footer />
    </div>
  );
}
