"use client"

import { Control, FieldError, FieldValues, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FileInput from "@/components/UI/FileInput/FileInput";
import SubmitBtn from "@/components/UI/SubmitBtn";
import toast from "react-hot-toast";
import "./UserForm.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { editUser } from "@/services/PutService";
// import { registerUser } from "@/services/PostService";
// import { NavLink, useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel, Stack, TextField } from "@mui/material";
import SelectInput from "@/components/UI/SelectInput";
import Link from "next/link";
import { MemberRegSchema } from "@/lib/validation/memberSchemaValidation";

const UserForm = (props: any) => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isLoading },
  } = useForm({
    resolver: zodResolver(MemberRegSchema),
    defaultValues: props?.data
      ? {
          name: props.data.name,
          email: props.data.email,
          password: "",
          contactNumber: props.data.contactNumber,
          branch: props.data.branch,
          reason: props.data.reason,
          socialLink: props.data.socialLink,
          batch: props.data.batch,
        }
      : {
          branch: "",
          consent: false,
          reference: "",
        },
    mode: "onChange",
  });

  const onSubmit = async (data: SubmitHandler<unknown>) => {
    console.log(data);
  };

  const date = new Date();
  const currentYear = date.getFullYear() - 1;
  const years = [];
  for (let i = 1; i <= 6; i++) {
    years.push({
      value: String(currentYear + i),
      label: currentYear + i,
    });
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

  // console.log(register("image"))
  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)} className="user-form">
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          {...register("name")}
          id="name"
          label="Full Name"
          variant="outlined"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message?.toString()}
        />

        <TextField
          {...register("email")}
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message?.toString()}
        />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          {...register("password")}
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          {...register("contactNumber")}
          id="contactNumber"
          label="Contact Number"
          variant="outlined"
          fullWidth
          error={!!errors.contactNumber}
          helperText={errors.contactNumber?.message?.toString()}
        />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          {...register("batch")}
          id="batch"
          label="Batch"
          variant="outlined"
          fullWidth
          error={!!errors.batch}
          helperText={errors.batch?.message?.toString()}
        />
        <SelectInput
          control={control as unknown as Control}
          name="branch"
          dataList={branches}
          errors={errors.branch as FieldError}
        >
          School Branch
        </SelectInput>
      </Stack>

      {/* <FileInput 
        register={register as unknown as UseFormRegister<FieldValues>}
        name="image" 
        errors={errors['image' as keyof typeof errors] as FieldError}
      >
        {props?.isRegister ? "Give us your formal photo:" : "Edit your photo:"}
      </FileInput> */}

      <input type="file" {...register("image")} />

      <TextField
        {...register("reason")}
        id="reason"
        label="Your Description"
        variant="outlined"
        fullWidth
        error={!!errors.reason}
        helperText={errors.reason?.message?.toString()}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          {...register("socialLink")}
          id="socialLink"
          label="Facebook Link"
          variant="outlined"
          fullWidth
          error={!!errors.socialLink}
          helperText={errors.socialLink?.message?.toString()}
        />

        {props?.isRegister && (
          <TextField
            {...register("reference")}
            id="reference"
            label="Reference"
            variant="outlined"
            fullWidth
            error={!!errors.reference}
            helperText={errors.reference?.message?.toString()}
          />
        )}
      </Stack>

      <div className="checkbox-submission">
        {props?.isRegister && <Consent register={register as unknown as UseFormRegister<FieldValues>} errors={errors as FieldError} />}
        <div className="submission">
          {props?.isRegister ? (
            <div className="state-redirect">
              <p>Already have an account?</p>
              <Link href="/auth/login">Login Now</Link>
            </div>
          ) : null}
          <SubmitBtn
            isLoading={isLoading}
            pendingText={props?.isRegister ? "Registering" : "Updating"}
          >
            {props?.isRegister ? "Register as a Member" : "Update"}
          </SubmitBtn>
        </div>
        {errors.root && <p className="error-message">{errors.root.message}</p>}
      </div>
    </form>
  );
};

const Consent = ({ register, errors }: {
  register: UseFormRegister<FieldValues>,
  errors: FieldError | undefined,
}) => {
  return (
    <div className="consent">
      <FormControlLabel
        control={<Checkbox {...register("consent", { required: true })} />}
        label={
          <span>
            I agree to the{" "}
            <Link href="/terms-of-service">Terms of Service</Link> and{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </span>
        }
      />

      {errors && 'consent' in errors && (
        <p className="error-message">{errors && 'consent' in errors && (errors.consent as FieldError)?.message}</p>
      )}
    </div>
  );
};

export default UserForm;
