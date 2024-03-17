import React, {useState, useRef} from 'react';
import data from './../assets/data.json'
import { Link } from 'react-router-dom';
import DIYSelector from './DIYSelector';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteLast } from "../features/cart/cartSlice"
import { cartToggle } from "../features/toggle/toggleSlice"

const DIY = () => {

    const openCart = useSelector((state) => state.toggle.cartToggle)
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart.cartContent)

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        }) 
    }

    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [customPrice, setCustomPrice] = useState(4)
    const [diyPizzaName, setDiyPizzaName] = useState("")
    const [validDiy, setValidDiy] = useState(true)
    const [activeSelect, setActiveSelect] = useState(false)
    const [correctName, setCorrectName] = useState(true)

    const resetCustom = () => {
        setSelectedIngredients([])
        setCustomPrice(4)
        setDiyPizzaName("")
        setValidDiy(false)
        setCorrectName(true)
        setActiveSelect(true)
    }

    const inputRef = useRef(null)

    const sendCustomPizza = () => {
        if (diyPizzaName !== "") {sameName();} else {setValidDiy(false);}
    }
    
    const sameName = () => {
        const theSameName = cart.some(element => element.pizzaName == diyPizzaName);
        if (!theSameName) {addCustomPizza();resetCustom();inputRef.current.value = "";} else {setCorrectName(false)}
    }
    
    const addCustomPizza = () => {
        if (selectedIngredients.length == 0) {
            dispatch(addToCart({pizzaName: `${diyPizzaName}`, quantity: 1, ingredients: ["Only dough... seriously?"], price: customPrice}));
        } else {
            dispatch(addToCart({pizzaName: `${diyPizzaName}`, quantity: 1, ingredients: selectedIngredients, price: customPrice}));
        }
        setActiveSelect(false)
        resetCustom();
        inputRef.current.value = ""; 
    }

    return (
        <div onClick={()=> openCart == true ? dispatch(cartToggle()) : ""} className={`${openCart == true ? `brightness-[30%]` : `brightness-[100%]`} pt-[70px] h-screen bg-[#eeebeb] flex flex-col gap-10 justify-center items-center`}>
            <Link onClick={()=> scrollToTop()} to={`/Home`} className={`${openCart == true ? `pointer-events-none` : ``} bg-yellow-300 top-[100px] left-[30px] fixed px-6 py-2 font-bold rounded-md`}>Close</Link>
            <div className='flex flex-col items-center'>
                <div className=' px-4 py-2 font-bold w-fit text-[#ff6146] text-[40px]'>Make your own pizza!</div>
                <div className='font-bold mt-2 w-fit text-[18px]'>Select toppings:</div>
            </div>
            <div className={`${openCart == true ? `pointer-events-none` : ``} w-[60%] h-[50%] border-[1px] border-[#0000001c] rounded-md p-10 flex flex-nowrap gap-4 max-md:flex-col`}>
                {
                    data[1].map((element, key)=> {
                        return(
                            <DIYSelector 
                            ingredientsData={element} 
                            setIngredients={setSelectedIngredients} 
                            ingredients={selectedIngredients} 
                            setPrice={setCustomPrice}
                            price={customPrice}
                            active={activeSelect}
                            setActive={setActiveSelect}
                            arrayId={key}
                            />
                        )
                    })
                }
            </div>
            <div className={`${openCart == true ? `pointer-events-none` : ``} relative flex gap-5`}>
                {
                    correctName == false ? <div className='absolute px-4 top-[-30px] left-[0] rounded-md bg-[#ff6146] text-white'>Name already added</div> : null
                }
                <input ref={inputRef} onChange={(e)=> setDiyPizzaName(e.target.value)} 
                className={`${validDiy == true || correctName ? '' : 'border-2 border-[#ff6146] animate-[pulse_0.2s_ease-in-out_2] '} px-4 rounded-md outline-[#3f10082e] w-[300px]`} type="text" placeholder={"Name your pizza"} />
                <div className='flex justify-center items-center gap-3 bg-[#2d100b1c] p-2 rounded-md'>
                        <div className='px-4 font-bold text-[20px]'>£{customPrice}</div>
                        <button onClick={()=> {
                        sendCustomPizza()
                        }} className='bg-yellow-300 px-4 py-2 rounded-md font-bold'>Add to cart</button>
                </div>
            </div>
        </div>
    );
}

export default DIY;
