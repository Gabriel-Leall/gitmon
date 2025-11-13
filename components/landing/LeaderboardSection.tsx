import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { monsters } from "@/lib/monsters";

function getMonsterSrc(id: number | null, fallbackIdx: number) {
  if (id !== null && monsters[id]) return monsters[id].src;
  return monsters[fallbackIdx % monsters.length].src;
}

export default async function LeaderboardSection() {
  const users = await prisma.user.findMany({
    where: {
      onboardingCompleted: true,
      selectedMonsterId: { not: null },
    },
    orderBy: [{ weeklyXp: "desc" }, { level: "desc" }, { lastXpUpdate: "desc" }],
    take: 5,
    select: {
      id: true,
      name: true,
      githubUsername: true,
      selectedMonsterId: true,
      level: true,
      weeklyXp: true,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#252541" }}>
        <div className="p-6 border-b" style={{ borderColor: "#3A3A52" }}>
          <h3 className="font-minecraftia text-2xl font-bold mb-2" style={{ color: "#F8F9FA" }}>
            Top Trainers
          </h3>
          <p className="font-geist text-sm" style={{ color: "#BDC2BF" }}>
            Best of the week
          </p>
        </div>

        <div className="p-6">
          {users.length === 0 ? (
            <div className="text-center" style={{ color: "#BDC2BF" }}>
              No trainers yet. Be the first!
            </div>
          ) : (
            <div className="space-y-3">
              {users.map((u, idx) => {
                const highlight = idx === 0;
                return (
                  <div
                    key={u.id}
                    className="flex items-center gap-4 p-4 rounded-lg"
                    style={{
                      backgroundColor: highlight ? "rgba(65, 157, 120, 0.1)" : "rgba(189, 194, 191, 0.05)",
                      border: highlight ? "1px solid rgba(65, 157, 120, 0.3)" : "1px solid rgba(58,58,82,0.3)",
                    }}
                  >
                    <div className="min-w-8 flex items-center justify-center font-bold" style={{ color: "#BDC2BF" }}>
                      #{idx + 1}
                    </div>
                    <div className="w-12 h-12 relative flex-shrink-0">
                      <Image
                        src={getMonsterSrc(u.selectedMonsterId, idx)}
                        alt="Monster"
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate" style={{ color: "#F8F9FA" }}>
                        @{u.githubUsername || u.name || "trainer"}
                      </div>
                      <div className="text-sm truncate" style={{ color: "#BDC2BF" }}>
                        Lv. {u.level}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold" style={{ color: "#444192" }}>
                        {u.weeklyXp.toLocaleString()} XP
                      </div>
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
