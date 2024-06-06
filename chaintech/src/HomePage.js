import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage() {
  // Add task details
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");

  // fetch tasks and categories
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);

  //update task details states
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedDueDate, setUpdatedDueDate] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/categories.json");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const saveTask = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("dueDate", dueDate);
    formData.append("category", category);

    if (title && description && dueDate && category) {
      const currentDate = new Date();
      const selectedDueDate = new Date(dueDate);
      if (selectedDueDate >= currentDate) {
        axios
          .post("http://localhost:7979/api/v1/task/addtask", formData)
          .then((res) => {
            alert(res.data.message);
            getAllTasks();
            setTitle("");
            setDescription("");
            setDueDate("");
            setCategory("");
            navigate("/");
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      } else {
        alert("Due date cannot be earlier than the current date");
      }
    } else {
      alert("Please fill all the details");
    }
  };

  const getAllTasks = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:7979/api/v1/task/alltasks"
      );
      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    getAllTasks();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:7979/api/v1/task/updatetask/${selected._id}`,
        {
          title: updatedTitle,
          description: updatedDescription,
          dueDate: updatedDueDate,
          category: updatedCategory,
        }
      );
      if (data.success) {
        alert("Task Updated Successfully");
        setSelected(null);
        setUpdatedTitle("");
        setUpdatedDescription("");
        setUpdatedDueDate("");
        setUpdatedCategory("");
        getAllTasks();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Something went wrong");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:7979/api/v1/task/deletetask/${taskId}`
      );
      if (data.success) {
        alert("Task Deleted");
        getAllTasks();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Something went wrong");
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === "Pending" ? "completed" : "Pending";
      const { data } = await axios.put(
        `http://localhost:7979/api/v1/task/updatetask/${task._id}`,
        { status: newStatus }
      );
      if (data.success) {
        getAllTasks();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Something went wrong");
    }
  };

  const handleEditClick = (task) => {
    setSelected(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setUpdatedDueDate(task.dueDate);
    setUpdatedCategory(task.category);
  };

  return (
    <div className="div-container">
      <div className="head-title">
        <h1>Welcome to Day Planner</h1>
        <span>Create Your own To-Do List</span>
      </div>

      <div className="btn-container">
        <button
          type="button"
          className="add-btn btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
        >
          Add Task
        </button>
      </div>

      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add New Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    value={title}
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Description:
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    value={description}
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Due Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="message-text"
                    value={dueDate}
                    name="dueDate"
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category-select" className="col-form-label">
                    Category:
                  </label>
                  <select
                    id="category-select"
                    className="form-control"
                    value={category}
                    name="category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveTask}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="list-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">TITLE</th>
              <th scope="col">DESCRIPTION</th>
              <th scope="col">STATUS</th>
              <th scope="col">ACTIONS</th>
              <th scope="col">DUE DATE</th>
              <th scope="col">CATEGORY</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task) => {
              const currentDate = new Date();
              const dueDate = new Date(task.dueDate);
              const differenceMs = dueDate - currentDate;
              const differenceDays = Math.ceil(
                differenceMs / (1000 * 60 * 60 * 24)
              );

              return (
                <tr key={task._id}>
                  <td className="title-column">{task.title}</td>
                  <td className="description-column">{task.description}</td>
                  <td className="status-column">
                    <input
                      type="checkbox"
                      checked={task.status === "completed"}
                      onChange={() => handleToggleStatus(task)}
                    />
                    <label>
                      {task.status === "completed" ? "Completed" : "Pending"}
                    </label>
                  </td>
                  <td className="actions-column">
                    <button
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#updateModal"
                      onClick={() => handleEditClick(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="dueDate-column">
                    {differenceDays >= 0 && (
                      <span className="days-left">
                        {differenceDays} {differenceDays === 1 ? "day" : "days"}{" "}
                        left
                      </span>
                    )}
                  </td>
                  <td className="category-column">{task.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        className="modal fade"
        id="updateModal"
        tabIndex="-1"
        aria-labelledby="updateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateModalLabel">
                Update Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    value={updatedTitle}
                    name="title"
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Description:
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    value={updatedDescription}
                    name="description"
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Due Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="message-text"
                    value={updatedDueDate}
                    name="dueDate"
                    onChange={(e) => setUpdatedDueDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category-select" className="col-form-label">
                    Category:
                  </label>
                  <select
                    id="category-select"
                    className="form-control"
                    value={updatedCategory}
                    name="category"
                    onChange={(e) => setUpdatedCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Update Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
