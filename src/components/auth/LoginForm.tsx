import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { SocialLoginButtons } from "./SocialLoginButtons";

export function LoginForm() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      const mockUser = {
        id: "1",
        email: formData.email,
        username: "user123",
        isVerified: true,
        mfaEnabled: false,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        stats: {
          gamesPlayed: 0,
          totalPlaytime: 0,
          achievementsUnlocked: 0,
          highScores: 0,
        },
        preferences: {
          theme: "light",
          notifications: true,
          language: "en",
        },
      };

      login(mockUser);
    } catch (error) {
      toast.error("Failed to log in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual social login API call
      const mockUser = {
        id: "1",
        email: `${provider.toLowerCase()}@example.com`,
        username: `${provider.toLowerCase()}user`,
        isVerified: true,
        mfaEnabled: false,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        stats: {
          gamesPlayed: 0,
          totalPlaytime: 0,
          achievementsUnlocked: 0,
          highScores: 0,
        },
        preferences: {
          theme: "light",
          notifications: true,
          language: "en",
        },
      };

      login(mockUser);
    } catch (error) {
      toast.error(`Failed to log in with ${provider}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">Sign in to your account</p>
      </div>

      <SocialLoginButtons onLogin={handleSocialLogin} isLoading={isLoading} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={formData.rememberMe}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, rememberMe: checked as boolean })
              }
            />
            <Label htmlFor="rememberMe">Remember me</Label>
          </div>
          <Link
            to="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
