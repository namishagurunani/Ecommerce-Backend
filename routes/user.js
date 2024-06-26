const express = require("express");

const userController = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/register", userController.userRegistration);

router.post("/login", userController.userLogin);

router.post("/logout", userController.userLogout);

router.post(
  "/wishlist",
  authMiddleware(["admin", "seller", "buyer"]),
  userController.addProductToWishlist
);

router.get(
  "/wishlist",
  authMiddleware(["seller", "buyer", "admin"]),
  userController.getUserWishlist
);

router.post(
  "/address",
  authMiddleware(["seller", "buyer", "admin"]),
  userController.saveUserAddress
);
router.post('/forgot-password', userController.forgotPassword);
// Add the email parameter to the reset-password route
router.post('/reset-password/:email', userController.resetPassword);

module.exports = router;
