create table video (
  id int unsigned primary key auto_increment not null,
  poster varchar(255) not null
);

CREATE TABLE film (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  nom VARCHAR(155) NOT NULL,
  genre VARCHAR(155) NOT NULL,
  sortie DATE NOT NULL,
  synopsis TEXT NOT NULL,
  poster VARCHAR(155) NOT NULL,
  lien VARCHAR(80) NOT NULL,
  youtube VARCHAR(155) NOT NULL
);