import './editcustomer.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import Product from '../Components/Product';



function EditCustomerPage({ store }) {
    const [currCustomer, setCurrCustomer] = useState({id: 0});
    const [productsCustomerBought, setProductsCustomerBought] = useState([]);
    const [updatedCustomer, setupdatedCustomer] = useState({})

    useEffect(() => {
        const fetchCustomer = async () => {
            const resp = await axios.get(`http://localhost:8000/customers/${store.selectedCustomerId}`);
            setCurrCustomer(resp.data);
            setupdatedCustomer({...resp.data});
        }
        fetchCustomer();
    }, [store.selectedCustomerId])

    useEffect(() => {
        const fetchCustomers = async () => {
            const resp = await axios.get(`http://localhost:8000/products/customer/${store.selectedCustomerId}`);
            setProductsCustomerBought(resp.data);
        }
        fetchCustomers();
    }, [store.selectedCustomerId])

    const handleDelete = (e) => {
        //console.log(currCustomer.id);
        store.deleteCustomer(currCustomer.id);
        console.log('deleted');
    }

    const handleChange = (e) => {
        setupdatedCustomer({...updatedCustomer,[e.target.name]: e.target.value});
    }

    const handleUpdate = (e) => {
        store.updateCustomer(currCustomer.id,updatedCustomer);
    }

    return (

        <div>
            <h2 id="headerEdit"> Edit Customer</h2>

            <div id="wrapperEditPage">
                
                <div id="leftEditPage">
                    <div id="editDiv">
                        First Name: <input type="text" name="firstname" defaultValue={currCustomer.firstname} onChange={handleChange} /> <br />
                        Last Name: <input type="text" name="lastname" defaultValue={currCustomer.lastname} onChange={handleChange}/> <br />
                        City : <input type="text" name="city" defaultValue={currCustomer.city} onChange={handleChange}/> <br /> <br />
                        <div id="buttons">
                            <button onClick={handleUpdate} className="editButtons">Update</button>
                            <button onClick={handleDelete} className="editButtons">Delete</button>
                        </div>
                    </div>

                </div>

                <div id="rightEditPage">
                    <h4> The products {currCustomer.firstname} {currCustomer.lastname} bought:</h4>
                    {productsCustomerBought.map((product, index) => {
                        return <Product key={index} product={product} store={store} show={'false'}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default observer(EditCustomerPage)
