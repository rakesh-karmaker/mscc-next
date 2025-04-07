"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./ClubStats.css";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const ClubStats = ({ mobileClass }: { mobileClass: string }) => {
  {
    /* <!-- Club stats is a section where we can show some stats about the club --> */
    /* <!--TODO Should change in every year --> */
  }

  useGSAP(() => {
    gsap.fromTo(
      ".stats",
      {
        y: "50px",
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.1,
        scrollTrigger: ".stats",
      }
    );
  });

  useEffect(() => {
    const numberObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          count(entry.target as HTMLElement);
          numberObserver.unobserve(entry.target);
        }
      });
    }, {});

    const numberValues = document.querySelectorAll(".number-value");
    numberValues.forEach((numberValue) => {
      numberObserver.observe(numberValue);
    });
  }, []);
  return (
    <div
      className={`club-stats ${mobileClass == undefined ? "" : mobileClass}`}
    >
      <p className="stats-heading">The milestones we have achieved:</p>
      <div className="club-stats-container">
        <ClubState value={5} thousand={true}>
          Past club <br /> Members
        </ClubState>
        <ClubState value={7}>
          Years of <br /> Connectivity
        </ClubState>
        <ClubState value={4}>
          Successful <br /> Fests
        </ClubState>
        <ClubState value={20}>
          Interesting <br /> Workshops
        </ClubState>
      </div>
    </div>
  );
};

const ClubState = ({
  value,
  children,
  thousand,
}: {
  value: number;
  children: React.ReactNode;
  thousand?: boolean;
}) => {
  return (
    <p className="stats">
      <span className="stats-number">
        <span className="number-value" data-value={value}>
          0
        </span>
        {thousand ? "K+" : "+"}
      </span>
      <span className="stats-name">{children}</span>
    </p>
  );
};

const count = (ele: HTMLElement) => {
  let number = 0;
  const limit = parseInt(ele.getAttribute("data-value") || "0", 10);
  const interval = 1000;
  const duration = limit > 0 ? Math.floor(interval / limit) : interval;

  const counterInterval = setInterval(() => {
    number++;
    ele.innerText = number.toString();
    if (number == limit) {
      clearInterval(counterInterval);
    }
  }, duration);
};

export default ClubStats;
