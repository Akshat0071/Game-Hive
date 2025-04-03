
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 hero-bg"></div>
      
      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 cyber-bg opacity-10"></div>
      
      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gaming-gradient animate-gradient-shift bg-[length:200%_auto]">
              Next Level Gaming
            </span> <br />
            Experience Awaits
          </h1>
          
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
            Join millions of gamers on the ultimate gaming platform. Connect, compete, and climb the leaderboards in your favorite games.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gaming-primary hover:bg-gaming-primary/90 text-white" asChild>
              <Link to="/games">Explore Games</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/register">Create Account</Link>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gaming-gradient">10M+</div>
              <p className="text-foreground/70">Active Players</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gaming-gradient">500+</div>
              <p className="text-foreground/70">Available Games</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gaming-gradient">50K+</div>
              <p className="text-foreground/70">Daily Tournaments</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
