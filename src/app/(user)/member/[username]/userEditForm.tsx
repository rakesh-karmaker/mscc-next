"use client";
/* eslint-disable */
import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";
import { FaUpload } from "react-icons/fa";
import "@/components/UI/FileInput/FileInput.css";
import SubmitBtn from "@/components/UI/SubmitBtn";

import "./userEditForm.css";
import toast from "react-hot-toast";
import {
  EditMemberFromData,
  editUserFormSchema,
} from "@/lib/validation/editUserSchemaValidation";
import { editMember } from "@/actions/editMemberAction";
import { useUser } from "@/context/userProvider";
import { RequestedUser } from "@/types/getServiceTypes";

export default function UserEditForm({
  data,
  setProfileData,
}: {
  data: {
    id: string;
    name: string;
    email: string;
    password: string;
    contactNumber: string;
    batch: string;
    branch: string;
    description: string;
    facebookLink: string;
  };
  setProfileData: React.Dispatch<React.SetStateAction<RequestedUser>>;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const { setUser } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditMemberFromData>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      password: data.password,
      contactNumber: data.contactNumber,
      batch: data.batch,
      branch: data.branch,
      description: data.description,
      facebookLink: data.facebookLink,
    },
  });

  useEffect(() => {
    reset({
      name: data.name,
      email: data.email,
      password: data.password,
      contactNumber: data.contactNumber,
      batch: data.batch,
      branch: data.branch,
      description: data.description,
      facebookLink: data.facebookLink,
    });
  }, [data, reset]);

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
        setImage(null);
        if (labelRef.current) {
          labelRef.current.innerHTML =
            '<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 136V0H88C74.7 0 64 10.7 64 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H312c-13.2 0-24-10.8-24-24zm96 144c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48z"></path></svg> <span>Upload File</span>';
        }
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setImageError("Image size should be less than 5MB");
        setImage(null);
        if (labelRef.current) {
          labelRef.current.innerHTML =
            '<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 136V0H88C74.7 0 64 10.7 64 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H312c-13.2 0-24-10.8-24-24zm96 144c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48z"></path></svg> <span>Upload File</span>';
        }
        return;
      }

      setImage(file);

      // Update label with file name
      if (labelRef.current) {
        labelRef.current.innerHTML = file.name;
      }
    } else {
      setImage(null);
      if (labelRef.current) {
        labelRef.current.innerHTML =
          '<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 136V0H88C74.7 0 64 10.7 64 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H312c-13.2 0-24-10.8-24-24zm96 144c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48z"></path></svg> <span>Upload File</span>';
      }
    }
  };

  const onSubmit = async (submittedData: EditMemberFromData) => {
    // Additional validation if needed

    setIsSubmitting(true);

    try {
      // Create FormData to send to server action
      const formData = new FormData();

      // Add all form fields to FormData
      Object.entries(submittedData).forEach(([key, value]) => {
        formData.append(key, value?.toString() || "");
      });

      // Add the image
      if (image) {
        formData.append("image", image);
      }

      // Call the server action
      const result = await editMember(formData, data.id);

      if (result.success) {
        toast.success("Update successful!");

        if (result.data) {
          setUser && setUser(result.data);
          setProfileData(result.data);
        }
        reset();
        setImage(null);
        if (labelRef.current) {
          labelRef.current.innerHTML =
            '<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 136V0H88C74.7 0 64 10.7 64 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H312c-13.2 0-24-10.8-24-24zm96 144c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48z"></path></svg> <span>Upload File</span>';
        }
      } else {
        toast.error(result?.error || "Update failed. Please try again.");
      }
    } catch (error) {
      toast.error("Update failed. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <p className="input-heading">Edit Image</p>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isSubmitting}
          style={{ display: "none" }}
        />
        <label
          ref={labelRef}
          htmlFor="image"
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
      </Stack>

      <div>
        <SubmitBtn isLoading={isSubmitting} pendingText={"Editing"}>
          {"Update"}
        </SubmitBtn>
      </div>
    </form>
  );
}

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
