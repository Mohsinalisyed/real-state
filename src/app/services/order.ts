import axios from "axios";
import { toast } from "react-toastify";

export const orderdata = async (data: any) => {
  try {
    const response = await axios.post("/api/order/orderdata", data);
    toast.success("Order added successfully");
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};

export const vieworders = async ({ userid, page, pageSize = 5 }: any) => {
  try {
    const response = await axios.get(
      `/api/order/getorder?id=${userid}&page=${page}&pageSize=${pageSize}`,
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};

export const updateorder = async (data: any) => {
  try {
    const response = await axios.put(`/api/order/updateorder`, data);
    return response.data.products;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};

export const listorder = async (page: number, pageSize = 5) => {
  try {
    const response = await axios.get(
      `/api/order/listorder?&page=${page}&pageSize=${pageSize}`,
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
export const totalorders = async () => {
  try {
    const response = await axios.get(`/api/order/totalorders`);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};

export const updatestatus = async (data: any) => {
  try {
    const response = await axios.put(`/api/order/updatestatus`, data);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
export const vieworderdetail = async (id: string | null) => {
  try {
    const response = await axios.get(`/api/order/vieworder?orderId=${id}`);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
