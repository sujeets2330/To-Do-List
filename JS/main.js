document.addEventListener("DOMContentLoaded", () => {
  const toDoInput = document.querySelector('.todo-input');
  const toDoBtn = document.querySelector('.todo-btn');
  const toDoList = document.querySelector('.todo-list');
  const standardTheme = document.querySelector('.standard-theme');
  const lightTheme = document.querySelector('.light-theme');
  const darkerTheme = document.querySelector('.darker-theme');

  let savedTheme = localStorage.getItem('savedTheme') || 'standard';
  changeTheme(savedTheme);

  toDoBtn.addEventListener('click', addToDo);
  toDoList.addEventListener('click', deletecheck);
  standardTheme.addEventListener('click', () => changeTheme('standard'));
  lightTheme.addEventListener('click', () => changeTheme('light'));
  darkerTheme.addEventListener('click', () => changeTheme('darker'));

  getTodos();

  function addToDo(event) {
    event.preventDefault();
    if (toDoInput.value.trim() === '') {
      alert("You must write something!");
      return;
    }

    createTodoElement(toDoInput.value);
    saveLocal(toDoInput.value);
    toDoInput.value = '';
  }

  function deletecheck(event) {
    const item = event.target;
    if (item.classList.contains('delete-btn')) {
      const todo = item.parentElement;
      todo.classList.add("fall");
      removeLocalTodos(todo);
      todo.addEventListener('transitionend', () => {
        todo.remove();
      });
    }

    if (item.classList.contains('check-btn')) {
      item.parentElement.classList.toggle("completed");
    }
  }

  function createTodoElement(text) {
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);

    const newToDo = document.createElement('li');
    newToDo.innerText = text;
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);

    const checked = document.createElement('button');
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add('check-btn', `${savedTheme}-button`);
    toDoDiv.appendChild(checked);

    const deleted = document.createElement('button');
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add('delete-btn', `${savedTheme}-button`);
    toDoDiv.appendChild(deleted);

    toDoList.appendChild(toDoDiv);
  }

  function saveLocal(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function getTodos() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(createTodoElement);
  }

  function removeLocalTodos(todoEl) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoText = todoEl.children[0].innerText;
    todos = todos.filter(t => t !== todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function changeTheme(color) {
    localStorage.setItem('savedTheme', color);
    savedTheme = color;
    document.body.className = color;

    const title = document.getElementById('title');
    title.classList.toggle('darker-title', color === 'darker');

    document.querySelector('input').className = `${color}-input`;

    document.querySelectorAll('.todo').forEach(todo => {
      const isCompleted = todo.classList.contains('completed');
      todo.className = `todo ${color}-todo${isCompleted ? ' completed' : ''}`;
    });

    document.querySelectorAll('button').forEach(button => {
      if (button.classList.contains('check-btn')) {
        button.className = `check-btn ${color}-button`;
      } else if (button.classList.contains('delete-btn')) {
        button.className = `delete-btn ${color}-button`;
      } else if (button.classList.contains('todo-btn')) {
        button.className = `todo-btn ${color}-button`;
      }
    });
  }
});
