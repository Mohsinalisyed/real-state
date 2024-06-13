import axios from "axios";
import { ILogIn } from "../login/type";
import { toast } from "react-toastify";
import { IProfile } from "../profile/type";

export const login = async (data: ILogIn) => {
  try {
    const response = await axios.post("/api/users/login", data);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
export const logout = async () => {
  try {
    const response = await axios.get("/api/users/logout");
    toast.success("Logout success");
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
export const signup = async (data: any) => {
  try {
    const response = await axios.post("/api/users/signup", data);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
export const profile = async () => {
  try {
    const response = await axios.get("/api/users/me");
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
export const totalusers = async () => {
  try {
    const response = await axios.get(`/api/users/totalusers`);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
export const updateprofile = async (updatedUser: IProfile) => {
  try {
    const response = await axios.put(`/api/users/profile`, updatedUser);
    toast.success("Profile updated successfully");
    return response.data.updatedUser;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
export const isLogin = async () => {
  try {
    const response = await axios.get(`/api/users/islogin`);
    return response.data.loggedIn;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};

export const verifyUserEmail = async ({ email, otp }: any) => {
  try {
    await axios.post("/api/users/verifyemail", { email, otp });
  } catch (error: any) {
    console.log(error.response.data);
  }
};
export const resendOTP = async (email: string) => {
  try {
    await axios.post("/api/users/resendotp", { email });
  } catch (error: any) {
    console.log(error.response.data);
  }
};
