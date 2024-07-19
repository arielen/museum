const mysql = require("mysql");
const express = require("express");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, '.')));

// Create MySQL connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || "127.0.0.1",
  user: process.env.MYSQL_USER || "user",
  database: process.env.MYSQL_DATABASE || "museum",
  password: process.env.MYSQL_PASSWORD || "userpassword"
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    process.exit(1);
  }
  console.log("Connected to MySQL");

  // Start the server only if the database connection is successful
  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
  });
});

let db = null;

// Fetch exhibits data from the database
function fetchExhibits() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM exhibits", (err, result) => {
      if (err) {
        reject("Error fetching exhibits: " + err.message);
      } else {
        resolve(JSON.stringify(result));
      }
    });
  });
}

// Endpoint to get exhibits data
app.get("/exhibits", async (req, res) => {
  if (!db) {
    try {
      db = await fetchExhibits();
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }
  res.send(db);
});

// Close MySQL connection gracefully on server shutdown
process.on('SIGINT', () => {
  connection.end(err => {
    if (err) {
      console.error("Error closing MySQL connection:", err.message);
    } else {
      console.log("MySQL connection closed");
    }
    process.exit(0);
  });
});
