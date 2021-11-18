const express = require('express');
const purchasesService = require('../services/purchasesBLL');
const router = express.Router();

router.route('/').get(async(req,res)=>{
    try {
        const purchases = await purchasesService.getAllPurchases();
        return res.json(purchases);
    } catch (error) {
        return res.json(error);
    }
});

//get all info for purchases page.
router.route('/info').get(async(req,res)=>{
    try {
        const purchases = await purchasesService.getAllPurchasesInfo();
        return res.json(purchases);
    } catch (error) {
        return res.json(error);
    }
});


router.route('/product/:id').get(async(req,res)=>{
    try {
        const products = await purchasesService.getAllPurchasesByProduct(req.params.id);
        return res.json(products);
    } catch (error) {
        return res.json(error);
    }
});

//add new purchase by post req.
router.route('/').post((req, res) => {
    const newPurchase = req.body;
    const result = purchasesService.addPurchase(newPurchase);
    return res.json(result);
});

//delete purchases by customerid.
router.route('/customer/:id').delete((req,res)=>{
    const id = req.params.id;
    const result = purchasesService.deletePurchasesByCustomerId(id);
    return res.json(result);
})

//delete purchases by productid.
router.route('/product/:id').delete((req,res)=>{
    const id = req.params.id;
    const result = purchasesService.deletePurchasesByCustomerId(id);
    return res.json(result);
})


module.exports = router;