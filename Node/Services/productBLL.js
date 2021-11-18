const { Pool } = require('pg');
const pool = new Pool({
    //config the pool
    user: 'postgres',
    host: 'localhost',
    database: 'StoreDB',
    password: '1234',
    port: 5432,
});

const getAllProducts = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM products');
        return rows;
    } catch (error) {
        return error;
    }
}

const getProductsByCustomerId = async (customerId) => {
    try {
        const { rows } =
        await pool.query('select distinct * from products where id in (select productid from purchases where customerid = $1)', 
        [customerId]);
        return rows;
    } catch (error) {
        return error;
    }
}

const getProductByID = async (id) => {
    
        const {rows} = await pool.query('SELECT * FROM products WHERE id = $1', 
        [id,]);
        return rows[0];
}

const updateProduct = async (id, obj) => {
    const data = await pool.query(
        'UPDATE products SET name=$1, price=$2, quantity=$3 WHERE id=$4',
        [obj.name, obj.price, obj.quantity, id]
    );
    return 'updated';
}

const updateProductQuantity = async (id, quantity) => {
    quantity--;
    const data = await pool.query(
        'UPDATE products SET quantity=$1 WHERE id=$2',
        [quantity, id]
    );
    return 'updated';
}

//get info for table in customers page.
const getProductNameAndPurchaseDate = async (customerId) => {
    const {rows} = await pool.query(
        'SELECT pr.name, pu.date FROM products pr JOIN purchases pu on pr.id = pu.productid WHERE pu.customerid = $1',
        [customerId]
    );
    return rows;
}

//delete product by id
const deleteProduct = async (id) => {
    const data = await pool.query(
        'DELETE from products WHERE id=$1',
        [id]
    );
    return 'delted';
}

module.exports =
{
    getAllProducts,
    getProductByID,
    updateProduct,
    deleteProduct,
    updateProductQuantity,
    getProductsByCustomerId,
    getProductNameAndPurchaseDate,
};

