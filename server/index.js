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

app.get("/transactions/categories", (req, res) => {
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
  const query = "INSERT INTO transaction (user_id, schedule, category_id) VALUES (?, ?, ?)";
  db.query(query, [user_id, schedule, category_id], (error, results) => {
    if (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "Error inserting data" });
    }

    res.status(200).json({ message: "data inserted successfuly" });
  });
});

app.get("/transactions/:id", (req, res) => {
  const { id } = req.params;

  const query =
    "SELECT transaction.id, transaction.schedule, transaction_category.name, status.type FROM user LEFT JOIN transaction ON transaction.user_id = user.id LEFT JOIN transaction_category ON transaction_category.id = transaction.category_id LEFT JOIN status ON transaction.status_id = status.id WHERE user.id = ?";

  db.query(query, [id], (error, results) => {
    if (error) {
      console.log("No data found", error);
    }
    res.json(results);
  });
});

const PORT = 8001;
app.listen(PORT, console.log("Listening to PORT", PORT));
