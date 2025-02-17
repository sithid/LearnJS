export function validateTaskInput(title) {
    if (!title) {
        showError('Task title cannot be empty');
        return false;
    }

    if (title.length > 100) {
        showError('Task title cannot be longer than 100 characters');
        return false;
    }

    return true;
}

function showError(message) {
    // Create error element
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    error.setAttribute('role', 'alert');

    // Add error to form
    const form = document.getElementById('todoForm');
    const existingError = form.querySelector('.error-message');
    
    if (existingError) {
        existingError.remove();
    }
    
    form.insertBefore(error, form.firstChild);

    // Remove error after 3 seconds
    setTimeout(() => {
        error.remove();
    }, 3000);
} 