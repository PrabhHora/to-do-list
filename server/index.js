import express from "express";
import cors from "cors";
import pg from "pg";
import env from "dotenv";

const app = express();
const PORT = 4000;
env.config();

app.use(cors());
app.use(express.json());

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});
db.connect();

app.get("/", async (req, res) => {
    const result = await db.query("SELECT * FROM items ORDER BY id");
    res.json(result.rows);
});

app.post("/add", async (req, res) => {
    await db.query("INSERT INTO items (item) VALUES ($1)", [req.body.text]);
    res.redirect(303, "/");
});

app.delete("/delete/:id", async (req, res) => {
    await db.query("DELETE FROM items WHERE id = $1", [req.params.id]);
    res.redirect(303, "/");
});

app.patch("/edit/:id", async (req, res) => {
    await db.query("UPDATE items SET item = $1 WHERE id = $2", [req.body.text, req.params.id]);
    res.redirect(303, "/");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});