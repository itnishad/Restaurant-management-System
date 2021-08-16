
const Food = require('../models/Food')
const Category = require('../models/Category');
const router = require('../routes/indexRoute');

foodGetController = async (req, res, next) => {

    categorys = await Category.find();

    res.render('pages/admin/addFoodMenu', {
        title: 'Add Food Menu',
        categorys
    })
}

foodPostController = async (req, res, next) => {

    //console.log(req.body);

    let {title, slug, category, price, image, description} = req.body;

    //console.log(slug)

    slug.replace(/\s+/g, '-').toLowerCase()
    if(slug == ''){
        slug = title.replace(/\s+/g, '-').toLowerCase()
    }

    console.log(slug);

    const food = new Food({
        title,
        slug,
        category,
        price,
        image,
        description
    })
    
    try{
        let createFood = await food.save()
        console.log('Food Created Sussessfully', createFood)
        res.redirect('/')

    }catch(e){
        //console.log(e);
        next(e)
    }
}

viewFoodMenue = async (req, res, next) => {

    const foods = await Food.find()

    res.render('pages/admin/foodMenu', {
        title: 'Food Menu',
        foods
    })
}

editGetFoodMenu = async (req, res, next) => {
    let slug = req.params.slug;
    let catSlug = req.params.slug
    let food = await Food.findOne({slug: slug})
    let categorys = await Category.find();
    res.render('pages/admin/editFoodMenu', {
        title: 'Edit Category',
        food,
        categorys,
        catSlug
    })
}

editPostFoodMenu = async (req, res, next) => {
    
    const id = req.params.id
    let {title, slug, category, price, description} = req.body
    
    let categorys = await Category.find();
    slug.replace(/\s+/g, '-').toLowerCase()
    if(slug == ''){
        slug = title.replace(/\s+/g, '-').toLowerCase()
    }


    const food = {
        title,
        slug,
        category,
        price,
        description
    }
    const options = {new: true}

    try {
       let updateFood = await Food.findByIdAndUpdate(
           id,
           food,
           options
       )
       //console.log(updateFood)
       res.render('pages/admin/editFoodMenu', {
        title: 'Edit Food Menu',
        food: updateFood,
        categorys,

    })
    } catch (error) {
        console.log(error)
        next(error)
    }
    
}

allFood = async (req, res, next) => {

    const foods = await Food.find()
    //console.log(foods);
    res.render('pages/food', {
        title: 'Food Menu',
        foods
    })
}

module.exports = {
    foodGetController,
    foodPostController,
    viewFoodMenue,
    editGetFoodMenu,
    editPostFoodMenu,
    allFood
}