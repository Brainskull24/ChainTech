const express = require("express");
const router = express.Router();
const {addTask, getAllTasks, deleteTask,updateTask}  = require("../controllers/taskController.js");

const formidable = require("express-formidable")
router.post("/addtask", formidable(), addTask);
router.get("/alltasks",getAllTasks);
router.delete("/deletetask/:id", deleteTask);
router.put("/updatetask/:id",formidable(),updateTask);
module.exports = router;