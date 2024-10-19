

const pool = require('../config/db');
const { addForeignKeys } = require('./CreateModels');

const userModel = {
    createUserModel : async () => {
        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    first_name VARCHAR(20) NOT NULL, 
                    last_name VARCHAR(20), 
                    email VARCHAR(50) UNIQUE NOT NULL, 
                    team_name VARCHAR(20) NOT NULL, 
                    role VARCHAR(10) NOT NULL DEFAULT user, 
                    task_id INT,
                    password VARCHAR(120) NOT NULL
                );
                `);

            
        } catch (error) {
            console.error("Error creating the user table", error.stack);
            throw error;
        }
    },

    createTaskModel : async () => {
        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS tasks (
                    id SERIAL PRIMARY KEY,
                    description VARCHAR(150) NOT NULL, 
                    assigned_to INT,
                    due_date DATE,
                    completed VARCHAR(1) DEFAULT 'N'
                    );  
                `)
        } catch (error) {
            console.error("Error creating the tasks table",error.stack);
            throw error;
        }
    },


    addForeignKeys : async () => {

        try {
            //adding foreign key for task_id in users table 
            const taskIdConstraint = await pool.query(`
                SELECT constraint_name 
                FROM information_schema.table_constraints 
                WHERE table_name = 'users' AND constraint_name = 'task_id_constraint';
                `)

            if(taskIdConstraint.rows.length === 0){
                await pool.query(`
                    ALTER TABLE users
                    ADD CONSTRAINT task_id_constraint
                    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE SET NULL;
                    `)
            }


            const assignedToConstraint = await pool.query(`
                SELECT constraint_name
                FROM information_schema.table_constraints 
                WHERE table_name = 'tasks' AND constraint_name = 'assigned_to_constraint';
                `);

            if(assignedToConstraint.rows.length ===0){
                await pool.query(`
                    ALTER TABLE tasks
                    ADD CONSTRAINT assigned_to_constraint
                    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL;
                    `)
            }
        } catch (error) {
            
        }

    }
}


module.exports = userModel;