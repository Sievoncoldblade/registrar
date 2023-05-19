import express, { query } from "express";
import mysql from "mysql";
import bodyParser from "body-parser";

const app = express();
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0996724682",
  database: "pup_registrar",
});

// Add CORS headers middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Adjust the origin accordingly
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ lol: "happy" });
});

app.get("/transaction/categories", (req, res) => {
  const query = "SELECT * FROM transaction_category";

  db.query(query, (error, results) => {
    if (error) throw error;

    res.json(results);
  });
});

app.get("/user/:id", (req, res) => {
  const query = "SELECT * FROM user WHERE id = ?";
  db.query(query, req.params.id, (error, results) => {
    if (error) throw error;

    res.json(results);
  });
});

app.post("/transactions", (req, res) => {
  const { user_id, schedule, category_id } = req.body;
  console.log(req.body);
  const query = "INSERT INTO transaction (user_id, schedule, category_id) VALUES (?, ?, ?)";
  db.query(query, [user_id, schedule, category_id], (error, results) => {
    if (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "Error inserting data" });
    }

    res.status(200).json({ message: "data inserted successfuly" });
  });
});

const PORT = 8001;
app.listen(PORT, console.log("Listening to PORT", PORT));
