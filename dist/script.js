"use strict";
// Select DOM elements
const formTodo = document.querySelector('.todo-form');
const inputTodo = document.querySelector('.todo-input');
const btnAddTodo = document.querySelector('.todo-btn-add');
const todoList = document.querySelector('.todo-list');
const todoCount = document.querySelector('.todoCount');
const err = document.querySelector('.errMsg');
// Initialize todos array
let todos = [];
// Handle form submission
const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = inputTodo.value.trim();
    // Validate input data
    if (newTask === '') {
        // Display an error message or take appropriate action
        console.error('Error: Task cannot be empty');
        return; // return early if validation fails
        const err = document.createElement('err');
        err.innerHTML = `
    <p>Error: Task cannot be empty</p>
    `;
    }
    // If task is not empty, add it to todos
    if (newTask !== '') {
        const todo = {
            id: Date.now(),
            task: newTask,
            completed: false // Set completed property to false by default
        };
        todos.push(todo);
        saveTodos();
        appendTodoToDOM(todo);
        inputTodo.value = '';
        updateTodoCount();
    }
};
// Handle delete task
const handleDelete = (id) => {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    updateTodoList();
    updateTodoCount();
};
// Handle edit task
const handleEdit = (id, task) => {
    const newTask = prompt('Edit task:', task);
    if (newTask !== null && newTask !== '') {
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex !== -1) {
            todos[todoIndex].task = newTask;
            saveTodos();
            updateTodoList();
        }
    }
};
// Handle toggle completed status
const handleToggleCompleted = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed;
        saveTodos();
        updateTodoList();
    }
};
// Append todo to DOM
const appendTodoToDOM = (todo) => {
    const table = document.createElement('table');
    table.innerHTML = `
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
      <tbody>
        <td>
          <input type="checkbox" class="checkbox" ${todo.completed ? 'checked' : ''}>
          <span class="task ${todo.completed ? 'completed' : ''}">${todo.task}</span>
        </td>
        <td>
          <button class="btn-delete" style="background-color: rgb(241, 97, 97); 
                                            text-align: center; display: inline-block; border-color: black;">Delete</button>
        </td>
        <td>
          <button class="btn-edit" style="background-color: rgb(8, 248, 8); 
                                          border-color: black;">Edit</button>
        </td>
      </tbody>
    </table> 
  `;
    const checkbox = table.querySelector('.checkbox');
    const btnDelete = table.querySelector('.btn-delete');
    const btnEdit = table.querySelector('.btn-edit');
    // Add event listeners for checkbox, delete button, and edit button
    checkbox.addEventListener('change', () => handleToggleCompleted(todo.id));
    btnDelete.addEventListener('click', () => handleDelete(todo.id));
    btnEdit.addEventListener('click', () => handleEdit(todo.id, todo.task));
    todoList.appendChild(table);
};
// Update todo list in DOM
const updateTodoList = () => {
    todoList.innerHTML = '';
    todos.forEach(todo => appendTodoToDOM(todo));
};
// Function to update the todo count in the DOM
function updateTodoCount() {
    const count = todos.length;
    todoCount.textContent = `${count} task${count !== 1 ? 's' : ''} remaining`;
}
// Load todos from localStorage
const loadTodos = () => {
    const storedTodos = localStorage.getItem('todos');
    todos = storedTodos ? JSON.parse(storedTodos) : [];
    updateTodoList();
};
// Save todos to localStorage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};
// Add form submit event listener
formTodo.addEventListener('submit', handleSubmit);
// Load todos from localStorage on page load
loadTodos();
function updateTodoCount1() {
    throw new Error("Function not implemented.");
}
