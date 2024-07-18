CREATE DATABASE museum;
CREATE USER 'user'@'localhost' IDENTIFIED BY 'userpassword';
GRANT ALL PRIVILEGES ON museum.* TO 'user'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE exhibits (
    id int(11) NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    image varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    model varchar(255) NOT NULL,
    PRIMARY KEY (id)
)