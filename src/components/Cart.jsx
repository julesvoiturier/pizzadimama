import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { cartToggle } from "../features/toggle/toggleSlice"
import { addToCart, removeFromCart, removeAllFromCart, emptyCart } from "../features/cart/cartSlice"

const Cart = () => {

    const openCart = useSelector((state) => state.toggle.cartToggle)
    const cart = useSelector((state) => state.cart.cartContent)
    const total = useSelector((state) => state.cart.totalPrice)
    const dispatch = useDispatch()

    return (
        <div className={`${openCart == true ? `w-[450px] max-sm:w-[300px]` : `w-[0px] overflow-hidden` } transition-all fixed right-0 bottom-0 top-0 bg-[#eeebeb] backdrop-blur-lg pt-[70px] z-10 overflow-hidden flex flex-col justify-between`}>
            <div className='p-4'>
                <div className='flex flex-col gap-4 rounded-md max-h-[550px] overflow-scroll'>
                    {
                        cart.length > 0 ? cart.map((item, key) => {
                            return(
                                <div className='flex h-auto rounded-md group'>
                                    <button onClick={()=> dispatch(removeAllFromCart({pizzaName: item.pizzaName, price: item.price, quantity:item.quantity}))} className=' rounded-md w-[0px] h-[30px] transition-all bg-[#ff6146] group-hover:visible group-hover:w-[30px] group-hover:mr-4 font-bold text-white'>X</button>
                                    <div className='w-full h-auto flex flex-col rounded-md overflow-hidden bg-slate-100'>
                                        <div className='flex h-auto py-3 items-center justify-between px-4 text-white bg-[#2d100b]'>
                                            <div className='font-bold'>{item.pizzaName}</div>
                                            <div className='flex gap-2'>
                                                <div className='font-bold'>£{item.price}</div>
                                            </div>
                                        </div>
                                        <div className={`${item.pizzaName == "Custom pizza" ? 'py-3 px-4 flex flex-wrap bg-white':''}`}>
                                            {
                                                item.ingredients ? <div className='px-4 py-3'>{item.ingredients.join(" , ").toString()}</div> : null
                                            }
                                        </div>
                                        <div className='bg-white rounded-br-md w-full py-3 flex items-center justify-between px-4 gap-4'>
                                            <div className=''>(x{item.quantity})</div>
                                            <div className='flex gap-3'>
                                                <button onClick={()=> dispatch(addToCart({pizzaName: item.pizzaName, price: item.price/item.quantity}))} className='hover:opacity-50 transition-all'>add</button>
                                                <button onClick={()=> dispatch(removeFromCart({pizzaName: item.pizzaName, price: item.price/item.quantity}))} className='hover:opacity-50 transition-all'>remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <div className='whitespace-nowrap'>Your cart is empty ...</div>
                    }
                </div>
                <div className='w-full flex justify-end pt-4'>
                    {cart.length > 0 ? <button onClick={()=> dispatch(emptyCart())} className='px-4 py-3 transition-all rounded-md text-white bg-[#ff6146] font-bold hover:text-white whitespace-nowrap'>empty cart</button> : null}
                </div>
            </div>
            
            <div className='flex flex-col gap-4 p-4'>
                <div className=' h-[50px] w-full rounded-md px-4 flex items-center justify-between bg-white font-bold whitespace-nowrap'>Total price: <span className=''>£{total}</span></div>
                <div className=' text-white  font-bold h-[50px] w-full rounded-md flex justify-center items-center bg-[#ff6146]'>Checkout</div>
            </div>
        </div>
    );
}
export default Cart;