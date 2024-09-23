const express = require("express");

const { createUser, getUser } = require("../controllers/user");
const router = express.Router();

// To create a new user
router.post("/users", createUser);

// To get user
router.get("/users", getUser);

// Exporting the router
module.exports = router;
