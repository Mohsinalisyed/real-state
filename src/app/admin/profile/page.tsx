"use client";
import React from "react";
import { useQuery } from "react-query";
import { profile } from "@/app/services/user";
import Spinner from "@/app/components/Spinner";
import useTwElements from "@/app/hooks/useTwElements";
import Image from "next/image";

import { Box } from "@/app/lib";

export default function ProfilePage() {
  const twElementsLoaded = useTwElements();

  const { data: profileData, isLoading } = useQuery("adminprofile", profile);

  return (
    <section>
      {twElementsLoaded &&
        (isLoading ? (
          <Box className="flex items-center justify-center min-h-screen">
            <Spinner height="h-20" width="w-20" />
          </Box>
        ) : (
          <Box className="flex flex-wrap items-center justify-center h-full gap-6 lg:justify-between min-h-screen pt-20">
            <Box className="mb-12 shrink-1 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <Image
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
                loader={({ src }) => `${src}?w=256&h=256`}
                width={256}
                height={256}
              />
            </Box>

            <Box className="pr-8 mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              {/* Or */}
              <Box className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 font-semibold text-center dark:text-white">
                  Profile
                </p>
              </Box>

              <Box>
                <p>{profileData?.data?.email}</p>
                <p>{profileData?.data?.username}</p>
              </Box>
              <hr />
            </Box>
          </Box>
        ))}
    </section>
  );
}
