"use client";

import SubmitBtn from "@/components/UI/SubmitBtn";
import toast from "react-hot-toast";
import { useActionState, useEffect } from "react";
import "./ContactForm.css";
import { Stack, TextField } from "@mui/material";
import submitContactForm from "@/actions/submitContactFormAction";
import type { ContactFormActionResponse } from "@/types/contactFormTypes";

const initialState: ContactFormActionResponse = {
  success: false,
  message: "",
};

const ContactForm = () => {
  const [state, action, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
    } else if (state?.message) {
      toast.error(state.message);
    }
  }, [state?.success, state?.message]);

  return (
    <form action={action} className="contact-form">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ maxWidth: "100%" }}
      >
        <TextField
          name="name"
          id="name"
          label="Full Name"
          variant="standard"
          error={!!state?.errors?.name}
          helperText={state?.errors?.name}
          defaultValue={state?.inputs?.name}
          fullWidth
        />

        <TextField
          name="email"
          id="email"
          label="Email"
          variant="standard"
          error={!!state?.errors?.email}
          helperText={state?.errors?.email}
          defaultValue={state?.inputs?.email}
          fullWidth
        />
      </Stack>

      <TextField
        name="subject"
        id="subject"
        variant="standard"
        error={!!state?.errors?.subject}
        helperText={state?.errors?.subject}
        defaultValue={state?.inputs?.subject}
        fullWidth
        label="Subject"
      />

      <TextField
        name="message"
        id="message"
        variant="standard"
        multiline
        rows={4}
        fullWidth
        error={!!state?.errors?.message}
        helperText={state?.errors?.message}
        defaultValue={state?.inputs?.message}
        label="Write your message here"
      />

      <div>
        <SubmitBtn isLoading={isPending} pendingText={"Sending"} width="100%">
          Send the message
        </SubmitBtn>
        {state?.errors && <p className="error-message">{state?.message}</p>}
      </div>
    </form>
  );
};

export default ContactForm;
