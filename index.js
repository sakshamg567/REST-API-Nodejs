const express = require("express");
const {} = require("./middlewares");
const { connectDB } = require("./connection");
const userRouter = require("./routes/user.router");
const app = express();

const PORT = 8000;

//Connect to DB
connectDB("mongodb://localhost:27017/userDB");

//Routes
app.use("/users", userRouter);


const User = mongoose.model("User", userSchema);

//Middleware
app.use(express.urlencoded({ extended: false }));

//ROUTES

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
