const express = require('express');
const { createSubcat, updateSubcat, deleteSubcat, getSubcat, getAllSubcat } = require('../controllers/productSubCategory');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();



router.post('/', authMiddleware, isAdmin, createSubcat);
router.put('/:id', authMiddleware, isAdmin, updateSubcat);
router.delete('/:id', authMiddleware, isAdmin, deleteSubcat);
router.get('/:id', getSubcat);
router.get('/', getAllSubcat);

module.exports = router;