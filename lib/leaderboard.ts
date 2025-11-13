import { prisma } from "./prisma";
import { getUserRank, calculateXpForLevel, calculateLevel } from "./xp-system";

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  githubUsername: string | null;
  selectedMonsterId: number | null;
  level: number;
  xp: number;
  dailyXp: number;
  weeklyXp: number;
  totalXp: number;
  rank_title: string;
  xpProgress: {
    current: number;
    required: number;
    percentage: number;
  };
  stats: {
    commits: number;
    prs: number;
    stars: number;
    streak: number;
  };
  lastActive: Date | null;
  isCurrentUser?: boolean;
}

export async function getLeaderboard(
  limit: number = 50,
  period: "week" | "month" | "all" = "week",
  currentUserId?: string
): Promise<LeaderboardEntry[]> {
  const orderBy =
    period === "week"
      ? [
          { weeklyXp: "desc" as const },
          { level: "desc" as const },
          { lastXpUpdate: "desc" as const },
        ]
      : [
          { xp: "desc" as const },
          { level: "desc" as const },
          { lastXpUpdate: "desc" as const },
        ];

  const users = await prisma.user.findMany({
    where: {
      onboardingCompleted: true,
      selectedMonsterId: { not: null },
    },
    orderBy,
    take: limit,
    select: {
      id: true,
      name: true,
      githubUsername: true,
      selectedMonsterId: true,
      level: true,
      xp: true,
      dailyXp: true,
      weeklyXp: true,
      totalCommits: true,
      totalPRs: true,
      totalStars: true,
      currentStreak: true,
      lastXpUpdate: true,
    },
  });

  const leaderboard: LeaderboardEntry[] = users.map((user, index) => {
    const currentLevelXp = calculateXpForLevel(user.level);
    const nextLevelXp = calculateXpForLevel(user.level + 1);
    const xpInCurrentLevel = user.xp - currentLevelXp;
    const xpRequiredForLevel = nextLevelXp - currentLevelXp;
    const progressPercentage =
      xpRequiredForLevel > 0
        ? (xpInCurrentLevel / xpRequiredForLevel) * 100
        : 0;

    return {
      rank: index + 1,
      id: user.id,
      name: user.name || user.githubUsername || "Anonymous",
      githubUsername: user.githubUsername,
      selectedMonsterId: user.selectedMonsterId,
      level: user.level,
      xp: period === "week" ? user.weeklyXp : user.xp,
      dailyXp: user.dailyXp,
      weeklyXp: user.weeklyXp,
      totalXp: user.xp,
      rank_title: getUserRank(user.level),
      xpProgress: {
        current: xpInCurrentLevel,
        required: xpRequiredForLevel,
        percentage: Math.min(100, Math.max(0, progressPercentage)),
      },
      stats: {
        commits:
          period === "week" ? Math.floor(user.weeklyXp / 5) : user.totalCommits,
        prs: period === "week" ? Math.floor(user.weeklyXp / 40) : user.totalPRs,
        stars: user.totalStars,
        streak: user.currentStreak,
      },
      lastActive: user.lastXpUpdate,
    };
  });

  // Se o usuário atual não está no top, busca ele separadamente
  if (currentUserId && !users.find((u) => u.id === currentUserId)) {
    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserId },
      select: {
        id: true,
        name: true,
        githubUsername: true,
        selectedMonsterId: true,
        level: true,
        xp: true,
        dailyXp: true,
        weeklyXp: true,
        totalCommits: true,
        totalPRs: true,
        totalStars: true,
        currentStreak: true,
        lastXpUpdate: true,
        onboardingCompleted: true,
      },
    });

    if (
      currentUser &&
      currentUser.onboardingCompleted &&
      currentUser.selectedMonsterId !== null
    ) {
      // Calcula rank real
      const userRank =
        (await prisma.user.count({
          where: {
            onboardingCompleted: true,
            selectedMonsterId: { not: null },
            OR:
              period === "week"
                ? [
                    { weeklyXp: { gt: currentUser.weeklyXp } },
                    {
                      weeklyXp: currentUser.weeklyXp,
                      level: { gt: currentUser.level },
                    },
                    {
                      weeklyXp: currentUser.weeklyXp,
                      level: currentUser.level,
                      lastXpUpdate: { gt: currentUser.lastXpUpdate },
                    },
                  ]
                : [
                    { xp: { gt: currentUser.xp } },
                    {
                      xp: currentUser.xp,
                      level: { gt: currentUser.level },
                    },
                    {
                      xp: currentUser.xp,
                      level: currentUser.level,
                      lastXpUpdate: { gt: currentUser.lastXpUpdate },
                    },
                  ],
          },
        })) + 1;

      const currentUserEntry: LeaderboardEntry = {
        rank: userRank,
        id: currentUser.id,
        name: currentUser.name || currentUser.githubUsername || "Anonymous",
        githubUsername: currentUser.githubUsername,
        selectedMonsterId: currentUser.selectedMonsterId,
        level: currentUser.level,
        xp: period === "week" ? currentUser.weeklyXp : currentUser.xp,
        dailyXp: currentUser.dailyXp,
        weeklyXp: currentUser.weeklyXp,
        totalXp: currentUser.xp,
        rank_title: getUserRank(currentUser.level),
        xpProgress: {
          current: currentUser.xp - calculateXpForLevel(currentUser.level),
          required:
            calculateXpForLevel(currentUser.level + 1) -
            calculateXpForLevel(currentUser.level),
          percentage: Math.min(
            100,
            Math.max(
              0,
              ((currentUser.xp - calculateXpForLevel(currentUser.level)) /
                (calculateXpForLevel(currentUser.level + 1) -
                  calculateXpForLevel(currentUser.level))) *
                100
            )
          ),
        },
        stats: {
          commits:
            period === "week"
              ? Math.floor(currentUser.weeklyXp / 5)
              : currentUser.totalCommits,
          prs:
            period === "week"
              ? Math.floor(currentUser.weeklyXp / 40)
              : currentUser.totalPRs,
          stars: currentUser.totalStars,
          streak: currentUser.currentStreak,
        },
        lastActive: currentUser.lastXpUpdate,
        isCurrentUser: true,
      };

      leaderboard.push(currentUserEntry);
    }
  }

  return leaderboard;
}
