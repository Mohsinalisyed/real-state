import React from "react";
import { Box, FeildWrapper } from "../lib";
import { HeadingM } from "./styles";
interface IUserinfo {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  contact_number: number;
  whatsapp_number: number;
  isRow?: boolean;
}
const Userinfo: React.FC<IUserinfo> = ({
  first_name,
  last_name,
  email,
  address,
  contact_number,
  whatsapp_number,
  isRow,
}) => {
  return (
    <Box className="p-4 rounded w-full">
      <Box
        className={`flex justify-between bg-gray-100 p-5 flex-col sm:${isRow ? "flex-col" : "flex-row"}`}
      >
        <Box className="mb-4 border-b py-2">
          <HeadingM className="text-lg font-semibold">
            {first_name} {last_name}
          </HeadingM>
          <FeildWrapper heading="Email" data={email} />
        </Box>
        <Box>
          <FeildWrapper heading="Address" data={address} />
          <FeildWrapper heading="Contact Number" data={contact_number} />
          <FeildWrapper heading="WhatsApp Number" data={whatsapp_number} />
        </Box>
      </Box>
    </Box>
  );
};

export default Userinfo;
