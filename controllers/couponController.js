const Coupon = require('../models/couponModel');
const validateMongoDbId = require('../utils/validateMongoDbId');
const asyncHandler = require('express-async-handler');

const createCoupon = asyncHandler(async (req, res) => {
    try {
        const { name, discount, expiry } = req.body;
        const newCoupon = await Coupon.create({ name, discount, expiry });
        res.json(newCoupon);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllCoupon = asyncHandler(async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (error) {
        throw new Error(error);
    }
});

const updateCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // validateMongoDbId(id);
    try {
        const updatecoupons = await Coupon.findByIdAndUpdate(
            id,
            req.body,
            { new: true });
        res.json(updatecoupons);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const deletecoupons = await Coupon.findByIdAndDelete(id);
        res.json(deletecoupons);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createCoupon, getAllCoupon, updateCoupon, deleteCoupon };
