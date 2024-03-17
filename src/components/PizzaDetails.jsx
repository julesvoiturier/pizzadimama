import React from 'react';
import { Link, useParams } from 'react-router-dom';
import data from './../assets/data.json'
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../features/cart/cartSlice"

const PizzaDetails = () => {

    const openCart = useSelector((state) => state.toggle.cartToggle)
    const cart = useSelector((state) => state.cart.cartContent)
    const {id} = useParams()
    const dispatch = useDispatch()

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        }) 
    }

    return (
        <div onClick={()=> openCart == true ? dispatch(cartToggle()) : ""} className={`${openCart == true ? `brightness-[30%]` : `brightness-[100%]`} pt-[70px] h-screen bg-[#eeebeb] flex flex-col gap-10 justify-center items-center`}>
            <Link onClick={()=> scrollToTop()} to={`/Home`} className={`${openCart == true ? "pointer-events-none" : ""} bg-yellow-300 transition-all hover:brightness-[95%] top-[100px] left-[30px] fixed px-6 py-2 font-bold rounded-md`}>Close</Link>
            <div className=' relative w-[60%] h-[50%] max-md:h-auto max-sm:w-[80%]  border-[1px] border-[#0000001c] rounded-full p-5 pr-[150px] max-md:pr-5 group'>
                <div className='w-full h-full flex max-md:flex-col items-center max-md:justify-center gap-[50px]'>
                    <img src={new URL(`../assets/img/${data[0][id].image}`, import.meta.url).href} className='h-full relative aspect-square rounded-full animate-[spin_100s_linear_infinite]'></img>
                    <div className='flex flex-col gap-6 max-md:items-center'>
                        <div className='font-bold text-[30px] max-md:text-center'>{data[0][id].pizzaName}</div>
                        <div className='text-[18px] max-md:text-center'><span className='font-bold'>Ingredients:</span> <br /> {data[0][id].ingredients.join(", ")}</div>
                        <div className='flex flex-col gap-4 max-md:items-center'>
                            <div className='text-[18px] font-bold rounded-md'>£{data[0][id].price}</div>
                            <button className={`${openCart == true ? "pointer-events-none" : ""} relative transition-all hover:bg-[#ee5a40] font-bold bg-[#ff6146] text-white py-2 max-md:mb-10 w-[140px] text-center rounded-md`} onClick={()=> dispatch(addToCart({pizzaName: data[0][id].pizzaName, price: data[0][id].price}))}>Add To Cart
                            {
                                    cart.length > 0 ? cart.map((item, key) => {
                                        return item.pizzaName == data[0][id].pizzaName ?
                                        <div className={`size-[25px] bg-yellow-300 rounded-full font-medium absolute top-[-8px] right-[-8px] text-black text-[12px] flex justify-center items-center`}>{item.quantity }</div>
                                        : null;
                                    }) : null
                            }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PizzaDetails;