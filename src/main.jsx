import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './app/store.js'
import { Provider } from 'react-redux'

//! Router imports
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

//! Components
import Home from './components/Home';
import PizzaDetails from './components/PizzaDetails';
import Layout from './components/Layout';
import DIY from './components/DIY.jsx'


const router = createBrowserRouter([
  {
    path: "/pizzadimama",
    element: <Layout><Home/></Layout>,
    children: [
      {
        path: "/pizzadimama/Home",
        element: <Home/>
      },
      {
        path: "/pizzadimama/PizzaDetails/:id",
        element: <PizzaDetails/>
      },
      {
        path: "/pizzadimama/MakeYourPizza",
        element: <DIY/>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
  
)
