const express = require("express");
const { logReqRes } = require("./middlewares");
const connectDB  = require("./connection");
const userRouter = require("./routes/user.router");
const app = express();

const PORT = 8000;

//Connect to DB
connectDB("mongodb://localhost:27017/userDB");


//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Routes
app.use("/users", userRouter);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
