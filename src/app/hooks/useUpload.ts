import { useState } from "react";
import { useMutation, UseMutationResult } from "react-query";
import { uploadImage } from "@/app/services/product";

interface ImageUploadHookResult {
  imageUrls: string[];
  handleUpload: (files: FileList) => void;
  setImageUrls: (urls: string[]) => void;
  uploading?: boolean;
}

const useImageUpload = (): ImageUploadHookResult => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { mutate, isLoading }: UseMutationResult = useMutation(uploadImage, {
    onSuccess: (data) => {
      console.log("File uploaded successfully");
      setImageUrls((prevUrls) => [...prevUrls, data.imageUrls]);
    },
    onError: (error: any) => {
      console.error("Error uploading file", error);
    },
  });

  const handleUpload = (files: FileList | null) => {
    if (!files) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    mutate(formData);
  };

  return {
    imageUrls,
    handleUpload,
    setImageUrls,
    uploading: isLoading,
  };
};

export default useImageUpload;
