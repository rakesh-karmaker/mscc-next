import Link from "next/link";
import "./Error.css";
import React from "react";

const Error = ({ heading, link, linkText, children, ...rest }: {
  heading: string;
  link: string;
  linkText: string;
  children: React.ReactNode;
  style?: string
}) => {
  const style = rest?.style ?? {};
  return (
    <div className="error-container">
      <h2 className="error-heading" style={style}>
        {heading}
      </h2>
      {children}
      <Link href={link} className="primary-button error-link">
        {linkText}
      </Link>
    </div>
  );
};

const ErrorContent = ({ message, children }: {
  message: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="error-content">
      <h3 className="error-info">{message}</h3>
      <p className="error-text">{children}</p>
    </div>
  );
};

export { Error, ErrorContent };
