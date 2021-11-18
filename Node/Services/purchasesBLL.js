const { Pool } = require('pg');
const date = require('date-and-time');

const pool = new Pool({
    //config the pool
    user: 'postgres',
    host: 'localhost',
    database: 'StoreDB',
    password: '1234',
    port: 5432,
});


const getAllPurchases = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM purchases');
        return rows;
    } catch (error) {
        return error;
    }
}



const addPurchase = async (obj) => {
    const data = await pool.query(
        'INSERT INTO purchases (customerid,productid,date) values ($1,$2,$3)',
        [obj.customerid,obj.productid,date.format(new Date(),'YYYY-MM-DD')]
    );
}

const getAllPurchasesByProduct = async (productId) => {
    try {
        const {rows} = await pool.query('SELECT purchases.*, customers.* FROM purchases INNER JOIN customers ON purchases.customerid = customers.id WHERE purchases.productid = $1', [
            productId,
        ]);
        return rows;
    }catch(error) {
        return error;
    }
};

const deletePurchasesByCustomerId = async (customerId) => {
    try {
        const {rows} = await pool.query('DELETE from purchases WHERE customerid = $1', [
            customerId,
        ]);
        return rows;
    }catch(error) {
        return error;
    }
}

const deletePurchasesByProductId = async (productId) => {
    try {
        const {rows} = await pool.query('DELETE from purchases WHERE productid = $1', [
            productId,
        ]);
        return rows;
    }catch(error) {
        return error;
    }
}

//get all info of purchases for filter in purchases page
const getAllPurchasesInfo = async () => {
    try {
                const {rows} = 
        await pool.query('SELECT purchases.*, customers.firstname, customers.lastname, products.name FROM purchases JOIN products ON purchases.productid = products.id JOIN customers ON purchases.customerid = customers.id');
        return rows;
    }catch(error) {
        return error;
    }
}


module.exports =
{
    addPurchase,
    getAllPurchasesByProduct,
    getAllPurchases,
    deletePurchasesByCustomerId,
    deletePurchasesByProductId,
    getAllPurchasesInfo,
};