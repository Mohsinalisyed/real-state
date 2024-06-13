import React from "react";
import InputField from "./InputFeild";
import { Box } from "../lib";
interface ProfileProps {
  errors?: any;
  register?: any;
  profileData?: any;
}
const Profile: React.FC<ProfileProps> = ({ errors, register, profileData }) => {
  return (
    <Box>
      <InputField
        id="email"
        type="text"
        placeholder={profileData?.data?.email}
        register={register}
        disabled={true}
      />
      <InputField
        id="username"
        type="text"
        placeholder={profileData?.data?.username}
        register={register}
        disabled={true}
      />
      <InputField
        id="first_name"
        type="text"
        placeholder="First Name"
        register={register}
        errors={errors?.first_name}
      />
      <InputField
        id="last_name"
        type="text"
        placeholder="Last Name"
        register={register}
        errors={errors?.last_name}
      />
      <InputField
        id="address"
        type="text"
        placeholder="Address"
        register={register}
        errors={errors?.address}
      />
      <InputField
        id="contact_number"
        type="text"
        placeholder="Contact Number"
        register={register}
        errors={errors?.contact_number}
      />
      <InputField
        id="whatsapp_number"
        type="text"
        placeholder="WhatsApp Number"
        register={register}
        errors={errors?.whatsapp_number}
      />
    </Box>
  );
};

export default Profile;
