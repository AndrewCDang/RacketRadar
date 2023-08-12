const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    userName: {
        type: String, 
        default: "Anon"
    },
    userFav: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    wishList: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    userStats: [{
        flex: { type: Number },
        balance: { type: Number }
    }],
}, {
    timestamps: true
});

const userProduct = mongoose.model("Users", productSchema)

module.exports = userProduct;