import { useState } from "react";
import { useMutation, UseMutationResult } from "react-query";
import { uploadImage } from "@/app/services/product";

interface ImageUploadHookResult {
  imageUrl: string;
  handleUpload: (file: File) => void;
  setImageUrl: (e: string) => void;
  uploading?: boolean;
}

const useImageUpload = (): ImageUploadHookResult => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const { mutate, isLoading }: UseMutationResult = useMutation(uploadImage, {
    onSuccess: (data) => {
      console.log("File uploaded successfully");
      setImageUrl(data.imageUrl);
    },
    onError: (error: any) => {
      console.error("Error uploading file", error);
    },
  });

  const handleUpload = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    mutate(formData);
  };

  return {
    imageUrl,
    handleUpload,
    setImageUrl,
    uploading: isLoading,
  };
};

export default useImageUpload;
