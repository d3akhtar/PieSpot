import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    cartItems: [],
}

export const shoppingCartSlice = createSlice({
    name: "ShoppingCart",
    initialState: initialState,
    reducers:{
        setShoppingCart: (state,action) =>{
            state.cartItems = action.payload
        }
    }
})

export const {setShoppingCart} = shoppingCartSlice.actions;
export const menuItemReducer = shoppingCartSlice.reducer; 