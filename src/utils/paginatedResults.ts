import prisma from "@/lib/prisma";
import getDate from "./getDate";

type ResultType = {
  totalLength: number;
  results: unknown[];
  selectedLength: number;
  adminLength?: number;
};

export default async function paginatedResults<
  T extends Record<string, unknown>
>(
  searchParams: URLSearchParams,
  model: keyof typeof prisma,
  regex: Record<string, RegExp>,
  sorted: Record<string, "asc" | "desc">,
  select: Record<string, boolean> | null = null
): Promise<ResultType> {
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "10", 10);
  const startIndex = (page - 1) * limit;

  const results: ResultType = {
    totalLength: 0,
    results: [],
    selectedLength: 0,
  };

  try {
    // Fetch all data from the Prisma model
    const allData = await (
      prisma[model] as unknown as {
        findMany: (args: {
          orderBy: typeof sorted;
          select?: typeof select;
        }) => Promise<T[]>;
      }
    ).findMany({
      orderBy: sorted,
      select: select || undefined,
    });

    // Filter data based on regex and query parameters
    const startsWithData = allData.filter((item) =>
      Object.keys(regex).every((key) => {
        const itemValue = (item[key] as string | undefined) ?? ""; // Default to an empty string
        const queryValue = searchParams.get(key) ?? ""; // Default to an empty string

        return (
          regex[key].test(itemValue) &&
          itemValue.toLowerCase().startsWith(queryValue.toLowerCase())
        );
      })
    );

    const includesData = allData.filter((item) =>
      Object.keys(regex).every((key) => {
        const itemValue = (item[key] as string | undefined) ?? ""; // Default to an empty string
        return regex[key].test(itemValue);
      })
    );

    // Combine and remove duplicates using a Map
    const uniqueMap = new Map<string, T>();
    [...startsWithData, ...includesData].forEach((item) => {
      const key = JSON.stringify(item); // Use JSON stringification to ensure uniqueness
      uniqueMap.set(key, item);
    });

    const selectedData = Array.from(uniqueMap.values());

    // Update results
    results.totalLength = allData.length;
    results.results = selectedData.slice(startIndex, startIndex + limit); // Paginate the results
    results.selectedLength = selectedData.length;

    return results;
  } catch (err) {
    console.error("Error paginating results - ", getDate(), "\n---\n", err);
    throw err;
  }
}
