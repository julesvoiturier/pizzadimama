import React, { useState, useEffect } from 'react';
import data from './../assets/data.json'
import PizzaCard from './PizzaCard';
import { useDispatch, useSelector } from "react-redux"
import { cartToggle } from "../features/toggle/toggleSlice"
import Filter from './Filter';
import DIY from './DIY';

const Home = () => {

    const openCart = useSelector((state) => state.toggle.cartToggle)
    const openFilter = useSelector((state) => state.toggle.filterToggle)
    const base = useSelector((state) => state.filter.base)
    const price = useSelector((state) => state.filter.price)
    const dispatch = useDispatch()

    const sortedDataLowest = [...data[0]].sort((a, b) => a.price - b.price);
    const sortedDataHighest = [...data[0]].sort((a, b) => b.price - a.price);
    const [sortedData, setSortedData] = useState(data[0])

    useEffect(() => {
        if (price == "All") {
            setSortedData(data[0])
        } else if (price == "Lowest") {
            setSortedData(sortedDataLowest)
        } else if (price == "Highest") {
            setSortedData(sortedDataHighest)
        }
    }, [price]);

    return (
        <div onClick={()=> openCart == true ? dispatch(cartToggle()) : ""} className={`${openCart == true ? `brightness-[30%]` : `brightness-[100%]`} transition-all w-full flex flex-col justify-center items-center py-[70px] bg-[#eeebeb]`}>
            <div className='flex flex-col items-center py-8 px-16 rounded-full mt-[100px] border-[1px] border-[#0000001c] relative group transition-all hover:rotate-[2deg]'>
                <span className='text-left text-[20px] px-4 py-2 rounded-md absolute top-[-20px] left-[-20px] transition-all rotate-[-10deg] group-hover:rotate-[-15deg] flex justify-start font-bold bg-yellow-300 w-fit max-sm:text-[17px]'>The orignial</span>
                <div className='text-[50px] font-bold leading-none max-sm:text-[25px]'>Pizza di Mama</div>
            </div>
            
            <div className='w-[65.5%] max-sm:w-[70%]'>
                <Filter/>
            </div>
            <div className='pt-[35px] max-md:pt-[0px] flex flex-wrap gap-5 w-[70%] justify-center'>
                {
                    sortedData.map((pizza, key) => {
                        const currentKey = key
                        return(
                           base == pizza.ingredients[0] || base == "All" ?
                            <PizzaCard pizzaName={pizza.pizzaName} currentKey={currentKey} price={pizza.price} image={pizza.image}/> : null
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Home;
