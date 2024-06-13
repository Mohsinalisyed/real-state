import axios from "axios";
import { toast } from "react-toastify";

export const addcategory = async (data: any) => {
  try {
    const response = await axios.post("/api/categories/addcategories", data);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
export const getcategory = async (
  page?: number,
  pageSize?: number,
  all?: boolean,
) => {
  try {
    let queryString = `/api/categories/getcategory?page=${page}&pageSize=${pageSize}`;
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
export const deletecategory = async (categoryId: number) => {
  try {
    const response = await axios.delete(
      `/api/categories/delete?categoryId=${categoryId}`,
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
