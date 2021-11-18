import { useEffect, useState } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import EditProductCustomer from '../Components/EditProductCustomer';


function EditProductPage({store}) {

    const [currProduct, setCurrProduct] = useState([]);
    const [customerWhoPurchased, setCustomerWhoPurchased] = useState([]);
    const [updatedProduct, setUpdatedProduct] = useState([]);



    useEffect(() => {
        const fetchProduct = async () => {
            console.log(store.SelectedProductId);
            const resp = await axios.get(`http://localhost:8000/products/${store.SelectedProductId}`);
            setCurrProduct(resp.data);
            setUpdatedProduct({...resp.data});
        }
        fetchProduct();
    }, [store])

    useEffect(() => {
        const fetchCustomers = async () => {
            const resp = await axios.get(`http://localhost:8000/purchases/product/${store.SelectedProductId}`);
            setCustomerWhoPurchased(resp.data);
        }
        fetchCustomers();
    }, [])

    const handleDelete = (e) => {
        store.deleteProduct(currProduct.id);
        console.log('deleted');
    }

    const handleChange = (e) => {
        setUpdatedProduct({...updatedProduct,[e.target.name]: e.target.value});
    }

    const handleUpdate = (e) => {
        store.updateProduct(currProduct.id,updatedProduct);
    }

    return (
        <div>
             <h2 id="headerEdit"> Edit Product</h2>
             <div id="wrapperEditPage">
             <div id="leftEditPage">
                    <div id="editDiv">
                        Product: <input type="text" name="name" defaultValue={currProduct.name} onChange={handleChange}/> <br />
                        Price: <input type="text" name="price" defaultValue={currProduct.price} onChange={handleChange}/> <br />
                        Quantity : <input type="text" name="quantity" defaultValue={currProduct.quantity} onChange={handleChange}/> <br /> <br />
                        <div id="buttons">
                            <button onClick={handleUpdate} className="editButtons">Update</button>
                            <button onClick={handleDelete} className="editButtons">Delete</button>
                        </div>
                    </div>

                </div>

                <div id="rightEditPage">
                    <h4>{currProduct.name}'s customers:</h4>
                    {customerWhoPurchased.map((customer,index)=>{
                         return <EditProductCustomer customer={customer} store={store}></EditProductCustomer>
                    })}
                </div>
             </div>
        </div>
    )
}

export default observer(EditProductPage)
