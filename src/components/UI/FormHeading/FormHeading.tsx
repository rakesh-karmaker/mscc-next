import React from "react";
import "./FormHeading.css";

const FormHeading = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <h2 className="form-heading" style={rest?.style}>
      {children}
    </h2>
  );
};

export default FormHeading;
