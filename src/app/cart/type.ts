export interface Product {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IOrder {
  userid: string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  contact_number?: string;
  whatsapp_number?: string;
  profile_image?: string;
  isVerified?: boolean;
  isAdmin?: boolean;
  products: Product[];
  date?: Date;
}
