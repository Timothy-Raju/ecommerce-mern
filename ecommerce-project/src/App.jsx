import { HomePage } from './pages/home/HomePage'
import { Route, Routes } from 'react-router';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css'

function App() {

  const [cart, SetCart]=useState([]);

  const loadCart = async ()=>{
  const response =  await axios.get('/api/cart-items?expand=product')    
  SetCart(response.data);   
  };


  useEffect(()=>{
    loadCart();
  },[]);

  return(
    <Routes>
      <Route index element={<HomePage loadCart={loadCart} cart={cart} />}/>
      <Route path='/checkout' element={<CheckoutPage cart={cart} loadCart={loadCart}/>}/>
      <Route path='/orders' element={<OrdersPage cart={cart} />}/>
      <Route path='/tracking' element={<TrackingPage/>}/>
    </Routes>
    
  );
  
}

export default App
