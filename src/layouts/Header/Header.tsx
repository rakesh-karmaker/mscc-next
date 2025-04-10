"use client";

import "./Header.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import PrimaryBtn from "@/components/UI/PrimaryBtn";
import Avatar from "@/components/UI/Avatar";
import { HiOutlineXMark } from "react-icons/hi2";
import { FaBars } from "react-icons/fa6";
import Link from "next/link";
import { useUser } from "@/context/userProvider";
import Image from "next/image";

const Header = () => {
  const navBar = useRef<HTMLUListElement | null>(null);
  const [isOpened, setIsOpened] = useState(false);

  const navLinks = useMemo(
    () => [
      {
        href: "/",
        name: "Home",
      },
      {
        href: "/about",
        name: "About Us",
      },
      {
        href: "/members",
        name: "Members",
      },
      {
        href: "/tasks",
        name: "Tasks",
      },
      {
        href: "/activities",
        name: "Activities",
      },
      {
        href: "/contact",
        name: "Contact",
      },
    ],
    []
  );

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 800) {
      navLinks.push({
        href: "/executives",
        name: "Executives",
      });
    }
  }, [navLinks]);

  const handelNavLinkClick = () => {
    handleNavbarTogglerClick({
      navbar: navBar as React.RefObject<HTMLUListElement>,
      isOpened,
      setIsOpened,
    });
  };

  const { user } = useUser();

  return (
    <header id="header">
      <nav>
        <Link href="/" id="logo">
          <Image src="/logo.webp" alt="MSCSC logo" width={100} height={100} />
        </Link>

        <ul className="nav-links-container" ref={navBar}>
          {navLinks.map(({ href, name }, index) => {
            return (
              <li key={index} className="nav-link">
                <Link
                  href={href}
                  // className="nav-link"
                  onClick={handelNavLinkClick}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="header-right">
          {user !== null ? (
            <Avatar />
          ) : (
            <PrimaryBtn link="/auth/login" name="Login page" header={true}>
              Login
            </PrimaryBtn>
          )}
          {typeof window !== "undefined" && window.innerWidth < 800 && (
            <NavbarToggler
              navbar={navBar as React.RefObject<HTMLUListElement>}
              isOpened={isOpened}
              setIsOpened={setIsOpened}
            />
          )}
        </div>
      </nav>
    </header>
  );
};

const NavbarToggler = ({
  navbar,
  isOpened,
  setIsOpened,
}: {
  navbar: React.RefObject<HTMLUListElement>;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      className="navbar-toggler"
      onClick={() =>
        handleNavbarTogglerClick({ navbar, isOpened, setIsOpened })
      }
      type="button"
      aria-label="Toggle navbar"
    >
      {isOpened ? <HiOutlineXMark /> : <FaBars />}
    </button>
  );
};

const handleNavbarTogglerClick = ({
  navbar,
  setIsOpened,
  isOpened,
}: {
  navbar: React.RefObject<HTMLUListElement>;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  setIsOpened(!isOpened);
  document.querySelector("main")?.addEventListener("click", () => {
    setIsOpened(false);
    navbar.current.classList.remove("open");
  });
  navbar.current.classList.toggle("open");
};

export default Header;
