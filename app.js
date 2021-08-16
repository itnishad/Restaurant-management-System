const { response, json } = require('express');
const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const { isAuthenticated , isUnAuthenticated} = require('./middleware/authMiddleware')

//model Require

const Category = require('./models/Category')
const Food = require('./models/Food')

//import middleware

const {bindUserWithRequest} = require('./middleware/authMiddleware')
const setLocals = require('./middleware/setLocal')

const app = express();
var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/Restaurant',
    collection: 'Sessions',
    expires: 1000 * 60 * 60 * 2
  });


//Setup View Engine

app.set('view engine', 'ejs')
app.set('views', 'views')

//middleware Array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || "SECRET_KEY",
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    bindUserWithRequest(),
    setLocals()
]

app.use(middleware);


//Route require
const home = require('./routes/indexRoute')
const category = require('./routes/categoryRoute')
const food = require('./routes/foodRoute')
const auth = require('./routes/authRoutes')
const addToCard = require('./routes/addToCartRoute')
const admin = require('./routes/adminRoute')

app.get('/abc', async (req, res) => {
    const foods = await Food.find()
    res.render('playground/playground', {
        title: 'Add Category',
        foods
    })
})
app.get('/abd', (req, res) => {
    res.render('pages/food', {
        title: 'Add Category'
    })

    const islog = req.session.cart[0].name
    res.send(islog)
})

app.use('/admin', isAuthenticated, admin)
app.use('/add', addToCard)
app.use('/auth', auth)
app.use('/category', category)
app.use('/food', food)
app.use('/', home)


mongoose.connect('mongodb://localhost:27017/Restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(5000, () => {
            console.log('Server is running on port 5000')
        });
        console.log("Database Connected....")
    })
    .catch((e) => {
        console.log(e);
    })

