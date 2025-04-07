"use client";

import SectionHeader from "@/components/UI/SectionHeader";
import PrimaryBtn from "@/components/UI/PrimaryBtn";
import ExecutiveCard from "@/components/UI/ExecutiveCard/ExecutiveCard";
import React, { useEffect } from "react";
import "@/components/homeComponents/homeExecutivesComponents/HomeEcs.css";
import { ExecutivesData } from "@/types/commonTypes";

const HomeEcs = ({ data }: { data: ExecutivesData[] }): React.ReactNode => {
  const filteredEcs = data.slice(0, 4);

  useEffect(() => {
    // Move the IntersectionObserver initialization inside useEffect
    const observeExecutiveMember = new IntersectionObserver(
      (executiveMembers) => {
        executiveMembers.forEach((executiveMember) => {
          if (executiveMember.isIntersecting) {
            executiveMember.target.classList.add("shown");
            observeExecutiveMember.unobserve(executiveMember.target);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    // Observe elements
    document
      .querySelectorAll(".executive-member")
      .forEach((executiveMember) => {
        observeExecutiveMember.observe(executiveMember);
      });

    // Cleanup function
    return () => {
      observeExecutiveMember.disconnect();
    };
  }, []);

  return (
    <section id="executives" className="page-section col-center">
      <div>
        <SectionHeader
          title="Executives"
          description="Members that are administrating the club for years "
        >
          <PrimaryBtn link="/executives" name="See Others">
            See Others
          </PrimaryBtn>
        </SectionHeader>
        <div className="executives-container">
          {filteredEcs.map((ec) => (
            <ExecutiveCard key={ec.name} executiveData={ec} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeEcs;
