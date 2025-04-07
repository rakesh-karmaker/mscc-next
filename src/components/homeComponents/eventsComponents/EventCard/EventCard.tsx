import { FaArrowRight } from "react-icons/fa6";
import "./EventCard.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import Link from "next/link";
import { RequestedArticlesAndEvents } from "@/types/getServiceTypes";
import Image from "next/image";

const EventCard = ({
  eventData,
}: {
  eventData: RequestedArticlesAndEvents;
}) => {
  const { tag, coverImageUrl, title, summary, slug, date } = eventData;
  const status = new Date(date) < new Date() ? "Happened" : "Upcoming";
  const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);

  return (
    <>
      <Image
        src={coverImageUrl}
        alt={`A poster of ${title} - ${tag} on ${date}`}
        width={690}
        height={400}
      />
      <article>
        <p className="event-tags">
          <span>{capitalizedTag}</span>
          <span>{status}</span>
        </p>
        <h3>{title}</h3>
        <p className="secondary-text">{summary}</p>
        <Link
          href={"/activity/" + slug}
          aria-label="Go to the article"
          className="flex gap-[7px] items-center"
        >
          More details <FaArrowRight />
        </Link>
      </article>
    </>
  );
};

export default EventCard;
