"use client";

import Image from "next/image";
import { monsters } from "@/lib/monsters";

export default function LeaderboardSection() {
  return (
    <div className="flex flex-col">
      <div
        className="rounded-xl overflow-hidden"
        style={{ backgroundColor: "#252541" }}
      >
        <div className="p-6 border-b" style={{ borderColor: "#3A3A52" }}>
          <h3
            className="font-minecraftia text-2xl font-bold mb-2"
            style={{ color: "#F8F9FA" }}
          >
            Top Trainers
          </h3>
          <p className="font-geist text-sm" style={{ color: "#BDC2BF" }}>
            Best of the week
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {/* Leaderboard Entry #1 */}
            <div
              className="flex items-center gap-4 p-4 rounded-lg"
              style={{
                backgroundColor: "rgba(65, 157, 120, 0.1)",
                border: "1px solid rgba(65, 157, 120, 0.3)",
              }}
            >
              <div
                className="min-w-8 flex items-center justify-center font-bold"
                style={{ color: "#BDC2BF" }}
              >
                #1
              </div>
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src={monsters[1]?.src || monsters[0].src}
                  alt="Monster"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="font-semibold truncate"
                  style={{ color: "#F8F9FA" }}
                >
                  @johndoe
                </div>
                <div className="text-sm truncate" style={{ color: "#BDC2BF" }}>
                  Charizard • Lv. 25
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold" style={{ color: "#444192" }}>
                  12,450 XP
                </div>
                <div
                  className="text-xs hidden sm:block"
                  style={{ color: "#BDC2BF" }}
                >
                  127 commits
                </div>
              </div>
            </div>

            {/* Leaderboard Entry #2 */}
            <div
              className="flex items-center gap-4 p-4 rounded-lg"
              style={{ backgroundColor: "rgba(189, 194, 191, 0.05)" }}
            >
              <div
                className="min-w-8 flex items-center justify-center font-bold"
                style={{ color: "#BDC2BF" }}
              >
                #2
              </div>
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src={monsters[2]?.src || monsters[0].src}
                  alt="Monster"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="font-semibold truncate"
                  style={{ color: "#F8F9FA" }}
                >
                  @janedoe
                </div>
                <div className="text-sm truncate" style={{ color: "#BDC2BF" }}>
                  Blastoise • Lv. 23
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold" style={{ color: "#444192" }}>
                  11,890 XP
                </div>
                <div
                  className="text-xs hidden sm:block"
                  style={{ color: "#BDC2BF" }}
                >
                  98 commits
                </div>
              </div>
            </div>

            {/* Leaderboard Entry #3 */}
            <div
              className="flex items-center gap-4 p-4 rounded-lg"
              style={{ backgroundColor: "rgba(189, 194, 191, 0.05)" }}
            >
              <div
                className="min-w-8 flex items-center justify-center font-bold"
                style={{ color: "#BDC2BF" }}
              >
                #3
              </div>
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src={monsters[3]?.src || monsters[0].src}
                  alt="Monster"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="font-semibold truncate"
                  style={{ color: "#F8F9FA" }}
                >
                  @devmaster
                </div>
                <div className="text-sm truncate" style={{ color: "#BDC2BF" }}>
                  Venusaur • Lv. 22
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold" style={{ color: "#444192" }}>
                  10,234 XP
                </div>
                <div
                  className="text-xs hidden sm:block"
                  style={{ color: "#BDC2BF" }}
                >
                  156 commits
                </div>
              </div>
            </div>

            {/* Leaderboard Entry #4 */}
            <div
              className="flex items-center gap-4 p-4 rounded-lg"
              style={{ backgroundColor: "rgba(189, 194, 191, 0.05)" }}
            >
              <div
                className="min-w-8 flex items-center justify-center font-bold"
                style={{ color: "#BDC2BF" }}
              >
                #4
              </div>
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src={monsters[4]?.src || monsters[0].src}
                  alt="Monster"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="font-semibold truncate"
                  style={{ color: "#F8F9FA" }}
                >
                  @codewizard
                </div>
                <div className="text-sm truncate" style={{ color: "#BDC2BF" }}>
                  Pikachu • Lv. 20
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold" style={{ color: "#444192" }}>
                  9,567 XP
                </div>
                <div
                  className="text-xs hidden sm:block"
                  style={{ color: "#BDC2BF" }}
                >
                  89 commits
                </div>
              </div>
            </div>

            {/* Leaderboard Entry #5 */}
            <div
              className="flex items-center gap-4 p-4 rounded-lg"
              style={{ backgroundColor: "rgba(189, 194, 191, 0.05)" }}
            >
              <div
                className="min-w-8 flex items-center justify-center font-bold"
                style={{ color: "#BDC2BF" }}
              >
                #5
              </div>
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src={monsters[5]?.src || monsters[0].src}
                  alt="Monster"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="font-semibold truncate"
                  style={{ color: "#F8F9FA" }}
                >
                  @frontendfan
                </div>
                <div className="text-sm truncate" style={{ color: "#BDC2BF" }}>
                  Dragonite • Lv. 19
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold" style={{ color: "#444192" }}>
                  8,921 XP
                </div>
                <div
                  className="text-xs hidden sm:block"
                  style={{ color: "#BDC2BF" }}
                >
                  134 commits
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
