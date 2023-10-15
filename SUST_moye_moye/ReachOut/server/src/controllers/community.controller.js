import pool from "../configs/pool.js";

const getPosts = async (req, res, next) => {
    try {
      const { id } = req.body;
      console.log(id);
      const { rows: posts } = await pool.query(
        "SELECT * FROM post WHERE sub_id = $1",
        [id]
      );
      return res.status(200).json({ status: "success", posts });
    } catch (error) {
      next(error);
    }
  };

  export {getPosts};