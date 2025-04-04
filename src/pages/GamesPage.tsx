
import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { GameCard } from "@/components/games/GameCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, Gamepad, PlayCircle, Search, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample game data
const GAMES = [
  {
    id: "tetris",
    title: "Tetris Classic",
    image: "https://images.unsplash.com/photo-1642190672017-a9a7174339f5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRldHJpc3xlbnwwfHwwfHx8MA%3D%3D",
    price: "Free",
    category: "Puzzle",
    rating: 4.8
  },
  {
    id: "snake",
    title: "Snake.io",
    image: "https://images.unsplash.com/photo-1500995617113-cf789362a3e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNuYWtlfGVufDB8fDB8fHww",
    price: "Free",
    category: "Arcade",
    rating: 4.5
  },
  {
    id: "2048",
    title: "2048",
    image: "https://images.unsplash.com/photo-1629752187687-3d3c7ea3a21b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8MjA0OCUyMGdhbWV8ZW58MHx8MHx8fDA%3D",
    price: "Free",
    category: "Puzzle",
    rating: 4.6
  },
  {
    id: "pacman",
    title: "Pac-Man",
    image: "https://images.unsplash.com/photo-1579309401389-a2476dddf3d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFjbWFufGVufDB8fDB8fHww",
    price: "Free",
    category: "Arcade",
    rating: 4.9
  },
  {
    id: "flappybird",
    title: "Flappy Bird",
    image: "https://images.unsplash.com/photo-1602221920231-23e3ea95420c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJpcmQlMjBnYW1lfGVufDB8fDB8fHww",
    price: "Free",
    category: "Arcade",
    rating: 4.2
  },
  {
    id: "cyberpunk",
    title: "Cyberpunk Runner",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FtZXxlbnwwfHwwfHx8MA%3D%3D",
    price: "Free",
    category: "Action",
    rating: 4.2
  },
  {
    id: "skyquest",
    title: "Sky Quest",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FtZXxlbnwwfHwwfHx8MA%3D%3D",
    price: "Free",
    category: "Adventure",
    rating: 4.9
  },
  {
    id: "shooter",
    title: "Pixel Shooter",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvb3RlciUyMGdhbWV8ZW58MHx8MHx8fDA%3D",
    price: "Free",
    category: "Shooter",
    rating: 4.5
  },
  {
    id: "adventure",
    title: "Forest Adventure",
    image: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhbWV8ZW58MHx8MHx8fDA%3D",
    price: "Free",
    category: "Adventure",
    rating: 4.8
  },
  {
    id: "cardgame",
    title: "Card Master",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z2FtZXxlbnwwfHwwfHx8MA%3D%3D",
    price: "Free",
    category: "Card Game",
    rating: 4.3
  },
  {
    id: "puzzleworld",
    title: "Puzzle World",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGdhbWV8ZW58MHx8MHx8fDA%3D",
    price: "Free",
    category: "Puzzle",
    rating: 4.9
  }
];

// Featured games for the hero section
const FEATURED_GAMES = GAMES.slice(0, 3);

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
    if (sortBy === "rating") {
      return b.rating - a.rating;
    } else if (sortBy === "name-asc") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "name-desc") {
      return b.title.localeCompare(a.title);
    }
    // Default: popular
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-6 cyber-bg">
        {/* Featured Games Hero */}
        <div className="relative bg-background/50 backdrop-blur-sm mb-8 py-8 border-y border-gaming-primary/20">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center">
                <Flame className="mr-2 h-6 w-6 text-gaming-primary" />
                Featured Games
              </h2>
              <Link to="#all-games" className="text-gaming-primary hover:text-gaming-primary/90 flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURED_GAMES.map((game) => (
                <Link 
                  key={game.id} 
                  to={`/game/${game.id}`} 
                  className="relative overflow-hidden rounded-lg group block aspect-video"
                >
                  <img 
                    src={game.image} 
                    alt={game.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{game.title}</h3>
                      <span className="flex items-center text-yellow-400">
                        ★ <span className="ml-1 text-white">{game.rating}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">{game.category}</span>
                      <Button size="sm" variant="secondary" className="bg-gaming-primary text-white hover:bg-gaming-primary/90">
                        <PlayCircle className="mr-1 h-4 w-4" />
                        Play Now
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      
        <div className="container mx-auto px-4" id="all-games">
          <div className="mb-8">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <TabsList className="md:w-auto">
                  <TabsTrigger value="all" className="flex items-center">
                    <Gamepad className="mr-1 h-4 w-4" />
                    All Games
                  </TabsTrigger>
                  <TabsTrigger value="trending" className="flex items-center">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    Trending
                  </TabsTrigger>
                  <TabsTrigger value="new" className="flex items-center">
                    <Sparkles className="mr-1 h-4 w-4" />
                    New
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex flex-col md:flex-row gap-4 md:w-auto w-full">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search games..."
                      className="pl-8 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="puzzle">Puzzle</SelectItem>
                      <SelectItem value="arcade">Arcade</SelectItem>
                      <SelectItem value="action">Action</SelectItem>
                      <SelectItem value="adventure">Adventure</SelectItem>
                      <SelectItem value="shooter">Shooter</SelectItem>
                      <SelectItem value="card game">Card Game</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <TabsContent value="all" className="mt-0">
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
              </TabsContent>
              
              <TabsContent value="trending" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  {GAMES.filter(game => game.rating > 4.5).map((game) => (
                    <GameCard key={game.id} {...game} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="new" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  {GAMES.slice(6, 12).map((game) => (
                    <GameCard key={game.id} {...game} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
