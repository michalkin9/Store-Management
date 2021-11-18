import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './editProductCustomer.css';
function EditProductCustomer({customer,store}) {

    const navigate = useNavigate();

    const handleNevigate = (e) => {
        navigate('/customers/edit');
        store.updateSelectedCustomerId(customer.id);
    }
    return (
        <div>
            <div id="customerAtEditProduct">
                <div onClick={handleNevigate}>
                    <strong>Name:</strong> {customer.firstname} {customer.lastname} <br />
                </div>
                <strong>City:</strong> {customer.city} <br />
                <br />
            </div>
        </div>
    )
}

export default observer(EditProductCustomer);
