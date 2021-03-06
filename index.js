const addBtn = document.querySelector('.btn_add');
const todo = document.querySelector('.input input');
const list = document.querySelector('.list');
const todoNum = document.querySelector('.list_footer p');
const clearBtn = document.querySelector('.list_footer button');
const tab = document.querySelector('.tab');
const defaultTab = document.querySelector('.default');
let todoList = [];
function renderTodo(todo) {
  let str = '';
  if (!todo.length) {
    str = `<p class="text-center p-3">無代辦事項</p>`
  } else {
    todo.forEach((item) => {
      str += `<li data-id="${item.id}">
            <label class="checkbox" for="">
              <input type="checkbox" ${item.isCompleted ? 'checked' : ''}/>
              <span>${item.todo}</span>
            </label>
            <a href="#" class="delete"></a>
          </li>`
    })
  }
  list.innerHTML = str;
  todoNum.textContent = `${todoList.filter(item => !item.isCompleted).length} 個待完成項目`;
  if (todoList.findIndex((item) => item.isCompleted) === -1) {
    clearBtn.classList.add('d-none');
  } else {
    clearBtn.classList.remove('d-none');
  }
};
function addTodo(e) {
  e.preventDefault();
  if (todo.value.trim() === '') {
    alert('請輸入代辦內容')
    return;
  }
  let obj = {
    isCompleted: false,
    todo: todo.value,
    id: new Date().getTime()
  };
  todoList.unshift(obj);
  renderTodo(todoList);
  tab.querySelectorAll('li').forEach(item => {
    item.classList.remove('active');
  })
  defaultTab.classList.add('active');
  document.querySelector('.input input').value = '';
};
function handleTodo(e) {
  let id = Number(e.target.closest('li').dataset.id);
  let index = todoList.findIndex((item) => item.id === id);
  if (e.target.nodeName === 'INPUT') {
    todoList[index].isCompleted = !todoList[index].isCompleted;
  }
  if (todoList.findIndex((item) => item.isCompleted) === -1) {
    clearBtn.classList.add('d-none');
  } else {
    clearBtn.classList.remove('d-none');
  }
  if (e.target.classList.contains('delete')) {
    todoList.splice(index, 1);
  }
  renderTodo(todoList);
};
function deleteTodos() {
  todoList = todoList.filter(item => !item.isCompleted)
  tab.querySelectorAll('li').forEach(item => {
    item.classList.remove('active');
  })
  defaultTab.classList.add('active');
  renderTodo(todoList);
};
function filterTodo(e) {
  e.preventDefault();
  tab.querySelectorAll('li').forEach(item => {
    item.classList.remove('active');
  })
  e.target.closest('li').classList.add('active');
  let arr = []
  switch (e.target.textContent.trim()) {
    case '待完成':
      arr = todoList.filter(item => !item.isCompleted)
      break;
    case '已完成':
      arr = todoList.filter(item => item.isCompleted)
      break;
    default:
      arr = todoList
      break;
  }
  renderTodo(arr);
};
addBtn.addEventListener('click', addTodo);
list.addEventListener('click', handleTodo);
clearBtn.addEventListener('click', deleteTodos);
tab.addEventListener('click', filterTodo);
renderTodo(todoList);
