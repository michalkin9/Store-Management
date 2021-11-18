import { useEffect, useState } from "react";
import {observer} from 'mobx-react-lite';


function BuyProduct({store}) {

    const [chosenProduct, setChosenProduct] = useState(0); 

    const handleClickBuyProduct = () =>{
        const ans = store.updateQuantity(chosenProduct);
        if(ans === -1){
            alert("Product out of stock!");
        } else {
            store.addPurchase(chosenProduct); //productId
            store.setNumOfPurchases(store.numOfPurchases+1);
        }
    }

    

    return (
        <div id="buyProductDiv">
            <div id="buyProductDivContent">
                <h4>Buy product for {store.selectedCustomerName} :</h4>
                {store.products.map((product,index)=>
                    <div>
                        <input type="radio" name="" id="" name="buyProduct" onChange={(e) => { setChosenProduct(product.id) }} /> 
                        <label htmlFor="">{product.name}</label>
                    </div>
                )}
                <br />
                <button onClick={handleClickBuyProduct}>Buy Product</button>
            </div>
        </div>
    )
}

export default observer(BuyProduct);
