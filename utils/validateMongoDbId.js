const mongoose = require('mongoose');
const validateMongoDbId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new Error('The Id is not found!');
};

module.exports = { validateMongoDbId };