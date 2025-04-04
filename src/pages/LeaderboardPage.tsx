
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp, Medal, Search, Trophy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample leaderboard data
const LEADERBOARD_DATA = [
  {
    id: 1,
    rank: 1,
    player: {
      name: "ProGamer123",
      avatar: "/placeholder.svg"
    },
    game: "Tetris Classic",
    score: 99875,
    date: "2025-04-03",
    change: 0
  },
  {
    id: 2,
    rank: 2,
    player: {
      name: "ShadowHunter",
      avatar: "/placeholder.svg"
    },
    game: "Snake.io",
    score: 95642,
    date: "2025-04-02",
    change: 1
  },
  {
    id: 3,
    rank: 3,
    player: {
      name: "NinjaWarrior",
      avatar: "/placeholder.svg"
    },
    game: "Pac-Man",
    score: 90453,
    date: "2025-04-01",
    change: -1
  },
  {
    id: 4,
    rank: 4,
    player: {
      name: "StrategyMaster",
      avatar: "/placeholder.svg"
    },
    game: "2048",
    score: 87421,
    date: "2025-04-03",
    change: 2
  },
  {
    id: 5,
    rank: 5,
    player: {
      name: "LegendarySniper",
      avatar: "/placeholder.svg"
    },
    game: "Flappy Bird",
    score: 83569,
    date: "2025-04-02",
    change: -2
  },
  {
    id: 6,
    rank: 6,
    player: {
      name: "MidnightGamer",
      avatar: "/placeholder.svg"
    },
    game: "Tetris Classic",
    score: 81245,
    date: "2025-04-01",
    change: 3
  },
  {
    id: 7,
    rank: 7,
    player: {
      name: "PixelWarrior",
      avatar: "/placeholder.svg"
    },
    game: "Snake.io",
    score: 79654,
    date: "2025-04-03",
    change: 0
  },
  {
    id: 8,
    rank: 8,
    player: {
      name: "CyberNinja",
      avatar: "/placeholder.svg"
    },
    game: "Pac-Man",
    score: 76321,
    date: "2025-04-02",
    change: 5
  },
  {
    id: 9,
    rank: 9,
    player: {
      name: "EliteGamer",
      avatar: "/placeholder.svg"
    },
    game: "2048",
    score: 72145,
    date: "2025-04-01",
    change: -3
  },
  {
    id: 10,
    rank: 10,
    player: {
      name: "SpeedRunner",
      avatar: "/placeholder.svg"
    },
    game: "Flappy Bird",
    score: 69874,
    date: "2025-04-03",
    change: 2
  },
  {
    id: 11,
    rank: 11,
    player: {
      name: "RetroPlayer",
      avatar: "/placeholder.svg"
    },
    game: "Tetris Classic",
    score: 65432,
    date: "2025-04-02",
    change: 1
  },
  {
    id: 12,
    rank: 12,
    player: {
      name: "GamerKing",
      avatar: "/placeholder.svg"
    },
    game: "Pac-Man",
    score: 61298,
    date: "2025-04-01",
    change: -1
  },
  {
    id: 13,
    rank: 13,
    player: {
      name: "DigitalWarrior",
      avatar: "/placeholder.svg"
    },
    game: "Snake.io",
    score: 58741,
    date: "2025-04-03",
    change: 4
  },
  {
    id: 14,
    rank: 14,
    player: {
      name: "NeonPlayer",
      avatar: "/placeholder.svg"
    },
    game: "2048",
    score: 54321,
    date: "2025-04-02",
    change: 0
  },
  {
    id: 15,
    rank: 15,
    player: {
      name: "VirtualHero",
      avatar: "/placeholder.svg"
    },
    game: "Flappy Bird",
    score: 51298,
    date: "2025-04-01",
    change: -2
  }
];

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [gameFilter, setGameFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("all");
  
  // Filter leaderboard data based on search query and game filter
  const filteredLeaderboard = LEADERBOARD_DATA.filter(entry => {
    const matchesSearch = entry.player.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = gameFilter === "all" || entry.game.toLowerCase() === gameFilter.toLowerCase();
    return matchesSearch && matchesGame;
  });

  // Get current user's position - for demo purposes
  const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
  const userRanking = currentUser ? {
    id: 999,
    rank: 42,
    player: {
      name: currentUser.name,
      avatar: currentUser.avatar
    },
    game: "Tetris Classic",
    score: 31245,
    date: "2025-04-01",
    change: 5
  } : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 px-4 md:px-6 lg:px-8 cyber-bg">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center">
              <Trophy className="mr-3 h-8 w-8 text-yellow-400" />
              Global Leaderboard
            </h1>
            
            <Tabs defaultValue="global" className="w-full mb-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="global">Global</TabsTrigger>
                <TabsTrigger value="friends">Friends</TabsTrigger>
                <TabsTrigger value="you">Your Scores</TabsTrigger>
              </TabsList>
              
              <TabsContent value="global" className="space-y-4">
                {/* Filters and Search */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 mt-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search players..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <Select value={gameFilter} onValueChange={setGameFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Games" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Games</SelectItem>
                      <SelectItem value="Tetris Classic">Tetris Classic</SelectItem>
                      <SelectItem value="Snake.io">Snake.io</SelectItem>
                      <SelectItem value="2048">2048</SelectItem>
                      <SelectItem value="Pac-Man">Pac-Man</SelectItem>
                      <SelectItem value="Flappy Bird">Flappy Bird</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" className="w-full md:w-auto" disabled={!currentUser}>
                    {currentUser ? "Challenge Friends" : "Sign in to Challenge Friends"}
                  </Button>
                </div>
                
                {/* Leaderboard Table */}
                <div className="bg-card rounded-lg border shadow overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px] text-center">Rank</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead>Game</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                        <TableHead className="text-right w-[80px]">Change</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeaderboard.map((entry) => (
                        <TableRow 
                          key={entry.id} 
                          className={entry.rank <= 3 ? "bg-gaming-primary/5" : ""}
                        >
                          <TableCell className="font-medium text-center">
                            {entry.rank <= 3 ? (
                              <div className="flex justify-center">
                                <Medal className={`h-5 w-5 ${
                                  entry.rank === 1 ? "text-yellow-400" : 
                                  entry.rank === 2 ? "text-gray-400" : "text-amber-700"
                                }`} />
                              </div>
                            ) : entry.rank}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={entry.player.avatar} alt={entry.player.name} />
                                <AvatarFallback>{entry.player.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span className={entry.rank <= 3 ? "font-bold" : ""}>{entry.player.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-background">
                              {entry.game}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-mono font-bold">
                            {entry.score.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            {entry.date}
                          </TableCell>
                          <TableCell className="text-right">
                            {entry.change !== 0 && (
                              <Badge 
                                variant="outline" 
                                className={`${
                                  entry.change > 0 
                                    ? 'text-green-500 bg-green-500/10' 
                                    : 'text-red-500 bg-red-500/10'
                                }`}
                              >
                                <ArrowUp 
                                  className={`h-3 w-3 mr-1 ${entry.change < 0 ? 'rotate-180' : ''}`} 
                                />
                                {Math.abs(entry.change)}
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {/* User's Position */}
                {userRanking && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-3">Your Position</h3>
                    <div className="bg-card rounded-lg border shadow overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[80px] text-center">Rank</TableHead>
                            <TableHead>Player</TableHead>
                            <TableHead>Game</TableHead>
                            <TableHead className="text-right">Score</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                            <TableHead className="text-right w-[80px]">Change</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="bg-gaming-primary/10">
                            <TableCell className="font-medium text-center">{userRanking.rank}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar>
                                  <AvatarImage src={userRanking.player.avatar} alt={userRanking.player.name} />
                                  <AvatarFallback>{userRanking.player.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <span className="font-bold">You ({userRanking.player.name})</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-background">
                                {userRanking.game}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-mono font-bold">
                              {userRanking.score.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right text-muted-foreground">
                              {userRanking.date}
                            </TableCell>
                            <TableCell className="text-right">
                              {userRanking.change !== 0 && (
                                <Badge 
                                  variant="outline" 
                                  className={`${
                                    userRanking.change > 0 
                                      ? 'text-green-500 bg-green-500/10' 
                                      : 'text-red-500 bg-red-500/10'
                                  }`}
                                >
                                  <ArrowUp 
                                    className={`h-3 w-3 mr-1 ${userRanking.change < 0 ? 'rotate-180' : ''}`} 
                                  />
                                  {Math.abs(userRanking.change)}
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="friends">
                <div className="flex flex-col items-center justify-center py-12">
                  <h3 className="text-xl font-semibold mb-3">Connect with Friends</h3>
                  <p className="text-muted-foreground mb-6">Sign in and add friends to see how you compare!</p>
                  {!currentUser && (
                    <Button asChild>
                      <Link to="/login">Sign In</Link>
                    </Button>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="you">
                <div className="flex flex-col items-center justify-center py-12">
                  <h3 className="text-xl font-semibold mb-3">Your Personal Scores</h3>
                  <p className="text-muted-foreground mb-6">
                    {currentUser ? "Play games to start tracking your scores!" : "Sign in to track your progress across games"}
                  </p>
                  {!currentUser && (
                    <Button asChild>
                      <Link to="/login">Sign In</Link>
                    </Button>
                  )}
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
