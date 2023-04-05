const mongoose = require('mongoose'); // Erase if already required
const { ObjectId } = mongoose.Schema.Types;

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
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
    images: {
        type: Array,
    },
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
    rating: [
        {
            star: Number,
            postedBy: {
                type: ObjectId,
                ref: 'User'
            },
        },
    ],
},
    {
        timestamps: true
    }
);

//Export the model
module.exports = mongoose.model('Product', productSchema);
