import { PRODUCT_URL,UPLOAD_URL } from "../constants.js"
import { apislice } from "./apiSlice.js"

export const productApiSlice=apislice.injectEndpoints({
    endpoints:(builder)=>({
        getProduct:builder.query({
            query:({keyword})=>({
                url:`${PRODUCT_URL}`,
                params:{keyword}
            }),
            keepUnusedDataFor:5,
            providesTags:["Product"]
        }),
        getProductById:builder.query({
            query:(productId)=>`${PRODUCT_URL}/${productId}`,
            providesTags:(result,error,productId)=>[
                {type:"Product",id : productId},
            ]
        }),
        allProducts:builder.query({
            query:()=>`${PRODUCT_URL}/allproducts`,
        }),
        getProductDetails:builder.query({
            query:(productId)=>({
                url:`${PRODUCT_URL}/${productId}`
            }),
            keepUnusedDataFor:5,
        }),
        CreateProduct:builder.mutation({
            query:(productData)=>({
                url:`${PRODUCT_URL}`,
                method:"POST",
                body:productData,
            }),
            invalidatesTags:["Product"]
        }),
        updateProduct:builder.mutation({
            query:({productId,formData})=>({
                url:`${PRODUCT_URL}/${productId}`,
                method:"PUT",
                body: formData
            })
        }),
        deleteProduct:builder.mutation({
            query:(productId)=>({
                url:`${PRODUCT_URL}/${productId}`,
                method:"DELETE",
            }),
            providesTags:["Product"]
        }),
        createReview: builder.mutation({
            query: (data) => ({
              url: `${PRODUCT_URL}/${data.productId}/reviews`,
              method: "POST",
              body: data,
            }),
          }),
        getTopProducts: builder.query({
            query: () => `${PRODUCT_URL}/top`,
            keepUnusedDataFor: 5,
          }),
        getTopReview:builder.query({
            query:()=>`${PRODUCT_URL}/top`,
            keepUnusedDataFor:5,   
        }),
        getNewProduct:builder.query({
            query:()=>`${PRODUCT_URL}/new`,
            keepUnusedDataFor:5,   
        }),
        uploadProductImg:builder.mutation({
            query:(data)=>({
                url:`${UPLOAD_URL}`,
                method:"POST",
                body:data
            }),
        }),
        getFilteredProducts:builder.query({
            query:({checked,radio})=>({
                url:`${PRODUCT_URL}/filtered-products`,
                method:"POST",
                body:{checked,radio}
            })
        })
    }),
})
export const {
    useAllProductsQuery,
    useCreateProductMutation,
    useCreateReviewMutation,
    useDeleteProductMutation,
    useGetNewProductQuery,
    useGetProductByIdQuery,
    useGetProductDetailsQuery,
    useGetProductQuery,
    useGetTopReviewQuery,
    useUpdateProductMutation,
    useUploadProductImgMutation,
    useGetTopProductsQuery,
    useGetFilteredProductsQuery
} = productApiSlice