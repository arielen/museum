let mysql = require("mysql");
let express = require("express");
const path = require('path');

const app = express();

var cors = require("cors");
// app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));
let db = null;

const connection = mysql.createConnection({
  host: "localhost",
  user: "user",
  database: "museum",
  password: "userpassword",
});

connection.connect(function (err) {
  if (err) {
    return console.error("Ошибка: " + err.message);
  }
  app.listen(3000, function () {
    console.log("API Запущен");
  });
});

connection.query("SELECT * FROM exhibits", (err, result) => {
  if (err) {
    return console.error("Ошибка: " + err.message);
  }
  db = JSON.stringify(result);
});

app.get("/exhibits", (req, res) => {
  res.send(db);
});

connection.end(function (err) {
  if (err) {
    return console.log("Ошибка: " + err.message);
  }
  console.log("Подключение закрыто");
});
