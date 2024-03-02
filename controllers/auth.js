import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import { sendMail } from "./mailer.js";


const secret = "aTWbeQsdwdevd122421jhjgngh@#@!#$awwqQe";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  // validate
  if (!username || !email || !password) {
    return res.json({
      success: false,
      message: "please fill all the fields",
    });
  }
  if (password.length < 6) {
    return res.json({
      success: false,
      message: "password must be at least 6 characters",
    });
  }

  const existUsername = await User.findOne({ username });
  const existEmail = await User.findOne({ email });

  if (existUsername) {
    return res.json({
      success: false,
      message: "the username already exists",
    });
  }

  if (existEmail) {
    return res.json({
      success: false,
      message: "the email already exists, try with different email",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashPassword });

  if (user) {
    res.json({
      success: true,
      message: "Registration successful",
    });
  } else {
    res.json({
      success: false,
      message: "Registration failed",
    });
  }
};

// =================== Starting Login ==================

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "please fill all the fields",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      success: false,
      message: "this user is not exist",
    });
  }
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (user && passwordIsCorrect) {
    jwt.sign(
      {
        email,
        id: user._id,
        role: user.role,
        username: user.username,
        image: user.image,
        createdAt: user.createdAt,
      },
      secret,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({
          success: true,
          message: "Login successful",
          email: user.email,
          id: user._id,
          role: user.role,
          username: user.username,
          image: user.image,
          createdAt: user.createdAt,
        });
      }
    );
  } else {
    res.json({
      success: false,
      message: "Invalid password or email",
    });
  }
};
// =================== Ending Login ==================

// =================== Starting Check Authentication ==================

export const Profile = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });

    next();
  } catch (err) {
    console.log(err);
  }
};

// =================== End Check Authentication ==================

// =================== Starting Logout =========================

export const Logout = async (req, res) => {
  res.cookie("token", "", { maxAge: 0 }).json({
    success: true,
    massage: "Logout successful",
  });
};

// =================== Ending Logout =========================

// =================== Starting updatedUser =========================

export const updatedUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate({ _id: id }, req.body , {
    new: true,
  });

  if (user) {
    return res.json({
      success: true,
      message: "the user was updated",
    });
  }
  if (!user) {
    return res.json({
      success: false,
      message: "No doctor found with this ID",
    });
  }
};
// =================== Ending updatedUser =========================

// =================== Starting updatedPassword =========================

export const updatedPassword = async (req, res) => {
  const { id } = req.params;
  const { newPassword, oldPassword } = req.body;
  const user = await User.findById(id);
  if (!user) {
    return res.json({
      success: false,
      message: "this user is not exist",
    });
  }


  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  if (passwordIsCorrect) {
  const hashPassword = await bcrypt.hash(newPassword, 10);
  
    const userUpdate = await User.findByIdAndUpdate(
      { _id: id },
      { password: hashPassword },
      { new: true }
    );
    if (userUpdate) {
      return res.json({
        success: true,
        message: "the password was updated",
      });
    }
  }
  else {
    return res.json({
      success: false,
      message: "the currunt password is invalid",
    });
  }
};
// =================== Ending updatedPassword =========================

export const SingleUser = async (req, res) => {
  const {id} = req.params;

  const extractUser = await User.findById(id);

  if (extractUser) {
    return res.json({
      success: true,
      data: extractUser,
    });
  } else {
    return res.json({
      success: false,
      message: "No found blog",
    });
  }
}
// =================== Starting deleteUser =========================

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (user) {
    return res.json({
      success: true,
      message: "the user was deleted",
    });
  }
  if (!user) {
    return res.json({
      success: false,
      message: "No user found with this ID",
    });
  }
};
// =================== Ending deleteUser =========================

// =================== Starting allUser =========================

export const allUser = async (req, res) => {
  const page = req.query.page - 1 || 0;
  const limit = req.query.limit || 9;
  const userCount = await User.countDocuments();
  const extractAllUser = await User.find()
    .skip(page * limit)
    .limit(limit);

  const pageCount = parseInt(userCount / limit);

  if (extractAllUser) {
    return res.json({
      success: true,
      userCount,
      page: page + 1,
      pageCount: pageCount + 1,
      data: extractAllUser,
    });
  } else {
    return res.json({
      success: false,
      message: "No found user",
    });
  }
};
// =================== Ending allUser =========================

// =================== Starting generateOTP =========================

export async function generateOTP(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.json({
      success: false,
      message: "please fill all the fields",
    });
  }
  const user = await User.findOne({ email });

  if (user) {
    req.app.locals.OTP = await otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    res.json({
      success: true,
      message: "generateOTP Successsfully",
      code: req.app.locals.OTP,
      id: user._id,
    });
    
  }
  if (!user) {
    return res.json({
      success: false,
      message: "this user is not exist",
    });
  }
}
// =================== Ending generateOTP =========================

// =================== Starting verifyOTP =========================

export async function verifyOTP(req, res) {
  const { code } = req.body;
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // reset the OTP value
    req.app.locals.resetSession = true; // start session for reset password
    return res.json({
      success: true,
      message: "Verify Successsfully!",
      id: user._id,
    });
  }
  return res.status(400).send({ error: "Invalid OTP" });
}
// =================== Ending verifyOTP =========================

// =================== Starting createResetSession =========================

// export async function createResetSession(req, res) {
//   if (req.app.locals.resetSession) {
//     return res.send({ flag: req.app.locals.resetSession });
//   }
//   return res.status(440).send({ error: "Session expired!" });
// }

// =================== Ending createResetSession =========================

// =================== Starting resetPassword =========================

export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession)
      return res.send({ error: "Session expired!" });
    const { id } = req.params;
    const { password } = req.body;
    try {
      const found = await User.findOne({ _id: id });
      if (found) {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.updateOne(
          {
            _id: id,
          },
          {
            $set: {
              password: hashPassword,
            },
          }
        );
        if (user) {
          req.app.locals.resetSession = false; // reset session
          return res.json({
            success: true,
            message: "Record Updated...!",
          });
        }
        if (!user) {
          return res.status(400).send({ msg: "something wrong...!" });
        }
      }
      if (!found) {
        return res
          .status(400)
          .send({ msg: "something wrong...! (this id is wrong)" });
      }
    } catch (error) {
      return res.status(500).send({ error });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}

// =================== Ending resetPassword =========================
