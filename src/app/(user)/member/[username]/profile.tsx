"use client";

import React, { useState, useEffect } from "react";
import AboutProfile from "@/components/profileComponents/aboutProfile/AboutProfile";
import Timeline from "@/components/profileComponents/timeline/Timeline";
import "./Profile.css";
import TimelineInputs from "@/components/UI/TimelineInputs/TimelineInputs";
import ProfileDetails from "@/components/profileComponents/profileDetails/ProfileDetails";
import { useUser } from "@/context/userProvider";
import { RequestedUser } from "@/types/getServiceTypes";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import UserEditForm from "./userEditForm";

export default function ProfilePage({ member }: { member: RequestedUser }) {

  const { user } = useUser();
  const isOwner = user?.slug === member.slug;
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsEditing(false);
  }, [isOwner, member]);

  const [profileData, setProfileData] = useState<RequestedUser>(member);

  return (
    <>
      <main id="profile" className="row-center">
        <div className="profile-container">
          <div className="profile-left">
            <Image
              src={profileData.image}
              alt={profileData.name}
              rel="preload"
              fetchPriority="high"
              width={380}
              height={380}
            />
            <AboutProfile
              data={profileData}
              isOwner={isOwner}
              className={"desktop-about-profile"}
            />
          </div>
          <div className="profile-right">
            <ProfileDetails data={profileData} isOwner={isOwner} />
            <AboutProfile
              data={profileData}
              isOwner={isOwner}
              className={"mobile-about-profile"}
            />
            <div className="profile-actions-container">
              <div className="profile-actions">
                <button
                  onClick={() => setIsEditing(false)}
                  className={isEditing ? "" : "active"}
                >
                  <FaEye /> <span>Timeline</span>
                </button>
                {isOwner && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className={isEditing ? "active" : ""}
                  >
                    <MdEdit />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
              <div className="profile-timeline-edit-container">
                {isEditing ? (
                  isOwner && (
                    <>
                      <UserEditForm
                        data={{
                          id: profileData.id,
                          name: profileData.name,
                          email: profileData.email,
                          password: "",
                          contactNumber: profileData.contactNumber || "",
                          batch: profileData.batch,
                          branch: profileData.branch,
                          description: profileData.reason,
                          facebookLink: profileData.socialLink,
                        }}
                        setProfileData={setProfileData}
                      />
                      <TimelineInputs
                        timeline={profileData.timeline}
                        user={user}
                        setIsEditing={setIsEditing}
                        setProfileData={setProfileData}
                      />
                    </>
                  )
                ) : (
                  <Timeline timelineData={profileData.timeline} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

ProfilePage.displayName = 'ProfilePage';
