
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Expand, ThumbsUp, ThumbsDown, Share2, Trophy, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface PlayableGameProps {
  id: string | number;
  title: string;
  description: string;
  controls?: string;
  gameUrl: string;
  likes?: number;
  dislikes?: number;
  category: string;
  tags?: string[];
}

export function PlayableGame({
  id,
  title,
  description,
  controls = "Use arrow keys to move, spacebar to jump/action",
  gameUrl,
  likes = Math.floor(Math.random() * 10000),
  dislikes = Math.floor(Math.random() * 1000),
  category,
  tags = ["Popular", "Trending"],
}: PlayableGameProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [currentDislikes, setCurrentDislikes] = useState(dislikes);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const toggleFullscreen = () => {
    const gameFrame = document.getElementById("game-frame");
    if (!gameFrame) return;

    if (!isFullscreen) {
      if (gameFrame.requestFullscreen) {
        gameFrame.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", fullscreenChangeHandler);
    
    // Reset loading and error states when game changes
    setIsLoading(true);
    setLoadError(false);
    
    return () => {
      document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
    };
  }, [gameUrl]);

  const handleLike = () => {
    if (!isLoggedIn) {
      toast.error("Please sign in to rate games");
      return;
    }
    
    if (isLiked) {
      setCurrentLikes(prev => prev - 1);
      setIsLiked(false);
    } else {
      setCurrentLikes(prev => prev + 1);
      setIsLiked(true);
      if (isDisliked) {
        setCurrentDislikes(prev => prev - 1);
        setIsDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (!isLoggedIn) {
      toast.error("Please sign in to rate games");
      return;
    }
    
    if (isDisliked) {
      setCurrentDislikes(prev => prev - 1);
      setIsDisliked(false);
    } else {
      setCurrentDislikes(prev => prev + 1);
      setIsDisliked(true);
      if (isLiked) {
        setCurrentLikes(prev => prev - 1);
        setIsLiked(false);
      }
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setLoadError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setLoadError(true);
    toast.error(`Failed to load ${title}. Please try again later or try a different game.`);
  };

  const tryAgain = () => {
    setIsLoading(true);
    setLoadError(false);
    // Force iframe reload by temporarily removing the src
    const iframe = document.getElementById("game-frame") as HTMLIFrameElement;
    if (iframe) {
      const currentSrc = iframe.src;
      iframe.src = "about:blank";
      setTimeout(() => {
        iframe.src = currentSrc;
      }, 100);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="bg-gaming-primary/10 text-gaming-primary">
                {category}
              </Badge>
              {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-muted">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link to="/leaderboard">
                <Trophy className="mr-2 h-4 w-4" />
                Leaderboard
              </Link>
            </Button>
            <Button variant="outline" onClick={() => toggleFullscreen()}>
              <Expand className="mr-2 h-4 w-4" />
              Fullscreen
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title,
                    url: window.location.href
                  }).catch(() => {
                    toast.error("Couldn't share. Try copying the URL instead.");
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied to clipboard!");
                }
              }}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
        
        <Card className="w-full overflow-hidden border-gaming-primary/20 aspect-video relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-20">
              <div className="text-center">
                <div className="loading-spinner mb-4"></div>
                <p>Loading game...</p>
              </div>
            </div>
          )}
          
          {loadError && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-20">
              <div className="text-center p-6 max-w-md">
                <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Game Failed to Load</h3>
                <p className="mb-4">Sorry, we couldn't load this game. This may be due to browser restrictions or the game source being unavailable.</p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={tryAgain}>Try Again</Button>
                  <Button variant="outline" asChild>
                    <Link to="/games">Browse Other Games</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {!isLoggedIn && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
              <div className="text-center p-6 max-w-md">
                <h2 className="text-2xl font-bold mb-4">Sign in to Play</h2>
                <p className="mb-6">Create a free account or sign in to play this game and track your scores on the leaderboard!</p>
                <div className="flex gap-4 justify-center">
                  <Button asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/register">Create Account</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
          <iframe 
            id="game-frame"
            src={isLoggedIn ? gameUrl : "about:blank"}
            className="w-full h-full border-0" 
            allowFullScreen
            title={title}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            allow="fullscreen"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
          ></iframe>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-2">About This Game</h2>
            <p className="text-muted-foreground">{description}</p>
            
            <h3 className="text-lg font-bold mt-6 mb-2">Controls</h3>
            <p className="text-muted-foreground">{controls}</p>
          </div>
          
          <div>
            <Card className="p-4">
              <h3 className="text-lg font-bold mb-4">Rate This Game</h3>
              <div className="flex justify-center space-x-6">
                <Button 
                  variant={isLiked ? "default" : "outline"} 
                  className={isLiked ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={handleLike}
                >
                  <ThumbsUp className="mr-2 h-5 w-5" />
                  <span>{currentLikes.toLocaleString()}</span>
                </Button>
                <Button 
                  variant={isDisliked ? "default" : "outline"}
                  className={isDisliked ? "bg-red-600 hover:bg-red-700" : ""}
                  onClick={handleDislike}
                >
                  <ThumbsDown className="mr-2 h-5 w-5" />
                  <span>{currentDislikes.toLocaleString()}</span>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
