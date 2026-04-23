const BASE = "http://localhost:18080";
let allTasks = [];
const THEME_STORAGE_KEY = "taskPlannerTheme";

function applyTheme(themeName) {
    const validThemes = ["classic", "baby-pink", "grey"];
    const selectedTheme = validThemes.includes(themeName) ? themeName : "classic";

    if (selectedTheme === "classic") {
        document.body.removeAttribute("data-theme");
    } else {
        document.body.setAttribute("data-theme", selectedTheme);
    }

    localStorage.setItem(THEME_STORAGE_KEY, selectedTheme);
}

function initializeThemeSelector() {
    const themeSelect = document.getElementById("themeSelect");
    if (!themeSelect) return;

    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const validThemes = ["classic", "baby-pink", "grey"];
    const initialTheme = validThemes.includes(savedTheme) ? savedTheme : "classic";

    themeSelect.value = initialTheme;
    applyTheme(initialTheme);

    themeSelect.addEventListener("change", () => {
        applyTheme(themeSelect.value);
        const selectedLabel = themeSelect.options[themeSelect.selectedIndex].text;
        showNotification(`Theme changed to ${selectedLabel}`, "success");
    });
}

function setSelectOptions(selectEl, options, placeholder, selectedValue) {
    selectEl.innerHTML = "";

    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = placeholder;
    selectEl.appendChild(placeholderOption);

    options.forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        selectEl.appendChild(option);
    });

    if (selectedValue && options.includes(selectedValue)) {
        selectEl.value = selectedValue;
    } else {
        selectEl.value = "";
    }
}

function populateDependencyDropdowns() {
    const fromSelect = document.getElementById("from");
    const toSelect = document.getElementById("to");
    if (!fromSelect || !toSelect) return;

    const taskNames = allTasks
        .map((task) => task.name)
        .filter((name) => !!name)
        .sort((a, b) => a.localeCompare(b));

    const previousFrom = fromSelect.value;
    const previousTo = toSelect.value;

    const fromOptions = taskNames.filter((name) => name !== previousTo);
    const toOptions = taskNames.filter((name) => name !== previousFrom);

    setSelectOptions(fromSelect, fromOptions, "From task...", previousFrom);
    setSelectOptions(toSelect, toOptions, "To task...", previousTo);

    if (fromSelect.value && fromSelect.value === toSelect.value) {
        toSelect.value = "";
    }
}

async function refreshTasksFromServer() {
    try {
        const res = await fetch(BASE + "/tasks");
        if (!res.ok) return;

        const data = await res.json();
        allTasks = Array.isArray(data.tasks) ? data.tasks : [];
        updateTasksList();
    } catch (err) {
        console.error(err);
    }
}

