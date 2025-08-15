CREATE TABLE consommations(
         id VARCHAR(36) PRIMARY KEY,
         reservation_id VARCHAR(36),
         name varchar(100) NOT NULL,
         FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE CASCADE
)ENGINE=InnoDB;