import axios from "axios";
import { toast } from "react-toastify";
import { IProduct } from "../admin/product/component/type";

export const addproduct = async (data: any) => {
  try {
    const response = await axios.post("/api/product/add", data);
    toast.success("Product added successfully");
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
export const uploadImage = async (data: any) => {
  try {
    const response = await axios.put("/api/uploadimage", data);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
export const viewproducts = async (
  page: number,
  pageSize: number,
  category?: string,
  searchQuery?: string,
) => {
  try {
    const response = await axios.get(
      `/api/product/get?page=${page}&pageSize=${pageSize}` +
        (category !== null ? `&category=${category}` : `&name=${searchQuery}`),
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
export const deleteproducts = async (productId: number) => {
  try {
    const response = await axios.delete(
      `/api/product/delete?productId=${productId}`,
    );
    toast.success("Product deleted successfully");
    return response.data.products;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
export const updateproducts = async (id: number, updatedData: IProduct) => {
  try {
    const response = await axios.put(
      `/api/product/update?productId=${id}`,
      updatedData,
    );
    toast.success("Product updated successfully");
    return response.data.products;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
export const viewproductdetail = async (id: string | null) => {
  try {
    const response = await axios.get(`/api/product/getbyid?productId=${id}`);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
export const totalproducts = async () => {
  try {
    const response = await axios.get(`/api/product/totalproducts`);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
export const addreview = async (productId: string, review: any) => {
  try {
    const response = await axios.put(`/api/product/addreview`, {
      productId: productId,
      review,
    });
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
