import { Product, User } from "./types";


export type CustomError = {
    status: number;
    data: {
      message: string;
      success: boolean;
    };
  };
export type MessageResponce = {
    success:boolean,
    message:string
};
export type UserResponse = {
    success: boolean;
    user: User;
  };

export type AllProductResponse = {
    success: boolean;
    products: Product[];
};
export type CategoryResponse = {
    success: boolean;
    categories: string[];
};
export type SearchProductsResponse = AllProductResponse & {
  totalPage: number;
};
export type SearchProductsRequest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};
export type NewProductRequest = {
  id: string;
  formData: FormData;
};
export type ProductResponse = {
  success: boolean;
  product: Product;
};
export type UpdateProductRequest = {
  product_id:string;
  id: string;
  formData: FormData;
};
export type DeleteProductRequest = {
  product_id:string;
  id: string;
};