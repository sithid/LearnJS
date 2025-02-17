import { Storage } from '../utils/storage.js';
import { TodoItem } from './TodoItem.js';

export class TodoList {
    constructor() {
        this.storage = new Storage('todo-list');
        this.container = document.getElementById('todoList');
        this.countElement = document.getElementById('taskCount');
        this.tasks = [];
        this.history = [];
        this.historyIndex = -1;
        this.stateChangeCallbacks = [];
    }

    async loadTasks() {
        try {
            this.tasks = await this.storage.getTasks();
            this.renderTasks();
            this.updateTaskCount();
        } catch (error) {
            console.error('Failed to load tasks:', error);
            throw error;
        }
    }

    async addTask(taskData) {
        const task = {
            id: Date.now().toString(),
            title: taskData.title,
            priority: taskData.priority,
            completed: false,
            createdAt: new Date().toISOString()
        };

        try {
            this.saveState();
            this.tasks.push(task);
            await this.storage.saveTasks(this.tasks);
            this.renderTask(task);
            this.updateTaskCount();
            this.notifyStateChange();
        } catch (error) {
            console.error('Failed to add task:', error);
            throw error;
        }
    }

    async toggleTask(taskId) {
        try {
            this.saveState();
            const task = this.tasks.find(t => t.id === taskId);
            if (task) {
                task.completed = !task.completed;
                await this.storage.saveTasks(this.tasks);
                this.renderTasks();
                this.updateTaskCount();
                this.notifyStateChange();
            }
        } catch (error) {
            console.error('Failed to toggle task:', error);
            throw error;
        }
    }

    async updateTask(taskId, title) {
        try {
            this.saveState();
            const task = this.tasks.find(t => t.id === taskId);
            if (task) {
                task.title = title;
                await this.storage.saveTasks(this.tasks);
                this.renderTasks();
                this.notifyStateChange();
            }
        } catch (error) {
            console.error('Failed to update task:', error);
            throw error;
        }
    }

    async deleteTask(taskId) {
        try {
            this.saveState();
            this.tasks = this.tasks.filter(task => task.id !== taskId);
            await this.storage.saveTasks(this.tasks);
            this.renderTasks();
            this.updateTaskCount();
            this.notifyStateChange();
        } catch (error) {
            console.error('Failed to delete task:', error);
            throw error;
        }
    }

    async clearCompleted() {
        try {
            this.saveState();
            this.tasks = this.tasks.filter(task => !task.completed);
            await this.storage.saveTasks(this.tasks);
            this.renderTasks();
            this.updateTaskCount();
            this.notifyStateChange();
        } catch (error) {
            console.error('Failed to clear completed tasks:', error);
            throw error;
        }
    }

    filterTasks(filter) {
        const filteredTasks = this.tasks.filter(task => {
            switch (filter) {
                case 'active':
                    return !task.completed;
                case 'completed':
                    return task.completed;
                default:
                    return true;
            }
        });

        this.renderFilteredTasks(filteredTasks);
    }

    sortTasks(sortBy) {
        const sortedTasks = [...this.tasks];
        
        switch (sortBy) {
            case 'date':
                sortedTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'priority':
                const priorityOrder = { high: 0, medium: 1, low: 2 };
                sortedTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
                break;
            case 'alphabetical':
                sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        this.renderFilteredTasks(sortedTasks);
    }

    renderTasks() {
        this.container.innerHTML = '';
        this.tasks.forEach(task => this.renderTask(task));
    }

    renderFilteredTasks(filteredTasks) {
        this.container.innerHTML = '';
        filteredTasks.forEach(task => this.renderTask(task));
    }

    renderTask(task) {
        const todoItem = new TodoItem(task);
        
        todoItem.onToggle(() => this.toggleTask(task.id));
        todoItem.onUpdate((title) => this.updateTask(task.id, title));
        todoItem.onDelete(() => this.deleteTask(task.id));
        
        this.container.appendChild(todoItem.element);
    }

    updateTaskCount() {
        const activeCount = this.tasks.filter(task => !task.completed).length;
        this.countElement.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
    }

    // State Management Methods
    saveState() {
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(JSON.stringify(this.tasks));
        this.historyIndex++;
    }

    async undo() {
        if (this.canUndo()) {
            this.historyIndex--;
            this.tasks = JSON.parse(this.history[this.historyIndex]);
            await this.storage.saveTasks(this.tasks);
            this.renderTasks();
            this.updateTaskCount();
            this.notifyStateChange();
        }
    }

    async redo() {
        if (this.canRedo()) {
            this.historyIndex++;
            this.tasks = JSON.parse(this.history[this.historyIndex]);
            await this.storage.saveTasks(this.tasks);
            this.renderTasks();
            this.updateTaskCount();
            this.notifyStateChange();
        }
    }

    canUndo() {
        return this.historyIndex > 0;
    }

    canRedo() {
        return this.historyIndex < this.history.length - 1;
    }

    onStateChange(callback) {
        this.stateChangeCallbacks.push(callback);
    }

    notifyStateChange() {
        this.stateChangeCallbacks.forEach(callback => callback());
    }
} 