import { createSlice } from "@reduxjs/toolkit";

const diyPizzaSlice = createSlice({
    name: "filter",
    initialState: {
        diyPizza: {
            qunatity: 0,
            ingredients: [],
            price: 0
        }
    },
    reducers:{
        newDiyPizza: (state, action) => {
            
        },
        
    }
})

export const { filterBase, filterPrice } = diyPizzaSlice.actions
export default diyPizzaSlice.reducer