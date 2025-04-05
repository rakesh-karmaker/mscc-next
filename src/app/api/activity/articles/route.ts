import prisma from "@/lib/prisma";
import getDate from "@/utils/getDate";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const articles = await prisma.activities.findMany({
      where: {
        tag: {
          in: ["Article"],
        },
      },
      orderBy: {
        date: "desc",
      },
      take: 3,
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
    return NextResponse.json(articles, { status: 200 });
  } catch (err) {
    console.log("Error fetching all articles - ", getDate(), "\n---\n", err);
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
