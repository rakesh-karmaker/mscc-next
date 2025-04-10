"use client";

import { useEffect, useRef } from "react";
const MscscTag = () => {
  const tagRef = useRef<HTMLDivElement>(null);
  const delay = 300;
  useEffect(() => {
    setTimeout(() => {
      tagRef.current?.classList.add("active");
    }, delay);
  }, [tagRef]);
  return (
    <div ref={tagRef} className="mscsc-tag">
      <p>Science Club</p>
      <span className="name row-center">MSCSC</span>
    </div>
  );
};

export default MscscTag;
