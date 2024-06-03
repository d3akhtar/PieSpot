import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const shoppingCartApi = createApi({
    reducerPath:"shoppingCartApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://piespotapi.azurewebsites.net/api/",
        prepareHeaders:(headers: Headers, api) => {
            const token = localStorage.getItem("token");
            token && headers.append("Authorization","Bearer " + token); // Pass token so [Authorize] and [Authenticate] can check if user has permission
        }
    }),
    tagTypes: ["ShoppingCart"],
    endpoints: (builder) => ({
        getShoppingCartByUserId: builder.query({
            query: (userId) => ({
                url: 'shoppingCart',
                params:{
                    userId: userId,
                }
            }),
            providesTags: ["ShoppingCart"]
        }),
        updateShoppingCart: builder.mutation({
            query: ({userId, menuItemId, updateQuantityBy}) => ({
                url: 'shoppingCart',
                method: "POST",
                params:{
                    userId: userId,
                    menuItemId: menuItemId,
                    updateQuantityBy: updateQuantityBy
                },
            }),
            invalidatesTags: ["ShoppingCart"]
        })
    }),
});

export const {useGetShoppingCartByUserIdQuery,useUpdateShoppingCartMutation} = shoppingCartApi;
export default shoppingCartApi;