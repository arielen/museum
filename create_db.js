const mysql = require("mysql");

// Create connection to MySQL server (not to any specific database yet)
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",  // Assumes you have root access; change if needed
  password: "rootpassword"  // Replace with the root password or any admin password
});

connection.connect(err => {
  if (err) {
    console.error("Ошибка подключения к MySQL серверу: " + err.message);
    return;
  }
  console.log("Подключение к MySQL серверу успешно установлено");

  // Create database
  connection.query("CREATE DATABASE IF NOT EXISTS museum", err => {
    if (err) {
      console.error("Ошибка создания базы данных: " + err.message);
      return;
    }
    console.log("База данных museum успешно создана");

    // Create user and grant privileges
    connection.query(`
      CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'userpassword';
      GRANT ALL PRIVILEGES ON museum.* TO 'user'@'localhost';
      FLUSH PRIVILEGES;
    `, err => {
      if (err) {
        console.error("Ошибка создания пользователя или назначения привилегий: " + err.message);
        return;
      }
      console.log("Пользователь создан и привилегии назначены");

      // Connect to the newly created database
      const dbConnection = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "userpassword",
        database: "museum"
      });

      dbConnection.connect(err => {
        if (err) {
          console.error("Ошибка подключения к базе данных museum: " + err.message);
          return;
        }
        console.log("Подключение к базе данных museum успешно установлено");

        // Create table
        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS exhibits (
            id INT(11) NOT NULL AUTO_INCREMENT,
            title VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            model VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
          )
        `;
        dbConnection.query(createTableQuery, err => {
          if (err) {
            console.error("Ошибка создания таблицы: " + err.message);
            return;
          }
          console.log("Таблица exhibits успешно создана");

          // Close the database connection
          dbConnection.end(err => {
            if (err) {
              console.error("Ошибка при закрытии соединения: " + err.message);
            } else {
              console.log("Подключение к базе данных закрыто");
            }
          });
        });
      });
    });
  });
});
