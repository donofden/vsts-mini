CREATE TABLE iterations (
            id SERIAL PRIMARY KEY,
            team_id VARCHAR(255) NOT NULL,
            iteration_id VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            path VARCHAR(350),
            start_date VARCHAR(255),
            finish_date VARCHAR(255),
            time_frame VARCHAR(50),
            created_date TIMESTAMP DEFAULT NOW(),
            deleted INTEGER DEFAULT 0
        )