const { createUser, getUserById, getUsers, updateUser, deleteUser,login } = require("./user.controller");
const router = require("express").Router();

// call the middleware function
const { authToken } = require("../../auth/token_validator");

router.post("/", authToken, createUser);
router.get("/", authToken, getUsers);
router.get("/:id", authToken, getUserById);
router.patch("/", authToken, updateUser);
router.delete("/", authToken, deleteUser);
router.post("/login", login);

module.exports = router;

