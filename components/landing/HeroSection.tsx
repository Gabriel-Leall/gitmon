"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FloatingIcon {
  id: number;
  type: "commit" | "pr" | "issue";
  x: number;
  y: number;
  delay: number;
}

interface XPText {
  id: number;
  value: string;
  x: number;
  y: number;
}

export default function HeroSection() {
  const router = useRouter();
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);
  const [xpTexts, setXpTexts] = useState<XPText[]>([]);
  const [randomMonster] = useState(() => {
    const monsters = [
      "monster-000.png",
      "monster-001-png.png",
      "monster-002-png.png",
      "monster-003-png.png",
      "monster-004-png.png",
      "monster-005-png.png",
      "monster-006-png.png",
      "monster-007.png",
      "monster-008.png",
    ];
    return monsters[Math.floor(Math.random() * monsters.length)];
  });

  useEffect(() => {
    const icons: FloatingIcon[] = [];
    const types: Array<"commit" | "pr" | "issue"> = ["commit", "pr", "issue"];

    for (let i = 0; i < 8; i++) {
      icons.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      });
    }

    setFloatingIcons(icons);

    // Generate XP texts periodically
    const xpInterval = setInterval(() => {
      const xpValues = ["+10", "+25", "+50", "+100", "+200"];
      const side = Math.random() > 0.5 ? 1 : -1; // Left or right side
      const newXP: XPText = {
        id: Date.now(),
        value: xpValues[Math.floor(Math.random() * xpValues.length)],
        x: 50 + side * (25 + Math.random() * 10), // 25-35% away from center, left or right
        y: 40 + Math.random() * 20, // Vertical variation
      };

      setXpTexts((prev) => [...prev, newXP]);

      // Remove XP text after animation
      setTimeout(() => {
        setXpTexts((prev) => prev.filter((xp) => xp.id !== newXP.id));
      }, 2000);
    }, 1500);

    return () => clearInterval(xpInterval);
  }, []);

  const handleSignIn = () => {
    signIn("github");
  };

  const getIconContent = (type: string) => {
    switch (type) {
      case "commit":
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="4" fill="#419D78" />
            <path
              d="M12 2V8M12 16V22M2 12H8M16 12H22"
              stroke="#419D78"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        );
      case "pr":
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="6"
              cy="6"
              r="3"
              stroke="#444192"
              strokeWidth="2.5"
              fill="#444192"
            />
            <circle cx="6" cy="18" r="3" stroke="#444192" strokeWidth="2.5" />
            <circle cx="18" cy="18" r="3" stroke="#444192" strokeWidth="2.5" />
            <path
              d="M6 9V15M18 15V12C18 9.79086 16.2091 8 14 8H6"
              stroke="#444192"
              strokeWidth="2.5"
            />
          </svg>
        );
      case "issue":
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="9" stroke="#BDC2BF" strokeWidth="2.5" />
            <circle cx="12" cy="12" r="2" fill="#BDC2BF" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <h2
        className="font-jetbrains text-4xl lg:text-5xl font-bold mb-6"
        style={{ color: "#F8F9FA" }}
      >
        Transform Your{" "}
        <span className="font-minecraftia" style={{ color: "#419D78" }}>
          Commits
        </span>{" "}
        into Monsters
      </h2>

      <p
        className="font-geist text-lg lg:text-xl mb-8 leading-relaxed"
        style={{ color: "#BDC2BF" }}
      >
        Join the community of developers who turn code into adventure. Earn XP
        for every commit, pull request, and GitHub contribution.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Button
          onClick={handleSignIn}
          size="lg"
          className="text-base px-8 py-6 font-semibold rounded-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#419D78", color: "#F8F9FA" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M12 0C5.373 0 0 5.373 0 12a12 12 0 008.207 11.385c.6.111.82-.261.82-.58 0-.287-.01-1.046-.016-2.054-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.809 1.304 3.495.996.108-.775.42-1.304.763-1.604-2.665-.305-5.466-1.332-5.466-5.932 0-1.31.469-2.38 1.236-3.22-.124-.303-.535-1.527.117-3.182 0 0 1.008-.323 3.3 1.23A11.48 11.48 0 0112 5.8c1.022.005 2.05.138 3.012.403 2.29-1.553 3.296-1.23 3.296-1.23.654 1.655.243 2.879.12 3.182.77.84 1.235 1.91 1.235 3.22 0 4.61-2.804 5.624-5.476 5.921.431.37.816 1.102.816 2.222 0 1.604-.014 2.896-.014 3.293 0 .321.216.696.825.578A12.003 12.003 0 0024 12c0-6.627-5.373-12-12-12z"
              clipRule="evenodd"
            />
          </svg>
          Get Started
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="text-base px-8 py-6 font-semibold rounded-lg hover:bg-opacity-10 transition-all"
          style={{ borderColor: "#419D78", color: "#419D78" }}
          onClick={() => router.push("/docs")}
        >
          How it Works
        </Button>
      </div>

      {/* Monster Animation Section */}
      <div
        className="relative w-full h-80 flex items-center justify-center overflow-hidden rounded-xl"
        style={{ backgroundColor: "#252541" }}
      >
        {/* Floating Icons */}
        {floatingIcons.map((icon) => (
          <div
            key={icon.id}
            className="absolute animate-float-to-center"
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              animationDelay: `${icon.delay}s`,
            }}
          >
            {getIconContent(icon.type)}
          </div>
        ))}

        {/* Monster in Center */}
        <div className="relative z-10">
          <img
            src={`/monsters/${randomMonster}`}
            alt="Monster"
            width={200}
            height={200}
            className="object-contain animate-bounce-slow"
          />
        </div>

        {/* XP Texts */}
        {xpTexts.map((xp) => (
          <div
            key={xp.id}
            className="absolute animate-xp-float font-bold text-2xl z-20"
            style={{
              left: `${xp.x}%`,
              top: `${xp.y}%`,
              color: "#419D78",
              textShadow: "0 0 10px rgba(65, 157, 120, 0.5)",
            }}
          >
            {xp.value} XP
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes floatToCenter {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(50vw / 2 - 50%), calc(40vh / 2 - 50%))
              scale(0.3);
            opacity: 0;
          }
        }

        @keyframes bounceSlow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes xpFloat {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 1;
            transform: translateY(-10px) scale(1);
          }
          100% {
            transform: translateY(-50px) scale(1.2);
            opacity: 0;
          }
        }

        :global(.animate-float-to-center) {
          animation: floatToCenter 3s ease-in-out infinite;
        }

        :global(.animate-bounce-slow) {
          animation: bounceSlow 2s ease-in-out infinite;
        }

        :global(.animate-xp-float) {
          animation: xpFloat 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
