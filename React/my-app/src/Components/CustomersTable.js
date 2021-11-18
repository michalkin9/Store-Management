import { useEffect, useState } from 'react';
import CustomerRow from './CustomerRow';
import './table.css';
import {observer} from 'mobx-react-lite';

function CustomersTable(props) {

    return (
        <div>
            <table id="customersTable" >
                <tr>
                    <th > Customer Name   </th>
                    <th> Customer's Purchases </th>
                </tr>
                 
                
                {props.customers.map((customer,index)=>{
                    return <CustomerRow key={index} customer={customer} store={props.store}/>
                })}

            </table>
        </div>
    )
}

export default observer(CustomersTable);
