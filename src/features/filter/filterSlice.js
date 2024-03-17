import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        base: "All", 
        price: "All",
    },
    reducers:{
        filterBase: (state, action) => {
            state.base = action.payload
        },
        filterPrice: (state, action) => {
            state.price = action.payload
        },
    }
})

export const { filterBase, filterPrice } = filterSlice.actions
export default filterSlice.reducer