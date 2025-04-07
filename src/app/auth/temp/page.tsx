"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TextField, Button, Box, Typography, CircularProgress, Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import { FaUpload } from "react-icons/fa"
import { registerMember } from "@/actions/registerAction" 
import "@/components/UI/FileInput/FileInput.css"
import { MemberFormData, registerFormSchema } from "@/lib/validation/registerSchemaValidation"


export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userImage, setUserImage] = useState<File | null>(null)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)
  const labelRef = useRef<HTMLLabelElement>(null)

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
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError(null)

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
      if (!validTypes.includes(file.type)) {
        setImageError("Please select a valid image file (JPEG, PNG, GIF, WEBP)")
        setUserImage(null)
        if (labelRef.current) {
          labelRef.current.innerHTML =
            '<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 136V0H88C74.7 0 64 10.7 64 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H312c-13.2 0-24-10.8-24-24zm96 144c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48z"></path></svg> <span>Upload File</span>'
        }
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setImageError("Image size should be less than 5MB")
        setUserImage(null)
        if (labelRef.current) {
          labelRef.current.innerHTML =
            '<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 136V0H88C74.7 0 64 10.7 64 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H312c-13.2 0-24-10.8-24-24zm96 144c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48z"></path></svg> <span>Upload File</span>'
        }
        return
      }

      setUserImage(file)

      // Update label with file name
      if (labelRef.current) {
        labelRef.current.innerHTML = file.name
      }
    } else {
      setUserImage(null)
      if (labelRef.current) {
        labelRef.current.innerHTML =
          '<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 136V0H88C74.7 0 64 10.7 64 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H312c-13.2 0-24-10.8-24-24zm96 144c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48z"></path></svg> <span>Upload File</span>'
      }
    }
  }

  const onSubmit = async (data: MemberFormData) => {
    // Additional validation if needed
    if (!userImage) {
      setImageError("Please select a profile image")
      return
    }

    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      // Create FormData to send to server action
      const formData = new FormData()

      // Add all form fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })

      // Add the image
      formData.append("userImage", userImage)

      // Call the server action
      const result = await registerMember(formData)

      if (result.success) {
        setSubmitMessage("Registration successful!")
        reset()
        setUserImage(null)
        if (labelRef.current) {
          labelRef.current.innerHTML =
            '<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 136V0H88C74.7 0 64 10.7 64 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H312c-13.2 0-24-10.8-24-24zm96 144c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48z"></path></svg> <span>Upload File</span>'
        }
      } else {
        setSubmitMessage(`Error: ${result.error}`)
      }
    } catch (error) {
      setSubmitMessage("An unexpected error occurred. Please try again.")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
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

  return (
    // <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 3 }}>
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
        </Box>

        <Box sx={{ mb: 3 }}>
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
        </Box>

        <Box sx={{ mb: 3 }}>
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
        </Box>

        <Box sx={{ mb: 3 }}>
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
        </Box>

        <Box sx={{ mb: 3 }}>
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
        </Box>

        <Box sx={{ mb: 3 }}>
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
            <label ref={labelRef} htmlFor="userImage" className="highlighted-text file-label flex gap-2 items-center">
              <FaUpload /> <span>Upload File</span>
            </label>

            {imageError && <p className="error-message">{imageError}</p>}
          </div>
        </Box>

        <Box sx={{ mb: 3 }}>
          

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
            {errors?.branch && <p style={{ color: "red" }}>{errors?.branch.message}</p>}
            </FormControl>
        </Box>

        <Box sx={{ mb: 3 }}>
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
        </Box>

        <Box sx={{ mb: 3 }}>
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
        </Box>

        <Box sx={{ mb: 3 }}>
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
        </Box>

        <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting} sx={{ py: 1.5 }}>
          {isSubmitting ? <CircularProgress size={24} /> : "Register"}
        </Button>

        {submitMessage && (
          <Typography
            sx={{
              mt: 2,
              textAlign: "center",
              color: submitMessage.includes("Error") ? "error.main" : "success.main",
            }}
          >
            {submitMessage}
          </Typography>
        )}  
      </form>
    // </Paper>
  )
}

