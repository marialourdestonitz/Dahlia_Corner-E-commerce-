const { generateToken } = require('../config/jwToken.js');
const { validateMongoDbId } = require('../utils/validateMongoDBId.js');
const { generateRereshToken } = require('../config/refreshToken')
const User = require('../models/userModel.js');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');


//create User
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        //create new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        //user already exist
        throw new Error('User already Exists')
    }
});
//login User
const loginUserController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check user if exisst or not
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRereshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(
            findUser.id,
            {
                refreshToken: refreshToken,
            },
            {
                new: true,
            }
        );
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            token: generateToken(findUser?._id),
        });
    } else {
        throw new Error('Invalid Credentials');
    }
});



//handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error('No Refresh Token In Cookies!');
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error('No Refresh Token in Database or ID not matched!')
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error('Theres is something wrong with Refresh Token');
        }
        const accessToken = generateToken(user?._id)
        res.json({ accessToken });
    });
});

//logout user
const logOut = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error('No Refresh Token In Cookies!');
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204);//forbidden
    }
    await User.findOneAndUpdate(refreshToken, {
        refreshToken: '',
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
    });
    return res.sendStatus(204);//forbidden
});

//update a USer
const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
        },
            {
                new: true
            }
        );
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error);
    }
});

//get all User

const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getAllUsers = await User.find();
        res.json(getAllUsers);
    } catch (error) {
        throw new Error(error);
    }
});

const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getUsers = await User.findById(id);
        res.json({
            getUsers,
        })
    } catch (error) {
        throw new Error(error);
    }

});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteUsers = await User.findByIdAndDelete(id);
        res.json({
            deleteUsers,
        })
    } catch (error) {
        throw new Error(error);
    }

});

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const block = await User.findByIdAndUpdate(id, {
            isBlocked: true,
        },
            {
                new: true,
            }
        );
        res.json({
            message: 'User Blocked!'
        });
    } catch (error) {
        throw new Error(error);
    }
});

const unBlockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const unblock = await User.findByIdAndUpdate(id, {
            isBlocked: false,
        },
            {
                new: true,
            }
        );
        res.json({
            message: 'User Unblocked!'
        });
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = {
    createUser,
    loginUserController,
    getAllUser,
    getUser,
    deleteUser,
    updateUser,
    blockUser,
    unBlockUser,
    handleRefreshToken,
    logOut
};