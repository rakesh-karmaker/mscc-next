import SearchInput from "@/components/UI/SearchInput/SearchInput";
import ActivityNavLink from "@/layouts/activitiesNavBar/ActivityNavLink";
import "./ActivitiesNavBar.css";
import { FaCalendarAlt, FaChalkboardTeacher, FaNewspaper, FaTrophy } from "react-icons/fa";
import React from "react";

const ActivitiesNavbar = ({ tag, setTag, search, setSearch, ...rest }: {
  tag: string,
  setTag: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  admin?: boolean
}) => {
  const capitalizeName = tag.charAt(0).toUpperCase() + tag.slice(1) + "s";
  const icons = {
    Event: <FaCalendarAlt />,
    Workshop: <FaChalkboardTeacher />,
    Article: <FaNewspaper />,
    Achievement: <FaTrophy />,
  };

  return (
    <>
      <div className="activities-navbar">
        <h1>
          All{" "}
          <span className="highlighted-text">
            {tag === "" ? "Activities" : capitalizeName}
          </span>
        </h1>
        <menu>
          {Object.keys(icons).map((icon) => {
            return (
              <ActivityNavLink
                name={icon}
                key={icon}
                active={tag === icon}
                setTag={setTag}
                search={search}
                {...rest}
              >
               {icons[icon as keyof typeof icons]}
              </ActivityNavLink>
            );
          })}
        </menu>
        <SearchInput setSearch={setSearch}>
          Search Activity
        </SearchInput>
      </div>
    </>
  );
};

export default ActivitiesNavbar;
