const {Pool} = require('pg');
const pool = new Pool({
    //config the pool
    user : 'postgres',
    host : 'localhost',
    database: 'StoreDB',
    password: '1234',
    port: 5432,
});

const getAllCustomers = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM customers');
        return rows;
    } catch (error) {
        return error;
    }
}

const getCustomerByID = async (id) => {
    
    const {rows} = await pool.query('SELECT * FROM customers WHERE id = $1', 
    [id,]);
    return rows[0];
}


const updateCustomerById = async (id, obj) => {
    const data = await pool.query(
        'UPDATE customers SET firstname=$1, lastname=$2, city=$3 WHERE id=$4',
        [obj.firstname, obj.lastname, obj.city, id]
    );
    return 'updated';
}

const deleteCustomer = async (id) => {
    const data = await pool.query(
        'DELETE from customers WHERE id=$1',
        [id]
    );
    return 'delted';
}

module.exports =
{
    updateCustomerById,
    deleteCustomer,
    getCustomerByID,
    getAllCustomers,
};