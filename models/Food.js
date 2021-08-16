const { Schema, model } = require('mongoose')

const foodSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String
    },
    category: {
        type: String,
        trim:true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Food = model('food', foodSchema)
module.exports = Food