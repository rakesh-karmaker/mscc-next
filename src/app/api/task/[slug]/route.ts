import prisma from "@/lib/prisma";
import getDate from "@/utils/getDate";
import { NextRequest, NextResponse } from "next/server";

type SubmissionFiltered = {
  username: string;
  submissionDate: Date | null;
  poster?: string | null;
  answer?: string | null;
  name?: string | null;
  image?: string | null;
  branch?: string | null;
  batch?: string | null;
};

type TaskWithFilteredSubmissions = {
  id: string;
  name: string;
  slug: string;
  summary: string | null;
  instructions: string | null;
  deadline: Date | null;
  category: string | null;
  createdAt: Date;
  first: string | null;
  second: string | null;
  third: string | null;
  imageRequired: boolean;
  submissions: SubmissionFiltered[];
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("user");

  const { slug } = await params;
  if (!username || !slug) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    // Find the task and filter the submissions
    const task = await prisma.tasks.findFirst({
      where: {
        slug: slug,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        summary: true,
        instructions: true,
        deadline: true,
        category: true,
        createdAt: true,
        first: true,
        second: true,
        third: true,
        imageRequired: true,
        submissions: true,
      },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const response: TaskWithFilteredSubmissions = task;

    // map the submissions so that the answer and poster is not sent to the client
    response.submissions = task.submissions.map((s) => {
      return s.username === username
        ? {
            username: s.username,
            submissionDate: s.submissionDate,
            poster: s.poster,
            answer: s.answer,
          }
        : {
            username: s.username,
            submissionDate: s.submissionDate,
          };
    });

    // add all the submitters info
    const submitters = task.submissions.map((s) => s.username);
    const members = await prisma.members.findMany({
      where: {
        slug: {
          in: submitters,
        },
      },
    });
    response.submissions.forEach((s) => {
      const member = members.find((m) => m.slug === s.username);
      if (member) {
        s.name = member.name;
        s.image = member.image;
        s.branch = member.branch;
        s.batch = member.batch;
      }
    });

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.log("Error fetching a task - ", getDate(), "\n---\n", err);
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
