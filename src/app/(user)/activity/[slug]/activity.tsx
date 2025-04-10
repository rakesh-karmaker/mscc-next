"use client"

import { useState } from "react";
import "./Activity.css";
import Gallery from "@/components/UI/Gallery/Gallery";
import TextContent from "@/components/UI/TextContent/TextContent";
import dateFormat from "@/utils/dateFormat";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ImageViewer from "@/components/UI/ImageViewer/ImageViewer";
import { RequestedActivity } from "@/types/getServiceTypes";
import Link from "next/link";

const Activity = ({
  activity,
  others,
}: {
  activity: RequestedActivity;
  others: {
    id: string;
    title: string;
    date: string;
    slug: string;
  }[];
}) => {
  const { tag, date, title, summary, coverImageUrl, gallery, content } =
    activity;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <main className="page-activity">
      <div className="activity-details">
        <div className="cover-image-container" onClick={() => setOpen(true)}>
          <LazyLoadImage
            src={coverImageUrl}
            alt={`cover image of ${title}`}
            className="cover"
            onClick={() => setOpen(true)}
          />
          <p>View full image</p>
        </div>

        <p className="title">{title}</p>
        <p className="tags">
          <a href={`/activities?tag=${tag}`} className="tag">
            {tag}
          </a>
          <span>/</span>
          <span className="date">{dateFormat(date.toString())}</span>
        </p>
        <p className="summary">{summary}</p>
        <Gallery title="Gallery" images={gallery} />

        <TextContent content={content} />

        <ImageViewer
          data={[{ url: coverImageUrl }]}
          open={open}
          setOpen={setOpen}
          index={0}
        />
      </div>

      <aside className="others">
        <p className="others-title">Other {tag}s</p>
        <ul className="others-container">
          {others?.map((act) => {
            return (
              <li key={act.slug} className="other-activity">
                <Link href={`/activity/${act.slug}`}>
                  <p className="other-activity-title">{act.title}</p>
                  <p className="other-activity-date">{dateFormat(act.date)}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </main>
  );
};

export default Activity;
