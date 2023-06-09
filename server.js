const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the port specified in the environment variable PORT or fallback to 3000

const dotenv = require('dotenv').config();

const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute');
const categoryRouter = require('./routes/categoryRoute');
const subCategoryRouter = require('./routes/subcatRoute');
const couponRouter = require('./routes/couponRoute');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const { notFound } = require('./middlewares/notFound');
const { errorHandler } = require('./middlewares/errorHandler');

const dbConnect = require('./config/dbConnect');
dbConnect();

const bodyParser = require('body-parser');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user/', authRouter);
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);
app.use('/api/sub-category', subCategoryRouter);
app.use('/api/coupon', couponRouter);


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});