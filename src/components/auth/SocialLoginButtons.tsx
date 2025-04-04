import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface SocialLoginButtonsProps {
  onLogin: (provider: string) => void;
  isLoading?: boolean;
}

export function SocialLoginButtons({
  onLogin,
  isLoading = false,
}: SocialLoginButtonsProps) {
  const handleSocialLogin = async (provider: string) => {
    try {
      await onLogin(provider);
      toast.success(`Signed in with ${provider} successfully!`);
    } catch (error) {
      toast.error(`Failed to sign in with ${provider}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSocialLogin("Github")}
          disabled={isLoading}
        >
          <Github className="h-5 w-5 mr-2" />
          Github
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSocialLogin("Discord")}
          disabled={isLoading}
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          Discord
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
    </div>
  );
} 