import getDate from "@/utils/getDate";
import paginatedResults from "@/utils/paginatedResults";
import { NextRequest, NextResponse } from "next/server";

type getAllActivitiesRegex = {
  title: RegExp;
  tag: RegExp;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const regex: getAllActivitiesRegex = {
    title: new RegExp(searchParams.get("title") || "", "i"),
    tag: new RegExp(searchParams.get("tag") || "", "i"),
  };

  const sorted: Record<string, "asc" | "desc"> = { date: "desc" };
  const activityProjection = {
    id: true,
    slug: true,
    coverImageUrl: true,
    date: true,
    summary: true,
    title: true,
    tag: true,
  };

  try {
    const activities = await paginatedResults(
      searchParams,
      "activities",
      regex,
      sorted,
      activityProjection
    );
    return NextResponse.json(activities, { status: 200 });
  } catch (err) {
    console.log("Error fetching all activities - ", getDate(), "\n---\n", err);
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
