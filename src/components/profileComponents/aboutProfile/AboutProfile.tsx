"use client";

import React, { useState } from "react";
import "./AboutProfile.css";
import dateFormat from "@/utils/dateFormat";
import Link from "next/link";
import { RequestedUser } from "@/types/getServiceTypes";
import logoutAction from "@/actions/logoutAction";
import { useUser } from "@/context/userProvider";

const AboutProfile = ({
  data,
  isOwner,
  className,
}: {
  data: RequestedUser;
  isOwner: boolean;
  className?: string;
}) => {
  const socialLink = {
    Facebook: (
      <Link href={data.socialLink} className="profile-social-link">
        {data.socialLink.slice(0, 30) + "..."}
      </Link>
    ),
  };
  const { email } = data;
  const contact = {
    Email: <a href={`mailto:${email}`}>{email}</a>,
  };

  return (
    <div className={"about-profile" + " " + className}>
      <p className="about-profile-header">ABOUT</p>
      <ContactInformation info={contact}>
        Contact Information
      </ContactInformation>
      <ContactInformation info={socialLink}>Social Link</ContactInformation>

      <div className="about-info">
        <p className="about-basic-info">Account Created:</p>
        <p className="account-date">
          <span className="dot"></span> {dateFormat(data.createdAt.toString())}
        </p>
      </div>

      {isOwner ? <UtilityBtns /> : null}
    </div>
  );
};

const ContactInformation = ({
  info,
  children,
}: {
  info: Record<string, React.ReactNode>;
  children: React.ReactNode;
}) => {
  return (
    <div className="about-info">
      <p className="about-info-header">{children}</p>
      <InformationItem info={info} />
    </div>
  );
};

const InformationItem = ({
  info,
}: {
  info: Record<string, React.ReactNode>;
}) => {
  return (
    <>
      {Object.keys(info).map((key) => (
        <p key={key} className="about-info-item">
          <span className="about-info-key">{key}: </span>
          <span className="about-info-value">{info[key]}</span>
        </p>
      ))}
    </>
  );
};

const UtilityBtns = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const {setUser} = useUser();

  const copyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);

      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    }
  };

  const logout = async () => {
    if (setUser) {
        const response = await logoutAction();
        if (response.success) {
          setUser(null);
        }
    }
  };

  return (
    <div className="utility-btns">
      <button
        className="primary-button user-profile-link"
        onClick={copyLink}
        type="button"
      >
        {copySuccess ? "Link Copied!" : "Copy Profile Link"}
      </button>
      <button
        className="primary-button user-profile-link sign-out"
        onClick={logout}
        type="button"
      >
        Sign Out
      </button>
    </div>
  );
};

export default AboutProfile;
