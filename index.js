const express = require('express');
const { default: User } = require('./models/user.model.js');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');



dotenv.config();

const userRoutes = require('./routes/user.route.js');
const urlRoutes = require('./routes/url.router.js');
const staticRoutes = require('./routes/static.router.js');
const authRouter = require('./routes/auth.router.js')

const { connectDB } = require('./db/connection.js');
const URL = require('./models/url.model.js');
const { restrictedToLoggedInUserOnly } = require('./middlewares/auth.middleware.js');


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// middlewares for cors
app.use(cors({
    origin: 'http://localhost:5174' || 'http://localhost:5174',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
// ejs
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

connectDB(DB_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// ejs example
// app.get('/home', async (req, res) => {
//     try {
//         const allUrls = await URL.find({});
//         console.log(allUrls);

//         return res.render('home', {
//             urls: allUrls
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('Internal Server Error');
//     }
// });


// use routes
app.use('/api/user', userRoutes);
app.use('/url', restrictedToLoggedInUserOnly, urlRoutes);
// static routes 
app.use('/', staticRoutes);

// auth router
app.use('/auth', authRouter);

// server check 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});