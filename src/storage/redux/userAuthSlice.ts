import {createSlice} from "@reduxjs/toolkit"
import { userModel } from "../../Interfaces";
import { getJwtToken } from "../../Helper";


var initialState:userModel;


try{
    const token = localStorage.getItem("token");
    const decodedToken : userModel = getJwtToken(token as string);
    initialState = {
        fullName: decodedToken.fullName,
        id: decodedToken.id,
        email: decodedToken.email,
        role: decodedToken.role,
    }
}
catch(exception){
    initialState = {
        fullName: "",
        id: "",
        email: "",
        role: "",
    }
}


export const userAuthSlice = createSlice({
    name: "UserAuth",
    initialState: initialState,
    reducers:{
        setLoggedInUser: (state,action) =>{
            state.fullName = action.payload.fullName;
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.role = action.payload.role;
        }
    }
})

export const {setLoggedInUser} = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer; 