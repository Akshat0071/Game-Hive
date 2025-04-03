
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedGames } from "@/components/home/FeaturedGames";
import { GameCategories } from "@/components/home/GameCategories";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { LeaderboardPreview } from "@/components/leaderboard/LeaderboardPreview";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedGames />
        <GameCategories />
        <UpcomingEvents />
        <LeaderboardPreview />
      </main>
      <Footer />
    </div>
  );
}
