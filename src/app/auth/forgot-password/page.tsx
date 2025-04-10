"use client";

import { useState } from "react";
import SendOTP from "./stages/SendOTP";
import "./ForgotPassword.css";
import VerifyOTP from "./stages/VerifyOTP";
import ResetPassword from "./stages/ResetPassword";
import AllDone from "./stages/AddDone";
import { notFound } from "next/navigation";

const ForgotPassword = () => {
  const [stage, setStage] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");

  switch (stage) {
    case 1:
      return <SendOTP setEmail={setEmail} setStage={setStage} />;
    case 2:
      return (
        <VerifyOTP email={email} setToken={setToken} setStage={setStage} />
      );

    case 3:
      return <ResetPassword email={email} token={token} setStage={setStage} />;
    case 4:
      return <AllDone />;
    default:
      return notFound();
  }
};

export default ForgotPassword;
