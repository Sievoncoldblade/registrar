import express from "express";
import mysql from "mysql";

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

app.get("/", (req, res) => {
  res.json({ lol: "happy" });
});

app.get("/transaction/categories", (req, res) => {
  const query = "SELECT * FROM transaction_category";

  db.query(query, (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
});

const PORT = 8001;
app.listen(PORT, console.log("Listening to PORT", PORT));
