
import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { GameCard } from "@/components/games/GameCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Sample game data
const GAMES = [
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
  },
  {
    id: 7,
    title: "FIFA 25",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvb3RlciUyMGdhbWV8ZW58MHx8MHx8fDA%3D",
    price: 69.99,
    discount: 0,
    category: "Sports",
    rating: 4.5
  },
  {
    id: 8,
    title: "Minecraft",
    image: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhbWV8ZW58MHx8MHx8fDA%3D",
    price: 29.99,
    discount: 0,
    category: "Sandbox",
    rating: 4.8
  },
  {
    id: 9,
    title: "Fortnite",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z2FtZXxlbnwwfHwwfHx8MA%3D%3D",
    price: "Free",
    category: "Battle Royale",
    rating: 4.2
  },
  {
    id: 10,
    title: "The Witcher 3",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGdhbWV8ZW58MHx8MHx8fDA%3D",
    price: 39.99,
    discount: 50,
    category: "RPG",
    rating: 4.9
  },
  {
    id: 11,
    title: "Counter-Strike 2",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FtZXxlbnwwfHwwfHx8MA%3D%3D",
    price: "Free",
    category: "FPS",
    rating: 4.7
  },
  {
    id: 12,
    title: "Diablo IV",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FtZXxlbnwwfHwwfHx8MA%3D%3D",
    price: 69.99,
    discount: 0,
    category: "Action RPG",
    rating: 4.6
  }
];

export default function GamesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  // Filter games based on search query and category
  const filteredGames = GAMES.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || game.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Sort games based on selected option
  const sortedGames = [...filteredGames].sort((a, b) => {
    if (sortBy === "price-low") {
      const priceA = typeof a.price === "number" ? a.price : 0;
      const priceB = typeof b.price === "number" ? b.price : 0;
      return priceA - priceB;
    } else if (sortBy === "price-high") {
      const priceA = typeof a.price === "number" ? a.price : 0;
      const priceB = typeof b.price === "number" ? b.price : 0;
      return priceB - priceA;
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    // Default: popular (random for demo purposes)
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-4">Game Library</h1>
            
            {/* Filters and Search */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search games..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="rpg">RPG</SelectItem>
                  <SelectItem value="action rpg">Action RPG</SelectItem>
                  <SelectItem value="fps">FPS</SelectItem>
                  <SelectItem value="battle royale">Battle Royale</SelectItem>
                  <SelectItem value="action adventure">Action Adventure</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="sandbox">Sandbox</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Games Grid */}
            {sortedGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {sortedGames.map((game) => (
                  <GameCard key={game.id} {...game} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold mb-2">No games found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
