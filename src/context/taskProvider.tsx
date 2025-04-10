"use client";

import useErrorNavigator from "@/hooks/useErrorNavigator";
import { getAllTasks } from "@/services/getService";
import type { RequestedTasks } from "@/types/getServiceTypes";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ActivitiesContextType {
  tasks: RequestedTasks[];
  length: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  response: {
    results: RequestedTasks[];
    selectedLength: number;
    totalLength: number;
  };
  refetch: () => void;
}

const TaskContext = createContext<ActivitiesContextType | null>(null);

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    setPage(1);
    setCategory("");
  }, [search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["tasks", page, search, category],
    queryFn: () => getAllTasks(page, 12, search, category),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useErrorNavigator(isError, error);

  useEffect(() => {
    refetch();
  }, [page, search, category, refetch]);

  const response = data?.data || {
    results: [],
    selectedLength: 0,
    totalLength: 0,
  };
  const tasks = data?.data?.results || [];
  const length = data?.data?.selectedLength || 0;

  return (
    <TaskContext.Provider
      value={{
        tasks,
        length,
        page,
        setPage,
        search,
        setSearch,
        category,
        setCategory,
        isLoading,
        response,
        refetch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useTask = () => {
  const context = useContext(TaskContext);

  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }

  return context;
};

export { TaskProvider, useTask };
