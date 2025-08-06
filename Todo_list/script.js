const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

addBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const taskObj = {
        text: taskText,
        completed: false
    };

    addTaskToDOM(taskObj);
    saveTask(taskObj);

    taskInput.value = '';
}

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.className = 'task-item';

    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} />
        <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
        <button class="removeBtn">Remove</button>
    `;

    taskList.appendChild(li);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
        const text = item.querySelector('.task-text').textContent;
        const completed = item.querySelector('.task-checkbox').checked;
        tasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event delegation for checkbox toggle and remove button
taskList.addEventListener('click', function(e) {
    if (e.target.classList.contains('task-checkbox')) {
        const taskSpan = e.target.nextElementSibling;
        taskSpan.classList.toggle('completed', e.target.checked);
        updateLocalStorage();
    } else if (e.target.classList.contains('removeBtn')) {
        const li = e.target.closest('li');
        li.remove();
        updateLocalStorage();
    }
});
