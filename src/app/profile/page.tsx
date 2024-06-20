"use client";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { profile, updateprofile } from "@/app/services/user";
import Spinner from "@/app/components/Spinner";
import useTwElements from "@/app/hooks/useTwElements";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { IProfile, profileSchema } from "./type";
import { zodResolver } from "@hookform/resolvers/zod";
import { button } from "../components/primitive";
import useImageUpload from "../hooks/useUpload";
import { UploadSvg } from "../lib/Svg/UploadSvg";
import { Box, Button, Container, Flex, Form } from "../lib";
import InputField from "../components/InputFeild";

export default function ProfilePage() {
  const twElementsLoaded = useTwElements();
  const {
    data: profileData,
    isLoading,
    refetch,
  } = useQuery("adminprofile", profile);
  const { imageUrls, setImageUrls, handleUpload, uploading } = useImageUpload();

  const updateDefaultValue = {
    first_name: profileData?.data?.first_name || "",
    last_name: profileData?.data?.last_name || "",
    address: profileData?.data?.address || "",
    contact_number: profileData?.data?.contact_number || "",
    whatsapp_number: profileData?.data?.whatsapp_number || "",
    profile_image: profileData?.data?.profile_image || "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<IProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues: updateDefaultValue,
  });
  useEffect(() => {
    if (!isLoading && profileData?.data) {
      setImageUrls(profileData?.data?.profile_image);
      reset(updateDefaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, profileData?.data, reset]);
  const { mutate: updateProfile, isLoading: updateLoading } = useMutation<
    IProfile,
    Error,
    any
  >(({ updatedUser }) => updateprofile(updatedUser));

  const onSubmit = async (data: IProfile) => {
    const userId = profileData?.data?._id;
    if (!imageUrls) {
      setError("profile_image", { message: "This field is required" });
      return;
    }
    updateProfile({
      updatedUser: { ...data, userId, profile_image: imageUrls },
    });
    refetch();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      handleUpload(selectedFiles);
    }
  };
  return (
    <Container>
      {twElementsLoaded &&
        (isLoading ? (
          <Box className="flex items-center justify-center h-screen">
            <Spinner height="h-20" width="w-20" />
          </Box>
        ) : (
          <Box className="w-full min-h-screen flex items-center justify-center">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-wrap items-center justify-center h-full gap-6 lg:justify-between"
            >
              <Box className="p-2 md:p-4">
                <Box className="w-full px-6 pb-8 sm:max-w-xl sm:rounded-lg">
                  <Flex>
                    <Box className="flex flex-col items-center justify-center space-y-5 sm:flex-row sm:space-y-0 mr-4">
                      <Box>
                        <label
                          htmlFor="dropzone-file"
                          className="rounded-full h-32 w-32 flex items-center justify-center bg-white"
                        >
                          {imageUrls?.length && !uploading ? (
                            <>
                              {uploading ? (
                                <div>Uploading...</div>
                              ) : (

                                <div>
                                  {imageUrls?.map((url, index) => (
                                    <Image
                                      key={index}
                                      src={url[0]}
                                      alt={`Image ${index}`}
                                      className="w-full p-2 mt-1 border rounded-md h-3/5"
                                      loader={({ src }) => `${src}?w=256&h=256`}
                                      width={256}
                                      height={256}
                                    />
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <label htmlFor="dropzone-file">
                              {uploading ? (
                                <Spinner width="w-5" height="h-5" />
                              ) : (
                                <UploadSvg />
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

                    <Box className="items-center mt-8 sm:mt-14 text-[#202142]">
                      <Box className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <Box className="w-full">
                          <InputField
                            id="first_name"
                            type="text"
                            placeholder="First Name"
                            register={register}
                            errors={errors?.first_name}
                          />
                        </Box>

                        <Box className="w-full">
                          <InputField
                            id="last_name"
                            type="text"
                            placeholder="Last Name"
                            register={register}
                            errors={errors?.last_name}
                          />
                        </Box>
                      </Box>
                      <Box className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <Box className="w-full">
                          <InputField
                            id="contact_number"
                            type="text"
                            placeholder="Contact Number"
                            register={register}
                            errors={errors?.contact_number}
                          />
                        </Box>

                        <Box className="w-full">
                          <InputField
                            id="whatsapp_number"
                            type="text"
                            placeholder="WhatsApp Number"
                            register={register}
                            errors={errors?.whatsapp_number}
                          />
                        </Box>
                      </Box>
                      <Box className="mb-2 sm:mb-6">
                        <InputField
                          id="email"
                          type="text"
                          placeholder={profileData?.data?.email}
                          register={register}
                          disabled={true}
                        />
                      </Box>

                      <Box className="mb-2 sm:mb-6">
                        <InputField
                          id="address"
                          type="text"
                          placeholder="Address"
                          register={register}
                          errors={errors?.address}
                        />
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
                            "Update Profile"
                          )}
                        </Button>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Form>
          </Box>
        ))}
    </Container>
  );
}
