CREATE TABLE boards (
            id SERIAL PRIMARY KEY,
            team_id VARCHAR(255) NOT NULL,
            column_id VARCHAR(255) NOT NULL,
            column_name VARCHAR(255) NOT NULL,
            item_limit INTEGER,
            column_type VARCHAR(50),
            description VARCHAR(500),
            created_date TIMESTAMP DEFAULT NOW(),
            deleted INTEGER DEFAULT 0
        )