import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItemSlice";
import { authApi, menuItemApi, paymentApi, shoppingCartApi } from "../../apis";
import { shoppingCartSlice } from "./shoppingCartSlice";
import { userAuthSlice } from "./userAuthSlice";
import orderApi from "../../apis/orderApi";

const store = configureStore({
    reducer:{
        menuItemStore: menuItemReducer,
        shoppingCartStore: shoppingCartSlice.reducer,
        userAuthStore: userAuthSlice.reducer,
        [menuItemApi.reducerPath]: menuItemApi.reducer,
        [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().
    concat(menuItemApi.middleware).
    concat(shoppingCartApi.middleware).
    concat(authApi.middleware).
    concat(paymentApi.middleware).
    concat(orderApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export default store;