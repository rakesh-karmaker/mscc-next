import React, { useState } from "react";
import ForgotPasswordLayout from "@/layouts/ForgotPasswordLayout";
import toast from "react-hot-toast";
import SubmitBtn from "@/components/UI/SubmitBtn";
import { verifyEmail, verifyOtp } from "@/actions/forgotPasswordAction";

const VerifyOTP = ({
  email,
  setToken,
  setStage,
}: {
  email: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value, maxLength } = e.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input field if the current one is filled
    if (value.length >= maxLength) {
      const nextInput = e.target.nextElementSibling;
      if (nextInput && nextInput.tagName === "INPUT") {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handlePaste = (e: React.FormEvent<ClipboardEvent>) => {
    const paste =
      (e as unknown as ClipboardEvent).clipboardData?.getData("text") || "";
    if (paste.length === otp.length) {
      const newOtp = paste.split("");
      setOtp(newOtp);
      // Move focus to the last input field
      (
        (e.target as HTMLInputElement).form?.elements[
          otp.length - 1
        ] as HTMLInputElement
      ).focus();
    }
    e.preventDefault();
  };

  const handleSubmit = async () => {
    setLoading(true);
    const otpNumber = otp.join("");
    const res = await verifyOtp(otpNumber, email);
    setLoading(false);
    if (res.success) {
      toast.success(res.message);
      setError(null);
      setToken(res.token as string);
      setStage(3);
    } else {
      toast.error(res.message as string);
      setError(res.message as string);
    }
  };

  const resend = async () => {
    setLoading(true);
    const res = await verifyEmail(email);
    setLoading(false);
    if (res.success) {
      toast.success("OTP sent successfully");
    } else {
      toast.error(res.message as string);
    }
  };

  return (
    <ForgotPasswordLayout
      title="Verify OTP"
      description={`We have sent an OTP to ${email}`}
      stage={2}
    >
      <form action={handleSubmit}>
        <div className="otp">
          <div className="otp-container">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                value={data}
                onChange={(e) => handleChange(e, index)}
                onPaste={
                  index === 0
                    ? (e: React.ClipboardEvent<HTMLInputElement>) =>
                        handlePaste(
                          e as unknown as React.FormEvent<ClipboardEvent>
                        )
                    : undefined
                } // Attach onPaste to the first input
                className="otp-input"
                maxLength={1}
              />
            ))}
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>

        <SubmitBtn isLoading={loading} pendingText="Verifying" width="100%">
          Continue
        </SubmitBtn>

        <div className="resend">
          <p>Didn&apos;t receive the OTP?</p>
          <button type="button" onClick={resend} disabled={loading}>
            {loading ? "Sending..." : "Resend"}
          </button>
        </div>
      </form>
    </ForgotPasswordLayout>
  );
};

export default VerifyOTP;
