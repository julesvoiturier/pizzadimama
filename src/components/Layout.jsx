import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Cart from './Cart';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className='w-full '>
            <Nav/>
            <Cart/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default Layout;
