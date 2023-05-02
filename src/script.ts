// Define Todo interface
interface Todo {
  id: number;
  task: string;
  completed: boolean; // Added 'completed' property
}

// Select DOM elements
const formTodo = document.querySelector('.todo-form') as HTMLFormElement;
const inputTodo = document.querySelector('.todo-input') as HTMLInputElement;
const btnAddTodo = document.querySelector('.todo-btn-add') as HTMLButtonElement;
const todoList = document.querySelector('.todo-list') as HTMLUListElement;
const todoCount = document.querySelector('.todoCount') as HTMLSpanElement;
const err = document.querySelector('.errMsg') as HTMLParagraphElement;

// Initialize todos array
let todos: Todo[] = [];

// Handle form submission
const handleSubmit = (e: Event) => {
  e.preventDefault();

  const newTask = inputTodo.value.trim();


// Validate input data
if (newTask === '') {
    // Display an error message or take appropriate action
    console.error('Error: Task cannot be empty');

    // Update the error message element with the error message
    err.innerHTML = `
            <p class="errMsg">Error: Task cannot be empty</p>
    `;

    return; // return early if validation fails
  }
  // Clear the error message if the task is not empty
  err.innerHTML = '';
  


  // Check if the task already exists in the todos array
  const taskExists = todos.some((todo) => todo.task === newTask);
  if (taskExists) {
    console.error('Error: Task already exists');
    err.innerHTML = `
      <p class="errMsg">Error: Task already exists</p>
    `;
    return; // return early if task already exists
  }

  // If task is not empty, add it to todos
  if (newTask !== '') {
    const todo: Todo = {
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
const handleDelete = (id: number) => {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  updateTodoList();
  updateTodoCount();
};

// Handle edit task
const handleEdit = (id: number, task: string) => {
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

// Add form submit event listener
formTodo.addEventListener('submit', handleSubmit);


// Handle toggle completed status
const handleToggleCompleted = (id: number) => {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex].completed = !todos[todoIndex].completed;
    saveTodos();
    updateTodoList();
    updateTodoCount();
  }
};


// Append todo to DOM
const appendTodoToDOM = (todo: Todo) => {
  const table = document.createElement('table');
  table.innerHTML = `
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
      <tbody>
      <tr>
        <td id="idCheckbox">
          <input type="checkbox" class="checkbox" ${todo.completed ? 'checked' : ''}>
          <span class="task ${todo.completed ? 'completed' : ''}">${todo.task}</span>
        </td>
        <td id="idEdit">
          <button class="btn-edit">Edit</button>
        </td>
        <td id="idDel">
          <button class="btn-delete">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  `;

  const checkbox = table.querySelector('.checkbox') as HTMLInputElement;
  const btnDelete = table.querySelector('.btn-delete') as HTMLButtonElement;
  const btnEdit = table.querySelector('.btn-edit') as HTMLButtonElement;

  // Add event listeners for checkbox, delete button, and edit button
  checkbox.addEventListener('change', () => handleToggleCompleted(todo.id));
  btnDelete.addEventListener('click', () => handleDelete(todo.id));
  btnEdit.addEventListener('click', () => handleEdit(todo.id, todo.task));

  todoList.appendChild(table);
};



// Update todo list in DOM
const updateTodoList = () => {
  todoList.innerHTML = '';
  todos.map(todo => appendTodoToDOM(todo));
};


// Function to update the todo count in the DOM
function updateTodoCount() {
  const count = todos.length;
  let completedCount = 0; // Initialize completedCount to 0
  todos.map(todo => {
    if (todo.completed) {
      completedCount++; // Increment completedCount for each completed task
    }
  });
  const remainingCount = count - completedCount; // Calculate remaining tasks
  todoCount.textContent = `${remainingCount} task${remainingCount !== 1 ? 's' : ''} remaining`;

  todoCount.innerHTML = `<nav class="nav todo-nav">
                                  <p>All : <span>${count}</span> | Completed : <span>${completedCount}</span> | Incompleted :  <span>${remainingCount}</p>
                                  </nav>`;
}



// Load todos from localStorage
const loadTodos = () => {
  const storedTodos = localStorage.getItem('todos');
  todos = storedTodos ? JSON.parse(storedTodos) : [];
  updateTodoList();
  updateTodoCount();
};

// Save todos to localStorage
const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};


  
// Load todos from localStorage on page load
  loadTodos();


