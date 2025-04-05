import getDate from "@/utils/getDate";
import paginatedResults from "@/utils/paginatedResults";
import { NextRequest, NextResponse } from "next/server";

type Submission = {
  username: string;
  answer: string;
  poster: string;
  posterId: string;
  submissionDate: Date;
};

type Task = {
  id: string;
  slug: string;
  name: string;
  submissions: Submission[];
  first: string;
  second: string;
  third: string;
  category: string;
  createdAt: Date;
  deadline: Date;
  summary: string;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const regex = {
    name: new RegExp(searchParams.get("name") || "", "i"),
    category: new RegExp(searchParams.get("category") || "", "i"),
  };
  const sorted: Record<string, "asc" | "desc"> = { createdAt: "desc" };
  const taskProjection = {
    id: true,
    slug: true,
    name: true,
    submissions: true,
    first: true,
    second: true,
    third: true,
    category: true,
    createdAt: true,
    deadline: true,
    summary: true,
  };

  try {
    const paginatedTasks = await paginatedResults(
      searchParams,
      "tasks",
      regex,
      sorted,
      taskProjection
    );

    // reformat the tasks and remove the submissions data to reduce the response size
    const tasks = {
      ...paginatedTasks,
      results: (paginatedTasks.results as (Task | null)[]).map(
        (task: Task | null) => {
          if (!task) {
            return {};
          }
          const { submissions, ...result } = task;
          return {
            ...result,
            submissionCount: submissions?.length || 0,
          };
        }
      ),
    };

    return NextResponse.json(tasks, { status: 200 });
  } catch (err) {
    console.log("Error fetching all tasks - ", getDate(), "\n---\n", err);
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
