import React from 'react';
import './../index.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../features/cart/cartSlice"


const PizzaCard = (props) => {


    const openCart = useSelector((state) => state.toggle.cartToggle)
    const cart = useSelector((state) => state.cart.cartContent)
    const dispatch = useDispatch()
    

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        }) 
    }

    return (
        <div className={`${openCart == true ? `pointer-events-none opacity-50` : ``} w-[30%] max-md:w-[45%] max-sm:w-[100%] transition-all aspect-square bg-[#2d100b3c] hover:bg-[#2d100bb8] rounded-md overflow-hidden hover:translate-y-[-1%] group`}>
            <div className='h-full'>
                <div className='bg-[#2d100b] transition-all h-[20%] px-6 flex justify-between items-center group-hover:bg-[#ff6146]'>
                    <div className='text-white text-[18px] font-bold'>{props.pizzaName}</div>
                    <div className='text-white text-[18px]'>£{props.price}</div>
                </div>
                <div className={`relative h-[80%] w-full group`}>
                    <img className='w-full h-[150%] object-cover group-hover:brightness-50 transition-all' src={new URL(`../assets/img/${props.image}`, import.meta.url).href} alt="" />
                    <div className={`absolute transition-all top-[100%] w-full h-full flex flex-col justify-center items-center group-hover:top-[0%] gap-2`}>
                        <button onClick={()=> dispatch(addToCart({pizzaName: props.pizzaName, price: props.price}))} className='relative w-[150px] px-4 py-2 bg-[#ff6146] text-white rounded-md flex justify-center items-center'>Add to cart
                                {
                                    cart.length > 0 ? cart.map((item, key) => {
                                        return item.pizzaName == props.pizzaName ?
                                        <div className={`size-[25px] bg-yellow-300 rounded-full font-medium absolute top-[-8px] right-[-8px] text-black text-[12px] flex justify-center items-center`}>{item.quantity }</div>
                                        : null;
                                    }) : null
                                }
                        </button>
                        <Link to={`/Home/PizzaDetails/${props.currentKey}`} onClick={()=> scrollToTop()} className='w-[150px] px-4 py-2 bg-[#2d100b]  text-white rounded-md flex justify-center items-center'>Description</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PizzaCard;