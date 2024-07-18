const mysql = require("mysql");
const fs = require("fs");

// Подключение к базе данных
const connection = mysql.createConnection({
  host: "localhost",
  user: "user",
  database: "museum",
  password: "userpassword"
});

// Чтение JSON файла
const data = JSON.parse(fs.readFileSync("data.json", "utf8"));

connection.connect(err => {
  if (err) {
    return console.error("Ошибка: " + err.message);
  }
  console.log("Подключение к базе данных успешно установлено");

  // Заполнение таблицы данными из JSON
  data.exhibits.forEach(exhibit => {
    const query = "INSERT INTO exhibits (id, title, image, description, model) VALUES (?, ?, ?, ?, ?)";
    const values = [exhibit.id, exhibit.title, exhibit.image, exhibit.description, exhibit.model];

    connection.query(query, values, (err, result) => {
      if (err) {
        return console.error("Ошибка вставки данных: " + err.message);
      }
      console.log(`Данные вставлены, ID: ${exhibit.id}`);
    });
  });

  // Закрытие соединения после завершения
  connection.end(err => {
    if (err) {
      return console.log("Ошибка при закрытии соединения: " + err.message);
    }
    console.log("Подключение закрыто");
  });
});
