const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a product name"]
        },
        label: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        cost: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        difficulty: {
            type: Number,
            required: true
        },
        balance: {
            type: Number,
            required: true
        },
        stiff: {
            type: Number,
            required: true
        },
        url: {
            type: String,
            required: false
        },
        bestSelling: {
            type: Boolean,
            default: false
        },
        favourites: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],

    },
    {
        timestamps: true
    }
)

const Product = mongoose.model("Rackets", productSchema)

module.exports = Product;