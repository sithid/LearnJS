export class UI {
    constructor(todoList) {
        this.todoList = todoList;
        this.currentFilter = 'all';
        this.currentSort = 'date-asc';
        this.taskTemplate = document.getElementById('task-template');
        this.confirmDialog = document.getElementById('confirm-dialog');
    }

    initializeUI() {
        // Initialize theme
        this.initializeTheme();

        // Render initial task list
        this.refreshTaskList();

        // Set initial task count
        this.updateTaskCount();
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    toggleTheme() {
        const body = document.body;
        const themeToggle = document.getElementById('theme-toggle');
        
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    }

    showLoading() {
        document.getElementById('loading-state').classList.remove('hidden');
        document.getElementById('task-list').classList.add('hidden');
        document.getElementById('empty-state').classList.add('hidden');
    }

    hideLoading() {
        document.getElementById('loading-state').classList.add('hidden');
        this.updateVisibility();
    }

    updateVisibility() {
        const taskList = document.getElementById('task-list');
        const emptyState = document.getElementById('empty-state');
        const hasVisibleTasks = taskList.children.length > 0;

        taskList.classList.toggle('hidden', !hasVisibleTasks);
        emptyState.classList.toggle('hidden', hasVisibleTasks);
    }

    showError(message) {
        // Implementation depends on your preferred notification system
        alert(message); // Basic implementation
    }

    showSuccess(message) {
        // Implementation depends on your preferred notification system
        console.log('Success:', message); // Basic implementation
    }

    async showConfirmDialog(message) {
        return new Promise((resolve) => {
            const dialog = this.confirmDialog;
            const messageEl = document.getElementById('confirm-message');
            
            messageEl.textContent = message;
            dialog.classList.remove('hidden');

            const handleConfirm = () => {
                cleanup();
                resolve(true);
            };

            const handleCancel = () => {
                cleanup();
                resolve(false);
            };

            const cleanup = () => {
                dialog.classList.add('hidden');
                document.getElementById('confirm-ok').removeEventListener('click', handleConfirm);
                document.getElementById('confirm-cancel').removeEventListener('click', handleCancel);
            };

            document.getElementById('confirm-ok').addEventListener('click', handleConfirm);
            document.getElementById('confirm-cancel').addEventListener('click', handleCancel);
        });
    }

    refreshTaskList() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        const filteredTasks = this.todoList.getFilteredTasks(
            this.currentFilter,
            document.getElementById('search-tasks').value
        );

        const sortedTasks = this.todoList.sortTasks(filteredTasks, this.currentSort);

        sortedTasks.forEach(task => this.addTaskToList(task));
        this.updateVisibility();
    }

    addTaskToList(task) {
        const taskList = document.getElementById('task-list');
        const taskElement = this.createTaskElement(task);
        taskList.appendChild(taskElement);
        this.updateVisibility();
    }

    createTaskElement(task) {
        const template = this.taskTemplate.content.cloneNode(true);
        const taskElement = template.querySelector('.task-item');

        // Set task data
        taskElement.dataset.id = task.id;
        if (task.completed) {
            taskElement.classList.add('completed');
        }

        // Set task content
        taskElement.querySelector('.task-title').textContent = task.title;
        taskElement.querySelector('.task-description').textContent = task.description || '';
        
        const dueDateSpan = taskElement.querySelector('.due-date span');
        if (task.dueDate) {
            dueDateSpan.textContent = this.formatDate(task.dueDate);
        } else {
            taskElement.querySelector('.due-date').remove();
        }

        const prioritySpan = taskElement.querySelector('.priority');
        prioritySpan.textContent = task.priority;
        prioritySpan.classList.add(`priority-${task.priority}`);

        // Set checkbox state
        const checkbox = taskElement.querySelector('.task-checkbox');
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => this.handleTaskToggle(task.id));

        // Add action listeners
        taskElement.querySelector('.edit-task').addEventListener('click', () => 
            this.handleTaskEdit(task.id));
        taskElement.querySelector('.delete-task').addEventListener('click', () => 
            this.handleTaskDelete(task.id));

        return taskElement;
    }

    async handleTaskToggle(taskId) {
        try {
            await this.todoList.toggleTaskComplete(taskId);
            this.refreshTaskList();
            this.updateTaskCount();
        } catch (error) {
            this.showError('Failed to update task status');
            this.refreshTaskList(); // Revert UI state
        }
    }

    async handleTaskEdit(taskId) {
        const task = this.todoList.tasks.find(t => t.id === taskId);
        if (!task) return;

        // This is a basic implementation - you might want to create a proper edit form
        const title = prompt('Edit task title:', task.title);
        if (title === null) return;

        try {
            await this.todoList.updateTask(taskId, { title });
            this.refreshTaskList();
        } catch (error) {
            this.showError('Failed to update task');
        }
    }

    async handleTaskDelete(taskId) {
        const confirmed = await this.showConfirmDialog(
            'Are you sure you want to delete this task?'
        );

        if (confirmed) {
            try {
                await this.todoList.deleteTask(taskId);
                this.refreshTaskList();
                this.updateTaskCount();
                this.showSuccess('Task deleted successfully');
            } catch (error) {
                this.showError('Failed to delete task');
            }
        }
    }

    setActiveFilter(button) {
        // Update active filter button
        document.querySelectorAll('.btn-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Update current filter
        this.currentFilter = button.dataset.filter;
    }

    filterTasks() {
        this.refreshTaskList();
    }

    sortTasks(sortBy) {
        this.currentSort = sortBy;
        this.refreshTaskList();
    }

    updateTaskCount() {
        const activeCount = this.todoList.getActiveTaskCount();
        document.getElementById('active-count').textContent = activeCount;
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
} 