"use client";
import React, { useEffect, useState } from "react";
import { Box } from "../lib";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { resendOTP, verifyUserEmail } from "../services/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ResendOtpResponse = {
  savedUser: {
    otpExpiry: number;
  };
};

export default function VerifyEmailPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  console.log(timeRemaining, "timeRemaining");
  const { mutate } = useMutation(verifyUserEmail, {
    onSuccess: () => {
      setVerified(true);
      router.push("/login");
    },
    onError: (error) => {
      setError("Verification failed. Please try again.");
      toast.error("Verification failed. Please try again.");
    },
  });

  const { mutate: resendOtp, isLoading: optLoading } = useMutation<
    any,
    Error,
    any
  >((email) => resendOTP(email), {
    onSuccess: async (data) => {
      const expiryTime = data?.savedUser?.otpExpiry;
      await setTimeRemaining(expiryTime - Math.floor(Date.now() / 1000));
      toast.success("OTP has been sent.");
    },
  });
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const emailParam = queryParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  useEffect(() => {
    if (timeRemaining !== null) {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev && prev > 0) {
            return prev - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeRemaining]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutate({ otp: otp.join(""), email });
  };

  const handleResendOtp = () => {
    resendOtp(email);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Verify Email</h1>

      {!verified ? (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="flex space-x-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              ))}
            </div>
            <div className="flex justify-center space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue text-white rounded-md hover:bg-blue-600"
              >
                Verify OTP
              </button>
              <button
                type="button"
                onClick={handleResendOtp}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Resend OTP
              </button>
            </div>
            {timeRemaining !== null && (
              <div className="mt-4 text-black text-lg text-red-600">
                Time remaining: {formatTime(timeRemaining)}
              </div>
            )}
          </form>
        </>
      ) : (
        <Box className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-green-500 mb-4">
            Email Verified
          </h2>
        </Box>
      )}

      {error && (
        <Box className="mt-4">
          <h2 className="text-xl bg-red-500 text-white p-2 rounded-md">
            {error}
          </h2>
        </Box>
      )}
    </Box>
  );
}
