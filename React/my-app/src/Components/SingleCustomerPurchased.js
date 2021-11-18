import './singleCustomer.css'
import { observer } from 'mobx-react-lite'
import {
    Link
  } from "react-router-dom";


function SingleCustomerPurchased({ info, store }) {

    return (
        <div id="SingleCustomerPurchased">

            <div>
                customer name : <Link to="/customers/edit" onClick={(e) => { store.updateSelectedCustomerId(info.customerid) }}> {`${info.firstname} ${info.lastname}`} <br /></Link>
                purchase Date : {`${info.date.split('T')[0]}`} <br />
                <button onClick={(e) => { store.updateSelectedCustomerId(info.customerid) }}> Add product </button>
                <br />
            </div>

            

        </div>
    )
}

export default observer(SingleCustomerPurchased)
