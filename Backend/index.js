const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongodbStore = require('connect-mongodb-session')(session);
const userRoutes = require('./Routes/userRoute');
const carRoutes = require('./Routes/CarRoutes');
const BoookingRoutes = require('./Routes/BookingRoutes');

const app = express();

app.use(cors({origin: process.env.CORS_ORIGIN, credentials:true}));
app.use(express.json());
app.use(cookieParser());
const URI = process.env.MONGODB_URI;

const store = new mongodbStore({
    uri: URI,
    collection: 'sessions'
});

app.use('/uploads', express.static('uploads'));
// app.set("trust proxy", 1);  // trust first proxy (Render/Heroku/etc.)

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

// This session is for deployed version on render and vercel
// app.use(session({
//   secret: process.env.SESSION_SECRET,  
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,
//     secure: true,       
//     sameSite: "none",  
//     maxAge: 24 * 60 * 60 * 1000 
//   },
//   store
// }));

app.use('/api',userRoutes)
app.use('/api',carRoutes)
app.use('/api',BoookingRoutes)

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
