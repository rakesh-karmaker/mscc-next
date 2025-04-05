import prisma from "@/lib/prisma";
import getDate from "@/utils/getDate";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const members = await prisma.members.findMany();
    const topSubmitters = members
      .map((member) => ({
        id: member.id,
        name: member.name,
        branch: member.branch,
        batch: member.batch,
        slug: member.slug,
        image: member.image,
        tasksCompleted: member.submissions ? member.submissions.length : 0,
      }))
      .sort((a, b) => b.tasksCompleted - a.tasksCompleted)
      .slice(0, 10); // Adjust the number of top members you want to retrieve

    return NextResponse.json(topSubmitters, { status: 200 });
  } catch (err) {
    console.log("Error fetching top submitters - ", getDate(), "\n---\n", err);
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
