const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

// creating the user
const handleSignup = async (req, res) => {
    const { name, email, password } = req.body;
    if (name && email && password) {
        const user = await UserModel.findOne({ email });
        if (user) return res.send({ msg: "User already exists!, please login", success: false });
        try {
            bcrypt.hash(password, 12, async (err, hash) => {
                if (err) {
                    console.error(err);
                } else {
                    const newUser = await UserModel.create({
                        name,
                        email,
                        password: hash
                    });
                    const token = jwt.sign({ email: newUser.email, id: newUser._id }, SECRET_KEY);
                    res.cookie('token', token);
                    return res.send({ msg: "user created successfully", success: true });
                }
            });

        } catch (error) {
            return res.send({ msg: "Internal server error", success: false });
        }
    }
    else {
        return res.send({ msg: "please fill all the fields" });
    }
}

// user login
const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const user = await UserModel.findOne({ email });
        if (!user) return res.send({ msg: "email does not exist", success: false });
        try {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY);
                    res.cookie('token', token);
                    return res.send({ msg: "logged in successfully", success: true });
                }
                else {
                    return res.send({ msg: "invalid email or password", success: false })
                }
            });
        } catch (error) {
            return res.send({ msg: "Internal server error", success: false });
        }
    }
    else {
        return res.send({ msg: "please fill email and password", success: false });
    }
}

//user logout
const handleLogout = (req, res) => {
    res.clearCookie("token", "");
    return res.send({ msg: "logged out successfully", success: true });
}


module.exports = {
    handleSignup,
    handleLogin,
    handleLogout
}