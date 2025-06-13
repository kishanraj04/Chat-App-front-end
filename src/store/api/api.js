import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const api = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3000/api/v1/"}),
    tagTypes:["chat"],
    endpoints:(builder)=>({
        myChat:builder.query({
            query:()=>({
                url:"/chat/my-chats",
                credentials:"include",
                
            }),
            providesTags:["chat"]
        })
    })
})


export default api;
export const {useMyChatQuery} = api