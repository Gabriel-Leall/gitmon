"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleSignIn = () => {
    signIn("github");
  };

  return (
    <nav
      className="border-b"
      style={{ borderColor: "#3A3A52", backgroundColor: "#1A1A2E" }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1
            className="font-logo text-2xl lg:text-3xl font-bold cursor-pointer"
            style={{ color: "#419D78" }}
            onClick={() => router.push("/")}
          >
            GitMon
          </h1>
          <div className="flex items-center gap-6">
            <button
              onClick={() => router.push("/features")}
              className="font-geist text-sm hover:opacity-80 transition-opacity"
              style={{ color: "#BDC2BF" }}
            >
              Features
            </button>
            <button
              onClick={() => router.push("/leaderboard")}
              className="font-geist text-sm hover:opacity-80 transition-opacity"
              style={{ color: "#BDC2BF" }}
            >
              Leaderboard
            </button>
            <Button
              size="sm"
              onClick={handleSignIn}
              className="rounded-full px-6 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#419D78", color: "#F8F9FA" }}
            >
              Link Start!
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
