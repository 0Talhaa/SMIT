document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // Load existing to-dos from local storage
    loadTodos();

    addBtn.addEventListener('click', () => {
        const text = todoInput.value.trim();
        if (text) {
            addTodoItem(text);
            todoInput.value = '';
        }
    });

    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const itemId = e.target.dataset.id;
            deleteTodoItem(itemId);
        } else if (e.target.classList.contains('edit-btn')) {
            const itemId = e.target.dataset.id;
            const newText = prompt('Edit your to-do item:');
            if (newText) {
                updateTodoItem(itemId, newText);
            }
        }
    });

    function addTodoItem(text) {
        const id = Date.now().toString();
        const itemHTML = `
            <li data-id="${id}">
                <span>${text}</span>
                <div>
                    <button class="edit-btn" data-id="${id}">Edit</button>
                    <button class="delete-btn" data-id="${id}">Delete</button>
                </div>
            </li>
        `;
        todoList.insertAdjacentHTML('beforeend', itemHTML);
        saveTodos();
    }

    function deleteTodoItem(id) {
        const item = document.querySelector(`li[data-id="${id}"]`);
        if (item) {
            item.remove();
            saveTodos();
        }
    }

    function updateTodoItem(id, newText) {
        const item = document.querySelector(`li[data-id="${id}"] span`);
        if (item) {
            item.textContent = newText;
            saveTodos();
        }
    }

    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(item => {
            todos.push({
                id: item.getAttribute('data-id'),
                text: item.querySelector('span').textContent
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            addTodoItem(todo.text);
        });
    }
});
