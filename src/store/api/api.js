import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const api = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3000/api/v1/"}),
    tagTypes:["chat","user"],
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
        })
    })
})


export default api;
export const {useMyChatQuery,useLazySearchUserQuery} = api