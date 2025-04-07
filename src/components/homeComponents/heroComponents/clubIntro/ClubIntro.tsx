import React from "react";
import "./ClubIntro.css";

const ClubIntro = (): React.ReactNode => {
  return (
    <div className="club-intro">
      <h1>
        Where
        <span className="highlighted-text">Science enthusiasts</span> come
        together
      </h1>
      <p className="secondary-text">
        Connect with like-minded individuals and expand your knowledge in math,
        science, biology, astronomy and IT. Let&apos;s be the best together.
      </p>
    </div>
  );
};

export default ClubIntro;
