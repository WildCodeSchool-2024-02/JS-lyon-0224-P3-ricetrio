create table video (
  id int unsigned primary key auto_increment not null,
  poster varchar(255) not null
);

CREATE TABLE film (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  movie_key INT NOT NULL,
  title VARCHAR(155) NOT NULL,
  genre VARCHAR(155) NOT NULL,
  duration INT NOT NULL,
  release_date DATE NOT NULL,
  overview TEXT NOT NULL,
  movie_director VARCHAR(100) NOT NULL,
  poster_link VARCHAR(155) NOT NULL,
  key_trailer VARCHAR(80) NOT NULL,
  trailer_url VARCHAR(155) NOT NULL
);

CREATE TABLE user(
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  pseudo VARCHAR(30) NOT NULL,
  email VARCHAR(30) NOT NULL,
  password  VARCHAR(20) NOT NULL
);