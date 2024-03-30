const UserModel = require("../models/user");
const userModels = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {sendEmailHandler} = require("../utils/sendMail.js");

const userRegister = async (req,res)=>{

    //1.generate salt 
    //2.generate hash using salt
  
    const newUser = new userModels({
        ...req.body,
    });

    await newUser.save();
    res.json({
    success :true,
    message:"User successfully registered, please login to continue"
});
};

const userLogin =  async (req,res)=>{
    const user = await UserModel.findOne({email: req.body.email});
    if(!user){
return res.json({
success : false,
message:"Invalid username or password",
});
    }
    // console.log(user.password);

   const isPasswordCorrect =  bcrypt.compareSync(req.body.password, user.password);

   const expiryDateTime = Math.floor(new Date().getTime() / 1000) + 7200; // 1 hr from now
//    console.log(isPasswordCorrect);
   if(isPasswordCorrect) {
    const payload = {
        id: user._id,
        name: user.firstname,
        role: user.role,
        exp: expiryDateTime,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

   return res.json({
        success :true,
        message:"Logged in successfully",
        token,
    });  
}
res.json({
    success : false,
    message:"Invalid username or password",
    });};

const userLogout = async (req,res)=>{
    res.json({
        success :true,
        message:"Dummy logout API"
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

// const changePassword = async (req, res) => {
//     try{
//     const tokenFromHeaders = req.headers.authorization.split(" ")[1];
//     const {email} = jwt.decode(tokenFromHeaders);
//     const user = await UserModel.findOne({email});
//     const newPassword = req.body.newPassword;
//     const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
//     if(isPasswordCorrect){
//         user.password = newPassword;
//         await user.save();
//     }else{
//         return res.status(403).json({
//          message:"Password is incorrect"
//         });
//     }
//     res.status(200).json({
//         message:"password is changed successfully"
//     })
// }catch(error){
//     console.log(error.message);
// res.status(500).json({
//     message:"internal server error please try after sometime"
// });
// }
// }
const controllers = {
    userRegister,
    userLogin,
    userLogout,
    forgotPassword,
    resetPassword,
    // changePassword
};


module.exports = controllers;