import Link from "next/link";
import "./ProfileDetails.css";
import { RequestedUser } from "@/types/getServiceTypes";

const ProfileDetails = ({ data, isOwner }: {
  data: RequestedUser;
  isOwner: boolean;
}) => {
  const { name, role, position, batch, branch, reason } = data;

  return (
    <div className="user-info">
      <div className="user-name-position">
        <div className="user-name-container">
          <h1 className="user-name">{name}</h1>
          <p className="user-position">{position}</p>
        </div>
        {role === "admin" && isOwner && (
          <Link href="/admin/dashboard" className="primary-button">
            Admin Panel
          </Link>
        )}
      </div>

      <p className="user-school-info">
        SSC Batch: <span>{batch}</span>
      </p>

      <p className="user-school-info">
        School Branch: <span>{branch}</span>
      </p>

      <div>
        <p className="user-reason">Description:</p>
        <p className="user-reason-text">{reason}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
