const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {sendEmailHandler} = require("../utils/sendMail.js");


const UserModel = require("../models/user");

const userRegistration = async (req, res) => {

    // 1. Generate Salt
    // 2. Generate hash using salt
   
  const newUser = new UserModel({
    ...req.body,
  });

  await newUser.save();
  res.json({
    success: true,
    message: "User successfully registered, please login to continue",
  });
};

const userLogin = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.json({
      success: false,
      message: "Invalid username or password",
    });
  }

  const isPasswordCorrect = bcrypt.compareSync(
    req.body.password,
    user.password
  );

  const expiryDateTime = Math.floor(new Date().getTime() / 1000) + 7200; // 2 hr from now

  if (isPasswordCorrect) {
    const payload = {
      id: user._id,
      name: user.firstname,
      role: user.role,
      exp: expiryDateTime,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    return res.json({
      success: true,
      message: "Logged in successfully",
      token,
    });
  }
  res.json({
    success: false,
    message: "Invalid username or password",
  });
};

const userLogout = async (req, res) => {
  res.json({
    success: true,
    message: "Dummy Logout API",
  });
};

const addProductToWishlist = async (req, res) => {
  // console.log()
  const updateObject = {
    $push: {
      wishlist: req.body.productId,
    },
  };
  await UserModel.findByIdAndUpdate(req.user._id, updateObject);
  res.json({
    success: true,
    message: "Product added to wishlist",
  });
};

const getUserWishlist = async (req, res) => {
  const user = await UserModel.findById(req.user._id, "wishlist").populate(
    "wishlist",
    "title price"
  );
  res.json({
    success: true,
    result: user,
  });
};

const saveUserAddress = async (req, res) => {
  const address = req.body;
  const setObject = {};

  if (address.address) {
    setObject["address.address"] = address.address;
  }

  if (address.city) {
    setObject["address.city"] = address.city;
  }

  if (address.state) {
    setObject["address.state"] = address.state;
  }

  if (address.pincode) {
    setObject["address.pincode"] = address.pincode;
  }

  const updateObject = {
    $set: setObject,
  };

  const updateResult = await UserModel.findByIdAndUpdate(
    req.user._id,
    updateObject
  );
  console.log(updateResult);
  res.json({
    success: true,
    message: "Dummy Save address API",
  });
};
const forgotPassword = async (req,res)=>{
  const email = req.body.email;
  const user = await UserModel.findOne({email: req.body.email});
  if(!user){
return res.status(404).json({
success : false,
message:"user not found",
});
}else{
  const resetPasswordLink = `http://localhost:10000/api/v1/user/reset-password/${email}`;
try {
  await sendEmailHandler(email,"forgot Password",`here is the link to reset the password ${resetPasswordLink}`);
  res.status(200).json({
      message:"email is sent to reset password"});
} catch (error) {
  return res.status(500).json({message:"we are facing issue while sending email"})
}

}
}
const resetPassword = async (req, res) => {
  const userEmail = req.params.email;
  const newPassword = req.body.password;

  try {
      const user = await UserModel.findOne({ email: userEmail });
      if (!user) {
          return res.status(404).json({
              success: false,
              message: "User not found",
          });
      }

      // Update user's password
      user.password = newPassword;
      await user.save();

      return res.status(200).json({
          success: true,
          message: "Password reset successfully",
      });
  } catch (error) {
      console.error("Error resetting password:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
};

const controllers = {
  userRegistration,
  userLogin,
  userLogout,
  addProductToWishlist,
  getUserWishlist,
  saveUserAddress,
  forgotPassword,
  resetPassword,
};

module.exports = controllers;
