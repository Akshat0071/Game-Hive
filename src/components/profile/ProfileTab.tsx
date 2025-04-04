import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Save, X, Gamepad, Trophy, Clock, Star } from "lucide-react";
import { User } from "@/types/user";

interface ProfileTabProps {
  user: User;
}

export function ProfileTab({ user }: ProfileTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    bio: user.bio || "",
    displayName: user.displayName || user.username,
    location: user.location || "",
    website: user.website || "",
  });

  const handleSave = async () => {
    // TODO: Implement profile update logic
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData({
      bio: user.bio || "",
      displayName: user.displayName || user.username,
      location: user.location || "",
      website: user.website || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Manage your public profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Display Name</label>
              {isEditing ? (
                <Input
                  value={editedData.displayName}
                  onChange={(e) => setEditedData({ ...editedData, displayName: e.target.value })}
                />
              ) : (
                <p className="text-sm">{editedData.displayName}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              {isEditing ? (
                <Textarea
                  value={editedData.bio}
                  onChange={(e) => setEditedData({ ...editedData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-sm text-muted-foreground">{editedData.bio || "No bio provided"}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              {isEditing ? (
                <Input
                  value={editedData.location}
                  onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                  placeholder="Your location"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{editedData.location || "No location provided"}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Website</label>
              {isEditing ? (
                <Input
                  value={editedData.website}
                  onChange={(e) => setEditedData({ ...editedData, website: e.target.value })}
                  placeholder="Your website"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{editedData.website || "No website provided"}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel} className="flex-1">
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="flex-1">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Gaming Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Gaming Statistics</CardTitle>
          <CardDescription>Your gaming achievements and statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-4 p-4 rounded-lg border">
              <Gamepad className="h-8 w-8 text-gaming-primary" />
              <div>
                <p className="text-sm font-medium">Games Played</p>
                <p className="text-2xl font-bold">{user.stats.gamesPlayed}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg border">
              <Trophy className="h-8 w-8 text-gaming-primary" />
              <div>
                <p className="text-sm font-medium">Achievements</p>
                <p className="text-2xl font-bold">{user.stats.achievementsUnlocked}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg border">
              <Clock className="h-8 w-8 text-gaming-primary" />
              <div>
                <p className="text-sm font-medium">Total Playtime</p>
                <p className="text-2xl font-bold">{Math.floor(user.stats.totalPlaytime / 60)}h</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg border">
              <Star className="h-8 w-8 text-gaming-primary" />
              <div>
                <p className="text-sm font-medium">Average Score</p>
                <p className="text-2xl font-bold">{user.stats.averageScore}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest gaming sessions and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          {user.recentActivity && user.recentActivity.length > 0 ? (
            <div className="space-y-4">
              {user.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {activity.type === "achievement" ? (
                        <Trophy className="h-6 w-6 text-gaming-primary" />
                      ) : (
                        <Gamepad className="h-6 w-6 text-gaming-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{new Date(activity.timestamp).toLocaleDateString()}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No recent activity to display</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 