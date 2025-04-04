
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Controller, Gamepad, Trophy, User, UserPlus, Zap } from "lucide-react";

export function HeroSection() {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 hero-bg"></div>
      
      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 cyber-bg opacity-10"></div>
      
      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gaming-gradient animate-gradient-shift bg-[length:200%_auto]">
              Play Free Games
            </span> <br />
            Instantly Online
          </h1>
          
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
            No downloads, no installations. Play 100+ free games directly in your browser and compete on global leaderboards.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gaming-primary hover:bg-gaming-primary/90 text-white" asChild>
              <Link to="/games">
                <Controller className="mr-2 h-5 w-5" />
                Play Now
              </Link>
            </Button>
            {isLoggedIn ? (
              <Button size="lg" variant="outline" asChild>
                <Link to="/leaderboard">
                  <Trophy className="mr-2 h-5 w-5" />
                  View Leaderboards
                </Link>
              </Button>
            ) : (
              <Button size="lg" variant="outline" asChild>
                <Link to="/register">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Create Account
                </Link>
              </Button>
            )}
          </div>
          
          {/* User Welcome or Stats */}
          {isLoggedIn && user ? (
            <div className="mt-8 p-4 bg-card/30 backdrop-blur-sm rounded-lg border border-gaming-primary/20">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gaming-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-gaming-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Welcome back</p>
                  <p className="font-semibold">{user.name}</p>
                </div>
                <div className="w-px h-10 bg-border mx-3"></div>
                <Link to="/game/tetris" className="flex items-center hover:text-gaming-primary transition-colors">
                  <Gamepad className="mr-2 h-5 w-5" />
                  <span>Continue Playing</span>
                </Link>
              </div>
            </div>
          ) : (
            /* Stats */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gaming-gradient">100+</div>
                <p className="text-foreground/70">Free Games</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gaming-gradient">0</div>
                <p className="text-foreground/70">Downloads Required</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gaming-gradient">
                  <Zap className="inline h-8 w-8" />
                </div>
                <p className="text-foreground/70">Instant Play</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
