"use client"

import SubmitBtn from "@/components/UI/SubmitBtn";
import ForgotPasswordLayout from "@/layouts/ForgotPasswordLayout";
import { TextField } from "@mui/material";
import React from "react";
import { verifyEmail } from "@/actions/forgotPasswordAction";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const SendOTP = ({
  setEmail,
  setStage,
}: {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: { email: string }) => {
    const email = data.email.trim().toLowerCase();
    const response = await verifyEmail(email);
    if (response.success) {
      setStage(2);
      setEmail(email);
    } else {
      toast.error(response?.message as string);
    }
  };

  return (
    <ForgotPasswordLayout
      title="Forgot Password?"
      description="Enter your email and will send you an OTP to reset your password."
      stage={1}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          {...register("email", { required: "Email is required" })}
          error={!!errors.email?.message}
          helperText={errors.email?.message as string}
          type="email"
          label="Email"
        />

        <SubmitBtn isLoading={isLoading} pendingText="Sending OTP" width="100%">
          Send OTP
        </SubmitBtn>
      </form>
    </ForgotPasswordLayout>
  );
};

export default SendOTP;
