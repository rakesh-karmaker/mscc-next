import PrimaryBtn from "@/components/UI/PrimaryBtn";
import SectionHeader from "@/components/UI/SectionHeader";
import EventsContainer from "./EventsContainer";
import "./Events.css";
import { RequestedArticlesAndEvents } from "@/types/getServiceTypes";

const Events = ({
  isLoading,
  events,
}: {
  isLoading: boolean;
  events: RequestedArticlesAndEvents[];
}) => {
  return (
    <section id="events" className="page-section col-center">
      <div className="col-center">
        <SectionHeader
          title={"our events"}
          description="Stunning events and fests organized by us"
        >
          <PrimaryBtn link="/activities?tag=Event" name="See All">
            See All
          </PrimaryBtn>
        </SectionHeader>

        <EventsContainer events={events} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default Events;
