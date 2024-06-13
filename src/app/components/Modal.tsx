/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import useTwElements from "../hooks/useTwElements";
import Profile from "./Profile";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { profile, updateprofile } from "../services/user";
import { IProfile, profileSchema } from "../profile/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { loadStripe } from "@stripe/stripe-js";
import Spinner from "./Spinner";
import { usePaymentMutation } from "../services/payment";
import { button } from "./primitive";
import { Box } from "../lib";

interface IModal {
  closeModal?: () => void;
  cardData: any;
}
const asyncStripe = loadStripe(
  process.env.NEXT_PUBLIC_PUBLISHABLE_SECRET_KEY ?? "",
);
const Modal: React.FC<IModal> = ({ closeModal, cardData }) => {
  const twElementsLoaded = useTwElements();
  const { data: profileData, isLoading } = useQuery("orderprofile", profile);
  const { mutate: updateProfile, isLoading: profileLoading } = useMutation<
    IProfile,
    Error,
    any
  >(({ updatedUser }) => updateprofile(updatedUser), {});
  const { mutate: makePayment, isLoading: paymentLoading } =
    usePaymentMutation();
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
    reset,
    setValue,
  } = useForm<IProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues: updateDefaultValue,
  });
  useEffect(() => {
    if (!isLoading && profileData?.data) {
      reset(updateDefaultValue);
    }
  }, [isLoading, profileData?.data, reset]);
  useEffect(() => {
    setValue("email", profileData?.data?.email);
    setValue("username", profileData?.data?.username);
  }, [profileData?.data]);

  const onSubmit = async (data: IProfile) => {
    const userId = profileData?.data?._id;
    try {
      await updateProfile({
        updatedUser: { ...data, userId },
      });

      makePayment(
        { payload: { total_amount: cardData } },
        {
          onSuccess: async (data) => {
            const { sessionId } = data;
            const stripe = await asyncStripe;
            await stripe?.redirectToCheckout({ sessionId: sessionId });
          },
        },
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    twElementsLoaded && (
      <>
        <Box
          className="fixed inset-0  bg-black opacity-30"
          style={{ zIndex: "999" }}
          // onClick={closeModal}
        ></Box>

        {/* Modal */}
        <Box
          className="fixed inset-0  mt-20 w-[94%] sm:w-[50%]  mx-auto"
          style={{ height: "400px", zIndex: "999" }}
        >
          {profileLoading || isLoading || paymentLoading ? (
            <Box className="flex items-center justify-center min-h-screen">
              <Spinner height="h-20" width="w-20" />
            </Box>
          ) : (
            <Box className="relative flex flex-col w-full overflow-hidden text-current bg-white border-none rounded-md shadow-lg outline-none pointer-events-auto bg-clip-padding dark:bg-neutral-600">
              <Box className="flex items-center justify-between flex-shrink-0 p-4 border-b-2 border-opacity-100 rounded-t-md border-neutral-100 dark:border-opacity-50">
                <h5
                  className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                  id="exampleModalScrollableLabel"
                >
                  Profile Details
                </h5>
                <button
                  type="button"
                  className="box-content border-none rounded-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  data-te-modal-dismiss
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  className="relative p-4 overflow-y-auto"
                  style={{ height: "400px" }}
                >
                  <Profile
                    errors={errors}
                    register={register}
                    profileData={profile}
                  />
                </Box>

                <Box className="flex flex-wrap items-center justify-end flex-shrink-0 p-4 border-t-2 border-opacity-100 rounded-b-md border-neutral-100 dark:border-opacity-50">
                  <button
                    type="button"
                    className={button({ color: "error" })}
                    data-te-modal-dismiss
                    onClick={closeModal}
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    Close
                  </button>
                  <button
                    style={{ marginLeft: "12px" }}
                    type="submit"
                    className={button({ color: "primary" })}
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    {profileLoading ? (
                      <Spinner height="h-4" width="w-4" />
                    ) : (
                      "Pay now"
                    )}
                  </button>
                </Box>
              </form>
            </Box>
          )}
        </Box>
      </>
    )
  );
};

export default Modal;
