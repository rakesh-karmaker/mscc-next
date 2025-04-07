import PrimaryBtn from "@/components/UI/PrimaryBtn";
import "./ClubDesc.css";
import React from "react";
import { GiBrain } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";

const ClubDescription = (): React.ReactNode => {
  return (
    <div className="club-description">
      <p>Join</p>
      <h2>
        Unlock Your Potential with{" "}
        <span className="highlighted-text">MSCSC</span>
      </h2>
      <p className="secondary-text">
        Joining MSCSC offers essential skill development and valuable
        educational resources. This community enhances your personal and
        professional skills while connecting you with growth-oriented
        individuals. It fosters networking and shared insights, enriching your
        experience and broadening your horizons.
      </p>

      <div className="benefits-container row-center">
        <Benefit
          title="Skill Development"
          icon={<GiBrain className="benefit-icon" />}
        >
          Boost your skills and knowledge with engaging hands-on projects and
          workshops designed to accommodate all levels of expertise.
        </Benefit>

        <Benefit
          title="Community Support"
          icon={<HiUserGroup className="benefit-icon" />}
        >
          Engage with fellow enthusiasts and experienced mentors who share your
          deep passion for both science and technology innovation.
        </Benefit>
      </div>
      <PrimaryBtn link="https://www.facebook.com/MSCSC2014" name="Facebook">
        Join now
      </PrimaryBtn>
    </div>
  );
};

const Benefit = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="benefit">
      {icon}
      <h3>{title}</h3>
      <p className="secondary-text">{children}</p>
    </div>
  );
};

export default ClubDescription;