// Use simple POST requests to avoid CORS preflight on older backend setups.
async function postJsonSimple(path, payload) {
    return fetch(BASE + path, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}

// Show notification toast
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification show ${type}`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Add task with priority and due date
async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');
    const dueDateInput = document.getElementById('dueDateInput');
    
    const task = taskInput.value.trim();
    const priority = priorityInput.value;
    const dueDate = dueDateInput.value;

    if (!task) {
        showNotification('Please enter a task name', 'error');
        return;
    }

    try {
        const res = await postJsonSimple("/addTask", {task, priority, dueDate});

        if (res.ok) {
            taskInput.value = '';
            dueDateInput.value = '';
            priorityInput.value = 'medium';
            showNotification(`Task "${task}" added successfully`, 'success');
            await refreshTasksFromServer();
        } else {
            showNotification('Failed to add task', 'error');
        }
    } catch (err) {
        showNotification('Error connecting to server', 'error');
        console.error(err);
    }
}

// Update task status
async function updateTaskStatus(taskName, newStatus) {
    try {
        const res = await postJsonSimple("/updateTaskStatus", {task: taskName, status: newStatus});

        if (res.ok) {
            showNotification(`Task "${taskName}" status updated`, 'success');
            await refreshTasksFromServer();
        } else {
            showNotification('Failed to update task status', 'error');
        }
    } catch (err) {
        showNotification('Error updating task', 'error');
        console.error(err);
    }
}

// Delete task
async function deleteTask(taskName) {
    if (!confirm(`Are you sure you want to delete "${taskName}"?`)) return;

    try {
        const res = await postJsonSimple("/deleteTask", {task: taskName});

        if (res.ok) {
            showNotification(`Task "${taskName}" deleted`, 'success');
            await refreshTasksFromServer();
        } else {
            showNotification('Failed to delete task', 'error');
        }
    } catch (err) {
        showNotification('Error deleting task', 'error');
        console.error(err);
    }
}

// Add dependency
async function addDependency() {
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    const from = fromInput.value;
    const to = toInput.value;

    if (!from || !to) {
        showNotification('Please fill in both fields', 'error');
        return;
    }

    if (from === to) {
        showNotification('A task cannot depend on itself', 'error');
        return;
    }

    try {
        const res = await postJsonSimple("/addDependency", {from, to});

        if (res.ok) {
            toInput.value = '';
            populateDependencyDropdowns();
            showNotification(`Dependency added: ${from} → ${to}`, 'success');
        } else {
            const errorMsg = await res.text();
            showNotification(errorMsg || 'Cycle detected!', 'error');
        }
    } catch (err) {
        showNotification('Error connecting to server', 'error');
        console.error(err);
    }
}

// Get schedule
async function getSchedule() {
    try {
        const res = await fetch(BASE + "/schedule");
        
        if (!res.ok) {
            showNotification('Failed to generate schedule', 'error');
            return;
        }

        const data = await res.json();
        const scheduleContainer = document.getElementById('scheduleContainer');
        scheduleContainer.innerHTML = '';

        if (data.schedule && data.schedule.length > 0) {
            data.schedule.forEach((task, index) => {
                const scheduleItem = document.createElement('div');
                scheduleItem.className = 'schedule-item';
                
                const taskSpan = document.createElement('span');
                const priorityEmoji = task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢';
                const statusEmoji = task.status === 'done' ? '✅' : task.status === 'in_progress' ? '⏳' : '⭕';
                taskSpan.textContent = `${index + 1}. ${task.name} ${priorityEmoji} ${statusEmoji}`;
                scheduleItem.appendChild(taskSpan);

                if (index < data.schedule.length - 1) {
                    const separator = document.createElement('span');
                    separator.className = 'separator';
                    separator.textContent = '→';
                    scheduleItem.appendChild(separator);
                }

                scheduleContainer.appendChild(scheduleItem);
            });
            showNotification('Schedule generated successfully', 'success');
        } else {
            scheduleContainer.innerHTML = '<p class="empty-state">No tasks in schedule</p>';
        }
    } catch (err) {
        showNotification('Error generating schedule', 'error');
        console.error(err);
    }
}

// Format date
function formatDate(dateStr) {
    if (!dateStr) return 'No date';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
}

// Get status emoji
function getStatusEmoji(status) {
    const emojis = {
        'todo': '⭕',
        'in_progress': '⏳',
        'done': '✅'
    };
    return emojis[status] || '⭕';
}

// Get priority emoji
function getPriorityEmoji(priority) {
    const emojis = {
        'low': '🟢',
        'medium': '🟡',
        'high': '🔴'
    };
    return emojis[priority] || '🟡';
}

// Update tasks list display
function updateTasksList() {
    const tasksContainer = document.getElementById('tasksContainer');
    
    if (allTasks.length === 0) {
        tasksContainer.innerHTML = '<p class="empty-state">No tasks yet. Add one to get started!</p>';
        return;
    }

    tasksContainer.innerHTML = '';
    allTasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'task-name';
        nameDiv.textContent = task.name;
        taskCard.appendChild(nameDiv);

        const metaDiv = document.createElement('div');
        metaDiv.className = 'task-meta';

        const priorityBadge = document.createElement('span');
        priorityBadge.className = `task-priority ${task.priority}`;
        priorityBadge.textContent = `${getPriorityEmoji(task.priority)} ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority`;
        metaDiv.appendChild(priorityBadge);

        const statusBadge = document.createElement('span');
        statusBadge.className = `task-status ${task.status}`;
        statusBadge.textContent = `${getStatusEmoji(task.status)} ${task.status.replace('_', ' ').toUpperCase()}`;
        metaDiv.appendChild(statusBadge);

        if (task.dueDate) {
            const dueDiv = document.createElement('div');
            dueDiv.className = 'task-duedate';
            dueDiv.textContent = `📅 ${formatDate(task.dueDate)}`;
            metaDiv.appendChild(dueDiv);
        }

        taskCard.appendChild(metaDiv);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-actions';

        const statusSelect = document.createElement('select');
        statusSelect.className = 'status-dropdown';
        statusSelect.innerHTML = `
            <option value="">Change status</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
        `;
        statusSelect.value = task.status || '';
        statusSelect.onchange = () => {
            if (statusSelect.value) {
                updateTaskStatus(task.name, statusSelect.value);
            }
        };
        actionsDiv.appendChild(statusSelect);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'task-btn delete';
        deleteBtn.textContent = '🗑️ Delete';
        deleteBtn.onclick = () => deleteTask(task.name);
        actionsDiv.appendChild(deleteBtn);

        taskCard.appendChild(actionsDiv);
        tasksContainer.appendChild(taskCard);
    });

    populateDependencyDropdowns();
}

// Handle Enter key in inputs
document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');

    initializeThemeSelector();

    taskInput?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTask();
    });

    fromInput?.addEventListener('change', function() {
        populateDependencyDropdowns();
    });

    toInput?.addEventListener('change', function() {
        populateDependencyDropdowns();
    });

    // Initialize
    refreshTasksFromServer();
});