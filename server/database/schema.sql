create table video (
  id int unsigned primary key auto_increment not null,
  poster varchar(255) not null
);

CREATE TABLE film (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(155) NOT NULL,
  genre VARCHAR(155) NOT NULL,
  release_date DATE NOT NULL,
  synopsis TEXT NOT NULL,
  poster VARCHAR(155) NOT NULL,
  `key` VARCHAR(80) NOT NULL,
  url VARCHAR(155) NOT NULL,
  video_id INT UNSIGNED,
);