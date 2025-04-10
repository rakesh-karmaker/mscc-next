"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import EventCard from "@/components/homeComponents/eventsComponents/EventCard/EventCard";
import EmptyData from "@/components/UI/EmptyData/EmptyData";
import "./EventsSwiper.css";
import { RequestedArticlesAndEvents } from "@/types/getServiceTypes";
const EventSwiper = ({
  filteredEvents,
}: {
  filteredEvents: RequestedArticlesAndEvents[];
}) => {
  if (filteredEvents?.length === 0) {
    return <EmptyData />;
  }

  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={"auto"}
      grabCursor={true}
      speed={400}
      spaceBetween={20}
      autoplay={{
        delay: 4000,
      }}
      breakpoints={{
        1200: {
          spaceBetween: 30,
        },
        1600: {
          spaceBetween: 20,
          autoplay: {
            delay: 3000,
          },
        },
      }}
      className="event-swiper"
    >
      {filteredEvents?.map((event) => (
        <SwiperSlide className="activity-demo" key={event.id + "event"}>
          <EventCard eventData={event} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default EventSwiper;
