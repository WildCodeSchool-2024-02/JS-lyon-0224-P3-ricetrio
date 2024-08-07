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
  trailer_url VARCHAR(155) NOT NULL,
  freemium BOOLEAN NOT NULL,
  background_img VARCHAR(155) NOT NULL
);

CREATE TABLE user(
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  pseudo VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  hashed_password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user'
);

CREATE TABLE favorite(
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  film_id INT UNSIGNED NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (film_id) REFERENCES film(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE request(
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  request TEXT NOT NULL
);