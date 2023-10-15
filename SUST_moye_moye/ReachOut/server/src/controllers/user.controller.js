import userService from "../services/user.service.js";
import pool from "../configs/pool.js";

const getUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    console.log(id);
    const { rows: posts } = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [id]
    );
    return res.status(200).json({ status: "success", posts });
  } catch (error) {
    next(error);
  }
};

// Profile endpoint
const getProfile = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { user_id, email, name } = await userService.decodeToken(token);
    return res.status(200).json({ status: "success", user_id, email, name });
  } catch (error) {
    next(error);
  }
};

// Login-status endpoint
const getLoginStatus = async (req, res) => {
  const { token } = req.cookies;
  const status = await userService.verifyToken(token);
  return res.json(status);
};

export { getProfile, getLoginStatus, getUser };
