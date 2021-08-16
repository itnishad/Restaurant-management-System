const express = require('express');
const { body } = require('express-validator')
const User = require('../models/User')

const {signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController} = require('../controllers/authControllers')

const { isUnAuthenticated } = require('../middleware/authMiddleware')

const router = express.Router()

const signupValidator = [

    body('username')
        .isLength({min: 2, max:15})
        .withMessage('Username Must Be Between 2 to 15 Chars')
        .custom(async username => {
            let user = await User.findOne({username})
            if(user){
                return Promise.reject('Username Already in Used')
            }
        }),
    body('email')
        .isEmail().withMessage('Please Provid A Valid Email')
        .custom(async email => {
            let user = await User.findOne({email})
            if(user){
                return Promise.reject('Email Already Used')
            }
            return true
        })
        .normalizeEmail()
    ,
    body('password')
        .isLength({min: 5}).withMessage('Your Password Must Be Greater Then 5 Chars')
    ,
    body('confirmPassword')
        .isLength({min: 5}).withMessage('Your Password Must Be Greater Then 5 Chars')
        .custom((confirmPassword, {req}) => {
            if(confirmPassword !== req.body.password){
                throw new Error('Password Does Not Match')
            }
            return true
        })

]

const loginValidator = [
    body('email')
        .not()
        .isEmpty()
        .withMessage('Email Can Not Be Empty')
    ,
    body('password')
        .not()
        .isEmpty()
        .withMessage('Password Can not Be empty')
]

router.get('/signup', isUnAuthenticated,signupGetController);
router.post('/signup', isUnAuthenticated, signupValidator, signupPostController);

router.get('/login', isUnAuthenticated, loginGetController)
router.post('/login', isUnAuthenticated, loginValidator, loginPostController)
router.get('/logout', logoutController)

module.exports = router