const express = require('express');
const { handleSignup, handleLogin, handleLogout } = require('../controllers/user');
const authenticate = require('../middlewares/authenticateUser');
const router = express.Router();

//signup route
router.post("/signup", handleSignup)

//login route
router.post("/login",  handleLogin);

//logout route
router.get("/logout", handleLogout)

module.exports = router;