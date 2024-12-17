import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerController = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(404).json({ error: "all fields required" });
  }
  const hashedpassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      username,
      password: hashedpassword,
      email,
    });
    res.status(201).json({ message: "user created", newUser });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "Duplicate user, use different username or email" });
  }
};

export const loginController = async (req, res) => {
  console.log(req);
  const { username, password } = req.body;
  console.log("username:", username);
  if (!username || !password) {
    return res
      .status(404)
      .json({ error: "provide both username and password" });
  }
  const user = await User.findOne({ username });
  console.log(user);
  if (!user) return res.status(403).json({ error: "user not found" });
  const isPassword = await bcrypt.compare(password, user?.password);
  if (!user || !isPassword)
    return res.status(400).json({ error: "invalid username or password" });

  const token = jwt.sign({ id: user._id }, "my-todo-list-app", {
    expiresIn: "6m",
  });
  return res.status(200).json({ message: "login succesfully", token });
};

// exports.resetPassword = (req, res, next) => {};

// exports.updatePassword = catchAsync(async (req, res, next) => {});
