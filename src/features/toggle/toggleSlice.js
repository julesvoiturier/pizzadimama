import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name: "toggles",
    initialState: {
        cartToggle: false,
        filterToggle: false,
    },
    reducers:{
        cartToggle: (state) => {
            state.cartToggle = !state.cartToggle
        },
        filterToggle: (state) => {
            state.filterToggle = !state.filterToggle
        },
        activeFilters: (state, action) => {
            activeFilters.length > 0 ? activeFilters.map((filter, key) => {
                filter == action.payload ? activeFilters.splice[key, 1] : state.activeFilters.push(action.payload)
            }): null
        }
    }
})

export const { cartToggle, filterToggle, activeFilters } = toggleSlice.actions
export default toggleSlice.reducer