
const { findOne } = require('../models/Category')
const Category = require('../models/Category')
const Food = require('../models/Food')

categoryGetController = (req, res, next) => {
    res.render('pages/admin/addCategory', {
        title: 'Add Category'
    })
}

categoryPostController = async (req, res, next) => {
    

    let { title, slug, image, description } = req.body
    console.log(title, slug, description);
    
    slug.replace(/\s+/g, '-').toLowerCase()
    if(slug == ''){
        slug = title.replace(/\s+/g, '-').toLowerCase()
    }

    const category = new Category({
        title,
        slug,
        image,
        description
    })
    try {
        let createCategory = await category.save()
        console.log('Category Created Sussessfully', createCategory)
        res.redirect('/')
    } catch (e) {
        console.log(e);
        next(e)
    }
}

viewCategory = async (req, res, next) => {
    let categorys = await Category.find()
    //console.log(food);
    res.render('pages/admin/category', {
        title: 'Category',
        categorys
    })
}

editCategoryGetController = async (req, res, next) => {
    let slug = req.params.slug;
    let category = await Category.findOne({slug: slug})
    res.render('pages/admin/editCategory', {
        title: 'Edit Category',
        category
    })
}

editCategoryPostController = async (req, res, next) => {
    const id = req.params.id
    let {title, slug, description} = req.body

    slug.replace(/\s+/g, '-').toLowerCase()
    if(slug == ''){
        slug = title.replace(/\s+/g, '-').toLowerCase()
    }

    const cat = {
        title,
        slug,
        description
    }
    const options = {new: true}

    console.log(id, cat)

    try {
       let updateCategory = await Category.findByIdAndUpdate(
           id,
           cat,
           options
       )
       console.log(updateCategory)
       res.render('pages/admin/editCategory', {
        title: 'Edit Category',
        category: updateCategory
    })
    } catch (error) {
        console.log(error)
        next(error)
    }
    
    
}
detailsCategory = async (req, res, next) => {
    let slug = req.params.slug;
    let food = await Food.find({category: slug})

    console.log(food);

    res.render('pages/detailsCategory',{
        title: slug,
        food
    })
}

module.exports = {
    categoryGetController,
    categoryPostController,
    viewCategory,
    editCategoryGetController,
    editCategoryPostController,
    detailsCategory
}