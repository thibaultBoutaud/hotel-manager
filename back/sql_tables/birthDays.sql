CREATE TABLE birthdays (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    `date` DATE NOT NULL,
    type VARCHAR(50) DEFAULT 'birthDays',
    row_index INT NOT NULL AUTO_INCREMENT,
    UNIQUE INDEX (row_index),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
