import {useEffect,useState} from 'react';
import {observer} from 'mobx-react-lite'
import axios from 'axios';
import SingleCustomerPurchased from './SingleCustomerPurchased';
import './listCustomer.css'

function ListCustomerWhoPurchased({store}) {

    const [customerWhoPurchased, setCustomerWhoPurchased] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            const resp = await axios.get(`http://localhost:8000/purchases/product/${store.SelectedProductId}`);
            setCustomerWhoPurchased(resp.data);
        }
        fetchCustomers();
    }, [store.SelectedProductId])



    return (
        <div id="listCustomerWhoPurchased">
            {/* <strong>Customers who purchased the product: </strong> */}
            {customerWhoPurchased.map((customer,index)=>{
                 return <SingleCustomerPurchased key={index} info={customer} store={store}></SingleCustomerPurchased>
                 
            })}
        </div>
    )
}

export default observer(ListCustomerWhoPurchased)
