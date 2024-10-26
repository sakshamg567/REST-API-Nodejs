const User = require("../models/user.model");

async function handleGetAllUsers(req,res) {
    const allDBusers = await User.find({});
    return res.json(allDBusers);
}

async function handleGetUserById(req,res) {
    const user = await User.findById(req.params.id);
    return user ? res.json(user) : res.status(404).send("User not found");
}

async function handleDeleteUserById(req,res) {
    const user = await User.findById(req.params.id);
    return user ? res.json(user) : res.status(404).send("User not found");
}

async function handleUpdateUserById(req,res) {
    await User.findByIdAndUpdate(req.params.id, req.body);
    return res.send("User updated successfully");
}

async function handleCreateNewUser(re,res) {
    const body = req.body;
    if (
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.job_title ||
        !body.gender
    ) {
        return res.status(400).send("Please fill all the fields");
    }

    try {
        const result = await User.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            gender: body.gender,
            job_title: body.job_title,
      });
        return res.status(201).json({ message: "User created successfully", id: result._id });
    } catch (error) {
        if (error.code === 11000) {
        return res.status(400).json({ message: "Email already exists" });
        }
        return res.status(500).json({ message: "Server error", error });
    }
}

module.exports = { 
    handleGetAllUsers,
    handleGetUserById,
    handleDeleteUserById,
    handleUpdateUserById,
    handleCreateNewUser,
}