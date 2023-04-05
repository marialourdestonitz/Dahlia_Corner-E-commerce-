const express = require('express');
const { createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { isAdmin, authMiddleware } = require('../middlewares/authMidddleware')
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createProduct);

router.put('/:id', authMiddleware, isAdmin, updateProduct);

router.get('/:id', getProduct);
router.get('/', getAllProduct);

router.delete('/:id', authMiddleware, isAdmin, deleteProduct);

module.exports = router;