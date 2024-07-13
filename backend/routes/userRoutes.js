const express = require("express")
const { registerUser, loginUser, logoutUser, loggedInStatus } = require("../controllers/user")
const { ensureAuthenticated } = require("../utils/auth")
const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser)
router.get("/status",ensureAuthenticated, loggedInStatus)

module.exports = router