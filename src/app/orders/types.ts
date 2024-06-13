import { IProductDetail } from "../admin/product/type";

export interface Iorder {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  contact_number: number;
  whatsapp_number: number;
  orderId: number;
  status: string;
  products: IProductDetail[];
  date: number;
}
