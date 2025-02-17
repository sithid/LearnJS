export function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

function handleKeyboardShortcuts(event) {
    // Ignore shortcuts when typing in input fields
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
    }

    // Undo: Ctrl/Cmd + Z
    if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
        event.preventDefault();
        document.getElementById('undoBtn').click();
    }

    // Redo: Ctrl/Cmd + Y or Ctrl/Cmd + Shift + Z
    if ((event.ctrlKey || event.metaKey) && (event.key === 'y' || (event.shiftKey && event.key === 'z'))) {
        event.preventDefault();
        document.getElementById('redoBtn').click();
    }

    // Delete: Delete key (when a task is focused)
    if (event.key === 'Delete') {
        const focusedTask = document.activeElement.closest('.todo-item');
        if (focusedTask) {
            event.preventDefault();
            focusedTask.querySelector('.delete-btn').click();
        }
    }

    // Edit: Enter key (when a task is focused)
    if (event.key === 'Enter') {
        const focusedTask = document.activeElement.closest('.todo-item');
        if (focusedTask && !focusedTask.classList.contains('editing')) {
            event.preventDefault();
            focusedTask.querySelector('.edit-btn').click();
        }
    }

    // Toggle completion: Space key (when a task is focused)
    if (event.key === ' ') {
        const focusedTask = document.activeElement.closest('.todo-item');
        if (focusedTask) {
            event.preventDefault();
            focusedTask.querySelector('.todo-checkbox').click();
        }
    }

    // Show keyboard shortcuts: ? key
    if (event.key === '?' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        document.getElementById('showShortcuts').click();
    }
}