import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    menuItem: [],
    search: ""
}

export const menuItemSlice = createSlice({
    name: "MenuItem",
    initialState: initialState,
    reducers:{
        setMenuItem: (state,action) =>{
            state.menuItem = action.payload
        },
        setSearch: (state,action) => {
            state.search = action.payload;
        }
    }
})

export const {setMenuItem,setSearch} = menuItemSlice.actions;
export const menuItemReducer = menuItemSlice.reducer; 