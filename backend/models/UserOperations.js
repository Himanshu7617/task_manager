const pool = require('../config/db');

const userDo = {
    findByEmail : async (email) => {
        try {
            const result = await pool.query(`SELECT * FROM users WHERE email = $1`,[email]);
            return result.rows[0];
        } catch (error) {
            console.error("Error in finding the user by email", error.stack);
            throw error;
        }
    },
    findByRole : async (email, role) => {
        try {
            const result = await pool.query(`SELECT * FROM users WHERE email = $1 AND role = $2`,[email, role]);
            return result.rows[0];
        } catch (error) {
            console.error("Error in finding the user by email", error.stack);
            throw error;
        }
    },
    
    findById : async (id, role) => {
        try {
            const result = await pool.query(`SELECT * FROM users WHERE id = $1 AND role = $2`,[id, role]);
            return result.rows[0];
        } catch (error) {
            console.error("Error in finding the user by email", error.stack);
            throw error;
        }
    },
    
    addTask : async(description, assigned_to, due_date) => {
        try {
            await pool.query(`INSERT INTO tasks (description, assigned_to, due_date) VALUES ($1, $2, $3)`,
                [description, assigned_to, due_date]
            )
        } catch (error) {
            console.error("Error adding Task", error.stack);
            throw error;
        }
    },
    findTaskById : async(task_id) => {
        try {
            const result = await pool.query(`SELECT * FROM tasks WHERE id = $1`,
                [task_id]
            );
            return result.rows[0];
        } catch (error) {
            console.error("Error adding Task", error.stack);
            throw error;
        }
    },

    updateTaskStatus : async(task_id, completed) => {
        try {
            await pool.query(`
                UPDATE tasks
                SET completed = $1
                WHERE id = $2;
                `,[completed, task_id]);
        } catch (error) {
            console.error("Error updating the status of a task", error.stack);
            throw error;
        }
    },

    addUser : async(f_name, l_name, email, team_name,password,role) => {
        try {
            await pool.query(`
                INSERT INTO users (first_name, last_name, email, team_name, role, password )
                VALUES ($1, $2, $3, $4, $5, $6);
                `,[f_name, l_name, email, team_name, role, password]);
        } catch (error) {
            console.error("Error adding the user", error.stack);
            throw error;
        }
    },

    assignTask : async(user_id, task_id) => {
        try {
            await pool.query(`
                UPDATE users
                SET task_id = $1
                WHERE id = $2
                `,[task_id, user_id]);
        } catch (error) {
            console.error("Error assigning task", error.stack);
            throw error;
        }
    }
}

module.exports = userDo;