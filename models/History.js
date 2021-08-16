const { Schema, model } = require('mongoose')

const historySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    foodId: {
        type: Schema.Types.ObjectId,
        ref:"Food",
        required: true
    },
}, {
    timestamps: true
})

const History = model('history', historySchema)
module.exports = History