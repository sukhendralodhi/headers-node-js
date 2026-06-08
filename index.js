const express = require('express');
const { default: User } = require('./models/user.model.js');
const dotenv = require('dotenv');
const cors = require('cors');



dotenv.config();

const userRoutes = require('./routes/user.route.js');
const urlRoutes = require('./routes/url.router.js');
const { connectDB } = require('./db/connection.js');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// middlewares for cors
app.use(cors({
    origin: 'http://localhost:5174' || 'http://localhost:5174',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

connectDB(DB_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


// use routes
app.use('/api/user', userRoutes);
app.use('/api/url', urlRoutes);

// server check 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});