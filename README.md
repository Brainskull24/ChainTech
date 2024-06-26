# To-Do List Application
### Welcome to the To-Do List Application! This application allows you to manage your tasks efficiently with the ability to add, update, delete, and categorize tasks.

## Table of Contents
- Features
- Installation
- Usage
- Testing
- Code Structure
- Key Decisions

## Features
- Add Task: Add new tasks with a title, description, due date, and category.
- Update Task: Update existing tasks.
- Delete Task: Delete tasks.
- Categorize Tasks: Assign tasks to different categories.
- Task Status: Mark tasks as pending or completed.
- Responsive Design: User-friendly interface for both desktop and mobile devices.

## Installation
### Clone the repository: git clone https://github.com/Brainskull24/ChainTech.git

### For Frontend
- cd chaintech
- npm install
- npm start
- This will start the application on http://localhost:3000.

### For Backend
- Create a .env file and define your MONGO_URL as your database connection string.
On another terminal
- cd server
- npm install
- npm run dev
- This will start the backend at the required port.

# Usage

## Home Page:
Upon launching, the homepage will display all tasks.
Tasks are listed with their title, description, due date, category, and status.

## Add a Task:
Click on the Add Task button.
Fill in the task details in the modal that appears.
Click Save to add the task.

## Update a Task:
Click the Edit button next to the task you want to update.
Modify the task details in the modal that appears.
Click Update Changes to save the changes.

## Delete a Task:
Click the Delete button next to the task you want to remove.
Confirmation will be displayed on prompt that appears.

## Toggle Task Status:
Use the checkbox next to a task to mark it as completed or pending.

# Key Decisions

## React for Frontend:
React was chosen for its component-based architecture and efficient rendering with virtual DOM.

## State Management with Hooks:
The use of React hooks (useState, useEffect) allows for functional components with local state management.

## Axios for HTTP Requests: 
Axios was used for making HTTP requests due to its simplicity and ease of use.

## Bootstrap for Styling:
Bootstrap was used for quick and responsive UI development.

## Separation of Concerns:
Separate components for different functionalities (e.g., task form, task list) to maintain a clean and maintainable codebase.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
