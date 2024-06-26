/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "react-query";
import useTwElements from "@/app/hooks/useTwElements";
import { IProduct, productSchema } from "./type";
import { addproduct, updateproducts } from "@/app/services/product";
import useImageUpload from "@/app/hooks/useUpload";
import { viewproductdetail } from "../../../services/product";
import Spinner from "@/app/components/Spinner";
import InputField from "@/app/components/InputFeild";
import { button } from "@/app/components/primitive";
import { UploadSvg } from "@/app/lib/Svg/UploadSvg";
import { HeadingS } from "@/app/components/styles";
import { Box, Button, Flex, MainHeading } from "@/app/lib";
import { getcategory } from "@/app/services/category";
import Select from "react-select";
import AttributeModal from "./AttributeModal";
import { colors } from "./color";
import { sizes } from "./size";
import ButtonComp from "@/app/components/Button";

interface IForm {
  productId: string | null;
  objectId: string | null;
}
export interface IAttribute {
  name: string;
  value: string;
  image?: string;
}
const ProductForm: React.FC<IForm> = ({ productId, objectId }) => {
  const updateid = productId;
  const twElementsLoaded = useTwElements();
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [sizeattribute, setSizeAttribute] = useState<IAttribute[]>([]);
  const [attribute, setAttribute] = useState<IAttribute[]>([]);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openSizeModal = () => {
    setIsSizeOpen(true);
  };
  const closeSizeModal = () => {
    setIsSizeOpen(false);
  };
  const handleCategoryChange = (selectedOption: any | null) => {
    setSelectedCategory(selectedOption);
  };

  const handleBoxClick = (name: string, value: string, image?: string) => {
    const isColorSelected = attribute.some((attr) => attr.name === name);
    if (isColorSelected) {
      setAttribute((prevAttributes: any) =>
        prevAttributes.filter((attr: any) => attr.name !== name),
      );
    } else {
      setAttribute((prevAttributes: any) => [
        ...(prevAttributes || []),
        {
          name: name,
          value: value,
          image: image,
        },
      ]);
    }
  };
  const handleSizeClick = (name: string, value: string) => {
    const isColorSelected = sizeattribute.some((attr) => attr.name === name);
    if (isColorSelected) {
      setSizeAttribute((prevAttributes: any) =>
        prevAttributes.filter((attr: any) => attr.name !== name),
      );
    } else {
      setSizeAttribute((prevAttributes: any) => [
        ...(prevAttributes || []),
        { name: name, value: value },
      ]);
    }
  };
  const { imageUrl, setImageUrl, handleUpload } = useImageUpload();
  const { data: products, isLoading: existing } = useQuery(
    "viewproductdetail",
    async () => await viewproductdetail(objectId),
    {
      enabled: !!objectId,
    },
  );

  const {
    data: category,
    isLoading: categoryLoading,
    refetch,
  } = useQuery(["getcategory", true], () => getcategory(0, 0, true));

  const updateDefaultValue = {
    name: products?.product?.name,
    price: products?.product?.price.toString(),
    image: products?.product?.image,
    quantity: products?.product?.quantity.toString(),
    description: products?.product?.description,
    category: products?.product?.category, // Ensure this matches the ID in your data
  };

  const defaultValue = {
    name: "",
    price: "",
    image: "",
    quantity: "",
    description: "",
    category: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<IProduct>({
    resolver: zodResolver(productSchema),
    defaultValues: updateDefaultValue,
  });

  const { mutate, isLoading } = useMutation("addproduct", addproduct, {
    onSuccess: () => {
      setImageUrl("");
      setSelectedCategory(null);
      reset();
    },
  });
  const { mutate: updateProduct, isLoading: updateLoading } = useMutation<
    IProduct,
    Error,
    any
  >(({ updateid, updatedData }) => updateproducts(updateid, updatedData));

  const handleUpdate: SubmitHandler<IProduct> = (data) => {
    updateProduct({
      updateid,
      updatedData: {
        productId: updateid,
        updatedData: {
          ...data,
          image: imageUrl,
          category: selectedCategory?.label,
        },
      },
    });
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      handleUpload(selectedFile);
    }
  };

  const onAddProduct = (data: IProduct) => {
    if (!imageUrl) {
      setError("image", { message: "This field is required" });
      return;
    }
    data.sizeAttribute = sizeattribute.map((item) => ({
      name: item.name,
      value: item.value,
    }));
    data.colorAttribute = attribute.map((item) => ({
      name: item.name,
      value: item.value,
      image: item.image,
    }));
    data.category = selectedCategory?.label || "";
    mutate({ ...data, image: imageUrl });
  };

  useEffect(() => {
    if (imageUrl) {
      clearErrors("image");
    }
  }, [imageUrl]);

  useEffect(() => {
    if (products) {
      const defaultValues = updateid ? updateDefaultValue : defaultValue;
      updateid ? setImageUrl(products?.product?.image) : setImageUrl("");
      setSelectedCategory({
        label: products?.product?.category,
        value: products?.product?.categoryId,
      });
      reset(defaultValues);
    }
  }, [reset, objectId, updateid, products]);

  return (
    <section>
      {twElementsLoaded && (
        <form
          onSubmit={
            updateid ? handleSubmit(handleUpdate) : handleSubmit(onAddProduct)
          }
        >
          {isLoading || updateLoading || existing ? (
            <Box className="flex items-center justify-center min-h-screen">
              <Spinner height="h-20" width="w-20" />
            </Box>
          ) : (
            <Box className="flex flex-wrap items-center justify-center gap-6 lg:justify-between">
              <Box className="mb-12 shrink-1 grow-0 basis-auto md:mb-0 md:w-4/12 md:shrink-0 lg:w-4/12 xl:w-4/12">
                <Box className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt="Sample image"
                        className="w-full p-2 mt-1 border rounded-md h-3/5"
                        loader={({ src }) => `${src}?w=256&h=256`}
                        width={256}
                        height={256}
                      />
                    ) : (
                      <Box className="flex flex-col items-center justify-center pt-5 pb-6 h-96">
                        <UploadSvg />
                        <HeadingS className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </HeadingS>
                        <HeadingS className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </HeadingS>
                      </Box>
                    )}
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={onFileChange}
                      className="w-full p-2 mt-1 border rounded-md"
                    />
                  </label>
                </Box>
                {errors.image && (
                  <span className="text-red-500">{errors.image.message}</span>
                )}
              </Box>
              <Box className="pt-4 md:mb-0 md:w-8/12 lg:w-7/12 xl:w-7/12">
                <MainHeading
                  title={updateid ? "Update Product" : "Add Product"}
                />
                <InputField
                  id="name"
                  type="text"
                  register={register}
                  placeholder="Name"
                  errors={errors?.name}
                />
                <InputField
                  id="price"
                  type="number"
                  register={register}
                  placeholder="Price"
                  errors={errors?.price}
                />

                <InputField
                  id="quantity"
                  type="number"
                  register={register}
                  placeholder="Quantity"
                  errors={errors?.quantity}
                />
                <Box className="mb-6">
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={category?.allCategory?.map((item: any) => ({
                          label: item.name,
                          value: item.categoryId,
                        }))}
                        value={selectedCategory}
                        onChange={(option) => {
                          field.onChange(option?.label);
                          handleCategoryChange(option);
                        }}
                        placeholder="Select Category"
                        className="dropdown"
                      />
                    )}
                  />
                  {errors?.category && (
                    <span className="text-red-500">
                      {errors?.category?.message}
                    </span>
                  )}
                </Box>
                <Flex className="mb-2">
                  <ButtonComp type="button" func={openModal} text="Add Color" />
                  <ButtonComp
                    type="button"
                    func={openSizeModal}
                    text="Add Size"
                  />
                </Flex>
                <Box className="relative mb-6" data-te-input-wrapper-init>
                  <textarea
                    id="description"
                    style={{ resize: "none" }}
                    {...register("description")}
                    placeholder="Description"
                    className="peer m-0 block h-[108px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                  />
                  <label
                    htmlFor="description"
                    className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Description
                  </label>
                  {errors.description && (
                    <span className="text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </Box>
                {/* Add Product button */}
                <Box className="text-center lg:text-left">
                  <Button
                    type="submit"
                    className={button({ color: "primary" })}
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    {updateid ? "Update Product" : "Add Product"}
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </form>
      )}
      {isModalOpen && (
        <AttributeModal
          closeModal={closeModal}
          title="Add Color"
          attributeArray={colors}
          handleBoxClick={(name: string, value: string, image?: string) =>
            handleBoxClick(name, value, image)
          }
          attribute={attribute}
        />
      )}
      {isSizeOpen && (
        <AttributeModal
          closeModal={closeSizeModal}
          title="Add Size"
          attributeArray={sizes}
          attribute={sizeattribute}
          handleBoxClick={(name: string, value: string) =>
            handleSizeClick(name, value)
          }
        />
      )}
    </section>
  );
};

export default ProductForm;
