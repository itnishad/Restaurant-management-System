
const { validationResult } = require('express-validator')
const User = require('../models/User')
const errorFormatter = require('../utils/validationErrorFormatter')


signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', {
        title: 'Register Form',
        error: {},
        value: {}
    })
}

signupPostController = async (req, res, next) => {

    let { username, email, password, confirmPassword } = req.body

    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        return res.render('pages/auth/signup', {
            title: 'Register Form',
            error: errors.mapped(),
            value: { username, email, password }
        })
    }
    if (password === confirmPassword) {
        const user = new User({
            username,
            email,
            password
        })

        try {
            let createdUser = await user.save()
            console.log('User Created Sussessfully', createdUser)
            res.redirect('/')
        } catch (e) {
            console.log(e)
            next(e)
        }
    } else {
        console.log('Password Not Match');
    }
}

loginGetController = (req, res, next) => {
    console.log(req.session)
    res.render('pages/auth/login', {
        title: 'Login Form',
        error: {}
    })
}

loginPostController = async (req, res, next) => {
    let { email, password } = req.body

    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        return res.render('pages/auth/login', {
            title: 'Login Form',
            error: errors.mapped()
        })
    }

    try {

        let user = await User.findOne({ email })
        const users = await User.find()
        if(!user){
            res.redirect('/auth/login')
        }

        if( password !== user.password){
            res.redirect('/auth/login')
        }

        req.session.isLoggedIn = true
        req.session.user = user
        if(user.email==='admin@gmail.com'){
            res.render('pages/admin/adminIndex',{
                title:'Admin',
                users
            })
        }else{
            
        res.redirect('/')
        }

    } catch (e) {
        console.log(e)
        next(e)
    }
}

logoutController = (req, res, next) => {
    req.session.destroy( (error) => {
        if(error){
            console.log(error)
            return next(error)
        }
        return res.redirect('/')
    })
}

module.exports = {
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController
}