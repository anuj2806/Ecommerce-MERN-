import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryResponse, MessageResponce, NewProductRequest, AllProductResponse, SearchProductsRequest, SearchProductsResponse, ProductResponse, UpdateProductRequest, DeleteProductRequest } from "../../types/api-types";

export const productAPI = createApi({
    reducerPath:"productApi",
    baseQuery:fetchBaseQuery({baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/product`}),
    tagTypes: ["product"],
    endpoints:(builder)=>({
        latestProduct:builder.query<AllProductResponse,string>({
            query:()=>"latest",
            providesTags: ["product"],
        }),
        allProducts:builder.query<AllProductResponse,string>({
            query:(id)=>`admin-products?id=${id}`,
            providesTags: ["product"],
        }),
        categories:builder.query<CategoryResponse,string>({
            query:()=>"categories",
            providesTags: ["product"],
        }),
        searchProducts:builder.query<SearchProductsResponse,SearchProductsRequest>({
            query:({search,page,price,sort,category})=>{
                let base  = `all?search=${search}&page=${page}`;
                if(price) base+= `&price=${price}`;
                if(sort) base+=`&sort=${sort}`;
                if(category) base+= `&category=${category}`;
                return base
            },
            providesTags: ["product"],
        }),
        productDetail:builder.query<ProductResponse,string>({
            query:(id)=>id,
            providesTags: ["product"],
        }),
        newProduct:builder.mutation<MessageResponce,NewProductRequest>({
            query:(({id,formData})=>({
                    url:`new?id=${id}`,
                    method:"POST",
                    body:formData
                })
            ),
            invalidatesTags: ["product"],
        }),
        updateProduct:builder.mutation<MessageResponce,UpdateProductRequest>({
            query:(({product_id,id,formData})=>({
                    url:`${product_id}?id=${id}`,
                    method:"PUT",
                    body:formData
                })
            ),
            invalidatesTags: ["product"],
        }),
        deleteProduct:builder.mutation<MessageResponce,DeleteProductRequest>({
            query:(({product_id,id})=>({
                    url:`${product_id}?id=${id}`,
                    method:"DELETE",
                })
            ),
            invalidatesTags: ["product"],
        })
    }),

})
export const {  useLatestProductQuery,
                useAllProductsQuery,
                useCategoriesQuery,
                useSearchProductsQuery,
                useNewProductMutation,
                useProductDetailQuery,
                useUpdateProductMutation,
                useDeleteProductMutation  

                                        } = productAPI;