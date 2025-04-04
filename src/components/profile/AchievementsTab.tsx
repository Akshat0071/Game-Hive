import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Lock, Star, Target, Zap, Crown } from "lucide-react";
import { User } from "@/types/user";

interface AchievementsTabProps {
  user: User;
}

const achievementIcons = {
  trophy: Trophy,
  star: Star,
  target: Target,
  zap: Zap,
  crown: Crown,
};

export function AchievementsTab({ user }: AchievementsTabProps) {
  const totalAchievements = user.achievements?.length || 0;
  const unlockedAchievements = user.achievements?.filter((a) => a.unlocked) || [];
  const completionPercentage = totalAchievements > 0 ? (unlockedAchievements.length / totalAchievements) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Achievement Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Achievement Progress</CardTitle>
          <CardDescription>Track your achievement completion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Overall Progress</p>
                <p className="text-2xl font-bold">
                  {unlockedAchievements.length} / {totalAchievements}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Completion</p>
                <p className="text-2xl font-bold">{Math.round(completionPercentage)}%</p>
              </div>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Achievement Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Your latest gaming accomplishments</CardDescription>
          </CardHeader>
          <CardContent>
            {unlockedAchievements.length > 0 ? (
              <div className="space-y-4">
                {unlockedAchievements
                  .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
                  .slice(0, 5)
                  .map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-4 p-4 rounded-lg border">
                      <div className="flex-shrink-0">
                        {achievement.icon && achievementIcons[achievement.icon as keyof typeof achievementIcons] ? (
                          React.createElement(achievementIcons[achievement.icon as keyof typeof achievementIcons], {
                            className: "h-6 w-6 text-gaming-primary",
                          })
                        ) : (
                          <Trophy className="h-6 w-6 text-gaming-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{achievement.title}</p>
                        <p className="text-sm text-muted-foreground truncate">{achievement.description}</p>
                      </div>
                      <Badge variant="outline" className="flex-shrink-0">
                        {new Date(achievement.unlockedAt!).toLocaleDateString()}
                      </Badge>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No achievements unlocked yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievement Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Achievement Stats</CardTitle>
            <CardDescription>Your achievement breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center space-x-4">
                  <Trophy className="h-6 w-6 text-gaming-primary" />
                  <div>
                    <p className="font-medium">Total Achievements</p>
                    <p className="text-sm text-muted-foreground">All available achievements</p>
                  </div>
                </div>
                <p className="text-2xl font-bold">{totalAchievements}</p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center space-x-4">
                  <Star className="h-6 w-6 text-gaming-primary" />
                  <div>
                    <p className="font-medium">Unlocked</p>
                    <p className="text-sm text-muted-foreground">Achievements earned</p>
                  </div>
                </div>
                <p className="text-2xl font-bold">{unlockedAchievements.length}</p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center space-x-4">
                  <Lock className="h-6 w-6 text-gaming-primary" />
                  <div>
                    <p className="font-medium">Locked</p>
                    <p className="text-sm text-muted-foreground">Achievements to unlock</p>
                  </div>
                </div>
                <p className="text-2xl font-bold">{totalAchievements - unlockedAchievements.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>All Achievements</CardTitle>
          <CardDescription>Complete list of available achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.achievements?.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  achievement.unlocked ? "border-gaming-primary/20" : "border-muted opacity-60"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {achievement.icon && achievementIcons[achievement.icon as keyof typeof achievementIcons] ? (
                      React.createElement(achievementIcons[achievement.icon as keyof typeof achievementIcons], {
                        className: `h-6 w-6 ${achievement.unlocked ? "text-gaming-primary" : "text-muted-foreground"}`,
                      })
                    ) : (
                      <Trophy
                        className={`h-6 w-6 ${
                          achievement.unlocked ? "text-gaming-primary" : "text-muted-foreground"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{achievement.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{achievement.description}</p>
                    {achievement.unlocked && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Unlocked {new Date(achievement.unlockedAt!).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 