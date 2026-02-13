-- 1. Users Table (Profile Data)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    riot_game_name VARCHAR(50),
    riot_tag_line VARCHAR(10),
    description TEXT,
    banner_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS looking_for_group (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    role VARCHAR(20) NOT NULL, -- e.g., 'Top', 'Support', 'Fill'
    min_rank VARCHAR(20),      -- e.g., 'Gold', 'Emerald'
    note VARCHAR(100),         -- e.g., 'Mic required, chill games'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);