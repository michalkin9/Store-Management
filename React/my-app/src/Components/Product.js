import Store from '../Store';
import './product.css';
import {
    Link
  } from "react-router-dom";
  import { useNavigate } from 'react-router-dom';

function Product(props) {
    const navigate = useNavigate();

    const updateSroteProps = (e) => {
        props.store.updateSelectedProductId(props.product.id);
        //props.store.updateSelectedCustomerId(0); //reset value of selected Customer.
    }

    const nevigateToEditProductPage = (e) => {
        navigate('/products/edit');
        updateSroteProps();
    }

    return (
        <div id="product">
            <h4 onClick={nevigateToEditProductPage}>{props.product.name}</h4>
            Price:  {props.product.price} <br />
            Quantity:  {props.product.quantity} 
            <br /> <br />
            <button onClick={updateSroteProps}> customers who purchased </button>
        </div>
    )
}

export default Product
