"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import LeaderboardSection from "@/components/landing/LeaderboardSection";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1A1A2E" }}>
      <Navbar />

      {/* Main Container */}
      <div className="container mx-auto px-4 lg:px-8 min-h-[calc(100vh-64px)] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full py-12 lg:py-0">
          <HeroSection />
          <LeaderboardSection />
        </div>
      </div>
    </div>
  );
}
