import { useEffect, useState } from "react"
import axios from 'axios';
import Store from "../Store";
import {observer} from 'mobx-react-lite';

function CustomerRow(props) {

    const [purchasesInfo, setPurchasesInfo] = useState([]);

    useEffect(() => {
        const fetchPurchasesInfo = async() => {
            const resp = await axios.get(`http://localhost:8000/products/productinfo/${props.customer.id}`);
            setPurchasesInfo(resp.data);        }
        fetchPurchasesInfo();
    }, [props.store.numOfPurchases])

    const handleClick = (e) => {
       props.store.updateSelectedCustomerId(props.customer.id);
       props.store.selectedCustomerName = `${props.customer.firstname} ${props.customer.lastname}`
       //console.log(props.customer.id);
       //console.log(props.store.selectedCustomerIdInCustomers);
    }

    return (
        <tr>
                <td>
                    <div>
                        {props.customer.firstname} {props.customer.lastname} <br/>
                        <button onClick={handleClick}> Buy Product </button>
                    </div>
                </td>
                <td>
                    <ul>
                        {purchasesInfo.map((info,index)=>{
                             return <li> {info.name},  bought on: {info.date.split('T')[0]} </li>
                        })}
                    </ul>
                </td>
        </tr>
    )
}

export default observer(CustomerRow);
