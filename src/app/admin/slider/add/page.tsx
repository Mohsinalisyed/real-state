"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { profile, updateprofile } from "@/app/services/user";
import Spinner from "@/app/components/Spinner";
import useTwElements from "@/app/hooks/useTwElements";
import Image from "next/image";
import { useForm } from "react-hook-form";
import useImageUpload from "@/app/hooks/useUpload";
import { ISlider, sliderSchema } from "./type";
import { zodResolver } from "@hookform/resolvers/zod";
import { addSlider } from "@/app/services/home";
import { Box, Button, Form, Switch } from "@/app/lib";
import { UploadSvg } from "@/app/lib/Svg/UploadSvg";
import InputField from "@/app/components/InputFeild";
import { button } from "@/app/components/primitive";

export default function AddSlider() {
  const twElementsLoaded = useTwElements();
  const { imageUrl, setImageUrl, handleUpload, uploading } = useImageUpload();
  const [isActive, setIsActive] = useState(false); // State variable to hold the active state

  const handleToggle = () => {
    setIsActive(!isActive); // Toggle the state when the switch is clicked
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ISlider>({
    resolver: zodResolver(sliderSchema),
  });
  const { mutate: addslider, isLoading: updateLoading } = useMutation<
    ISlider,
    Error,
    any
  >(({ updatedUser }) => addSlider(updatedUser), {
    onSuccess: () => {
      reset();
      setImageUrl("");
    },
  });
  const onSubmit = async (data: ISlider) => {
    if (!imageUrl) {
      setError("imageUrl", { message: "This field is required" });
      return;
    }
    addslider({
      updatedUser: { ...data, imageUrl: imageUrl, active: isActive },
    });
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      handleUpload(selectedFile);
    }
  };
  return (
    <section>
      {twElementsLoaded &&
        (updateLoading ? (
          <Box className="flex items-center justify-center h-screen">
            <Spinner height="h-20" width="w-20" />
          </Box>
        ) : (
          <Box className="w-full min-h-screen flex items-center justify-center pt-20">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-wrap items-center justify-center h-full gap-6 lg:justify-between"
            >
              <Box className="p-2 md:p-4">
                <Box className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                  <Box className="grid max-w-2xl mx-auto mt-8">
                    <Box className="flex flex-col items-center justify-center space-y-5 sm:flex-row sm:space-y-0">
                      <Box>
                        <label
                          htmlFor="dropzone-file"
                          className=" h-64 w-64 flex items-center justify-center bg-white"
                        >
                          {imageUrl && !uploading ? (
                            <Image
                              src={imageUrl}
                              alt="Sample image"
                              className=" h-64 w-64  flex items-center justify-center bg-white"
                              loader={({ src }) => `${src}?w=256&h=256`}
                              width={256}
                              height={256}
                            />
                          ) : (
                            <label htmlFor="dropzone-file">
                              {uploading ? (
                                <Spinner width="w-5" height="h-5" />
                              ) : (
                                <Box className="p-10 border-2 border-gray-300 ">
                                  <UploadSvg />
                                </Box>
                              )}
                            </label>
                          )}
                          <input
                            id="dropzone-file"
                            type="file"
                            onChange={onFileChange}
                            className="hidden"
                            accept="image/*"
                            disabled={uploading}
                          />
                        </label>
                      </Box>
                    </Box>
                    <Box className="text-red500">
                      {errors?.imageUrl?.message}
                    </Box>
                    <Box className="items-center  text-[#202142]">
                      <Box className="mb-6 mt-4">
                        Active
                        <Switch
                          id="sliderSwitch"
                          toggled={isActive}
                          onChange={handleToggle}
                        />
                      </Box>
                      <Box className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <Box className="w-full">
                          <InputField
                            id="caption"
                            type="text"
                            placeholder="Caption"
                            register={register}
                            errors={errors?.caption}
                          />
                        </Box>
                      </Box>

                      <Box className="flex justify-between mt-5 text-center lg:text-left">
                        <Button
                          type="submit"
                          className={button({ color: "primary" })}
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          style={{ minWidth: "100px" }}
                        >
                          {updateLoading ? (
                            <Spinner variant="info" />
                          ) : (
                            "Add Slider"
                          )}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Form>
          </Box>
        ))}
    </section>
  );
}
