import prisma from "@/lib/prisma";
import getDate from "@/utils/getDate";
import paginatedResults from "@/utils/paginatedResults";
import { NextRequest, NextResponse } from "next/server";

type getAllMembersRegex = {
  name: RegExp;
  role: RegExp;
  branch: RegExp;
  position?: RegExp;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const regex: getAllMembersRegex = {
    name: new RegExp(searchParams.get("name") || "", "i"),
    role: new RegExp(searchParams.get("role") || "", "i"),
    branch: new RegExp(searchParams.get("branch") || "", "i"),
  };
  if (
    searchParams.get("position") &&
    searchParams.get("position") === "executive"
  ) {
    // Create a regex that matches values except for the query value
    regex.position = new RegExp(`^(?!.*member).*$`, "i") || "";
  }
  const sorted: Record<string, "asc" | "desc"> = { id: "desc" };
  const memberProjection = {
    id: true,
    batch: true,
    branch: true,
    name: true,
    image: true,
    position: true,
    slug: true,
    new: true,
  };

  try {
    const members = await paginatedResults(
      searchParams,
      "members",
      regex,
      sorted,
      memberProjection
    );
    // count the admins
    members.adminLength = await prisma.members.count({
      where: { role: "admin" },
    });

    return NextResponse.json(members);
  } catch (err) {
    console.log("Error fetching all members - ", getDate(), "\n---\n", err);
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
