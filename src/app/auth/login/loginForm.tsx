"use client";

import SubmitBtn from "@/components/UI/SubmitBtn";
import "./loginForm.css";
import { TextField } from "@mui/material";
import { useActionState, useEffect } from "react";
import Link from "next/link";
import loginMember from "@/actions/loginAction";
import { LoginFormResponse } from "@/types/loginFormTypes";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userProvider";

const initialState: LoginFormResponse = {
  success: false,
  message: "",
};

export default function LoginForm() {
  const router = useRouter();
  const {setUser} = useUser();
  const [state, action, isPending] = useActionState(loginMember, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      setUser && setUser(state.user ? state.user : null)
      router.push(state.user ? `/member/${state.user.slug}/` : "/");
    }
  }, [state, router]);

  return (
    <form action={action} className="login-form auth-form">
      <TextField
        name="email"
        type="email"
        label="Email"
        variant="outlined"
        fullWidth
        error={!!state?.errors?.email}
        helperText={state?.errors?.email}
      />

      <TextField
        name="password"
        type="password"
        label="Password"
        variant="outlined"
        fullWidth
        error={!!state?.errors?.password}
        helperText={state?.errors?.password}
      />

      <div>
        <div className="submission flex flex-col gap-3">
          <div>
            <Link href="/auth/forgot-password">Forgot Password?</Link>
          </div>
          <SubmitBtn
            isLoading={isPending}
            pendingText="Logging in"
            width="100%"
          >
            Login
          </SubmitBtn>
          <div className="register-link">
            <p>Don&apos;t have an account?</p>
            <Link href="/auth/register">Register</Link>
          </div>
        </div>
        {state?.errors && <p className="error-message">{state?.message}</p>}
      </div>
    </form>
  );
}
