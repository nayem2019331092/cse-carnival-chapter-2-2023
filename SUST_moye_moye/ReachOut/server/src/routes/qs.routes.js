import express from "express";
import pool from "../configs/pool.js";

const qsRouter = express.Router();

qsRouter.post("/create-qs", async (req, res) => {
  const { question_text, option1, option2, option3, option4, chapter_id, correct } = req.body;

  try {
    const query = `
    INSERT INTO questions (question_text, option1, option2, option3, option4, correct, chapter_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING question_id`;

  const values = [
    question_text,
    option1,
    option2,
    option3,
    option4,
    correct,
    chapter_id,
  ];

  pool.query(query, values)

  return res.status(200);

  } catch (error) {
    console.error("Error creating question and options:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

qsRouter.post("/fetch-questions", async (req, res) => {
  const { chapter_id } = req.body;

//   console.log(chapter_id);

  try {
    const client = await pool.connect();

    // Fetch questions and options for the specified chapter
    const fetchQuestionsQuery = `
      SELECT * FROM questions WHERE chapter_id = $1
    `;

    const questions = await client.query(fetchQuestionsQuery, [
      chapter_id,
    ]);

    return res.status(200).json({ questions : questions.rows });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default qsRouter;
