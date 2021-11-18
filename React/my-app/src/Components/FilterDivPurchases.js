import { useEffect, useState } from "react";
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite';
import Product from "./Product";
import axios from 'axios';
import FilterTable from './FilterTable';

function FilterDivPurchases({ store }) {

    const [selectedCustomerId, setSelectedCustomer] = useState('');
    const [selectedProductId, setSelectedProduct] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showTable, setshowTable] = useState(false);

    useEffect(() => {
        const fetchAllDataInfo = async () => {
            const resp = await axios.get('http://localhost:8000/purchases/info');
            setAllData(resp.data);
        }
        fetchAllDataInfo();
    }, [])

    const handleClick = () => {

        setshowTable(true);

        const filter = allData
            .filter((el) => {
                return !selectedCustomerId ? true : el.customerid === selectedCustomerId;
            })
            .filter((el) => {
                return !selectedProductId ? true : el.productid === selectedProductId;
            })
            .filter((el) => {
                return !selectedDate ? true : el.date === selectedDate;
            });
        setFilteredData(filter);
    }

    return (
        <div>
            <div id="filterDiv">
                <div id="selectCustomer">
                    <label htmlFor="">Customers</label>
                    <select name="" id="" onChange={(e) => setSelectedCustomer(e.target.value)}>
                        <option value="" selected disabled hidden>Choose here</option>
                        {store.customers.map((customer) => {
                            return <option value={customer.id}>{customer.firstname} {customer.lastname}</option>
                        })}
                    </select><br />
                </div>

                <div id="selectProduct">
                    <label htmlFor="">Products</label>
                    <select name="" id="" onChange={(e) => setSelectedProduct(e.target.value)}>
                        <option value="" selected disabled hidden>Choose here</option>
                        {store.products.map((product) => {
                            return <option value={product.id}>{product.name}</option>
                        })}
                    </select><br />
                </div>


                <label htmlFor="">Date</label><input type="date" name="" id="" onChange={(e) => setSelectedDate(e.target.value)} /> <br /> <br />
                <button onClick={handleClick}>Search</button>

            </div>

            {showTable && <FilterTable filteredData={filteredData}></FilterTable>}
        </div>
    )
}

export default observer(FilterDivPurchases)
