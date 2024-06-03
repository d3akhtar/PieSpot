import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { orderModel } from "../Interfaces";
import orderUpdateModel from "../Interfaces/orderUpdateModel";

const orderApi = createApi({
    reducerPath:"orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://piespotapi.azurewebsites.net/api/",
        prepareHeaders:(headers: Headers, api) => {
            const token = localStorage.getItem("token");
            token && headers.append("Authorization","Bearer " + token); // Pass token so [Authorize] and [Authenticate] can check if user has permission
        }
    }),
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        getOrdersWithUserId: builder.query({
            query: (userId) => ({
                url: `Order/`,
                params:{
                    userId: userId
                }
            }),
            providesTags: ["Orders"]
        }),
        getOrderWithId: builder.query({
            query: (id) => ({
                url: `Order/${id}`
            }),
            providesTags: ["Orders"]
        }),
        addOrder: builder.mutation({
            query:(order : orderModel) => ({
                url: "Order",
                method: "POST",
                headers:{
                    "Content-type": "application/json", 
                },
                body: order
            }),
            invalidatesTags: ["Orders"]
        }),
        updateOrder: builder.mutation({
            query:(updatedOrder: orderUpdateModel) => ({
                url: `Order/${updatedOrder.orderHeaderID}`,
                method: "PUT",
                headers:{
                    "Content-type": "application/json", 
                },
                body: updatedOrder
            }),
            invalidatesTags: ["Orders"]
        })
    }),
});

export const {useGetOrderWithIdQuery, useGetOrdersWithUserIdQuery, useAddOrderMutation, useUpdateOrderMutation} = orderApi;
export default orderApi;