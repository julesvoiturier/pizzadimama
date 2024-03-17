import { configureStore } from "@reduxjs/toolkit"
import toggleSlice from './../features/toggle/toggleSlice'
import cartSlice from './../features/cart/cartSlice'
import filterSlice from './../features/filter/filterSlice'

export const store = configureStore({
    reducer:{
        toggle: toggleSlice,
        cart: cartSlice,
        filter: filterSlice
    }
})