import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    supplierData: [{ id: 1, name: 'Meghana', phoneNumber: '9951696649', email:'sairajesh@gmail.com' ,pincode:'534211',street:'velpur road',city:'tanuku' }]
}

const supplierReducer = createSlice({
    name:"supplierReducer",
    initialState:defaultState,
    reducers:{
        updateSupplierDetails:(state,action)=>{
            console.log(state , action.payload,'action.payload')
            state={
                ...state,
                supplierData: action.payload
            }
            return state
        }
    }
})


export const {updateSupplierDetails}= supplierReducer.actions

export default supplierReducer.reducer;