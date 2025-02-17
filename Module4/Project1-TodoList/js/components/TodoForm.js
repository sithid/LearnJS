import { validateTaskInput } from '../utils/validation.js';

export class TodoForm {
    constructor() {
        this.form = document.getElementById('todoForm');
        this.input = document.getElementById('taskInput');
        this.prioritySelect = document.getElementById('taskPriority');
        this.submitCallback = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Add keyboard shortcut (Ctrl/Cmd + Enter) to submit form
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                if (document.activeElement === this.input) {
                    this.handleSubmit();
                }
            }
        });

        // Auto-focus input when form is visible
        this.input.focus();
    }

    handleSubmit() {
        const title = this.input.value.trim();
        const priority = this.prioritySelect.value;

        if (validateTaskInput(title)) {
            if (this.submitCallback) {
                this.submitCallback({ title, priority });
            }
            this.resetForm();
        }
    }

    resetForm() {
        this.form.reset();
        this.input.focus();
    }

    onSubmit(callback) {
        this.submitCallback = callback;
    }
} 