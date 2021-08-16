const {Schema, model} = require('mongoose')

const categorySchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    slug: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type:String
    }
}, {timestamps: true})

const Category = model('Category', categorySchema)

module.exports = Category