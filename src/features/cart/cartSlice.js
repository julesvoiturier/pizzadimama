import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        cartContent: [],
        lastTwoAdded: [],
        totalPrice: 0,
        counter: 0
    },
    reducers:{
        addToCart: (state, action) => {

            state.counter += 1
            if (action.payload.ingredients) {
                action.payload.ingredients ? state.cartContent.push(action.payload) : null
                state.totalPrice += action.payload.price
            } else {
                if (state.cartContent.length == 0 && !action.payload.ingredients) {
                    state.totalPrice += action.payload.price
                    state.lastTwoAdded.push(action.payload.pizzaName)
                    state.cartContent.push({ pizzaName: action.payload.pizzaName, quantity: 1, price: action.payload.price });  
                } else {
                    const existingItem = state.cartContent.findIndex(item => item.pizzaName == action.payload.pizzaName);
                    if (existingItem != -1) {
                    state.cartContent[existingItem].quantity += 1;
                    state.cartContent[existingItem].price += action.payload.price;
                    state.totalPrice += action.payload.price
                    state.lastTwoAdded.push(action.payload.pizzaName)
                    } else {
                    state.cartContent.push({ pizzaName: action.payload.pizzaName, quantity: 1, price: action.payload.price});
                    state.totalPrice += action.payload.price
                    state.lastTwoAdded.push(action.payload.pizzaName)
                    }
                }
            }

            
        }, 
        removeFromCart: (state, action) => {
            state.counter -= 1
            state.lastTwoAdded.map((element, key)=> {
                action.payload.pizzaName == element ? state.lastTwoAdded.splice(key, 1) : state.lastTwoAdded
            })

            if (state.cartContent.length > 0) {
                state.cartContent = state.cartContent.filter((element) => {
                    if (element.pizzaName == action.payload.pizzaName && element.quantity > 1) {
                        element.quantity -= 1;
                        element.price -= action.payload.price
                        state.totalPrice -= action.payload.price
                        return true; // Keep the element in the array
                    }
                    if (element.pizzaName == action.payload.pizzaName && element.quantity == 1) {
                        state.totalPrice -= action.payload.price
                    }
                    return element.pizzaName != action.payload.pizzaName;
                });
            } 
        }, 
        removeAllFromCart: (state, action) => {
            state.counter -= action.payload.quantity
            console.log(action.payload.quantity);
            state.lastTwoAdded.map((element, key)=> {
                action.payload.pizzaName == element ? state.lastTwoAdded.splice(key, 1) : state.lastTwoAdded
            })
            state.cartContent ? state.cartContent.map((element, key)=> {
                element.pizzaName == action.payload.pizzaName ? state.cartContent.splice(key, 1) : null
                element.pizzaName == action.payload.pizzaName ? state.totalPrice -= element.price : null
            }) : null
        }, 
        emptyCart: (state) => {
            state.cartContent = []
            state.lastTwoAdded = []
            state.totalPrice = 0
            state.counter = 0
        }, 
        deleteLast: (state) => {
            state.cartContent.splice(-1, 1)
        }, 
    }
})

export const { addToCart, removeFromCart, removeAllFromCart, emptyCart, deleteLast } = cartSlice.actions
export default cartSlice.reducer