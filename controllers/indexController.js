
const Category = require('../models/Category')
const Food = require('../models/Food')
const User = require('../models/User')

indexController = async (req, res, next) => {
    let category = await Category.find()
    let food = await Food.find();
    //console.log(food);
    res.render('pages/index', {
        title: 'Home',
        category: category,
        food
    })
}

adminIndex = async(req,res,next)=>{
    const users = await User.find()
    
    res.render('pages/admin/adminIndex',{
        title: 'User',
        users
    })
}

module.exports = {
    indexController,
    adminIndex
}