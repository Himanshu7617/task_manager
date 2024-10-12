const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const doThis = require('../models/ModelOperations');
const path = require('path');

require('dotenv').config({path : path.join(__dirname,'../.env' )});


//TEAM NAME FOR REFERENCE
//all_teams (id, team_name)
//team_members (id, first_name, last_name, email, task_id)
//tasks (id, task_desc, assigned_to, due_date, completed)
//team_leader (id, first_name, last_name, email, team_name)

const leaderHandles = {
    signup : async (req,res) => {
        const {first_name, last_name, email, team_name, password } = req.body;
        const user = await doThis.findLeaderByEmail(email);

        if (user) return res.status(400).json({message: "User already registered. Please Login!!!"})

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await doThis.storeLeader(first_name, last_name, email, team_name, hashedPassword);
            await doThis.storeTeam(team_name);


            const newUser = await doThis.findLeaderByEmail(email);

            const token = await jwt.sign({user : newUser.id}, process.env.SECRET_KEY, {expiresIn : '3 days'});

            return res.status(201).json({message: "sign up successful", token});

        } catch (error) {
            console.error("Error during sign up", error.stack);
            res.status(500).json({ message: "Server error during signup" });
        }
    },

    login : async (req,res) => {
        
        const {email, password} = req.body;

        const user = await doThis.findLeaderByEmail(email);

        if(!user) return  res.status(400).json({message: "User doesn't exist. Please register first"});

        try {
            const matched = await bcrypt.compare(password,user.password);

            if(!matched) res.status(404).json({message : "password invalid"});

            const token = await jwt.sign({user : user.id}, process.env.SECRET_KEY, {expiresIn : '3 days'});

            return res.status(201).json({message:"login successful", team : user.team_name, token});
        } catch (error) {
            console.error("Error during login", error.stack);
            res.status(500).json({ message: "Server error during login" });
        }

    },

    addMember : async (req, res) =>{
            const {first_name, last_name, email} = req.body;

            try {
                await doThis.storeMember(first_name, last_name, email);
                return res.status(201).json({message: "Team member created"});
            } catch (error) {
                console.error("error in adding team member");
                res.status(500).json({message: "Server error while adding member"});

            }
    },

    addTask : async (req, res) => {
        const {}
    }
}



module.exports = leaderHandles;