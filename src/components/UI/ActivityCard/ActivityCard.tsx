// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import "./ActivityCard.css";
import dateFormat from "@/utils/dateFormat";
import { FaArrowRight, FaCalendarAlt, FaChalkboardTeacher } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { MdEdit } from "react-icons/md";
import { RequestedActivities } from "@/types/getServiceTypes";
import React from "react";

const ActivityCard = ({ data, selectedTag, admin, ...rest }: {
  data: RequestedActivities;
  selectedTag: string;
  admin: boolean;
  setSelectedActivity?: React.Dispatch<React.SetStateAction<RequestedActivities>>;

}) => {
  const { tag, date, coverImageUrl, title, summary, slug } = data;

  return (
    <div className="activity" data-tag={tag}>
      {/* <img src={`${coverImageUrl}`} alt={`The image of ${title}`} /> */}
      <LazyLoadImage
        src={`${coverImageUrl}`}
        alt={`The image of ${title}`}
        effect="blur"
      />

      <article>
        <div className="activity-meta">
          {selectedTag === "" ? <Tag tag={data.tag} /> : ""}
          <p className="activity-date">
            <FaCalendarAlt />
            <span>{dateFormat(date as string)}</span>
          </p>
        </div>
        <h2 className="activity-name">{title}</h2>
        <p className="secondary-text activity-summary">{summary}</p>
        <div className="activity-actions">
          <Link
            href={"/activity/" + slug}
            className="primary-button"
            aria-label={`Learn more about ${title} - ${tag} on ${date} at our Facebook page.`}
          >
            Learn More <FaArrowRight />
          </Link>

          {admin && (
            <button
              className="secondary-button primary-button"
              aria-label="Edit this activity"
              type="button"
              onClick={() => rest.setSelectedActivity?.(data)}
            >
              <MdEdit />
              <span>Edit</span>
            </button>
          )}
        </div>
      </article>
    </div>
  );
};

const Tag = ({ tag }: {tag: string}) => {
  const capitalizeTag = tag.charAt(0).toUpperCase() + tag.slice(1);
  return (
    <p className="activity-tag">
      <FaChalkboardTeacher />
      <span>{capitalizeTag}</span>
    </p>
  );
};

export default ActivityCard;
