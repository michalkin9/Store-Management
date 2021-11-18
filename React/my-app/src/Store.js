import { makeObservable, observable, action, computed } from 'mobx';
import axios from 'axios';

class Store {
    products = [];
    purchases = [];
    customers = [];
    SelectedProductId = 0;
    selectedCustomerId = 0;
    selectedCustomerName = '';
    numOfPurchases = 0;
    //selectedCustomerIdInCustomers = 0;

    constructor() {
        makeObservable(this,
            {
                products: observable,
                purchases: observable,
                customers: observable,
                //product page
                SelectedProductId: observable,
                selectedCustomerId: observable,
                selectedCustomerName: observable,
                numOfPurchases: observable,
                //selectedCustomerIdInCustomers: observable,

                //loaders:
                loadProducts: action,
                loadPurchases: action,
                loadCustomers: action,

                setNumOfPurchases: action,
                updateSelectedProductId: action,
                updateSelectedCustomerId: action,
                updateSelectedCustomerName: action,
                addPurchase: action,
                updateQuantity: action,
                getCustomerByID: action,
                deletePurchsesByCustomerId: action,
                updateCustomer: action,
                updateProduct: action,
                updateSelectedCustomerName:action,
            });
    }

    updateSelectedCustomerIdCustomers(id){
        this.selectedCustomerIdInCustomers = id;
    }

    updateSelectedCustomerName(name){
        this.selectedCustomerName = name;
    }

    async loadProducts() {
        const resp = await axios.get('http://localhost:8000/products');
        this.products = resp.data;
    }

    async loadCustomers() {
        const resp = await axios.get('http://localhost:8000/customers');
        this.customers = resp.data;
    }

    loadPurchases(data) {
        this.purchases = data;
    }

    setNumOfPurchases(num) {
        this.numOfPurchases = num;
    }

    updateSelectedProductId(id) {
        this.SelectedProductId = id;
    }

    updateSelectedCustomerId(id) {
        this.selectedCustomerId = id;
    }

    updateSelectedCustomerName(name) {
        this.selectedCustomerName = name;
    }

    async addPurchase(productId) {
        const resp = await axios.post(`http://localhost:8000/purchases`,
            {
                "customerid": this.selectedCustomerId,
                "productid": productId,
            });
            this.updateQuantity(productId);
    }

    async updateQuantity(productId) {
        const product = await axios.get(`http://localhost:8000/products/${productId}`);
        const quantity = product.data.quantity;
 

        if (quantity == 0) {
            //there is no more in stock.
            return -1;
        }
        else {
            const resp = await axios.put(`http://localhost:8000/products/quantity/${productId}`,
                { "quantity": quantity });
            return 0;
        }
    }

    async getCustomerByID(id) {
        const customer = await axios.get(`http://localhost:8000/products/${id}`);

        if (id == 0) {
            //there is no more in stock.
            return -1;
        }
        else {
            return customer;
        }
    }

    //to check if need to define in constructor
    async deletePurchsesByCustomerId(id) {
        const data = await axios.delete(`http://localhost:8000/purchases/${id}`);
        return data.data;
    }
    //delete customer and his purchases.
    async deleteCustomer(id) {
        const data = await axios.delete(`http://localhost:8000/customers/${id}`);
        this.deletePurchsesByCustomerId(id);
        return data.data;
    }

    async deleteProduct(id) {
        const data = await axios.delete(`http://localhost:8000/products/${id}`);
        this.deletePurchsesByProductId(id);
        return data.data;
    }

    async deletePurchsesByProductId(id) {
        const data = await axios.delete(`http://localhost:8000/purchases/product/${id}`);
        return data.data;
    }

    async updateCustomer(customerId, obj) {
        const resp = await axios.put(`http://localhost:8000/customers/${customerId}`,
            obj
        );
        return resp.data;
    }

    async updateProduct(productId, obj) {
        const resp = await axios.put(`http://localhost:8000/products/${productId}`,
            obj
        );
        return resp.data;
    }
}

export default Store;