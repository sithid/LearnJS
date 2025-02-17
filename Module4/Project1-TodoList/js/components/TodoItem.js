export class TodoItem {
    constructor(task) {
        this.task = task;
        this.element = this.createElement();
        this.toggleCallback = null;
        this.updateCallback = null;
        this.deleteCallback = null;
        this.setupEventListeners();
    }

    createElement() {
        const template = document.getElementById('todoItemTemplate');
        const element = template.content.cloneNode(true).firstElementChild;
        
        element.dataset.id = this.task.id;
        if (this.task.completed) {
            element.classList.add('completed');
        }

        const checkbox = element.querySelector('.todo-checkbox');
        checkbox.checked = this.task.completed;
        checkbox.id = `task-${this.task.id}`;

        const label = element.querySelector('.todo-label');
        label.textContent = this.task.title;
        label.htmlFor = `task-${this.task.id}`;

        const editInput = element.querySelector('.todo-edit');
        editInput.value = this.task.title;

        element.classList.add(`priority-${this.task.priority}`);

        return element;
    }

    setupEventListeners() {
        // Toggle completion
        const checkbox = this.element.querySelector('.todo-checkbox');
        checkbox.addEventListener('change', () => {
            this.element.classList.toggle('completed');
            if (this.toggleCallback) {
                this.toggleCallback();
            }
        });

        // Edit task
        const label = this.element.querySelector('.todo-label');
        const editInput = this.element.querySelector('.todo-edit');
        const editBtn = this.element.querySelector('.edit-btn');

        editBtn.addEventListener('click', () => {
            this.element.classList.add('editing');
            editInput.hidden = false;
            label.hidden = true;
            editInput.focus();
            editInput.selectionStart = editInput.value.length;
        });

        editInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.finishEditing();
            } else if (e.key === 'Escape') {
                this.cancelEditing();
            }
        });

        editInput.addEventListener('blur', () => {
            this.finishEditing();
        });

        // Delete task
        const deleteBtn = this.element.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            if (this.deleteCallback) {
                this.deleteCallback();
            }
        });
    }

    finishEditing() {
        const label = this.element.querySelector('.todo-label');
        const editInput = this.element.querySelector('.todo-edit');
        const newTitle = editInput.value.trim();

        if (newTitle && newTitle !== this.task.title) {
            if (this.updateCallback) {
                this.updateCallback(newTitle);
            }
        }

        this.element.classList.remove('editing');
        editInput.hidden = true;
        label.hidden = false;
    }

    cancelEditing() {
        const label = this.element.querySelector('.todo-label');
        const editInput = this.element.querySelector('.todo-edit');

        editInput.value = this.task.title;
        this.element.classList.remove('editing');
        editInput.hidden = true;
        label.hidden = false;
    }

    onToggle(callback) {
        this.toggleCallback = callback;
    }

    onUpdate(callback) {
        this.updateCallback = callback;
    }

    onDelete(callback) {
        this.deleteCallback = callback;
    }
} 