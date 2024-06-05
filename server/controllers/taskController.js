const Task = require("../models/taskModel.js");

const addTask = async (req, res) => {
  try {
    const { title, description } = req.fields;
    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Enter valid Title",
      });
    }
    const task = new Task({
      title,
      description,
    });

    await task.save();
    res.status(201).send({
      success: true,
      message: "Task Added successfully",
      task,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in adding Task",
      error: error.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send({
      success: true,
      message: "AllTasks ",
      tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Task Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting task",
      error,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title,description } = req.fields;

    const tasks = await Task.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields },
      { new: true }
    );
    await tasks.save();
    res.status(201).send({
      success: true,
      message: "Task Updated Successfully",
      tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update task",
    });
  }
};

module.exports = { addTask , getAllTasks, deleteTask,updateTask};
