const pool = require('../config/db');

const create = {
    teamLeaderModel : async () => {

        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS team_leader (
                    id SERIAL UNIQUE PRIMARY KEY,
                    first_name VARCHAR(20) NOT NULL,
                    last_name VARCHAR(20),
                    email VARCHAR(50) UNIQUE NOT NULL,
                    team_name VARCHAR(20) UNIQUE NOT NULL,
                    password VARCHAR(120) NOT NULL
                );
                `)
            
        } catch (error) {
            console.error('Error creating the team_leader table', error.stack);
        }
    },

    allTeamsModel : async () => {

        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS all_teams (
                    id SERIAL UNIQUE,
                    team_name VARCHAR(20) UNIQUE NOT NULL
                );
                `)
            
        } catch (error) {
            console.error('Error creating the all_teams table', error.stack);
        }
    },
    
    allTasksModel : async () => {
        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS tasks (
                    id SERIAL UNIQUE PRIMARY KEY,
                    task_desc VARCHAR(200) UNIQUE NOT NULL,
                    assigned_to INT,
                    due_date DATE,
                    completed VARCHAR(1) NOT NULL DEFAULT N
                );
                `)
            
        } catch (error) {
            console.error('Error creating the tasks table',error.stack);
        }
    },
    

    teamMembersModel : async () => {

        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS team_members (
                    id SERIAL UNIQUE PRIMARY KEY, 
                    first_name VARCHAR(20) NOT NULL,
                    last_name VARCHAR(20), 
                    email VARCHAR(50) UNIQUE NOT NULL,
                    task_id INT
                );
                `)
            
        } catch (error) {
            console.error('Error creating the team_members table', error.stack);
        }
    },

    addForeignKeys: async () => {
        try {
            // Check if the foreign key on `tasks` table already exists
            const checkAssignedToConstraint = await pool.query(`
                SELECT constraint_name
                FROM information_schema.table_constraints
                WHERE table_name = 'tasks' AND constraint_name = 'assigned_to_constraint';
            `);
            if (checkAssignedToConstraint.rows.length === 0) {
                // Add the foreign key constraint if it doesn't exist
                await pool.query(`
                    ALTER TABLE tasks
                    ADD CONSTRAINT assigned_to_constraint
                    FOREIGN KEY (assigned_to) REFERENCES team_members(id) ON DELETE SET NULL;
                `);
            }

            // Check if the foreign key on `team_members` table already exists
            const checkRelatingMembersToTasks = await pool.query(`
                SELECT constraint_name
                FROM information_schema.table_constraints
                WHERE table_name = 'team_members' AND constraint_name = 'relating_members_to_tasks';
            `);
            if (checkRelatingMembersToTasks.rows.length === 0) {
                await pool.query(`
                    ALTER TABLE team_members
                    ADD CONSTRAINT relating_members_to_tasks
                    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE SET NULL;
                `);
            }

            // Check if the foreign key on `all_teams` table already exists
            const checkRelatingTeamsToLeaders = await pool.query(`
                SELECT constraint_name
                FROM information_schema.table_constraints
                WHERE table_name = 'all_teams' AND constraint_name = 'relating_teams_to_leaders';
            `);
            if (checkRelatingTeamsToLeaders.rows.length === 0) {
                await pool.query(`
                    ALTER TABLE all_teams
                    ADD CONSTRAINT relating_teams_to_leaders
                    FOREIGN KEY (id) REFERENCES team_leader(id) ON DELETE CASCADE;
                `);
            }

            // Check if the team_name foreign key already exists
            const checkTeamNameToTeamLeader = await pool.query(`
                SELECT constraint_name
                FROM information_schema.table_constraints
                WHERE table_name = 'all_teams' AND constraint_name = 'team_name_to_team_leader';
            `);
            if (checkTeamNameToTeamLeader.rows.length === 0) {
                await pool.query(`
                    ALTER TABLE all_teams
                    ADD CONSTRAINT team_name_to_team_leader
                    FOREIGN KEY (team_name) REFERENCES team_leader(team_name) ON DELETE CASCADE;
                `);
            }

        } catch (error) {
            console.error('Error adding the foreign keys', error.stack);
            throw error;
        }
    }

}


module.exports = create;