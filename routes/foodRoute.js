const express = require('express');
const { foodGetController,
     foodPostController,
     viewFoodMenue,
     editGetFoodMenu,
     editPostFoodMenu,
     allFood
    } = require('../controllers/foodController')

const { isAuthenticated } = require('../middleware/authMiddleware')

const router = express.Router()


router.get('/addFoodMenu', foodGetController)
router.post('/addFoodMenu', foodPostController)

router.get('/foodMenu', viewFoodMenue)

router.get('/editFoodMenu/:slug', editGetFoodMenu)
router.post('/editFoodMenu/:id', editPostFoodMenu)
router.get('/allFood', allFood)

module.exports = router