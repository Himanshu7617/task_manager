const pool = require('../config/db');

const authMiddlewares = {
    isThisLeader : async (req,res,next)=>{
        const {role}  = req.body;
        if(!role) return res.status(500).json({message: "role not provided"});

        if(role !== "leader"){
            return res.status(404).json({message:"user not authorized"});
        }

        next();
    }

}


module.exports = authMiddlewares;