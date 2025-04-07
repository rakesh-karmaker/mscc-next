import { FaArrowRight } from "react-icons/fa6";
import "./ArticleCard.css";
import dateFormat from "@/utils/dateFormat";
import "react-lazy-load-image-component/src/effects/blur.css";
import Link from "next/link";
import { RequestedArticlesAndEvents } from "@/types/getServiceTypes";
import Image from "next/image";

const ArticleCard = ({ article }: { article: RequestedArticlesAndEvents }) => {
  const { tag, date, coverImageUrl, title, summary, slug } = article;

  // Convert the date string to a Date object if it's not already
  const formattedDate =
    typeof date === "string" ? date : new Date(date).toISOString();

  return (
    <article className="article">
      <Image
        src={coverImageUrl}
        alt={`${title} - ${tag} on ${formattedDate}`}
        width={690}
        height={400}
      />
      <div className="category-date">
        <p className="category">{tag}</p>
        <p className="date">{dateFormat(formattedDate)}</p>
      </div>
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
  );
};

export default ArticleCard;
