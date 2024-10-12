
//TEAM NAME FOR REFERENCE
//all_teams (id, team_name)
//team_members (id, first_name, last_name, email, task_id)
//tasks (id, task_desc, assigned_to, due_date, completed)
//team_leader (id, first_name, last_name, email, team_name, password)


const pool = require('../config/db');

const doThis = {
    findLeaderByEmail : async (email) => {
        try {
            const result = await pool.query(`SELECT * FROM team_leader WHERE email = $1`,[email]);
            return result.rows[0];
        } catch (error) {
            console.error("Error finding the leader by email", error.stack);
            throw error;
        }
    },

    storeLeader : async (first_name, last_name, email, team_name, password) =>{
        try {
            await pool.query(`INSERT INTO team_leader (first_name, last_name, email, team_name, password) VALUES ($1, $2, $3, $4, $5)`,
                [first_name, last_name, email, team_name, password]);
        } catch (error) {
            console.error("Error in inserting the leader into the database", error.stack);
            throw error;
        }
    },

    storeTeam : async (team_name) =>{
        try {
            await pool.query(`INSERT INTO all_teams (team_name) VALUES ($1)`, [team_name]);
        } catch (error) {
            console.error("Error in storing team to the database", error.stack);
            throw error;
        }
    },

    storeMember : async( first_name, last_name, email) =>{
        try {
            await pool.query(`INSERT INTO team_members (first_name, last_name, email) VALUES ($1, $2, $3)`, 
                            [first_name, last_name, email]);
        } catch (error) {
            console.error("error storing team members", error.stack);
            throw error;
        }
    },

    findMemberByEmail : async(email) =>{
        try {
            const result = await pool.query(`SELECT * FROM team_members WHERE email = $1`,[email]);
            return result.rows[0];
        } catch (error) {
            console.error("Error in finding the team member", error.stack);
            throw error;
        }
    }
}

module.exports = doThis;