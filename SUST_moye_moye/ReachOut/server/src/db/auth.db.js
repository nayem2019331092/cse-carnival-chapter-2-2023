import pool from "../configs/pool.js";
import { ErrorHandler } from "../middlewares/errorHandler.js";

const registerUserDB = async (name, email, password, gender, userType) => {
  try {
    const { rows: user } = await pool.query(
      "INSERT INTO users (name, email, password, user_type, gender) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, password, userType, gender]
    );
    return user[0];
  } catch (error) {
    throw new ErrorHandler(500, "An error occurred");
  }
};

export { registerUserDB };
