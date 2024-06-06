import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedDueDate, setUpdatedDueDate] = useState("");
  const navigate = useNavigate();

  const saveTask = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("dueDate", dueDate);

    if (title && description && dueDate) {
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
            navigate("/");
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      } else {
        alert("Due date cannot be earlier than the current date");
      }
    } else {
      alert("Invalid input");
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
        }
      );
      if (data.success) {
        alert("Task Updated Successfully");
        setSelected(null);
        setUpdatedTitle("");
        setUpdatedDescription("");
        setUpdatedDueDate("");
        setOpen(false);
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

  return (
    <div className="div-container">
      <div className="head-title">
        <h1>Welcome to To-do List Creator</h1>
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
                Save
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
                    />{" "}
                    {task.status}
                  </td>
                  <td className="actions-column">
                    <button
                      className="btn btn-primary ms-2 my-2"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      onClick={() => {
                        setOpen(true);
                        setUpdatedTitle(task.title);
                        setUpdatedDescription(task.description);
                        setSelected(task);
                      }}
                    >
                      EDIT
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleDelete(task._id)}
                    >
                      DELETE
                    </button>
                  </td>
                  <td className="duedate-column">
                    {differenceDays > 0
                      ? `${differenceDays} days left`
                      : "Due today"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          className="modal fade"
          id="editModal"
          tabIndex="-1"
          aria-labelledby="editModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="editModalLabel">
                  Edit Task
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
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
