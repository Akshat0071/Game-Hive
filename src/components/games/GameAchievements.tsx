import { Trophy, Lock, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  icon: string;
}

interface GameAchievementsProps {
  achievements: Achievement[];
}

const GameAchievements = ({ achievements }: GameAchievementsProps) => {
  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const completionPercentage = (unlockedAchievements / totalAchievements) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <h3 className="text-lg font-semibold">Achievements</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          {unlockedAchievements}/{totalAchievements} completed
        </div>
      </div>

      <Progress value={completionPercentage} className="h-2" />

      <div className="grid gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`flex items-start gap-4 p-4 rounded-lg border ${
              achievement.unlocked ? "bg-background" : "bg-muted/50"
            }`}
          >
            <div className="flex-shrink-0">
              {achievement.unlocked ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <Lock className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{achievement.title}</h4>
                <span className="text-sm text-muted-foreground">
                  {achievement.progress}/{achievement.maxProgress}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
              {!achievement.unlocked && (
                <Progress
                  value={(achievement.progress / achievement.maxProgress) * 100}
                  className="h-1"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameAchievements; 