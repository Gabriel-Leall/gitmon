import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import GitHubService from "@/lib/github-service";
import { getLeaderboard } from "@/lib/leaderboard";

// Helper function to get current week start (Monday 00:00)
function getCurrentWeekStart(): Date {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=domingo, 1=segunda
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - daysFromMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  return startOfWeek;
}

// Check and reset weekly XP for all users if needed
async function checkAndResetWeeklyXp() {
  const currentWeekStart = getCurrentWeekStart();

  // Check if any users have data from previous week
  const usersWithOldData = await prisma.user.count({
    where: {
      OR: [
        { weekStartDate: { lt: currentWeekStart } },
        { weekStartDate: null },
      ],
    },
  });

  if (usersWithOldData > 0) {
    console.log(
      `[Leaderboard] Resetting weeklyXp for ${usersWithOldData} users for new week`
    );

    await prisma.user.updateMany({
      where: {
        OR: [
          { weekStartDate: { lt: currentWeekStart } },
          { weekStartDate: null },
        ],
      },
      data: {
        weeklyXp: 0,
        weekStartDate: currentWeekStart,
      },
    });

    console.log("[Leaderboard] Weekly XP reset completed");
  }
}

// Force update weekly XP for top users
async function forceUpdateTopUsersWeeklyXp() {
  try {
    // Buscar top 50 usuários que já existem no banco
    const topUsers = await prisma.user.findMany({
      where: {
        githubUsername: { not: null },
        onboardingCompleted: true,
      },
      orderBy: [
        { xp: "desc" }, // Por XP total primeiro
        { weeklyXp: "desc" }, // Depois por XP semanal
        { lastXpUpdate: "desc" }, // Por último, atividade recente
      ],
      take: 50,
      select: {
        id: true,
        githubUsername: true,
        weeklyXp: true,
        accounts: {
          where: { provider: "github" },
          select: { access_token: true },
        },
      },
    });

    console.log(`[Force Sync] Atualizando ${topUsers.length} top users`);

    // Sync em paralelo (rápido)
    const results = await Promise.allSettled(
      topUsers.map(async (user) => {
        try {
          // Get GitHub access token if available
          const accessToken = user.accounts[0]?.access_token || undefined;
          const githubService = new GitHubService(accessToken);

          const newWeeklyXp = await githubService.getWeeklyXp(
            user.githubUsername!
          );

          await prisma.user.update({
            where: { id: user.id },
            data: {
              weeklyXp: newWeeklyXp,
              lastXpUpdate: new Date(),
              weekStartDate: getCurrentWeekStart(),
            },
          });

          return { username: user.githubUsername, weeklyXp: newWeeklyXp };
        } catch (error) {
          console.error(
            `[Force Sync] Erro para ${user.githubUsername}:`,
            error
          );
          return null;
        }
      })
    );

    const successful = results.filter(
      (r) => r.status === "fulfilled" && r.value
    ).length;
    console.log(
      `[Force Sync] ${successful}/${topUsers.length} usuários atualizados com sucesso`
    );

    return successful;
  } catch (error) {
    console.error("[Force Sync] Erro geral:", error);
    return 0;
  }
}

export async function GET(request: Request) {
  try {
    // Check and reset weekly XP if needed (automatic reset)
    await checkAndResetWeeklyXp();

    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "week";

    // 🆕 NOVO: Force sync dos top users para ranking semanal
    if (period === "week") {
      console.log(
        "[Leaderboard] Iniciando force sync dos top users para ranking semanal"
      );
      const syncedCount = await forceUpdateTopUsersWeeklyXp();
      console.log(
        `[Leaderboard] Force sync concluído: ${syncedCount} usuários atualizados`
      );
    }

    const limit = parseInt(searchParams.get("limit") || "50");
    const currentUserId = searchParams.get("userId") || undefined;

    // Usa o helper compartilhado
    const leaderboard = await getLeaderboard(
      limit,
      period as "week" | "month" | "all",
      currentUserId
    );

    return NextResponse.json({
      success: true,
      leaderboard,
      period,
      total: leaderboard.length,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
