import Link from "next/link";
import React from "react";

const ActivityNavLink = (props: {
  name: string;
  children: React.ReactNode;
  active: boolean;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  admin?: boolean
}) => {
  const { name, children, active, setTag, search } = props;
  const capitalizeName = name.charAt(0).toUpperCase() + name.slice(1);
  const url = props?.admin ? "/admin/activities" : "/activities";

  return (
    <li>
      <Link
        className={"activities-nav-link" + (active ? " active" : "")}
        nav-type={name}
        href={active && search === "" ? url : `${url}?tag=${name}`}
        aria-label={`Sort the activities by ${capitalizeName}`}
        onClick={() => (search !== "" ? setTag(name) : active && setTag(""))}
      >
        {children} <span>{capitalizeName}</span>
      </Link>
    </li>
  );
};

export default ActivityNavLink;
