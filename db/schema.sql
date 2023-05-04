DROP DATABASE IF EXISTS tech_blog_db;

CREATE DATABASE tech_blog_db;
USE tech_blog_db;

CREATE TABLE User (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE Post (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) 
  REFERENCES User(id)
);

CREATE TABLE Comment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  FOREIGN KEY (user_id) 
  REFERENCES User(id),
  FOREIGN KEY (post_id) 
  REFERENCES Post(id)
); 