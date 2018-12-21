CREATE TABLE teams (
            id SERIAL PRIMARY KEY,
            team_id VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(350),
            project_name VARCHAR(255) NOT NULL,
            project_id VARCHAR(255) NOT NULL,
            email VARCHAR(255),
            created_date TIMESTAMP DEFAULT NOW(),
            deleted INTEGER DEFAULT 0
        )