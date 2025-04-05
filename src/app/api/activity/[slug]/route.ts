import prisma from "@/lib/prisma";
import getDate from "@/utils/getDate";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.pathname.split("/").pop(); // Extract the slug from the URL

  if (!slug) {
    return new Response("Activity not found", { status: 404 });
  }

  try {
    const activity = await prisma.activities.findFirst({
      where: { slug },
      select: {
        id: true,
        slug: true,
        title: true,
        summary: true,
        coverImageUrl: true,
        date: true,
        tag: true,
        content: true,
        gallery: true,
      },
    });

    if (!activity) {
      return new Response("Activity not found", { status: 404 });
    }

    const sameTags = await prisma.activities.findMany({
      where: {
        tag: activity.tag,
      },
      take: 10,
      select: {
        id: true,
        title: true,
        date: true,
        slug: true,
      },
    });

    return NextResponse.json({ activity, sameTags }, { status: 200 });
  } catch (err) {
    console.log("Error fetching activity - ", getDate(), "\n---\n", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        message: "Server error",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
