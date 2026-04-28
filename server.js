const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const db = new sqlite3.Database("./business.db");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve your static HTML/JS files
app.use(express.static(path.join(__dirname)));

// Route: handle form submission
app.post("/submit", (req, res) => {
  const { company_name, email, cell, order_number, package } = req.body;

  db.run(
    "INSERT INTO customers (company_name, email, cell, order_number) VALUES (?,?,?,?)",
    [company_name, email, cell, order_number],
    function (err) {
      if (err) return res.status(500).send(err.message);

      const customerId = this.lastID;
      db.run(
        "INSERT INTO orders (customer_id, package) VALUES (?,?)",
        [customerId, package],
        (err2) => {
          if (err2) return res.status(500).send(err2.message);
          res.send("Order submitted successfully!");
        }
      );
    }
  );
});

// Route: dashboard counts
app.get("/dashboard", (req, res) => {
  db.all("SELECT package, COUNT(*) as count FROM orders GROUP BY package", [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
