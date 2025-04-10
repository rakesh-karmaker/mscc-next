"use client";

import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllActivities } from "@/services/getService";
import useErrorNavigator from "@/hooks/useErrorNavigator";
import type { RequestedActivities } from "@/types/getServiceTypes";

interface ActivitiesContextType {
  //   allActivities: {
  //     results: RequestedActivities[];
  //     totalLength: number;
  //     selectedLength: number;
  //   };
  activities: RequestedActivities[];
  length: number;
  tag: string;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}

const ActivitiesContext = createContext<ActivitiesContextType | null>(null!);

const ActivitiesProvider = ({ children }: { children: React.ReactNode }) => {
  const [tag, setTag] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTag("");
  }, [search]);

  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: ["activities", page, tag, search],
    queryFn: () => {
      return getAllActivities(page, 12, tag, search);
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  useEffect(() => {
    setPage(1);
  }, [tag, search]);

  useEffect(() => {
    refetch();
  }, [page, search, tag, refetch]);

  useErrorNavigator(isError, error);
  //   if (error) return null;

  const activities = data?.data ? data.data.results : [];
  const length = data?.data?.selectedLength || 0;

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        length,
        tag,
        setTag,
        search,
        setSearch,
        page,
        setPage,
        isLoading,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
};

const useActivities = () => {
  const context = useContext(ActivitiesContext);

  if (context === undefined) {
    throw new Error("useActivities must be used within a ActivitiesProvider");
  }

  return context;
};

export { ActivitiesProvider, useActivities };
