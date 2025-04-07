"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { FaUpload } from "react-icons/fa";
import { registerMember } from "@/actions/registerAction";
import "@/components/UI/FileInput/FileInput.css";
import {
  MemberFormData,
  registerFormSchema,
} from "@/lib/validation/registerSchemaValidation";
import SubmitBtn from "@/components/UI/SubmitBtn";

import "./registrationForm.css";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userImage, setUserImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MemberFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      contactNumber: "",
      batch: "",
      branch: "",
      description: "",
      facebookLink: "",
      reference: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError(null);

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setImageError(
          "Please select a valid image file (JPEG, PNG, GIF, WEBP)"
        );
        setUserImage(null);
        if (labelRef.current) {
          labelRef.current.innerHTML =
            '<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 136V0H88C74.7 0 64 10.7 64 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H312c-13.2 0-24-10.8-24-24zm96 144c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48z"></path></svg> <span>Upload File</span>';
        }
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setImageError("Image size should be less than 5MB");
        setUserImage(null);
        if (labelRef.current) {
          labelRef.current.innerHTML =
            '<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 136V0H88C74.7 0 64 10.7 64 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H312c-13.2 0-24-10.8-24-24zm96 144c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48z"></path></svg> <span>Upload File</span>';
        }
        return;
      }

      setUserImage(file);

      // Update label with file name
      if (labelRef.current) {
        labelRef.current.innerHTML = file.name;
      }
    } else {
      setUserImage(null);
      if (labelRef.current) {
        labelRef.current.innerHTML =
          '<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 136V0H88C74.7 0 64 10.7 64 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H312c-13.2 0-24-10.8-24-24zm96 144c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48z"></path></svg> <span>Upload File</span>';
      }
    }
  };

  const onSubmit = async (data: MemberFormData) => {
    // Additional validation if needed
    if (!userImage) {
      setImageError("Please select a profile image");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData to send to server action
      const formData = new FormData();

      // Add all form fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value?.toString() || "");
      });

      // Add the image
      formData.append("userImage", userImage);

      // Call the server action
      const result = await registerMember(formData);

      if (result.success) {
        toast.success("Registration successful!");
        reset();
        setUserImage(null);
        if (labelRef.current) {
          labelRef.current.innerHTML =
            '<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 136V0H88C74.7 0 64 10.7 64 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H312c-13.2 0-24-10.8-24-24zm96 144c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48z"></path></svg> <span>Upload File</span>';
        }
      } else {
        toast.error(result?.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const branches = [
    {
      value: "Branch - 1",
      label: "Branch - 1",
    },
    {
      value: "Branch - 2",
      label: "Branch - 2",
    },
    {
      value: "Branch - 3",
      label: "Branch - 3",
    },
    {
      value: "Main Boys",
      label: "Main Boys",
    },
    {
      value: "Main Girls",
      label: "Main Girls",
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user-form">
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={isSubmitting}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={isSubmitting}
            />
          )}
        />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isSubmitting}
            />
          )}
        />

        <Controller
          name="contactNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Contact Number"
              fullWidth
              error={!!errors.contactNumber}
              helperText={errors.contactNumber?.message}
              disabled={isSubmitting}
            />
          )}
        />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Controller
          name="batch"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Batch"
              fullWidth
              error={!!errors.batch}
              helperText={errors.batch?.message}
              disabled={isSubmitting}
            />
          )}
        />

        <FormControl fullWidth error={!!errors.branch}>
          <InputLabel id={"select"}>Branch</InputLabel>
          <Controller
            name="branch"
            control={control}
            render={({ field }) => (
              <Select
                labelId={"select"}
                id={"select-id"}
                label="Branch"
                fullWidth
                {...field}
                error={!!errors.branch}
              >
                {branches.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors?.branch && (
            <p style={{ color: "red" }}>{errors?.branch.message}</p>
          )}
        </FormControl>
      </Stack>

      <div className="file-input">
        <p className="input-heading">User Image</p>
        <input
          id="userImage"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isSubmitting}
          style={{ display: "none" }}
        />
        <label
          ref={labelRef}
          htmlFor="userImage"
          className="highlighted-text file-label flex gap-2 items-center"
        >
          <FaUpload /> <span>Upload File</span>
        </label>

        {imageError && <p className="error-message">{imageError}</p>}
      </div>

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            multiline
            rows={4}
            fullWidth
            error={!!errors.description}
            helperText={errors.description?.message}
            disabled={isSubmitting}
          />
        )}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Controller
          name="facebookLink"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Facebook Link"
              fullWidth
              error={!!errors.facebookLink}
              helperText={errors.facebookLink?.message}
              disabled={isSubmitting}
            />
          )}
        />

        <Controller
          name="reference"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Reference"
              fullWidth
              error={!!errors.reference}
              helperText={errors.reference?.message}
              disabled={isSubmitting}
            />
          )}
        />
      </Stack>

      <div>
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Controller
                name="consent"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    onChange={(e) => field.onChange(e.target.checked)}
                    color="primary"
                    disabled={isSubmitting}
                  />
                )}
              />
            }
            label={
              <span>
                I agree to the{" "}
                <Link
                  href="/terms-of-service"
                  className="text-blue-600 hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="text-blue-600 hover:underline"
                >
                  Privacy Policy
                </Link>
              </span>
            }
          />
          {errors.consent && (
            <FormHelperText error>{errors.consent.message}</FormHelperText>
          )}
        </Box>

        <SubmitBtn isLoading={isSubmitting} pendingText="Registering">
          Register as a Member
        </SubmitBtn>

      </div>
    </form>
  );
}
