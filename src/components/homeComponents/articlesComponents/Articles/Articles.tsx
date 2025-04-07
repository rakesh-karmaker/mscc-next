"use client";

import PrimaryBtn from "@/components/UI/PrimaryBtn";
import SectionHeader from "@/components/UI/SectionHeader";
import "./Articles.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Loader from "@/components/UI/Loader/Loader";
import EmptyData from "@/components/UI/EmptyData/EmptyData";
import ArticleCard from "@/components/homeComponents/articlesComponents/ArticleCard/ArticleCard";
import { RequestedArticlesAndEvents } from "@/types/getServiceTypes";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Articles = ({
  isLoading,
  articles,
}: {
  isLoading: boolean;
  articles: RequestedArticlesAndEvents[];
}) => {
  useGSAP(() => {
    gsap.fromTo(
      ".articles-container",
      {
        y: "100px",
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: ".articles-container",
      }
    );
  });

  return (
    <section id="articles" className="page-section col-center">
      <SectionHeader
        title="CLUB Articles"
        description="Articles about the achievements and researches of MSCSC"
      >
        <PrimaryBtn link="/activities?tag=Article" name="See More">
          See All
        </PrimaryBtn>
      </SectionHeader>
      <div className="articles-container">
        {isLoading ? (
          <Loader />
        ) : articles?.length == 0 ? (
          <EmptyData />
        ) : (
          articles?.map((article) => (
            <ArticleCard key={article.id + "article"} article={article} />
          ))
        )}
      </div>
    </section>
  );
};

export default Articles;
