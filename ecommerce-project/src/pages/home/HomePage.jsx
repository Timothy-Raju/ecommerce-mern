import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import './HomePage.css';
import  {Header} from '../../components/Header'
import { ProductsGrid } from './ProductsGrid';


export function HomePage({cart, loadCart}){

  const [products, setProducts]=useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  
  
  useEffect(()=>{
    const getHomeData =async ()=>{
      const response = await axios.get('/api/products', {
        params: search ? { search } : undefined
      });

      setProducts(response.data);
    };

    getHomeData();
    
  },[search]);

  return(
    <>
      <title>Ecommerce Project</title>
      
      <Header cart={cart} initialSearch={search} />
      <div className="home-page">
        <ProductsGrid loadCart={loadCart} products={products}/>
      </div>
    </>
  );
}