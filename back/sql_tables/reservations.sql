CREATE TABLE reservations(
     id VARCHAR(36) PRIMARY KEY,
    `date` DATE NOT NULL,
    room_number INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    nb_adult INT NOT NULL,
    type VARCHAR(100) NOT NULL,
    date_start DATE NOT NULL, 
    date_end DATE NOT NULL
)ENGINE=InnoDB;