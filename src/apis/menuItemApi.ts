import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { menuItemCreateModel, menuItemModel } from "../Interfaces";

const menuItemApi = createApi({
    reducerPath:"menuItemApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://piespotapi.azurewebsites.net/api/",
        prepareHeaders:(headers: Headers, api) => {
            const token = localStorage.getItem("token");
            token && headers.append("Authorization","Bearer " + token); // Pass token so [Authorize] and [Authenticate] can check if user has permission
        }
    }),
    tagTypes: ["MenuItems"],
    endpoints: (builder) => ({
        getMenuItems: builder.query({
            query: () => ({
                url: "MenuItem"
            }),
            providesTags: ["MenuItems"]
        }),
        getMenuItemById: builder.query({
            query: (id) => ({
                url: `MenuItem/${id}`
            }),
            providesTags: ["MenuItems"]
        }),
        deleteMenuItem: builder.mutation({
            query: (id) => ({
                url: `MenuItem/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["MenuItems"]
        }),
        addMenuItem: builder.mutation({
            query: (bodyFormData) => ({
                url: "MenuItem",
                method: "POST",
                body: bodyFormData,
                formData: true
            }),
            invalidatesTags: ["MenuItems"]
        }),
        updateMenuItem: builder.mutation({
            query: (bodyFormData : FormData) => ({
                url: `MenuItem`,
                method: "PUT",
                body: bodyFormData,
                formData: true
            }),
            invalidatesTags: ["MenuItems"]
        }),
    }),
});

export const {useGetMenuItemsQuery,useGetMenuItemByIdQuery,useDeleteMenuItemMutation,useAddMenuItemMutation,useUpdateMenuItemMutation} = menuItemApi;
export default menuItemApi;