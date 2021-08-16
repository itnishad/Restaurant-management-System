const express = require('express');
const { 
    addToCart,
    myOrderGetController,
    orderHistory,
    clear
} = require('../controllers/addToCartControllers')

const { isAuthenticated } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/toCart/:id', isAuthenticated, addToCart)
router.get('/myOrder', isAuthenticated, myOrderGetController)
router.get('/history', orderHistory)
router.get('/clear/',clear)

module.exports = router