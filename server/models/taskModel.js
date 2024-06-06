const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status:{
        type: String,
        default:"Pending"
    },
    dueDate:{
        type: Date,
        required:true
    },
    category:{
        type: String,
    }
});

module.exports = mongoose.model("Task", taskSchema);
