import getDate from "@/utils/getDate";
import paginatedResults from "@/utils/paginatedResults";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const regex = {
    name: new RegExp(searchParams.get("name") || "", "i"),
  };
  const sorted: Record<string, "asc" | "desc"> = { id: "desc" };
  try {
    const messages = await paginatedResults(
      searchParams,
      "messages",
      regex,
      sorted
    );
    return NextResponse.json(messages, { status: 200 });
  } catch (err) {
    console.log("Error fetching all messages - ", getDate(), "\n---\n", err);
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
