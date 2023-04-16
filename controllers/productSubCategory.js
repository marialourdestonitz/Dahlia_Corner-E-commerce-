const Subcat = require('../models/subCategoryModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');

const createSubcat = asyncHandler(async (req, res) => {
    try {
        const newSubcat = await Subcat.create(req.body);
        res.json(newSubcat);
    } catch (error) {
        throw new Error(error);
    }
});


const updateSubcat = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updatedSubcat = await Subcat.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updatedSubcat);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteSubcat = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSubcat = await Subcat.findByIdAndDelete(id);
        res.json(deletedSubcat);
    } catch (error) {
        throw new Error(error);
    }
});

const getSubcat = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getaSubcat = await Subcat.findById(id);
        res.json(getaSubcat);
    } catch (error) {
        throw new Error(error);
    }
});


const getAllSubcat = asyncHandler(async (req, res) => {
    try {
        const getallSubcat = await Subcat.find();
        res.json(getallSubcat);
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = { createSubcat, updateSubcat, deleteSubcat, getSubcat, getAllSubcat }