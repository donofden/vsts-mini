CREATE TABLE workitems (
            id SERIAL PRIMARY KEY,
            team_id VARCHAR(255) NOT NULL, -- team id links to teams table
            iteration_id VARCHAR(255) NOT NULL, -- Iteration id of the card in current run
            workitem_no VARCHAR(50), -- Workitem number as per ADO
            column_id VARCHAR(255), -- Board column id
            column_name VARCHAR(255), -- Board column name - can be removed
            work_item_type VARCHAR(255) NOT NULL, -- System.WorkItemType
            card_state VARCHAR(50), -- System.State
            reason VARCHAR(50), -- System.Reason
            board_column_id VARCHAR(50), -- System.BoardColumn
            story_point VARCHAR(50), -- Microsoft.VSTS.Scheduling.StoryPoints
            assigned_user_id VARCHAR(50), -- System.AssignedTo
            created_date TIMESTAMP DEFAULT NOW(),
            deleted INTEGER DEFAULT 0
        )