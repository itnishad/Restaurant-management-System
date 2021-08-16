
const Food = require('../models/Food')
const History = require('../models/History')

let cart = [];
let totalQty = 0;
let totalPrice = 0;


addToCart = async (req, res, next) => {



    const foodid = req.params.id
    if(!req.session.cart){
        req.session.cart={
            item:{},
            totalQt: 0,
            totalPric: 0
        }  
    }
    
    
    const food = await Food.findById(foodid);

    cart.push(food);
    totalQty++;
    totalPrice += food.price;

    
    const foods = await Food.find()
    res.render('pages/food', {
        title: 'Food Menu',
        cart,
        totalQty,
        foods,
        totalPrice,
    })

    /*if(req.session.cart.length === 0){
        req.session.cart.push(food);
    }else {
       console.log('no')
   }*/

    /*console.log(req.session.cart.items);
    if(Object.entries(req.session.cart.items).length === 0){
        console.log('yes');
        req.session.cart.items.push(food);
        req.session.cart.totalQty = 1;
        req.session.cart.totalQty = food.price;
    }else {
        console.log('no')
    }
    /*if(item.length == 0){
        console.log('yes');
        req.session.cart.items.push(food);
        req.session.cart.totalQty = 1;
        req.session.cart.totalQty = food.price;
    }
   console.log(req.session.cart);*/
    //console.log(req.session.cart);
}

myOrderGetController = (req, res, next) => {

    res.render('pages/myOrder', {
        title: 'Myorder',
        cart,
        totalQty,
        totalPrice
    })
}

orderHistory = async(req,res,next)=>{
    const puserId = req.session.user._id
    const foods = await Food.find()
    const history = await History.find()
    res.render('pages/history', {
        title: 'Order History',
        foods,
        history,
        puserId
    })
}

clear = async (req,res,next)=>{

    const userId = req.session.user._id
    /*const foodId = cart[0].id
    let history = new History({
            userId,
            foodId
    })*/
    let foodId
    let len = cart.length
    
    for(let i=0;i<len;i++){
        foodId = cart[i].id;
        let history = new History({
            userId,
            foodId
        })
        try {
            const createHistory = await history.save()
            console.log('Food Created Sussessfully', createHistory)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    
    /*try {
        const createHistory = await history.save()
        console.log('Food Created Sussessfully', createHistory)
    } catch (error) {
        console.log(error)
        next(error)
    }*/
    
    //console.log(userId,foodId)

     cart = [];
     totalQty = 0;
     totalPrice = 0;
    res.redirect('/')
}

module.exports = {
    addToCart,
    myOrderGetController,
    orderHistory,
    clear
}