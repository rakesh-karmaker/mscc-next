import MemberCard from "@/components/membersComponents/memberCard/MemberCard";
import EmptyData from "@/components/UI/EmptyData/EmptyData";
import PaginationContainer from "@/components/UI/Pagination/Pagination";
import type { RequestedMembers } from "@/types/getServiceTypes";
import React from "react";

type MembersContainerProps = {
  members: RequestedMembers[] | null;
  length: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const MembersContainer = ({
  members,
  length,
  page,
  setPage,
  ...props
}: MembersContainerProps) => {
  if (length === 0) return <EmptyData />;
  return (
    <>
      <div className="members-container">
        {members?.map((member) => {
          return (
            <MemberCard
              key={member.id + member.slug}
              member={member}
              {...props}
            />
          );
        })}
      </div>
      <PaginationContainer
        length={length}
        elementsPerPage={12}
        currentPage={page}
        setPage={setPage}
      />
    </>
  );
};

export default MembersContainer;
