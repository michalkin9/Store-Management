const express = require('express');
const customerService = require('../services/customerBLL');
const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
        const customer = await customerService.getAllCustomers();
        return res.json(customer);
    } catch (error) {
        return res.json(error);
    }
});

router.route('/:id').get(async (req, res) => {
    try {
        const customer = await customerService.getCustomerByID(req.params.id);
        return res.json(customer);
    } catch (error) {
        return res.json(error);
    }
});

router.route('/:id').delete((req, res) => {
    const id = req.params.id;
    const result = customerService.deleteCustomer(id);
    return res.json(result);
});

router.route('/:id').put(async (req, res) => {
    const id = req.params.id;
    const body = req.body; 
    const result = await customerService.updateCustomerById(id, body);
    return res.json(result);
});

module.exports = router;
