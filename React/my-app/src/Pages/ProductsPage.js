import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../Components/Product";
import ListCustomerWhoPurchased from "../Components/ListCustomerWhoPurchased";
import AddProductToCurrCustomer from "../Components/AddProductToCurrCustomer";
import "./productsPage.css";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

function ProductsPage({ store }) {
  // useEffect(() => {
  //     const fetchProducts = async () => {
  //         const resp = await axios.get('http://localhost:8000/products');
  //         store.loadProducts(resp.data);
  //     }
  //     fetchProducts();
  // }, [store.products])

  useEffect(() => {
    const fetchProducts = async () => {
      store.updateSelectedCustomerId(0);
      store.updateSelectedProductId(0);
      //store.loadProducts();
    };
    fetchProducts();
  }, []);

  // useEffect(() => {
  //     const fetchNumberOfPurchases = async () => {
  //         const resp = await axios.get('http://localhost:8000/purchases');
  //         store.loadPurchases(resp.data);
  //         store.setNumOfPurchases(resp.data.length);
  //     }
  //     fetchNumberOfPurchases();
  // }, [store.purchases])

  return (
    <div>
      <h2 style={{ textAlign: "center" }}> Products Page </h2>
      <div id="wrapperProductsPage">
        <div id="left">
          
          <div id="numberOfPurchases">Number of purchases : {store.numOfPurchases}</div>
          <br />
          {store.products.map((product, index) => (
            <Product key={index} product={product} store={store} show={'true'}></Product>
          ))}
        </div>

        <div id="right">
          <div id="upRight">
            {/* {console.log(toJS(store.SelectedProductId))} */}
            {store.SelectedProductId !== 0 && (
              <ListCustomerWhoPurchased store={store} />
            )}
          </div>

          <div id="downRight">
            {store.selectedCustomerId !== 0 && (
              <AddProductToCurrCustomer store={store} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(ProductsPage);
