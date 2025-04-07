import prisma from "@/lib/prisma";
import getDate from "@/utils/getDate";

export default async function getActivitiesContent() {
  const activityProjection = {
    id: true,
    title: true,
    slug: true,
    summary: true,
    coverImageUrl: true,
    date: true,
    tag: true,
  };
  try {
    const [events, articles] = await Promise.all([
      prisma.activities.findMany({
        where: { tag: { in: ["Event", "Workshop"] } },
        orderBy: { date: "desc" },
        take: 3,
        select: activityProjection,
      }),
      prisma.activities.findMany({
        where: { tag: { in: ["Article"] } },
        orderBy: { date: "desc" },
        take: 3,
        select: activityProjection,
      }),
    ]);

    return { events, articles };
  } catch (err) {
    console.log("Error fetching content - ", getDate(), "\n---\n", err);
    throw err;
  }
}
