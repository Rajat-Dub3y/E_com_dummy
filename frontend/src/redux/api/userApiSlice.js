import { apislice } from "./apiSlice.js";
import { USERS_URL } from "../constants.js";
export const userApiSlice=apislice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/auth`,
                method:"POST",
                body:data
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/loginOut`,
                method:"POST"
            })
        }),
        register:builder.mutation({
            query:data=>({
                url:`${USERS_URL}/`,
                method:"POST",
                body:data,
            }),
        }),
        profile:builder.mutation({
            query:data=>({
                url:`${USERS_URL}/profile`,
                method:"PUT",
                body:data,
            }),
        }),

        getUsers:builder.query({
            query:()=>({
                url:USERS_URL,
            }),
            providesTags:["User"],
            keepUnusedDataFor:5,
        }),

        deleteUser:builder.mutation({
            query:UserId=>({
                url:`${USERS_URL}/${UserId}`,
                method:"DELETE"
            }),
        }),
        
        getUserData:builder.query({
            query:(id)=>({
                url:`${USERS_URL}/${id}`
            }),
            keepUnusedDataFor:5,
        }),

        UpdateUser:builder.mutation({
            query:data=>({
                url:`${USERS_URL}/${data.UserId}`,
                method:"PUT",
                body:data
            }),
            invalidatesTags:["User"]
        })
    }),
});

export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useProfileMutation,useGetUsersQuery,useDeleteUserMutation,useGetUserDataQuery,useUpdateUserMutation}=userApiSlice;