import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { filterToggle } from "../features/toggle/toggleSlice"
import { filterBase, filterPrice } from "../features/filter/filterSlice"

const Filter = () => {

    const dispatch = useDispatch()
    const openFilter = useSelector((state) => state.toggle.filterToggle)
    const base = useSelector((state) => state.filter.base)
    const price = useSelector((state) => state.filter.price)

    return (
        <div className='w-full mt-[70px] flex gap-5  max-md:flex-col max-md:w-[100%] max-md:mb-[30px]'> 
            <button onClick={()=> dispatch(filterToggle())} className={`text-black font-bold px-8 rounded-md max-md:w-[130px] h-[40px] bg-yellow-300 ${openFilter == false ? 'active:scale-x-110':'active:scale-x-90'}`}>
                Filters
            </button>
            <div className={`${openFilter == true ? 'w-[80%] max-md:w-[100%] max-md:h-[100px] max-sm:h-[180px]' : 'w-[0%] max-sm:w-[100%] max-md:h-[0px]'} transition-all h-[40px] flex gap-5 max-md:gap-2 max-md:bg-[#eeebeb] max-md:rounded-md overflow-hidden max-md:flex-col max-md:top-4 max-sm:flex-row`}>
                <div className='flex h-full bg-[#00000042] rounded-md overflow-hidden max-sm:flex-col max-sm:w-[50%]'>
                    <div className='w-[100px] h-full bg-[#2d100b] text-white flex justify-center items-center max-md:w-[25%] max-sm:w-[100%]'>Price</div>
                    <button value="Lowest" onClick={(e)=> dispatch(filterPrice(e.target.value))} className={`${price == "Lowest" ? 'opacity-50':''} max-md:w-[25%] max-sm:w-[100%] bg-[#2d100b8b] w-[100px] h-full text-white flex justify-center items-center hover:opacity-80 transition-all`}>Lowest</button>
                    <button onClick={()=> dispatch(filterPrice("Highest"))} className={`${price == "Highest" ? 'opacity-50':''} max-md:w-[25%] max-sm:w-[100%] w-[100px] h-full bg-[#2d100b8b] text-white flex justify-center items-center hover:opacity-80 transition-all`}>Highest</button>
                    <button onClick={()=> dispatch(filterPrice("All"))} className={` ${price == "All" ? 'opacity-50':''} max-md:w-[25%] max-sm:w-[100%] w-[100px] h-full bg-[#2d100b8b] text-white flex justify-center items-center hover:opacity-80 transition-all`}>All</button>
                </div>
                <div className='flex h-full bg-[#00000042] rounded-md overflow-hidden max-sm:flex-col max-sm:w-[50%]'>
                    <div className='w-[100px] h-full bg-[#2d100b] text-white flex justify-center items-center max-md:w-[25%] max-sm:w-[100%]'>Base</div>
                    <button onClick={()=> dispatch(filterBase("Tomato"))} className={`${base == "Tomato" ? 'opacity-50':''} max-md:w-[25%] max-sm:w-[100%] w-[100px] h-full bg-[#2d100b8b] text-white  flex justify-center items-center hover:opacity-80 transition-all`}>Tomato</button>
                    <button onClick={()=> dispatch(filterBase("Cream"))} className={`${base == "Cream" ? 'opacity-50':''} max-md:w-[25%] max-sm:w-[100%] w-[100px] h-full bg-[#2d100b8b] text-white flex justify-center items-center hover:opacity-80 transition-all`}>Cream</button>
                    <button onClick={()=> dispatch(filterBase("All"))} className={`${base == "All" ? 'opacity-50':''} max-md:w-[25%] max-sm:w-[100%] w-[100px] h-full bg-[#2d100b8b] text-white flex justify-center items-center hover:opacity-80 transition-all`}>All</button>
                </div>
            </div>
        </div>
    );
}

export default Filter;