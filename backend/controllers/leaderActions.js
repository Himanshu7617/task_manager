const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDo = require('../models/UserOperations')
const path = require('path');
require('dotenv').config({path : path.join(__dirname,'../.env' )});


const leaderHandles = {
    signupLeader : async (req,res) => {
        const {first_name, last_name, email, team_name, password, role} = req.body;
        const user = await userDo.findByEmail(email);

        if (user) return res.status(400).json({message: "User already registered. Please Login!!!"})

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await userDo.addUser(first_name, last_name, email, team_name, hashedPassword,role);

            const newUser = await userDo.findByEmail(email);
            const token = await jwt.sign({user : newUser.id, role : newUser.role, team_name : newUser.team_name}, process.env.SECRET_KEY, {expiresIn : '3 days'});

            return res.status(201).json({message: "sign up successful", token});

        } catch (error) {
            console.error("Error during sign up", error.stack);
            res.status(500).json({ message: "Server error during signup" });
        }
    },

    loginLeader : async (req,res) => {
        
        const {email, password} = req.body;

        const user = await userDo.findByEmail(email);

        if(!user) return  res.status(400).json({message: "User doesn't exist. Please register first"});

        try {
            const matched = await bcrypt.compare(password,user.password);

            if(!matched) res.status(404).json({message : "password invalid"});

            const token = await jwt.sign({user : user.id, role : user.role, team_name: user.team_name}, process.env.SECRET_KEY, {expiresIn : '3 days'});

            return res.status(201).json({message:"login successful", token});
        } catch (error) {
            console.error("Error during login", error.stack);
            res.status(500).json({ message: "Server error during login" });
        }

    },

    addMember : async (req, res) =>{
            const {first_name, last_name, email, team_name, role, leaderId} = req.body;
            
            const member = await userDo.findByEmail(email);

            if(member) return res.status(404).json({message: "User already added"});

            const leader = await userDo.findById(leaderId, role = "leader");

            if(!leader) return res.status(400).json({message: "couldn't find the leader with the given leader_id"});

            
            try {
                await userDo.addUser(first_name, last_name, email, team_name, role, leader.password);
                return res.status(201).json({message: "Team member created"});
            } catch (error) {
                console.error("error in adding team member");
                res.status(500).json({message: "Server error while adding member"});

            }
    },

    addTask : async (req, res) => {
        const {task_desc, assigned_to, due_date} = req.body;

        
        try {
            await userDo.addTask(task_desc, assigned_to, due_date);
            return res.status(201).json({message:"Task added successfully"});
        } catch (error) {
            console.error("error in adding task to the database");
            res.status(500).json({message: "Server error during adding a task"});
        }
    },

    updateTaskStatus : async(req,res) => {
        const {task_id, completed} = req.body;

        const task = await userDo.findTaskById(task_id);

        if(!task) return res.status(404).json({message: "Task not added"});

        try {
            await updateTaskStatus(task_id, completed);

            return res.status(200).json({message: "Updated task status successfully"});

        } catch (error) {
            console.error("Error updating the task status at controller level");
        }
    },

    assignTask : async(req,res)=>{
        const {user_id, task_id} = req.body;

        const user = await userDo.findById(user_id);
        const task = await userDo.findTaskById(task_id);

        if(!user) return res.status(404).json({message: "user not found"});

        if(!task) return res.status(404).json({message : "task not found"});

        try {
            await assignTask(user_id, task_id);
            return res.status(200).json({message : "task assigned successfully"});

        } catch (error) {
            console.error("Error in assigning the task at controller level")
        }
    },

    loginUser : async (req,res) => {
        const {email, team_name} = req.body;

        const user = await userDo.findByEmail(email);
        
        if(!user) return res.status(404).json({message: "user not added yet"});

        try {
            const token = await jwt.sign({user_id : user.id, role : user.role, team_name: user.team_name}, process.env.SECRET_KEY, {expiresIn : '3 days'});

            return res.status(200).json({message:"user logged in", token});
        } catch (error) {
            
        }
    }
}



module.exports = leaderHandles;