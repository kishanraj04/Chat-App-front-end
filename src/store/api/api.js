import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const api = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3000/api/v1/"}),
    tagTypes:["chat","user","friendreq"],
    endpoints:(builder)=>({
        myChat:builder.query({
            query:()=>({
                url:"/chat/my-chats",
                credentials:"include",
                
            }),
            providesTags:["chat"]
        }),
        searchUser:builder.query({
            query:(name)=>({
                url:`user/search/user?name=${name}`,
                credentials:"include"
            }),
            providesTags:["user"]
        }),
        sendFrRequest:builder.mutation({
            query:(id)=>({
                url:`user/sendrequest`,
                credentials:"include",
                method:"PUT",
                body:{userId:id}
            }),
            invalidatesTags:["friendreq"]
        }),
        allRequest:builder.query({
            query:()=>({
                url:"user/all-request",
                method:"GET",
                credentials:"include"
            }),
            providesTags:["friendreq"]
        })
    })
})


export default api;
export const {useMyChatQuery,useLazySearchUserQuery,useShowFriendRequestQuery,useSendFrRequestMutation,useAllRequestQuery} = api