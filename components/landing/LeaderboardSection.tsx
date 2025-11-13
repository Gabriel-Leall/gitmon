import Image from "next/image";
import { getLeaderboard } from "@/lib/leaderboard";
import { monsters } from "@/lib/monsters";

function getMonsterSrc(id: number | null, fallbackIdx: number) {
  if (id !== null && monsters[id]) return monsters[id].src;
  return monsters[fallbackIdx % monsters.length].src;
}

export default async function LeaderboardSection() {
  // Usa o helper compartilhado
  const leaderboard = await getLeaderboard(5, "week");

  // Calcula o XP máximo para a barra de progresso
  const maxXp = leaderboard.length > 0 ? leaderboard[0].xp : 1;

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
          {leaderboard.length === 0 ? (
            <div className="text-center" style={{ color: "#BDC2BF" }}>
              No trainers yet. Be the first!
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((entry, idx) => {
                const highlight = idx === 0;
                const progressPercent = (entry.xp / maxXp) * 100;
                return (
                  <div
                    key={entry.id}
                    className="flex flex-col gap-2 p-4 rounded-lg"
                    style={{
                      backgroundColor: highlight
                        ? "rgba(65, 157, 120, 0.1)"
                        : "rgba(189, 194, 191, 0.05)",
                      border: highlight
                        ? "1px solid rgba(65, 157, 120, 0.3)"
                        : "1px solid rgba(58,58,82,0.3)",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="min-w-8 flex items-center justify-center font-bold"
                        style={{ color: "#BDC2BF" }}
                      >
                        #{entry.rank}
                      </div>
                      <div className="w-12 h-12 relative flex-shrink-0">
                        <Image
                          src={getMonsterSrc(entry.selectedMonsterId, idx)}
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
                          @{entry.githubUsername || entry.name}
                        </div>
                        <div
                          className="text-sm truncate"
                          style={{ color: "#BDC2BF" }}
                        >
                          {entry.rank_title} • Lv. {entry.level}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div
                          className="font-bold"
                          style={{ color: "rgba(68, 65, 146, 0.7)" }}
                        >
                          {entry.xp.toLocaleString()} XP
                        </div>
                        <div
                          className="text-xs hidden sm:block"
                          style={{ color: "#BDC2BF" }}
                        >
                          {entry.stats.commits} commits
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div
                      className="w-full h-2 rounded-full overflow-hidden"
                      style={{
                        backgroundColor: "#26283D",
                        border: "1px solid #ACACAC",
                      }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${entry.xpProgress.percentage}%`,
                          backgroundColor: "#444192",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
