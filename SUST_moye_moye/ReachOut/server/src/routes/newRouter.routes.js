import express from "express";
import pool from "../configs/pool.js";
import multer from "multer";
import path from "path";
import { log } from "console";

const newRouter = express.Router();

const storage = multer.diskStorage({
    destination: "D://SUST_moye_moye//ReachOut//client//src//assets",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
});

// newRouter.post("",async (req, res, next) => {

// });

newRouter.post("/newdoubt", async (req, res, next) => {
    try {
        const { sub_id, user_id, title, description, fileName } = req.body;

        // Insert a new record into the "post" table
        const query = `
        INSERT INTO post (sub_id, user_id, text_description, image, post_title)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;`;

        const values = [sub_id, user_id, description, fileName, title];

        // Execute the SQL query to insert the new record
        const { rows: insertedPost } = await pool.query(query, values);

        res.status(201).json({ status: "success", post: insertedPost[0] });
    } catch (error) {
        next(error);
    }
});

newRouter.post("/bookexpert", async (req, res, next) => {
    try {
        const { number, socialMedia, duration, subject, chapter, selectedDate, selectedTime, student_id } = req.body;
        console.log(student_id);

        // Insert a new record into the "book" table
        const query = `
        INSERT INTO book (number, socialmedia, duration, subject, chapter, selecteddate, selectedtime, student_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;`;

        const values = [number, socialMedia, duration, subject, chapter, selectedDate, selectedTime, student_id];

        // Execute the SQL query to insert the new record
        const { rows: insertedBook } = await pool.query(query, values);

        res.status(201).json({ status: "success", book: insertedBook[0] });
    } catch (error) {
        next(error);
    }
});


newRouter.get('/bookings', async (req, res, next) => {
    try {
        // Retrieve booking records with available = true from the "book" table
        const { rows: bookings } = await pool.query('SELECT * FROM book WHERE available = true');

        res.status(200).json({ status: 'success', bookings });
    } catch (error) {
        next(error);
    }
});


newRouter.post('/accepted', async (req, res, next) => {
    try {
        const { id } = req.body; // Use req.query to get the id from the query parameters

        // Retrieve booking records with available = true and expert_id matching the provided id
        const query = {
            text: 'SELECT * FROM book WHERE expert_id = $1',
            values: [id],
        };

        const { rows: bookings } = await pool.query(query);

        res.status(200).json({ status: 'success', bookings });
    } catch (error) {
        next(error);
    }
});

newRouter.post('/accept', async (req, res, next) => {
    try {
        const { book_id, expert_id } = req.body;

        // Update the booking record in the database
        const query = {
            text: 'UPDATE book SET available = false, expert_id = $1 WHERE id = $2',
            values: [expert_id, book_id],
        };

        await pool.query(query);

        res.status(200).json({ status: 'success', message: 'Booking accepted successfully' });
    } catch (error) {
        next(error);
    }
});

newRouter.post('/pay', async (req, res, next) => {
    try {
        const { book_id } = req.body;

        // Use a SQL query to update the 'paid' field to true
        const queryString = 'UPDATE book SET paid = true WHERE id = $1';
        await pool.query(queryString, [book_id]);

        res.status(200).json({ status: 'success', message: 'Payment status updated' });
    } catch (error) {
        next(error);
    }
});


newRouter.post('/mybookings', async (req, res, next) => {
    try {
        const { student_id } = req.body;
        console.log(student_id);

        // Use a SQL query to retrieve bookings where student_id matches
        const queryString = 'SELECT * FROM book WHERE student_id = $1';
        const { rows: bookings } = await pool.query(queryString, [student_id]);

        res.status(200).json({ status: 'success', bookings });
    } catch (error) {
        next(error);
    }
});





newRouter.post("/comments", async (req, res, next) => {
    try {
        const { post_id } = req.body;

        console.log(post_id);

        // Select all comments based on post_id from the "comment" table
        const query = `
        SELECT * FROM comment
        WHERE post_id = $1;`;

        const values = [post_id];

        // Execute the SQL query to fetch comments for the specified post_id
        const { rows: comments } = await pool.query(query, values);

        res.status(200).json({ status: "success", comments });
    } catch (error) {
        next(error);
    }
});

newRouter.post("/newcomment", async (req, res, next) => {
    try {
        const { post_id, comment_txt, comment_img, user_id } = req.body;

        // Insert a new record into the "comment" table
        const query = `
        INSERT INTO comment (post_id, comment_txt, comment_img, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`;

        const values = [post_id, comment_txt, comment_img, user_id];

        // Execute the SQL query to insert the new comment
        const { rows: insertedComment } = await pool.query(query, values);

        res.status(201).json({ status: "success", comment: insertedComment[0] });
    } catch (error) {
        next(error);
    }
});



newRouter.get("/images/:filename", async (req, res) => {
    const { filename } = req.params;
    const filePath = `D:/SUST_moye_moye/ReachOut/server/uploads/${filename}`;
    console.log(filePath)

    try {
        const fileContent = await fs.readFile(filePath);

        // Determine the content type based on the file extension (for example, assuming JPEG)
        const contentType = "image/jpeg";

        res.setHeader("Content-Type", contentType);
        res.send(fileContent);
    } catch (error) {
        res.status(404).send("Image not found");
    }
});


newRouter.post("/upload", upload.single("file"), (req, res) => {
    // console.log(req);
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    const filename = req.file.filename;
    return res.json(filename);
});

export default newRouter;