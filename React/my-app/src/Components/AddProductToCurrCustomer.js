import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './addProduct.css';

function AddProductToCurrCustomer({store}) {

    const [allProducts, setAllProducts] = useState([]);
    const [chosenProduct, setChosenProduct] = useState(0); //productId

    useEffect(() => {
        const fetchCustomers = async () => {
            const resp = await axios.get(`http://localhost:8000/products`);
            setAllProducts(resp.data);
        }
        fetchCustomers();
    }, [])

    const handleClick = (e) => {
        //purachase product : 1. update quantity for product
        // 2. add row in purchases 

        const ans = store.updateQuantity(chosenProduct);
        if(ans === -1){
            alert("Product out of stock!");
        } else {
            store.addPurchase(chosenProduct); //productId
            store.setNumOfPurchases(store.numOfPurchases+1);
            store.loadProducts();
        }

    }


    return (
        <div>
            <div id="addProductDiv">
                <h3>Purachse Products</h3>
                {allProducts.map((product, index) => {
                    return (
                        <Fragment key={index}>
                            <input type="radio" name="product" id="" onChange={(e) => { setChosenProduct(product.id) }} />
                            <label>{product.name}</label>
                            <br />
                        </Fragment>
                    )
                })}
                <br />
                <button onClick={(e) =>  {handleClick(e)}} className="purchaseProductsButton"> Purchase Products</button>
            </div>
        </div>
    )
}

export default AddProductToCurrCustomer
