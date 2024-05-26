import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    inventoryData: [{ id: 1, item: 'goods', sku: '9951696649', quantity:'sairajesh@gmail.com' ,location:'534211' }]
}

const inventorydetailsReducer = createSlice({
    name:"inventorydetailsReducer",
    initialState:defaultState,
    reducers:{
        updateInventoryDetails:(state,action)=>{
            state={
                ...state,
                inventoryData: action.payload
            }
            return state
        }
    }
})


export const {updateInventoryDetails}= inventorydetailsReducer.actions

export default inventorydetailsReducer.reducer;