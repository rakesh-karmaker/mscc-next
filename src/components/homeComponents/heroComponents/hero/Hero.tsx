import ClubIntro from "@/components/homeComponents/heroComponents/clubIntro/ClubIntro";
import ClubStats from "@/components/homeComponents/heroComponents/clubStats/ClubStats";
import "./Hero.css";
import MscscTag from "@/components/UI/MscscTag";
import HeroImageSwiper from "@/components/swipers/heroImageSwiper/HeroImageSwiper";
import React from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = (): React.ReactNode => {
  return (
    <>
      <section id="home" className="hero-section row-center page-section">
        <div className="hero-section-container row-center">
          <article className="hero-section-left">
            <MscscTag />
            <div className="club-intro-container">
              <ClubIntro />

              <HeroActionBtns />
            </div>

            <ClubStats mobileClass={"mobile-stats"} />
          </article>

          <div className="hero-section-right col-center">
            <HeroImageSwiper />

            <HeroActionBtn />
          </div>
        </div>
        <div className="circle"></div>
      </section>
    </>
  );
};

const HeroActionBtns = (): React.ReactNode => {
  return (
    <div className="hero-action-btns row-center">
      <Link className={"primary-button"} href="/register">
        Join Us
      </Link>
      <Link className={"primary-button secondary-button"} href="/members">
        See Others
      </Link>
    </div>
  );
};

const HeroActionBtn = () => {
  return (
    <Link className={"join-btn"} href="/auth/register">
      <div>
        <div className="pulse row-center"></div>
        <p>Join Us With Our Journey</p>
      </div>
      <p>
        <FaArrowRightLong />
      </p>
    </Link>
  );
};

export default Hero;
