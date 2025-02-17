import { TodoList } from './todoList.js';
import { Storage } from './storage.js';
import { UI } from './ui.js';

class App {
    constructor() {
        this.storage = new Storage('todo-list');
        this.todoList = new TodoList(this.storage);
        this.ui = new UI(this.todoList);
        
        this.init();
    }

    async init() {
        try {
            // Show loading state
            this.ui.showLoading();

            // Load saved tasks
            await this.todoList.loadTasks();

            // Initialize UI components
            this.ui.initializeUI();

            // Set up event listeners
            this.setupEventListeners();

            // Update task count
            this.ui.updateTaskCount();

            // Hide loading state
            this.ui.hideLoading();
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.ui.showError('Failed to load tasks. Please try again.');
        }
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('task-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewTask(e.target);
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.ui.toggleTheme();
        });

        // Search
        document.getElementById('search-tasks').addEventListener('input', (e) => {
            this.ui.filterTasks();
        });

        // Filters
        document.querySelectorAll('.btn-filter').forEach(button => {
            button.addEventListener('click', () => {
                this.ui.setActiveFilter(button);
                this.ui.filterTasks();
            });
        });

        // Sort
        document.getElementById('sort-tasks').addEventListener('change', (e) => {
            this.ui.sortTasks(e.target.value);
        });

        // Bulk actions
        document.getElementById('complete-all').addEventListener('click', () => {
            this.handleCompleteAll();
        });

        document.getElementById('clear-completed').addEventListener('click', () => {
            this.handleClearCompleted();
        });
    }

    async handleNewTask(form) {
        try {
            const formData = new FormData(form);
            const task = {
                id: Date.now().toString(),
                title: formData.get('title'),
                description: formData.get('description'),
                dueDate: formData.get('dueDate'),
                priority: formData.get('priority'),
                completed: false,
                createdAt: new Date().toISOString()
            };

            await this.todoList.addTask(task);
            this.ui.addTaskToList(task);
            this.ui.updateTaskCount();
            form.reset();
            this.ui.showSuccess('Task added successfully!');
        } catch (error) {
            console.error('Failed to add task:', error);
            this.ui.showError('Failed to add task. Please try again.');
        }
    }

    async handleCompleteAll() {
        try {
            const confirmed = await this.ui.showConfirmDialog(
                'Are you sure you want to complete all tasks?'
            );

            if (confirmed) {
                await this.todoList.completeAllTasks();
                this.ui.refreshTaskList();
                this.ui.updateTaskCount();
                this.ui.showSuccess('All tasks marked as complete!');
            }
        } catch (error) {
            console.error('Failed to complete all tasks:', error);
            this.ui.showError('Failed to complete tasks. Please try again.');
        }
    }

    async handleClearCompleted() {
        try {
            const confirmed = await this.ui.showConfirmDialog(
                'Are you sure you want to delete all completed tasks?'
            );

            if (confirmed) {
                await this.todoList.clearCompletedTasks();
                this.ui.refreshTaskList();
                this.ui.updateTaskCount();
                this.ui.showSuccess('Completed tasks cleared!');
            }
        } catch (error) {
            console.error('Failed to clear completed tasks:', error);
            this.ui.showError('Failed to clear tasks. Please try again.');
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
}); 