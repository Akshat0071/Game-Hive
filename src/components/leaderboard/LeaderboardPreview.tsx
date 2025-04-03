
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, Trophy } from "lucide-react";

// Top players data
const TOP_PLAYERS = [
  {
    id: 1,
    name: "ProGamer123",
    avatar: "/placeholder.svg",
    rank: 1,
    game: "Valorant",
    points: 9875,
    change: 2
  },
  {
    id: 2,
    name: "ShadowHunter",
    avatar: "/placeholder.svg",
    rank: 2,
    game: "Apex Legends",
    points: 9564,
    change: -1
  },
  {
    id: 3,
    name: "NinjaWarrior",
    avatar: "/placeholder.svg",
    rank: 3, 
    game: "Call of Duty",
    points: 9320,
    change: 5
  },
  {
    id: 4,
    name: "StrategyMaster",
    avatar: "/placeholder.svg",
    rank: 4,
    game: "League of Legends",
    points: 9145,
    change: 0
  },
  {
    id: 5,
    name: "LegendarySniper",
    avatar: "/placeholder.svg",
    rank: 5,
    game: "CSGO",
    points: 8950,
    change: 3
  }
];

export function LeaderboardPreview() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Global Leaderboard</h2>
            <p className="text-muted-foreground mt-1">See who's ranking at the top this season</p>
          </div>
          <Button variant="link" className="text-gaming-primary hover:text-gaming-primary/90 p-0 h-auto mt-4 md:mt-0">
            View full leaderboard →
          </Button>
        </div>
        
        <Card className="border-gaming-primary/20">
          <CardHeader className="pb-4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Games</TabsTrigger>
                <TabsTrigger value="fps">FPS</TabsTrigger>
                <TabsTrigger value="moba">MOBA</TabsTrigger>
                <TabsTrigger value="battle-royale">Battle Royale</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {TOP_PLAYERS.map((player, index) => (
                <div 
                  key={player.id}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    index === 0 
                      ? 'bg-gaming-primary/10 border border-gaming-primary/20' 
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 text-center font-semibold">
                      {index === 0 ? (
                        <Trophy className="h-5 w-5 text-yellow-400 mx-auto" />
                      ) : (
                        <span>{player.rank}</span>
                      )}
                    </div>
                    
                    <Avatar>
                      <AvatarImage src={player.avatar} alt={player.name} />
                      <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-muted-foreground">{player.game}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-semibold">{player.points.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                    
                    {player.change !== 0 && (
                      <Badge 
                        variant="outline" 
                        className={`${
                          player.change > 0 
                            ? 'text-green-500 bg-green-500/10' 
                            : 'text-red-500 bg-red-500/10'
                        }`}
                      >
                        <ArrowUp 
                          className={`h-3 w-3 mr-1 ${player.change < 0 ? 'rotate-180' : ''}`} 
                        />
                        {Math.abs(player.change)}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
