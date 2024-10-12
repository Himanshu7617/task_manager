const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/UserRoutes');
const create = require('./models/CreateModels');


//creating all the tables b4 anything happens 
(async () => {
    try {
        await create.teamLeaderModel();
        await create.teamMembersModel();
        await create.allTeamsModel();
        await create.allTasksModel();
        await create.addForeignKeys();
        console.log("Tables created successfully");
    } catch (error) {
        console.error(error.stack);
    }
})();


//dotenv config
require('dotenv').config();
const PORT = process.env.BACKEND_PORT  || 3000;

const app = express()

app.use(express.json());
app.use('/taskAPI/', userRoutes);

app.listen(PORT, ()=>{
    console.log(`app is listening on port ${PORT}`);
})