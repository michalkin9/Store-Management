import { useEffect, useState } from 'react';
import CustomersTable from '../Components/CustomersTable';
import axios from 'axios';
import BuyProduct from '../Components/BuyProduct';
import {observer} from 'mobx-react-lite';
import './customerPage.css';

function CustomersPage({store}) {


    //to reset the component of buy product for specific customer
    useEffect(() => {
        store.updateSelectedCustomerId(0);
    }, [])

    return (
        <div>
            <h2 style={{textAlign:"center"}}>Customers page</h2>
            <div id="warpperCustomerPage">
            <div id="left_page">
            <CustomersTable customers={store.customers} store={store}/> 
            </div>
            <div id="right_page">
                {/* {store.selectedCustomerIdInCustomers!=0 &&  <BuyProduct store={store}/>} */}
                {store.selectedCustomerId!=0 &&  <BuyProduct store={store}/>}
            </div>
        </div>

        </div>
       
    )
}

export default observer(CustomersPage);
