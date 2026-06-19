const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//config env
dotenv.config();

//database connection
connectDB();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//importing routes
app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/getuser', require('./routes/userRoutes'));
app.use('/api/v1/products', require('./routes/productRoutes'));

app.get('/', (req, res) => {
    return res.status(200).send('<h1>Welcome to farm basket !</h1>');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(` node Server is running on port ${PORT}`);
});
