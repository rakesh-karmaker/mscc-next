"use client";

import YearPanel from "@/components/ec-components/PanelYearBtn";
import { useState, useEffect } from "react";
import ExecutiveCard from "@/components/UI/ExecutiveCard/ExecutiveCard";
import {
  YearsDropdown,
  yearsDropdownClick,
} from "@/components/ec-components/PanelYearsNavbarDropdown";
import { ExecutivesData } from "@/types/commonTypes";


const ExecutivesContainer = ({ years, executivesData }: {
  years: string[];
  executivesData: ExecutivesData[];
}) => {
  // Make a state for the executives panel to be rendered and re-rendered when a year panel is clicked
  const [currentYear, setCurrentYear] = useState(years[0]);

  // Filter executives by current year
  const selectedExecutives = executivesData.filter(
    (executive) => executive.panel === currentYear
  );

  // Change the executives panel when a year panel is clicked
  const handlePanelClick = (year: string) => {
    setCurrentYear(year);
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 950) {
        const yearPanels = document.querySelectorAll(".panel-year");
        yearPanels.forEach((yearPanel) => {
          if (yearPanel.getAttribute("data-year") === year) {
            (yearPanel as HTMLElement).style.order = "-1";
          } else {
            (yearPanel as HTMLElement).style.order = "0";
          }
        });
        yearsDropdownClick(years);
      }
      window.scrollTo(0, 0);
    }
  };

  // Observe the executive members
  useEffect(() => {
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

    const executiveMembers = document.querySelectorAll(".executive-member");
    executiveMembers.forEach((executiveMember) => {
      observeExecutiveMember.observe(executiveMember);
    });

    return () => {
      observeExecutiveMember.disconnect();  
    }
  }, [currentYear]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 950);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 950);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <aside dropdown-active="false">
        {!isMobile ? null : (
          <YearsDropdown
            onClick={() => {
              yearsDropdownClick(years);
            }}
          />
        )}
        {years.map((year) => (
          <YearPanel
            panelYear={year}
            onClick={() => {
              handlePanelClick(year);
            }}
            key={year}
          />
        ))}
      </aside>

      <div className="executives-container">
        {selectedExecutives.map((executive) => {
          return (
            <ExecutiveCard executiveData={executive} key={executive.name} />
          );
        })}
      </div>
    </>
  );
};



export default ExecutivesContainer;
