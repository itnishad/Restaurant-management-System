const express = require('express');
const {
    categoryGetController,
    categoryPostController,
    editCategoryGetController,
    editCategoryPostController,
    detailsCategory
} = require('../controllers/categoryController')

const router = express.Router()

router.get('/addCategory', categoryGetController)
router.post('/addCategory', categoryPostController)

router.get('/viewCategory', viewCategory)

router.get('/editCategory/:slug', editCategoryGetController)
router.post('/editCategory/:id', editCategoryPostController)

router.get('/detailsCategory/:slug',detailsCategory)

module.exports = router

