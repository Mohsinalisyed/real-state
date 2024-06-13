import React from "react";
import useTwElements from "../hooks/useTwElements";
import { Box } from "../lib";
import Userinfo from "./Userinfo";

interface IModal {
  closeModal?: () => void;
  user: any;
  isRow?: boolean;
}

const AddressModal: React.FC<IModal> = ({ closeModal, user, isRow }) => {
  const twElementsLoaded = useTwElements();

  return (
    twElementsLoaded && (
      <>
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-filter backdrop-blur-sm">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <Box className="relative w-full max-w-lg bg-white border-none rounded-md shadow-lg outline-none pointer-events-auto bg-clip-padding dark:bg-neutral-600">
            <Box className="flex items-center justify-between flex-shrink-0 p-4 border-b-2 border-opacity-100 rounded-t-md border-neutral-100 dark:border-opacity-50">
              <h5
                className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id="exampleModalScrollableLabel"
              >
                Delivery address details
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
            <Userinfo
              first_name={user?.first_name}
              last_name={user?.last_name}
              address={user?.address}
              contact_number={user?.contact_number}
              whatsapp_number={user?.whatsapp_number}
              email={user?.email}
              isRow={isRow}
            />
          </Box>
        </div>
      </>
    )
  );
};

export default AddressModal;
