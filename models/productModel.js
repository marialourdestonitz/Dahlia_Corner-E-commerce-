const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const User = require('./userModel');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    images: [],
    sold: {
        type: Number,
        default: 0,
    },
    color: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    ratings: [
        {
            star: Number,
            postedby: {
                type: ObjectId,
                ref: 'User',
            },
        },
    ],
    totalRating: {
        type: Number,
        default: 0,
    },
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('Product', productSchema);
