import {fetchBaseQuery,createApi} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../constants.js"

const baseQuery=fetchBaseQuery({baseUrl:BASE_URL});
export const apislice=createApi({
    baseQuery,
    tagTypes:['Product',"Order","User","Category"],
    endpoints:()=>({}),
})