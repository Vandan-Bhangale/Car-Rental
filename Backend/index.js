const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session')(session);
const userRoutes = require('./Routes/userRoute');
const carRoutes = require('./Routes/CarRoutes');

const app = express();

app.use(cors({origin: process.env.CORS_ORIGIN, credentials:true}));
app.use(express.json());
const URI = process.env.MONGODB_URI;

const store = new mongodbStore({
    uri: URI,
    collection: 'sessions'
});

app.use('/uploads', express.static('uploads'));


//Session for localhost
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        httpOnly: true,
        secure:false,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

app.use('/api',userRoutes)
app.use('/api',carRoutes)

const PORT = 3001;

mongoose.connect(URI)
.then(() => {
    app.listen(PORT,() => {
        console.log("Database connected successfully");
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}).catch((error) => {
    console.error("Database connection failed:", error);
});
