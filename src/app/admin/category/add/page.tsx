"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Spinner from "@/app/components/Spinner";
import useTwElements from "@/app/hooks/useTwElements";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Form, Switch } from "@/app/lib";
import InputField from "@/app/components/InputFeild";
import { button } from "@/app/components/primitive";
import { ICategory, categorySchema } from "./type";
import { addcategory } from "@/app/services/category";

export default function AddSlider() {
  const twElementsLoaded = useTwElements();
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICategory>({
    resolver: zodResolver(categorySchema),
  });
  const { mutate: addCategory, isLoading: updateLoading } = useMutation<
    ICategory,
    Error,
    any
  >(({ updatedUser }) => addcategory(updatedUser), {
    onSuccess: () => {
      reset();
    },
  });
  const onSubmit = async (data: ICategory) => {
    addCategory({
      updatedUser: { ...data, active: isActive },
    });
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
                            id="name"
                            type="text"
                            placeholder="Category name"
                            register={register}
                            errors={errors?.name}
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
                            "Add category"
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
