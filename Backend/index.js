const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./Routes/userRoute');

const app = express();

app.use(cors({origin: process.env.CORS_ORIGIN, credentials:true}));
app.use(express.json());
const URI = process.env.MONGODB_URI;

app.use('/api',userRoutes)

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
