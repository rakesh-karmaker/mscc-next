"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useErrorNavigator(
  isError: boolean,
  error: (Error & { status?: number }) | null
) {
  const router = useRouter();
  useEffect(() => {
    if (isError) {
      if (error?.status === 400) {
        router.push("/400");
      }
      if (error?.status === 401) {
        router.push("/401");
      }
      if (error?.status === 404) {
        router.push("/404");
      }
      if (error?.status === 500) {
        router.push("/500");
      }
      if (error?.status === null || error?.status === undefined) {
        router.push("/500");
      }
    }
  }, [isError, error, router]);
}
