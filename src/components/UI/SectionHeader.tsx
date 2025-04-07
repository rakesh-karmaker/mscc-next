import React from "react";

const SectionHeader = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="section-header">
      <div>
        <h2 className="section-heading">{title}</h2>
        <p className="section-sub-heading secondary-text">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default SectionHeader;
