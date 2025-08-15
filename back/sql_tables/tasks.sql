CREATE TABLE tasks (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    author_id VARCHAR(36),
    owner_id VARCHAR(36),
    status BOOLEAN DEFAULT FALSE, 
    name VARCHAR(100),
    description TEXT,
    date DATE,
    type ENUM('tasks', 'courses', 'rdvs', 'events', 'projets','alert','dayOff'),
    _index INT NOT NULL AUTO_INCREMENT, UNIQUE INDEX (_index),
    author_img_url VARCHAR(500),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
