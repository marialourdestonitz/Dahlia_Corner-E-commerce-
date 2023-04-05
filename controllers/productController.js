const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const { default: slugify } = require('slugify');
const slug = require('slugify');

//Create product
const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error);
    }
});

//Update product
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updateProducts = await Product.findOneAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );
        res.json(updateProducts);
    } catch (error) {
        throw new Error(error);
    }
});

//Delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const deleteProducts = await Product.findOneAndDelete(id);
        res.json(deleteProducts);
    } catch (error) {
        throw new Error(error);
    }
});

//Get product
const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});

//Get ALL product
const getAllProduct = asyncHandler(async (req, res) => {
    try {
        //FILTER
        const queryProduct = { ...req.query };

        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach((el) => delete queryProduct[el]);

        let querystr = JSON.stringify(queryProduct);
        querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        let query = Product.find(JSON.parse(querystr));

        //SORT
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt')
        }

        //Limit fields
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        //PAGINATION
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) throw new Error('This page does not exists!')
        }

        const product = await query;
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = {
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
};
