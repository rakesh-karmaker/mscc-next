"use client";

import "./MemberCard.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaUser, FaUserTie } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { RequestedMembers } from "@/types/getServiceTypes";
import MemberEditDialog from "@/components/admin/membersDashboard/memberEditDialog/MemberEditDialog";

const MemberCard = ({
  member,
  ...props
}: {
  member: RequestedMembers;
  showExecutives?: boolean;
  isAdmin?: boolean;
}) => {
  const router = useRouter();
  const { slug, name, branch, batch, image } = member;
  return (
    <div onClick={() => router.push(`/${slug}`)} className="member-card">
      <div className="role-icon">
        {member.position !== "member" ? (
          <FaUserTie className="executive" />
        ) : (
          <FaUser />
        )}
      </div>
      <div className="member-image-container">
        <LazyLoadImage src={image} alt={name} effect="blur" />
      </div>
      <div className="member-info">
        <h3>{name}</h3>
        {props?.showExecutives ? (
          <p>{props?.showExecutives && member.position}</p>
        ) : (
          <>
            <p>{branch}</p>
            <p>{batch}</p>
          </>
        )}
      </div>
      {props?.isAdmin && <MemberEditDialog member={member} {...props} />}
    </div>
  );
};

export default MemberCard;
