import { HeadingL, HeadingM } from "@/app/components/styles";
import useTwElements from "@/app/hooks/useTwElements";
import useImageUpload from "@/app/hooks/useUpload";
import { Box, Flex } from "@/app/lib";
import Image from "next/image";
import React from "react";

interface IArray {
  name: string;
  value: string;
  image?: string;
}

interface IModal {
  closeModal?: () => void;
  title: string;
  attributeArray: IArray[];
  handleBoxClick: (name: string, value: string, image?: string) => void;
  attribute?: IArray[];
}

const AttributeModal: React.FC<IModal> = ({
  closeModal,
  title,
  attributeArray,
  handleBoxClick,
  attribute,
}) => {
  const twElementsLoaded = useTwElements();
  const { imageUrl, handleUpload } = useImageUpload();
  const onFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    item: IArray,
  ) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      try {
        await handleUpload(selectedFile);
        if (!!imageUrl) {
          handleBoxClick(item.name, item.value, imageUrl);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  return (
    twElementsLoaded && (
      <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-filter backdrop-blur-sm">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <Box
          className="relative mt-8 w-full max-w-lg bg-white border-none rounded-md shadow-lg outline-none pointer-events-auto bg-clip-padding dark:bg-neutral-600"
          style={{ maxHeight: "600px", overflowY: "auto" }}
        >
          <Box className="flex items-center justify-between flex-shrink-0 p-4 border-b-2 border-opacity-100 rounded-t-md border-neutral-100 dark:border-opacity-50">
            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
              {title}
            </h5>
            <button
              type="button"
              className="box-content border-none rounded-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              onClick={closeModal}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </Box>
          <Flex style={{ gap: "10px", padding: "20px" }} wrap="wrap">
            {attributeArray.map((item, index) =>
              title === "Add Color" ? (
                <Box
                  key={index}
                  style={{
                    display: "block",
                    width: "32px",
                    height: "32px",
                    overflow: "hidden",
                    boxSizing: "border-box",
                    background: `${item.value}`,
                    borderRadius: "100%",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => onFileChange(e, item)}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      cursor: "pointer",
                    }}
                  />
                </Box>
              ) : (
                <Box
                  key={index}
                  style={{ padding: "12px", border: "1px solid red" }}
                  onClick={() => handleBoxClick(item.name, item.value)}
                >
                  <HeadingM>{item?.name}</HeadingM>
                </Box>
              ),
            )}
          </Flex>
          <Box>
            <HeadingL className="p-4">Selected Attribute</HeadingL>
            {attribute?.map((item, index) => (
              <Flex key={index} className="p-4" justify="space-between">
                <HeadingM>{item.name}</HeadingM>
                {!!item.image && (
                  <Image
                    src={item.image ?? ""}
                    alt="Sample image"
                    className="w-[100px] p-2 mt-1 border rounded-md h-[100px]"
                    loader={({ src }) => `${src}?w=256&h=256`}
                    width={256}
                    height={256}
                  />
                )}
              </Flex>
            ))}
          </Box>
        </Box>
      </div>
    )
  );
};

export default AttributeModal;
