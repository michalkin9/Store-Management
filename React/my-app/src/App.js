import logo from './logo.svg';
import './App.css';
import Store from './Store';
import { Routes ,Route } from 'react-router-dom';
import ProductsPage from './Pages/ProductsPage';
import EditCustomerPage from './Pages/EditCustomerPage';
import EditProductPage from './Pages/EditProductPage';

import PurchasesPage from './Pages/PurchasesPage';
import CustomersPage from './Pages/CustomersPage';

import {useEffect, useState} from 'react';
import axios from 'axios';

import MenuBarComp from './Components/MenuBarComp';

function App() {
const store = new Store();

//   useEffect(() => {
//     const fetchProducts = async () => {
//         const resp = await axios.get('http://localhost:8000/products');
//         store.loadProducts(resp.data);
//     }
//     fetchProducts();
// }, [store.products])

useEffect(() => {
    const fetchNumberOfPurchases = async () => {
        const resp = await axios.get('http://localhost:8000/purchases');
        store.loadPurchases(resp.data);
        store.setNumOfPurchases(resp.data.length);
    }
    fetchNumberOfPurchases();
}, [store.purchases])

useEffect(() => {
  const load = async () => {
       await store.loadProducts();
       await store.loadCustomers();
      // store.loadPurchases(resp.data);
      // store.setNumOfPurchases(resp.data.length);
  }
  load();
}, [])



  return (

    
    <div>
     
      <div>
        <MenuBarComp/>
      <Routes>
          {/* <Route exact path="/" element={<Home/>}/> */}
          <Route exact path="/products" element={<ProductsPage store={store}/>}/>
          <Route exact path="/customers/edit" element={<EditCustomerPage store={store}/>}/>
          <Route exact path="/purchases" element={<PurchasesPage store={store}/>}/>
          <Route exact path="/customers" element={<CustomersPage store={store}/>}/>
          <Route exact path="/products/edit" element={<EditProductPage store={store}/>}/>
        </Routes>
      </div>
        
    </div>
  );
}

export default App;
