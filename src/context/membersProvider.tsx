"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllMembers } from "@/services/getService";
import { useQuery } from "@tanstack/react-query";
import useErrorNavigator from "@/hooks/useErrorNavigator";
import type { RequestedMembers } from "@/types/getServiceTypes";

interface MemberContextType {
  response: {
    results: RequestedMembers[];
    selectedLength: number;
    adminLength: number;
    totalLength: number;
  } | null;
  members: RequestedMembers[] | null;
  isLoading: boolean;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  branch: string;
  setBranch: React.Dispatch<React.SetStateAction<string>>;
  length: number;
  role: string;
  position: string;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
}
const MemberContext = createContext<MemberContextType | null>(null);

const MemberProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [branch, setBranch] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    setBranch("");
    setPage(1);
  }, [search, role, position]);

  useEffect(() => {
    setPage(1);
  }, [branch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["members", page, search, role, branch, position],
    queryFn: () => getAllMembers(page, 12, search, role, branch, position),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useErrorNavigator(isError, error);

  const response = data?.data ?? null;
  const members = data?.data?.results ?? null;
  const length = data?.data?.selectedLength || 0;

  console.log(response);

  return (
    <MemberContext.Provider
      value={{
        response,
        members,
        isLoading,
        search,
        setSearch,
        page,
        setPage,
        setRole,
        branch,
        setBranch,
        length,
        role,
        position,
        setPosition,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};

const useMember = () => {
  const context = useContext(MemberContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};

export { MemberProvider, useMember };
