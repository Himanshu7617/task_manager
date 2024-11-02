const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const userRoutes = require("./routes/UserRoutes");
const userModel = require("./models/UserModel");

//creating all the tables b4 anything happens
(async () => {
  try {
    await userModel.createUserModel();
    await userModel.createTaskModel();
    await userModel.addForeignKeys();
    console.log("Tables created successfully");
  } catch (error) {
    console.error(error.stack);
  }
})();

//dotenv config
require("dotenv").config();
const PORT = process.env.BACKEND_PORT || 3000;

const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // Your frontend's origin
  methods: "GET,POST,PUT,DELETE", // Specify allowed HTTP methods
  credentials: true, // Allow cookies and authentication headers
};

app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/taskAPI/", userRoutes);

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
