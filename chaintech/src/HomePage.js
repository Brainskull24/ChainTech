import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const navigate = useNavigate();

  const saveTask = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (title && description) {
      axios
        .post("http://localhost:7979/api/v1/task/addtask", formData)
        .then((res) => {
          alert(res.data.message);
          getAllTasks();
          setTitle("");
          setDescription("");
          navigate("/");
        })
        .catch((error) => {
          console.log(error.response.data);
        });
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
        { title: updatedTitle, description: updatedDescription }
      );
      if (data.success) {
        alert("Task Updated Successfully");
        setSelected(null);
        setUpdatedTitle("");
        setUpdatedDescription("");
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

  return (
    <div className="div-container">
      <div className="head-title">
        <h1>Welcome to To-do List Creator </h1>
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
                New message
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
                Send message
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
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task) => (
              <tr key={task._id}>
                <td className="title-column">{task.title}</td>
                <td className="description-column">{task.description}</td>
                <td className="status-column">{task.status}</td>
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
                    onClick={() => {
                      handleDelete(task._id);
                    }}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
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
                <h1 className="modal-title fs-5" id="exampleModalLabel">
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
