import ClubDescription from "@/components/aboutComponents/clubDesc/ClubDesc";
import Departments from "@/components/aboutComponents/departments/Departments";
import "./AboutSection.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import React from "react";
import Image from "next/image";

const AboutUs = (): React.ReactElement => {
  return (
    <section id="about" className="col-center page-section">
      <div className="about-article-container">
        <ClubDescription />
        <Image
          src="/about-club-section-img.webp"
          alt="A picture of club members"
          width={690}
          height={500}
          className="about-club-section-img"
        />
      </div>

      <div className="dpts-section col-center">
        <div>
          <h2 className="section-heading">CLUB DEPARTMENTS</h2>
          <p className="secondary-text section-sub-heading">
            Sectors we are divided into, inside the club
          </p>
        </div>

        <Departments />
      </div>
    </section>
  );
};

export default AboutUs;
