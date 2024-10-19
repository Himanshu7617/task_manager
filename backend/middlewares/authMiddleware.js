const pool = require('../config/db');

const authMiddlewares = {
    whoIsThis : async (requiredRole) => (req, res, next) => {
        try {
            const user = await 
        } catch (error) {
            
        }
    }

}


module.exports = authMiddlewares;