'use strict';
//Database
const DB_NAME = 'todo_db';

//Global variables
const addTodoInput = document.querySelector('#todo_input');
const updateTodoBtn = document.querySelector('#update_todo_btn');
const addTodoBtn = document.querySelector('#add_todo_btn');

//Creating TodoList
const create_Todo = function (e) {
  e.preventDefault();
  try {
    if (!addTodoInput.value) {
      showError('Please enter todo title');
      return;
    }
    const newTodo = {
      title: addTodoInput.value,
      id: todoID(),
      created_at: Date.now(),
    };

    const todo_db = getDB(DB_NAME);

    const new_todo_db = [...todo_db, newTodo];
    setDB(DB_NAME, new_todo_db);
    resetInput();
    fetch_todoist();
  } catch (error) {
    showError(error.message);
  }
};

//Read todo
const fetch_todoist = function () {
  const todo_db = getDB(DB_NAME);
  const todo_Container = document.querySelector('#task_log');
  const noTodo = todo_db.length === 0;
  if (noTodo) {
    todo_Container.innerHTML = `<p class="text-slate-400">Your todo list will appear here</p>`;
    return;
  }

  const todos = sortDB(todo_db).map((todo) => {
    return `<div
      id="task"
      class="group flex flex-row items-center justify-between border-b border-[1px] hover:bg-green-500 hover:text-white p-3 m-2"
    >
      <button onclick="handle_Preview_Todo('${todo.id}')">${todo.title}</button>
      <div class="hidden group-hover:flex">
        <button onclick="handleEditMode('${todo.id}')">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5 "
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10 "
        />
          </svg>
        </button>
        <button onclick=(deleteTodo('${todo.id}'))>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
          </svg>
        </button>
      </div>
    </div>`;
  });
  todo_Container.innerHTML = todos.join(' ');
};
fetch_todoist();

//Update todo
const handleEditMode = function (id) {
  const todo_db = getDB(DB_NAME);
  const todo_toEdit = todo_db.find((todo) => todo.id === id);
  if (!todo_toEdit) {
    return;
  }

  addTodoInput.value = todo_toEdit.title;
  updateTodoBtn.classList.remove('hidden');

  updateTodoBtn.setAttribute('todo_id_to_update', id);
  addTodoBtn.classList.add('hidden');
};

const updateTodo = (e) => {
  e.preventDefault();
  if (!addTodoInput.value) {
    showError('Todo title cannot be empty');
    return;
  }

  const todoId = updateTodoBtn.getAttribute('todo_id_to_update');

  const todo_db = getDB(DB_NAME);
  const updated_todo_db = todo_db.map((todo) => {
    if (todo.id === todoId) {
      return { ...todo, title: addTodoInput.value };
    } else {
      return todo;
    }
  });

  setDB(DB_NAME, updated_todo_db);
  fetch_todoist();
  resetInput();
  // console.log(updated_todo_db);
  updateTodoBtn.classList.add('hidden');
  addTodoBtn.classList.remove('hidden');
};

//Delete todo
const deleteTodo = function (id) {
  Swal.fire({
    title: 'Delete this todo?',
    text: 'Are you sure you want to delete todo?',
    icon: 'warning',
    confirmButtonText: 'Yes!',
    showCancelButton: true,
  }).then((res) => {
    if (res.isConfirmed) {
      const todo_db = getDB(DB_NAME);
      const new_todo_db = todo_db.filter((todo) => todo.id !== id);

      setDB(DB_NAME, new_todo_db);
      fetch_todoist();
    } else {
      return;
    }
  });
};

//Preview todo function
const handle_Preview_Todo = function (id) {
  setDB('current_Preview_Todo', id);
  window.location.href = '/preview_todo.html';
};
