import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
    reducerPath:"paymentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://piespotapi.azurewebsites.net/api/",
        prepareHeaders:(headers: Headers, api) => {
            const token = localStorage.getItem("token");
            token && headers.append("Authorization","Bearer " + token); // Pass token so [Authorize] and [Authenticate] can check if user has permission
        }
    }),
    endpoints: (builder) => ({
        sendPayment: builder.mutation({
            query: (userId) => ({
                url: 'payment',
                method: "POST",
                params: {
                    userId: userId
                }
            })
        })
    }),
});

export const {useSendPaymentMutation} = paymentApi;
export default paymentApi;