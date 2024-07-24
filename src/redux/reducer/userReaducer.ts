import { createSlice } from "@reduxjs/toolkit"
import { userReaducerInitialState } from "../../types/reducer-types"

const initialState:userReaducerInitialState  = {
    user: null,
    loading:true
}
export const userReaducer = createSlice({
    name:"userReducer",
    initialState,
    reducers:{
        userExist:(state,action)=>{
            state.loading= false,
            state.user = action.payload
        },
        userNotExist:(state,action)=>{
            state.loading= false,
            state.user = action.payload
        }
    }
})
export const {userExist,userNotExist} = userReaducer.actions;
