const express = require("express")
const {handleGetAllUsers, handleGetUserById, handleDeleteUserById, handleUpdateUserById, handleCreateNewUser} = require("../controllers/user.controller")
const router = express.Router()

router
  .route("/")
  .get(handleGetAllUsers)
  .post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .delete(handleDeleteUserById)
  .patch(handleUpdateUserById);


module.exports = router;