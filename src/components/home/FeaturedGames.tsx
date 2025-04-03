
import { GameCard } from "@/components/games/GameCard";

const FEATURED_GAMES = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FtZXxlbnwwfHwwfHx8MA%3D%3D",
    price: 59.99,
    discount: 25,
    category: "RPG",
    rating: 4.2
  },
  {
    id: 2,
    title: "Elden Ring",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FtZXxlbnwwfHwwfHx8MA%3D%3D",
    price: 69.99,
    discount: 0,
    category: "Action RPG",
    rating: 4.9
  },
  {
    id: 3,
    title: "Call of Duty: Warzone",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvb3RlciUyMGdhbWV8ZW58MHx8MHx8fDA%3D",
    price: "Free",
    category: "FPS",
    rating: 4.5
  },
  {
    id: 4,
    title: "Red Dead Redemption 2",
    image: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhbWV8ZW58MHx8MHx8fDA%3D",
    price: 49.99,
    discount: 35,
    category: "Action Adventure",
    rating: 4.8
  },
  {
    id: 5,
    title: "Apex Legends",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z2FtZXxlbnwwfHwwfHx8MA%3D%3D",
    price: "Free",
    category: "Battle Royale",
    rating: 4.3
  },
  {
    id: 6,
    title: "God of War",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGdhbWV8ZW58MHx8MHx8fDA%3D",
    price: 39.99,
    discount: 15,
    category: "Action Adventure",
    rating: 4.9
  }
];

export function FeaturedGames() {
  return (
    <section className="py-12">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Games</h2>
            <p className="text-muted-foreground mt-1">Discover this week's top games</p>
          </div>
          <a href="/games" className="text-gaming-primary hover:text-gaming-primary/90 transition-colors text-sm font-medium mt-4 md:mt-0">
            View all games →
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {FEATURED_GAMES.map((game) => (
            <GameCard key={game.id} {...game} className="h-full" />
          ))}
        </div>
      </div>
    </section>
  );
}
