import axios from "axios";
import { toast } from "react-toastify";

export const addtocart = async (data: any) => {
  try {
    const response = await axios.post("/api/cart/add", data);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
export const viewcart = async () => {
  try {
    const response = await axios.get("/api/cart/get");
    return response.data.cart;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
export const deletecartitem = async (productId: number) => {
  try {
    const response = await axios.delete(
      `/api/cart/delete?productId=${productId}`,
    );
    return response.data.cart;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};

export const clearCart = async (userId: any) => {
  try {
    const response = await axios.delete(`/api/cart/clear`, {
      data: { userid: userId },
    });
    return response.data.cart;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
