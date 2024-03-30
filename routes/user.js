const express = require('express');
const userControllers = require('../controllers/user');
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post('/register', userControllers.userRegister);
router.post('/login', userControllers.userLogin);
router.post('/logout', userControllers.userLogout);
router.post('/forgot-password', userControllers.forgotPassword);
// Add the email parameter to the reset-password route
router.post('/reset-password/:email', userControllers.resetPassword);
// router.post('/change-password', authMiddleware(["buyer","seller","buyer"]), userControllers.changePassword);



module.exports = router;
