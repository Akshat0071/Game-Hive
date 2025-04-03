
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gamepad2, Sword, Trophy, Users, Zap } from "lucide-react";

// Game categories with icon mapping
const CATEGORIES = [
  { name: "Action", icon: Sword, count: 156 },
  { name: "Adventure", icon: Zap, count: 94 },
  { name: "Multiplayer", icon: Users, count: 128 },
  { name: "RPG", icon: Gamepad2, count: 87 },
  { name: "Competitive", icon: Trophy, count: 62 }
];

export function GameCategories() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Game Categories</h2>
            <p className="text-muted-foreground mt-1">Browse by your favorite game types</p>
          </div>
          <Button variant="link" className="text-gaming-primary hover:text-gaming-primary/90 p-0 h-auto mt-4 md:mt-0">
            View all categories →
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((category) => (
            <div
              key={category.name}
              className="relative group overflow-hidden rounded-xl border bg-card text-card-foreground shadow transition-all hover:shadow-lg"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full flex items-center justify-center bg-gaming-primary/10 text-gaming-primary mb-4">
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                <Badge variant="secondary" className="bg-muted">
                  {category.count} games
                </Badge>
              </div>
              
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gaming-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
