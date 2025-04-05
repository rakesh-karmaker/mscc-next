import prisma from "@/lib/prisma";
import getDate from "@/utils/getDate";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await prisma.activities.findMany({
      where: {
        tag: {
          in: ["Event", "Workshop"],
        },
      },
      orderBy: {
        date: "desc",
      },
      take: 8,
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        coverImageUrl: true,
        date: true,
        tag: true,
      },
    });
    return NextResponse.json(events, { status: 200 });
  } catch (err) {
    console.log("Error fetching all events - ", getDate(), "\n---\n", err);
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
