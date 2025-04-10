"use client";

import ForgotPasswordLayout from "@/layouts/ForgotPasswordLayout";
// import { resetPassword } from "@/services/PostService";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import SubmitBtn from "@/components/UI/SubmitBtn";
import toast from "react-hot-toast";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { resetPassword } from "@/actions/forgotPasswordAction";

const ResetPassword = ({
  email,
  token,
  setStage,
}: {
  email: string;
  token: string;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: { newPassword: string }) => {
    const newPassword = data.newPassword.trim();

    if (!newPassword) {
      setError("newPassword", {
        message: "Password is required",
      });
    } else if (newPassword.length < 6) {
      setError("newPassword", {
        message: "Password must be at least 6 characters",
      });
    } else {
      setLoading(true);
      const response = await resetPassword(email, newPassword, token);
      setLoading(false);
      if (response.success) {
        setStage(4);
      } else {
        toast.error(response.message);
      }
    }
  };

  return (
    <ForgotPasswordLayout
      title="Set new password"
      description="Enter your new password."
      stage={3}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("newPassword")}
          type="password"
          label="New Password"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
        />

        <SubmitBtn isLoading={loading} pendingText="Updating..." width="100%">
          Reset Password
        </SubmitBtn>
      </form>
    </ForgotPasswordLayout>
  );
};

export default ResetPassword;
