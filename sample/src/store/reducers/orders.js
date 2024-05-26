import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    orderData: [{ id: 1, origin: 'Meghana', destination: '9951696649', status:'intransist', date:null }]
}

const orderdetailsReducer = createSlice({
    name:"orderdetailsReducer",
    initialState:defaultState,
    reducers:{
        updateOrderDetails:(state,action)=>{
            state={
                ...state,
                orderData: action.payload
            }
            return state
        }
    }
})


export const {updateOrderDetails}= orderdetailsReducer.actions

export default orderdetailsReducer.reducer;