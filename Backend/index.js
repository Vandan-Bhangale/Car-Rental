const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongodbStore = require("connect-mongodb-session")(session);
const userRoutes = require("./Routes/userRoute");
const carRoutes = require("./Routes/CarRoutes");
const BoookingRoutes = require("./Routes/BookingRoutes");
const authRoutes = require("./Routes/authRoutes");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());
const URI = process.env.MONGODB_URI;

app.use("/images", express.static("public/images"));

const store = new mongodbStore({
  uri: URI,
  collection: "sessions",
});

const isProduction = process.env.NODE_ENV === "production"

if(isProduction) {
  app.set("trust proxy", 1); // trust first proxy
}

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000
  },
  store
}));

app.use("/api",authRoutes)
app.use("/api", userRoutes);
app.use("/api", carRoutes);
app.use("/api", BoookingRoutes);

const PORT = 3001;

mongoose
  .connect(URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connected successfully");
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
