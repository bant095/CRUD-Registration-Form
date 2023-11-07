'use strict';

const DB_NAME = 'todo_db';

const handlePreviewEdit = function (e) {
  e.preventDefault();
  document.querySelector('#preview_form').classList.remove('hidden');
  const updateTitle = document.getElementById('title_edit').value;
  const todoDescription = document.getElementById('todo_description').value;

  const todo_db = getDB('todo_db');
  const currentPreviewTodoId = getDB('current_Preview_Todo');
  const todoID = todo_db.findIndex((todo) => todo.id === currentPreviewTodoId);

  if (todoID !== -1) {
    if (updateTitle === '' || todoDescription === '') {
      showError('Add title and description or cancel');
      return;
    } else {
      const updatedCurrentTodo = {
        ...todo_db[todoID],
        title: updateTitle,
        description: todoDescription,
      };
      todo_db[todoID] = updatedCurrentTodo;
      setDB('todo_db', todo_db);
    }
    document.querySelector('#preview_form').classList.add('hidden');
    renderPreviewTodoId();
  } else {
    console.error('Todo not found in the database.');
  }
};

const renderPreviewTodoId = function () {
  const todo_db = getDB('todo_db');
  const currentPreviewTodoId = getDB('current_Preview_Todo');
  const currentTodo = todo_db.find((todo) => todo.id === currentPreviewTodoId);

  const { title, id, created_at, description } = currentTodo;
  const todo_Preview_Container = document.querySelector('#description');

  return (todo_Preview_Container.innerHTML = ` <section class="flex flex-col gap-2 absolute w-full px-4" id="description">
  <section class="flex justify-between items-center">
    <h3 class="text-xl"><input class="p-2" type="checkbox" name="done" id="complete" onchange="pending()"/>&nbsp;${title}</h3>
    <div class="flex items-center gap-2">
      <button onclick="previewEditForm(event)">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-5 h-5 text-slate-600 hover:text-slate-800"
    >
        <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10 "
      />
        </svg>
      </button>
      <button onclick="deleteTodo('${id}')">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-5 h-5 text-slate-600 hover:text-slate-800"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
        </svg>
      </button>
    </div>
  </section>
  <section>
    <p class="text-slate-700 my-3">
      ${description || 'Description'}
    </p>

    <span>${generateDate(created_at)}</span>
    <span>&middot;</span>
    <span
      class="bg-slate-600 text-xs rounded-full py-0.5 px-1.5 text-white"
      id="task">Pending</span
    >
  </section>
</section>`);
};
renderPreviewTodoId();

const previewEditForm = function (e) {
  e.preventDefault();
  document.querySelector('#preview_form').classList.toggle('hidden');
};

//Delete todo
const deleteTodo = function (id) {
  Swal.fire({
    title: 'Delete',
    text: 'Are you sure you want to delete todo?',
    icon: 'warning',
    confirmButtonText: 'Yes, Delete!',
    showCancelButton: true,
  }).then((res) => {
    if (res.isConfirmed) {
      const todo_db = getDB(DB_NAME);
      const new_todo_db = todo_db.filter((todo) => todo.id !== id);

      setDB(DB_NAME, new_todo_db);
      window.location.href = '/index.html';
    } else {
      return;
    }
  });
};

const pending = function () {
  const taskLog = document.querySelector('#task');
  const checkTask = document.getElementById('complete');

  if (checkTask.checked === true) {
    taskLog.textContent = 'Completed';
    taskLog.classList.remove('bg-black');
    taskLog.classList.add('bg-green-300');
  } else {
    taskLog.textContent = 'Pending';
    taskLog.classList.remove('bg-green-300');
    taskLog.classList.add('bg-black');
  }
};
pending();
