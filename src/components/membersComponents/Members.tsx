"use client";

import SearchInput from "@/components/UI/SearchInput/SearchInput";
import { useMember } from "@/context/membersProvider";
import "./Members.css";
import Loader from "@/components/UI/Loader/Loader";
import MembersContainer from "@/components/membersComponents/MembersContainer";
import React, { useEffect } from "react";

export default function Members(props: {
  showExecutives?: boolean;
  showAdmins?: boolean;
}) {
  const memberContext = useMember();

  if (!memberContext) {
    throw new Error("useMember must be used within a MembersProvider");
  }

  const {
    members,
    setSearch,
    page,
    setPage,
    branch,
    setBranch,
    length,
    isLoading,
    position,
    setPosition,
    role,
    setRole,
  } = memberContext;

  //reset search and branch when page reloads
  useEffect(() => {
    if (props?.showExecutives) {
      if (position !== "executive") {
        setPosition("executive");
        setRole("");
      }
    } else if (props?.showAdmins) {
      if (role !== "admin") {
        setRole("admin");
        setPosition("");
      }
    } else {
      setPosition("");
      setRole("");
    }

    setSearch("");
    setBranch("");
  }, [props, position, role, setPosition, setRole, setSearch, setBranch]);

  return (
    <>
      <main className="page-members">
        <h2 className="section-heading">
          Club <span className="highlighted-text">Members</span>
        </h2>

        <div className="filter-members">
          <SearchInput
            // search={search}
            setSearch={setSearch}
            style={{ maxWidth: "100%", flex: "1" }}
          >
            Search members
          </SearchInput>
          <BranchTags branch={branch} setBranch={setBranch} />
        </div>

        <section className="members-list-container">
          {isLoading ? (
            <Loader />
          ) : (
            <MembersContainer
              members={members}
              length={length}
              page={page}
              setPage={setPage}
              {...props}
            />
          )}
        </section>
      </main>
    </>
  );
}

const BranchTags = ({
  branch,
  setBranch,
}: {
  branch: string;
  setBranch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const branches = [
    "Branch - 1",
    "Branch - 2",
    "Branch - 3",
    "Main Boys",
    "Main Girls",
  ];

  return (
    <div className="branch-tags">
      {branches.map((branchName) => {
        return (
          <button
            type="button"
            key={branchName}
            className={`branch-tag ${branch === branchName ? "active" : ""}`}
            onClick={() => {
              if (branch === branchName) {
                setBranch("");
              } else {
                setBranch(branchName);
              }
            }}
          >
            {branchName}
          </button>
        );
      })}
    </div>
  );
};
