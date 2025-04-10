import EmptyData from "@/components/UI/EmptyData/EmptyData";
import "./Timeline.css";
import dateFormat from "@/utils/dateFormat";
import { TimeLineType } from "@/types/getServiceTypes";
import { FaArrowRight, FaCalendarAlt, FaCertificate, FaChalkboardTeacher, FaMedal, FaProjectDiagram } from "react-icons/fa";
import Link from "next/link";

const Timeline = ({ timelineData }: { timelineData: TimeLineType[] }) => {
  if (timelineData.length === 0) {
    return <EmptyData style={{ marginTop: "3rem" }} />;
  }

  const sortedTimelineData = timelineData.sort((a, b) => {
    const dateA: Date = new Date(a.date);
    const dateB: Date = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  const tagIcon = (tag: string) => {
    switch (tag) {
      case "Project":
        return <FaProjectDiagram />;
      case "Competition":
        return <FaMedal />;
      case "Certificate":
        return <FaCertificate />;
      default:
        return <FaChalkboardTeacher />;
    }
  };

  return (
    <div className="timeline-container">
      {sortedTimelineData.map((item) => {
        return (
          <div className="timeline" key={item.title}>
            <div>
              <p className="timeline-tag flex gap-1">
                {tagIcon(item.tag)} <span>{item.tag}</span>
              </p>
              <p className="timeline-date flex gap-1">
              <FaCalendarAlt />{" "}
                <span>{dateFormat(item.date.toString())}</span>
              </p>
            </div>
            <h2 className="timeline-name">{item.title}</h2>
            <p className="secondary-text timeline-summary">
              {item.description}
            </p>
            <Link
              href={item.link}
              className="primary-button"
              aria-label={`Learn more about ${item.title}`}
            >
              Learn More <FaArrowRight />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
