"use client";

import ActivitiesNavbar from "@/layouts/activitiesNavBar/ActivitiesNavbar";
import "./Activities.css";
import { useEffect } from "react";
import { useActivities } from "@/context/activitiesProvider";
import Loader from "@/components/UI/Loader/Loader";
import EmptyData from "@/components/UI/EmptyData/EmptyData";
import PaginationContainer from "@/components/UI/Pagination/Pagination";
import ActivityCard from "../UI/ActivityCard/ActivityCard";
const Activities = ({
  admin,
  linkTag,
  ...rest
}: {
  admin?: boolean;
  linkTag: string | undefined;
}) => {
  const activityContext = useActivities();

  if (!activityContext) {
    throw new Error("useMember must be used within a MembersProvider");
  }

  const {
    activities,
    length,
    tag,
    setTag,
    search,
    setSearch,
    page,
    isLoading,
    setPage,
  } = activityContext;

  const elementsPerPage = 12;

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
        threshold: 0,
      }
    );

    document.querySelectorAll(".activity").forEach((executiveMember) => {
      observeExecutiveMember.observe(executiveMember);
    });

    // Cleanup function
    return () => {
      observeExecutiveMember.disconnect();
    };
  }, [activities, search, setTag]);

  useEffect(() => {
    if (linkTag && search === "") {
      setTag(linkTag);
    }
  }, [isLoading, linkTag, search, setTag]);

  const handleSetCurrentPageClick = (page: number) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <main className="page-activities">
        <ActivitiesNavbar
          tag={tag}
          setTag={setTag}
          search={search}
          setSearch={setSearch}
          admin={admin}
        />
        <section className="activities-container">
          {isLoading ? (
            <Loader />
          ) : length === 0 ? (
            <EmptyData />
          ) : (
            activities?.map((activity) => {
              return (
                <ActivityCard
                  key={activity.id}
                  data={activity}
                  selectedTag={tag}
                  admin={admin || false}
                  {...rest}
                />
              );
            })
          )}
        </section>
        <PaginationContainer
          length={length}
          elementsPerPage={elementsPerPage}
          setPage={handleSetCurrentPageClick}
          currentPage={page}
        />
      </main>
    </>
  );
};

export default Activities;
