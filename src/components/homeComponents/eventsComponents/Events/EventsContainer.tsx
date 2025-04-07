"use client";

import Loader from "@/components/UI/Loader/Loader";
import { useState, useRef, useEffect } from "react";
import EventSwiper from "@/components/swipers/eventsSwiper/EventsSwiper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RequestedArticlesAndEvents } from "@/types/getServiceTypes";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function EventsContainer({
  events,
  isLoading,
}: {
  events: RequestedArticlesAndEvents[];
  isLoading: boolean;
}) {
  const eventStatuses = ["happened", "all", "upcoming"];
  const [status, setStatus] = useState("all");
  const eventSwiperRef = useRef(null);
  const [filteredEvents, setFilteredEvents] = useState<
    RequestedArticlesAndEvents[]
  >([]);

  useGSAP(() => {
    gsap.fromTo(
      eventSwiperRef.current,
      {
        y: "100px",
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: eventSwiperRef.current,
      }
    );
  });

  useEffect(() => {
    if (status === "all") {
      setFilteredEvents(events);
    } else if (status === "happened") {
      const filteredByStatusData = events?.filter(
        (event) => new Date(event.date) < new Date()
      );
      setFilteredEvents(filteredByStatusData);
    } else if (status === "upcoming") {
      const filteredByStatusData = events?.filter(
        (event) => new Date(event.date) > new Date()
      );
      setFilteredEvents(filteredByStatusData);
    }
  }, [status, events]);

  return (
    <>
      <div className="event-status-nav">
        {eventStatuses.map((statusLink) => (
          <button
            key={statusLink}
            className={`${statusLink} ${
              status == statusLink ? "nav-active" : ""
            }`}
            status-name={statusLink}
            onClick={() => setStatus(statusLink)}
          >
            {statusLink.charAt(0).toUpperCase() + statusLink.slice(1)}
          </button>
        ))}
      </div>

      <div
        ref={eventSwiperRef}
        className="events-container"
        style={{ height: isLoading ? "300px" : undefined }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <EventSwiper filteredEvents={filteredEvents} />
        )}
      </div>
    </>
  );
}
