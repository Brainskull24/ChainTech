const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const PORT = 7979;
const taskRoutes = require("./routes/taskRoute.js");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();

connectDB();
app.use("/api/v1/task", taskRoutes);

app.listen(PORT, () => {
  console.log(`TO-DO STARTED AT ${PORT}`);
});
