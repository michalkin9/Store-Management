const express = require('express');
const productService = require('../services/productBLL');
const router = express.Router();

//Get all
router.route('/').get(async(req,res)=>{
    try {
        const products = await productService.getAllProducts();
        return res.json(products);
    } catch (error) {
        return res.json(error);
    }
});

//delete product
router.route('/:id').delete(async(req,res)=>{
    try {
        const product = await productService.deleteProduct(req.params.id);
        return res.json(product);
    } catch (error) {
        return res.json(error);
    }
})

//get by id
router.route('/:id').get(async(req,res)=>{
    try {
        const product = await productService.getProductByID(req.params.id);
        return res.json(product);
    } catch (error) {
        return res.json(error);
    }
})

//update product quantity
router.route('/quantity/:id').put(async (req, res) => {
    const id = req.params.id;
    const {quantity} = req.body;
     const result = await productService.updateProductQuantity(id,quantity);
    return res.json(result);
});

router.route('/:id').put(async (req, res) => {
    const id = req.params.id;
    const body = req.body; 
    const result = await productService.updateProduct(id, body);
    return res.json(result);
});


router.route('/customer/:id').get(async (req, res) => {
    const id = req.params.id;
    const {quantity} = req.body;
    const result = await productService.getProductsByCustomerId(id);
    return res.json(result);
});

router.route('/productinfo/:id').get(async(req,res)=>{
    const id = req.params.id;
    const result = await productService.getProductNameAndPurchaseDate(id);
    return res.json(result);
})

  //updateProductQuantity

module.exports = router;


