const User = require('../models/User')

const {cart,totalPrice,totalQty} = require('../controllers/addToCartControllers')

exports.bindUserWithRequest = () => {
    return async (req, res, next) => {
        if(!req.session.isLoggedIn){
            return next()
        }
        
        try {
            let user = await User.findById(req.session.user._id)
            req.user = user
            next()
        } catch (error) {
            console.log(error);
            next(error);
        }

    }
}

exports.isAuthenticated = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.redirect('/auth/login')
    }
    next()
}

exports.isUnAuthenticated = (req, res, next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/')
    }
    next()
}



/*exports.clear = (req, res, next) => {
    if(!req.session.isLoggedIn){
        cart = [];
        totalPrice = 0;
        totalQty = 0;
    }
    next()
}*/