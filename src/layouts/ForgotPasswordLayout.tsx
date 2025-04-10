// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoKeySharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";

type props = {
  title: string;
  description: string;
  children: React.ReactNode;
  stage: number;
};

const ForgotPasswordLayout = ({
  title,
  description,
  children,
  stage,
}: props) => {
  const urls = [
    <FaLock key="lock" />,
    <MdEmail key="email" />,
    <IoKeySharp key="key" />,
    <IoMdCheckmarkCircleOutline key="checkmark" />,
  ];
  return (
    <main className="page-forgot">
      <div>
        <div className="forgot-info">
          <div className="forgot-logo row-center">{urls[stage - 1]}</div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div className="forgot-form">{children}</div>
        {stage !== 4 ? (
          <p className="back">
            <Link href="/auth/login" className="button-link flex gap-2 items-center">
              <span>
                <FaArrowLeft />
              </span>{" "}
              Back to Login
            </Link>
          </p>
        ) : null}
      </div>
    </main>
  );
};

export default ForgotPasswordLayout;
