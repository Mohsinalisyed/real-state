// Import necessary modules and libraries
"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useTwElements from "../hooks/useTwElements";
import Image from "next/image";
import { ISignUp, signUpSchema } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { signup } from "../services/user";
import Spinner from "../components/Spinner";
import InputField from "../components/InputFeild";
import { button } from "../components/primitive";
import { Box, Button, Container, Form, MainHeading } from "../lib";
import { HeadingM } from "../components/styles";
import { AuthCard } from "./style";

export default function SignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const twElementsLoaded = useTwElements();

  const { mutate, isLoading } = useMutation("signup", signup, {
    onSuccess: (data) => {
      toast.success("Signup successful");
      router.push(`/verifyemail?email=${data.savedUser.email}`);
    },
    onError: (error: any) => {
      console.error("Signup failed", error.message);
      toast.error(error.message);
    },
  });

  const onSubmit = async (formData: any) => {
    try {
      mutate(formData);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <Container>
      {twElementsLoaded && (
        <Box className="h-screen">
          <Box className="flex flex-wrap items-center justify-center h-full g-6">
            <AuthCard>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <MainHeading title="Signup" />
                <InputField
                  id="username"
                  type="text"
                  register={register}
                  placeholder="Username"
                  errors={errors?.username}
                />
                <InputField
                  id="email"
                  type="text"
                  register={register}
                  placeholder="Email"
                  errors={errors?.email}
                />
                <InputField
                  id="password"
                  type="password"
                  register={register}
                  placeholder="Password"
                  errors={errors?.password}
                />

                <Box className="text-center lg:text-left">
                  <Button
                    type="submit"
                    style={{ minWidth: "100px" }}
                    className={button({ color: "primary" })}
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    {isLoading ? (
                      <Spinner height="h-4" width="w-4" />
                    ) : (
                      "Register"
                    )}
                  </Button>

                  <HeadingM className="pt-4 mt-2 mb-0 text-sm font-semibold">
                    <span className="pr-2 text-zinc">
                      {" "}
                      {"Don't have an account?"}
                    </span>
                    <Link
                      href="/login"
                      className="text-red-500 transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                      shallow
                    >
                      Log in
                    </Link>
                  </HeadingM>
                </Box>
              </Form>
            </AuthCard>
          </Box>
        </Box>
      )}
    </Container>
  );
}
