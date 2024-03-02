import express  from "express";
import {Logout, Profile, allUser, login, register,deleteUser, generateOTP, verifyOTP, resetPassword, updatedPassword, updatedUser, SingleUser} from "../controllers/auth.js";
import { localVariables } from '../middleware/auth.js';
import { sendMail } from '../controllers/mailer.js'

const router = express.Router();

router.post("/register", register) // register user

router.post('/sendMail', sendMail); // send the email

router.post("/login",login) // login user

router.post("/logout", Logout)// logout user

router.get('/generateOTP',localVariables,generateOTP) // generate random OTP

router.get('/verifyOTP/:id',verifyOTP) // verify generated OTP

router.get('/single-user/:id', SingleUser) 

// router.get('/createResetSession',createResetSession) // reset all the variables

router.get("/profile",Profile) // verify auth user

router.get("/all-users", allUser) // get all user

router.patch('/resetPassword/:id',resetPassword); // use to reset password

router.patch('/update-password/:id',updatedPassword); // use to update password

router.patch('/update-user/:id',updatedUser); // use to update user 

router.delete("/delete-user/:id", deleteUser) // use to delete user 

export default router;