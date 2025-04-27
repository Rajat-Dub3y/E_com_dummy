import { createSlice } from "@reduxjs/toolkit";

const initialState={
    categories:[],
    products:[],
    checked:[],
    radio:[],
    brandCheckBoxes:{},
    checkedBrand:[],
}

const shopSlice=createSlice({
    name: "shop",
    initialState,
    reducers:{
        setcategories:(state,action)=>{
            state.categories=action.payload
        },
        setProduct:(state,action)=>{
            state.products=action.payload
        },
        setchecked:(state,action)=>{
            state.checked=action.payload
        },
        setRadio:(state,action)=>{
            state.radio=action.payload
        },
        setSelectedBrand:(state,action)=>{
            state.selectedBrand=action.payload
        }
    }
})

export const {setcategories,setProduct,setRadio,setSelectedBrand,setchecked}=shopSlice.actions
export default shopSlice.reducer;