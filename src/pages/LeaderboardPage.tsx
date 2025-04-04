import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  LeaderboardEntry, 
  PlayerHistory, 
  CategoryLeaderboard, 
  Reward, 
  Season, 
  PlayerStats 
} from "@/types/leaderboard";
import { leaderboardService } from "@/services/leaderboardService";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { 
  Trophy, 
  Medal, 
  Star, 
  TrendingUp, 
  Calendar, 
  Search, 
  Filter, 
  Award, 
  Crown, 
  Target, 
  BarChart3, 
  History,
  Minus
} from "lucide-react";

// Time range options
const TIME_RANGES = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" }
];

// Category options
const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "Puzzle", label: "Puzzle" },
  { value: "Arcade", label: "Arcade" },
  { value: "Strategy", label: "Strategy" },
  { value: "Action", label: "Action" }
];

// Game options (would come from game data in a real app)
const GAMES = [
  { value: "all", label: "All Games" },
  { value: "tetris", label: "Tetris Classic" },
  { value: "snake", label: "Snake.io" },
  { value: "2048", label: "2048" },
  { value: "memory", label: "Memory Match" }
];

export default function LeaderboardPage() {
  const { user } = useUser();
  const { gameId } = useParams<{ gameId: string }>();
  
  // State for leaderboard data
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [categoryLeaderboards, setCategoryLeaderboards] = useState<CategoryLeaderboard[]>([]);
  const [currentSeason, setCurrentSeason] = useState<Season | null>(null);
  const [playerHistory, setPlayerHistory] = useState<PlayerHistory | null>(null);
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);
  
  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState(gameId || "all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState("all");
  
  // State for active tab
  const [activeTab, setActiveTab] = useState("global");
  
  // Load leaderboard data
  useEffect(() => {
    const loadLeaderboardData = async () => {
      try {
        // Load global leaderboard
        const data = await leaderboardService.getLeaderboard(
          selectedGame !== "all" ? selectedGame : undefined,
          selectedCategory !== "all" ? selectedCategory : undefined,
          selectedTimeRange as any
        );
        setLeaderboardData(data);
        
        // Load category leaderboards
        const categories = await leaderboardService.getCategoryLeaderboards();
        setCategoryLeaderboards(categories);
        
        // Load current season
        const season = await leaderboardService.getCurrentSeason();
        setCurrentSeason(season);
        
        // Load rewards
        const availableRewards = await leaderboardService.getRewards();
        setRewards(availableRewards);
        
        // Load player data if user is logged in
        if (user) {
          const history = await leaderboardService.getPlayerHistory(
            user.id,
            selectedGame !== "all" ? selectedGame : undefined
          );
          setPlayerHistory(history);
          
          const stats = await leaderboardService.getPlayerStats(user.id);
          setPlayerStats(stats);
        }
      } catch (error) {
        console.error("Error loading leaderboard data:", error);
      }
    };
    
    loadLeaderboardData();
  }, [user, selectedGame, selectedCategory, selectedTimeRange]);
  
  // Filter leaderboard data based on search query
  const filteredLeaderboardData = leaderboardData.filter(entry => 
    entry.playerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.gameName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Format score with commas
  const formatScore = (score: number) => {
    return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Get rank change icon
  const getRankChangeIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (change < 0) {
      return <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />;
    } else {
      return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };
  
  // Get reward rarity color
  const getRewardRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-400";
      case "uncommon":
        return "text-green-500";
      case "rare":
        return "text-blue-500";
      case "epic":
        return "text-purple-500";
      case "legendary":
        return "text-yellow-500";
      default:
        return "text-gray-400";
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gaming-primary mb-2">Leaderboards</h1>
          <p className="text-gray-400">
            Compete with players worldwide and climb the ranks
          </p>
        </div>
        
        {currentSeason && (
          <Card className="w-full md:w-auto mt-4 md:mt-0 bg-gaming-card border-gaming-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-gaming-accent" />
                {currentSeason.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-gray-400">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(currentSeason.startDate).toLocaleDateString()} - {new Date(currentSeason.endDate).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search players or games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gaming-card border-gaming-border"
          />
        </div>
        
        <Select value={selectedGame} onValueChange={setSelectedGame}>
          <SelectTrigger className="bg-gaming-card border-gaming-border">
            <SelectValue placeholder="Select Game" />
          </SelectTrigger>
          <SelectContent>
            {GAMES.map((game) => (
              <SelectItem key={game.value} value={game.value}>
                {game.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="bg-gaming-card border-gaming-border">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <SelectTrigger className="bg-gaming-card border-gaming-border">
            <SelectValue placeholder="Select Time Range" />
          </SelectTrigger>
          <SelectContent>
            {TIME_RANGES.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="global" className="flex items-center">
            <Trophy className="h-4 w-4 mr-2" />
            Global
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center">
            <History className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
          <TabsTrigger value="rewards" className="flex items-center">
            <Award className="h-4 w-4 mr-2" />
            Rewards
          </TabsTrigger>
        </TabsList>
        
        {/* Global Leaderboard Tab */}
        <TabsContent value="global">
          <Card className="bg-gaming-card border-gaming-border">
            <CardHeader>
              <CardTitle>Global Leaderboard</CardTitle>
              <CardDescription>
                Top players across all games
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead>Game</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                    <TableHead className="w-16">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeaderboardData.map((entry, index) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {index < 3 ? (
                            <Medal className={`h-5 w-5 mr-2 ${
                              index === 0 ? "text-yellow-500" : 
                              index === 1 ? "text-gray-400" : 
                              "text-amber-600"
                            }`} />
                          ) : null}
                          {entry.rank}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <img 
                            src={entry.playerAvatar} 
                            alt={entry.playerName} 
                            className="h-8 w-8 rounded-full mr-2"
                          />
                          {entry.playerName}
                        </div>
                      </TableCell>
                      <TableCell>{entry.gameName}</TableCell>
                      <TableCell>{entry.category}</TableCell>
                      <TableCell className="text-right">{formatScore(entry.score)}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center">
                          {getRankChangeIcon(entry.change)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Categories Tab */}
        <TabsContent value="categories">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryLeaderboards.map((category) => (
              <Card key={category.category} className="bg-gaming-card border-gaming-border">
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                  <CardDescription>
                    {category.totalPlayers} players • Avg. Score: {formatScore(category.averageScore)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">Rank</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead>Game</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {category.entries.slice(0, 5).map((entry, index) => (
                        <TableRow key={entry.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              {index < 3 ? (
                                <Medal className={`h-5 w-5 mr-2 ${
                                  index === 0 ? "text-yellow-500" : 
                                  index === 1 ? "text-gray-400" : 
                                  "text-amber-600"
                                }`} />
                              ) : null}
                              {entry.rank}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <img 
                                src={entry.playerAvatar} 
                                alt={entry.playerName} 
                                className="h-8 w-8 rounded-full mr-2"
                              />
                              {entry.playerName}
                            </div>
                          </TableCell>
                          <TableCell>{entry.gameName}</TableCell>
                          <TableCell className="text-right">{formatScore(entry.score)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All {category.category} Rankings
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* History Tab */}
        <TabsContent value="history">
          {playerHistory ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gaming-card border-gaming-border">
                <CardHeader>
                  <CardTitle>Score History</CardTitle>
                  <CardDescription>
                    Your performance over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={playerHistory.scores}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "#1F2937", 
                            border: "1px solid #374151",
                            borderRadius: "0.375rem"
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="#FBBF24" 
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="rank" 
                          stroke="#60A5FA" 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gaming-card border-gaming-border">
                <CardHeader>
                  <CardTitle>Player Stats</CardTitle>
                  <CardDescription>
                    Your gaming achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gaming-card-dark p-4 rounded-lg">
                      <div className="text-sm text-gray-400">Best Score</div>
                      <div className="text-2xl font-bold text-gaming-primary">
                        {formatScore(playerHistory.bestScore)}
                      </div>
                    </div>
                    <div className="bg-gaming-card-dark p-4 rounded-lg">
                      <div className="text-sm text-gray-400">Average Score</div>
                      <div className="text-2xl font-bold text-gaming-primary">
                        {formatScore(playerHistory.averageScore)}
                      </div>
                    </div>
                    <div className="bg-gaming-card-dark p-4 rounded-lg">
                      <div className="text-sm text-gray-400">Games Played</div>
                      <div className="text-2xl font-bold text-gaming-primary">
                        {playerHistory.totalGames}
                      </div>
                    </div>
                    <div className="bg-gaming-card-dark p-4 rounded-lg">
                      <div className="text-sm text-gray-400">Improvement</div>
                      <div className="text-2xl font-bold text-green-500">
                        +{playerHistory.improvementRate}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="bg-gaming-card border-gaming-border">
              <CardContent className="py-12">
                <div className="text-center">
                  <History className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No History Available</h3>
                  <p className="text-gray-400 mb-4">
                    Play some games to see your history and stats
                  </p>
                  <Button>Browse Games</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Rewards Tab */}
        <TabsContent value="rewards">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <Card key={reward.id} className="bg-gaming-card border-gaming-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{reward.icon}</div>
                    <div className={`text-sm font-medium ${getRewardRarityColor(reward.rarity)}`}>
                      {reward.rarity.charAt(0).toUpperCase() + reward.rarity.slice(1)}
                    </div>
                  </div>
                  <CardTitle className="mt-2">{reward.title}</CardTitle>
                  <CardDescription>{reward.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gaming-card-dark p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-2">Requirements</div>
                    <div className="flex items-center">
                      {reward.requirements.type === "rank" ? (
                        <Crown className="h-4 w-4 mr-2 text-gaming-accent" />
                      ) : (
                        <Target className="h-4 w-4 mr-2 text-gaming-accent" />
                      )}
                      <span>
                        {reward.requirements.type === "rank" 
                          ? `Reach rank ${reward.requirements.value}`
                          : `Score ${formatScore(reward.requirements.value)} points`
                        }
                        {reward.requirements.category && ` in ${reward.requirements.category} games`}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={reward.unlocked ? "default" : "outline"} 
                    className="w-full"
                    disabled={!reward.unlocked}
                  >
                    {reward.unlocked ? "Unlocked" : "Locked"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
