import { TodoList } from './components/TodoList.js';
import { TodoForm } from './components/TodoForm.js';
import { TodoFilter } from './components/TodoFilter.js';
import { initializeTheme } from './utils/theme.js';
import { initializeKeyboardShortcuts } from './utils/keyboard.js';

class TodoApp {
    constructor() {
        this.todoList = new TodoList();
        this.todoForm = new TodoForm();
        this.todoFilter = new TodoFilter();
        
        this.initialize();
    }

    initialize() {
        // Initialize theme
        initializeTheme();

        // Initialize keyboard shortcuts
        initializeKeyboardShortcuts();

        // Set up event listeners
        this.todoForm.onSubmit((taskData) => {
            this.todoList.addTask(taskData);
        });

        this.todoFilter.onFilterChange((filter) => {
            this.todoList.filterTasks(filter);
        });

        this.todoFilter.onSortChange((sortBy) => {
            this.todoList.sortTasks(sortBy);
        });

        // Initialize clear completed button
        const clearCompletedBtn = document.getElementById('clearCompleted');
        clearCompletedBtn.addEventListener('click', () => {
            this.todoList.clearCompleted();
        });

        // Initialize keyboard shortcuts dialog
        const shortcutsBtn = document.getElementById('showShortcuts');
        const shortcutsDialog = document.getElementById('shortcutsDialog');
        const closeDialogBtn = shortcutsDialog.querySelector('.close-dialog');

        shortcutsBtn.addEventListener('click', () => {
            shortcutsDialog.showModal();
        });

        closeDialogBtn.addEventListener('click', () => {
            shortcutsDialog.close();
        });

        // Initialize undo/redo buttons
        const undoBtn = document.getElementById('undoBtn');
        const redoBtn = document.getElementById('redoBtn');

        undoBtn.addEventListener('click', () => {
            this.todoList.undo();
            this.updateUndoRedoButtons();
        });

        redoBtn.addEventListener('click', () => {
            this.todoList.redo();
            this.updateUndoRedoButtons();
        });

        // Listen for state changes to update undo/redo buttons
        this.todoList.onStateChange(() => {
            this.updateUndoRedoButtons();
        });

        // Initial load of tasks
        this.todoList.loadTasks();
    }

    updateUndoRedoButtons() {
        const undoBtn = document.getElementById('undoBtn');
        const redoBtn = document.getElementById('redoBtn');

        undoBtn.disabled = !this.todoList.canUndo();
        redoBtn.disabled = !this.todoList.canRedo();
    }
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
}); 