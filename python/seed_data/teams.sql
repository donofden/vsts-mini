CREATE TABLE teams (
            id SERIAL PRIMARY KEY,
            teamId VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(350),
            projectName VARCHAR(255) NOT NULL,
            projectId VARCHAR(255) NOT NULL,
            createdDate TIMESTAMP DEFAULT NOW(),
            deleted INTEGER DEFAULT 0
        )