const express = require('express');

const { createUser,
    loginUserController,
    getAllUser,
    getUser,
    deleteUser,
    updateUser,
    blockUser,
    unBlockUser,
    handleRefreshToken,
    logOut } = require('../controllers/userController');

const { authMiddleware, isAdmin } = require('../middlewares/authMidddleware');

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUserController);

router.get('/all-user', getAllUser);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logOut);
router.get('/:id', authMiddleware, isAdmin, getUser);


router.delete('/:id', deleteUser);

router.put('/edit-user', authMiddleware, updateUser);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unBlockUser);


module.exports = router;