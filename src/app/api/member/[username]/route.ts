import prisma from "@/lib/prisma";
import getDate from "@/utils/getDate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const username = url.pathname.split("/").pop(); // Extract the username from the URL

  if (!username) {
    return new Response("Username not found", { status: 404 });
  }

  const memberProjection = {
    id: true,
    slug: true,
    name: true,
    email: true,
    role: true,
    batch: true,
    branch: true,
    position: true,
    image: true,
    timeline: true,
    createdAt: true,
    socialLink: true,
  };

  try {
    // fetch member
    const member = await prisma.members.findFirst({
      where: { slug: username },
      select: memberProjection,
    });
    if (!member) {
      return new Response("Member not found", { status: 404 });
    }

    member.id = member.id.toString();
    return new Response(JSON.stringify(member), { status: 200 });
  } catch (err) {
    console.log("Error fetching member - ", getDate(), "\n---\n", err);
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
