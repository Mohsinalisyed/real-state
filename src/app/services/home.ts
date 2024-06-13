import axios from "axios";
import { toast } from "react-toastify";

export const addSlider = async (data: any) => {
  try {
    const response = await axios.post("/api/home/addslider", data);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};

export const getslider = async (
  page?: number,
  pageSize?: number,
  all?: boolean,
) => {
  try {
    let queryString = `/api/home/getslider?page=${page}&pageSize=${pageSize}`;
    if (all) {
      queryString += "&all=true";
    }

    // Make the axios request with the constructed query string
    const response = await axios.get(queryString);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};

export const deleteSlider = async (sliderId: number) => {
  try {
    const response = await axios.delete(
      `/api/home/deleteslider?sliderId=${sliderId}`,
    );
    return response.data.cart;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
