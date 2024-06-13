"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useTwElements from "../hooks/useTwElements";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILogIn, logInSchema } from "./type";
import { useMutation, useQuery } from "react-query";
import { isLogin, login, resendOTP } from "../services/user";
import Spinner from "../components/Spinner";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../lib/Reducers/loginreducer";
import { toast } from "react-toastify";
import InputField from "../components/InputFeild";
import { button } from "../components/primitive";
import { Box, Button, Container, Form, MainHeading } from "../lib";
import { HeadingM } from "../components/styles";
import { AuthCard } from "../signup/style";
export default function LoginPage() {
  const { refetch } = useQuery("isLogin", isLogin);
  const { mutate: resendOtp } = useMutation("resendOTP", resendOTP, {
    onSuccess: () => {
      toast.success("Otp is send");
    },
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const twElementsLoaded = useTwElements();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogIn>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isLoading } = useMutation("login", login, {
    onSuccess: (data) => {
      const { id, username, email, isVerfied, isAdmin } = data.tokenData;
      const { token } = data;
      if (!isVerfied) {
        toast.error("Verify your account and login again !!");
        resendOtp(email);
        router.push(`/verifyemail?email=${email}`);
      } else {
        dispatch(
          loginSuccess({
            userid: id,
            token: token,
            user: username,
            email: email,
            isVerified: isVerfied,
            isAdmin: isAdmin,
          }),
        );
        toast.success("Login success");
        refetch();
        isVerfied && isAdmin
          ? router.push("/admin/dashboard")
          : router.push(`/`);
      }
    },
  });

  const onLogin = async (data: ILogIn) => {
    mutate(data);
  };

  return (
    <Container>
      {twElementsLoaded && (
        <Box className="h-screen">
          <Box className="flex flex-wrap items-center justify-center h-full gap-6 lg:justify-between">
            <Box className="mb-12 shrink-1 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <Image
                src='/assets/login.png'
                className="w-full"
                alt="Sample image"
                loader={({ src }) => `${src}?w=256&h=256`}
                width={256}
                height={256}
                style={{ borderRadius: "8px" }}
              />
            </Box>
            <AuthCard>
              <Form onSubmit={handleSubmit(onLogin)}>
                <MainHeading title="Login" />
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
                    className={button({ color: "primary" })}
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    style={{ minWidth: "100px" }}
                  >
                    {isLoading ? <Spinner width="w-4" height="h-4" /> : "Login"}
                  </Button>
                  <HeadingM className="pt-4 mt-2 mb-0 text-sm font-semibold">
                    <span className="pr-2 text-zinc">
                      {" "}
                      {`Don't have an account?`}
                    </span>
                    <Link
                      href="/signup"
                      className="text-blue transition duration-150 ease-in-out hover:text-danger focus:text-danger active:text-danger"
                      shallow
                    >
                      Register
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
