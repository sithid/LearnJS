// Exercise 1: Basic Event Handling
function initializeEventHandling() {
    const eventBox = document.getElementById('event-box');
    const eventLog = document.getElementById('event-log');

    // Click event
    eventBox.addEventListener('click', function(event) {
        logEvent(`Clicked at (${event.offsetX}, ${event.offsetY})`);
    });

    // Mouse enter and leave
    eventBox.addEventListener('mouseenter', function() {
        logEvent('Mouse entered');
        eventBox.classList.add('highlight');
    });

    eventBox.addEventListener('mouseleave', function() {
        logEvent('Mouse left');
        eventBox.classList.remove('highlight');
    });

    // Mouse move
    eventBox.addEventListener('mousemove', function(event) {
        eventBox.textContent = `X: ${event.offsetX}, Y: ${event.offsetY}`;
    });

    // Double click
    eventBox.addEventListener('dblclick', function() {
        logEvent('Double clicked!');
    });

    // Window resize
    window.addEventListener('resize', function() {
        logEvent(`Window resized to ${window.innerWidth}x${window.innerHeight}`);
    });

    function logEvent(message) {
        const logEntry = document.createElement('div');
        logEntry.textContent = message;
        eventLog.insertBefore(logEntry, eventLog.firstChild);
        
        while (eventLog.children.length > 5) {
            eventLog.removeChild(eventLog.lastChild);
        }
    }
}

// Exercise 2: Form Validation
function initializeFormValidation() {
    const form = document.getElementById('validation-form');
    
    // Validation rules
    const validators = {
        username: {
            validate: value => value.length >= 3,
            message: 'Username must be at least 3 characters long'
        },
        email: {
            validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Please enter a valid email address'
        },
        password: {
            validate: value => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value),
            message: 'Password must be at least 8 characters with one number and one uppercase letter'
        }
    };

    // Real-time validation
    Object.keys(validators).forEach(field => {
        const input = document.getElementById(field);
        input.addEventListener('input', function() {
            validateField(field, input.value);
        });
    });

    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let isValid = true;
        Object.keys(validators).forEach(field => {
            const input = document.getElementById(field);
            if (!validateField(field, input.value)) {
                isValid = false;
            }
        });

        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
        }
    });

    function validateField(field, value) {
        const { validate, message } = validators[field];
        if (!validate(value)) {
            showError(field, message);
            return false;
        }
        hideError(field);
        return true;
    }

    function showError(elementId, message) {
        const errorDiv = document.getElementById(`${elementId}-error`);
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    function hideError(elementId) {
        const errorDiv = document.getElementById(`${elementId}-error`);
        errorDiv.style.display = 'none';
    }
}

// Exercise 3: Interactive List
function initializeInteractiveList() {
    const input = document.getElementById('list-input');
    const list = document.getElementById('interactive-list');
    let draggedItem = null;

    // Add item on Enter
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && input.value.trim()) {
            const li = createListItem(input.value.trim());
            list.appendChild(li);
            input.value = '';
        }
    });

    function createListItem(text) {
        const li = document.createElement('li');
        li.draggable = true;
        
        // Text content
        const span = document.createElement('span');
        span.textContent = text;
        li.appendChild(span);
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => li.remove();
        li.appendChild(deleteBtn);

        // Edit on double click
        span.addEventListener('dblclick', function() {
            const input = document.createElement('input');
            input.value = span.textContent;
            li.insertBefore(input, span);
            span.style.display = 'none';
            input.focus();

            input.addEventListener('blur', function() {
                span.textContent = input.value;
                span.style.display = '';
                input.remove();
            });

            input.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    input.blur();
                }
            });
        });

        // Drag and drop
        li.addEventListener('dragstart', () => {
            draggedItem = li;
            setTimeout(() => li.classList.add('dragging'), 0);
        });

        li.addEventListener('dragend', () => {
            draggedItem = null;
            li.classList.remove('dragging');
        });

        return li;
    }

    // Handle drag and drop
    list.addEventListener('dragover', function(event) {
        event.preventDefault();
        const afterElement = getDragAfterElement(list, event.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement) {
            list.insertBefore(draggable, afterElement);
        } else {
            list.appendChild(draggable);
        }
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            }
            return closest;
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
}

// Exercise 4: Event Delegation
function initializeEventDelegation() {
    const menuContainer = document.getElementById('menu-container');
    const addButton = document.getElementById('add-menu-item');
    let menuItemCount = document.querySelectorAll('.menu > li').length;

    // Event delegation for menu items
    menuContainer.addEventListener('click', function(event) {
        const target = event.target;
        
        // Handle menu item clicks
        if (target.classList.contains('menu-item')) {
            // Toggle active state
            document.querySelectorAll('.menu-item').forEach(item => {
                if (item !== target) item.classList.remove('active');
            });
            target.classList.toggle('active');

            // Toggle submenu if exists
            const submenu = target.querySelector('.submenu');
            if (submenu) {
                const wasHidden = submenu.style.display === 'none';
                document.querySelectorAll('.submenu').forEach(sub => {
                    sub.style.display = 'none';
                });
                submenu.style.display = wasHidden ? 'block' : 'none';
            }
        }
    });

    // Add new menu items
    addButton.addEventListener('click', function() {
        menuItemCount++;
        const menuItem = createMenuItem(`Item ${menuItemCount}`);
        document.getElementById('dynamic-menu').appendChild(menuItem);
    });

    function createMenuItem(text) {
        const li = document.createElement('li');
        li.className = 'menu-item';
        li.textContent = text;

        // Add submenu
        const submenu = document.createElement('ul');
        submenu.className = 'submenu';
        submenu.style.display = 'none';

        // Add subitems
        for (let i = 1; i <= 2; i++) {
            const subitem = document.createElement('li');
            subitem.className = 'menu-item';
            subitem.textContent = `Subitem ${menuItemCount}.${i}`;
            submenu.appendChild(subitem);
        }

        li.appendChild(submenu);
        return li;
    }
}

// Exercise 5: Custom Events
function initializeCustomEvents() {
    const publisher = document.getElementById('publisher');
    const subscriber1 = document.getElementById('subscriber1');
    const subscriber2 = document.getElementById('subscriber2');
    const triggerButton = document.getElementById('trigger-event');

    // Create custom event
    const customEvent = new CustomEvent('dataEvent', {
        bubbles: true,
        detail: { message: 'Hello from publisher!' }
    });

    // Add event listeners
    function handleCustomEvent(event) {
        updateSubscriber(this, {
            message: event.detail.message,
            timestamp: new Date().toLocaleTimeString()
        });
    }

    subscriber1.addEventListener('dataEvent', handleCustomEvent);
    subscriber2.addEventListener('dataEvent', handleCustomEvent);

    // Trigger event
    triggerButton.addEventListener('click', function() {
        customEvent.detail.timestamp = new Date().toLocaleTimeString();
        publisher.dispatchEvent(customEvent);
    });

    function updateSubscriber(element, data) {
        const dataDiv = element.querySelector('.event-data');
        dataDiv.textContent = JSON.stringify(data, null, 2);
    }

    // Cleanup function (call when needed)
    function cleanup() {
        subscriber1.removeEventListener('dataEvent', handleCustomEvent);
        subscriber2.removeEventListener('dataEvent', handleCustomEvent);
    }
}

// Initialize all exercises when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeEventHandling();
    initializeFormValidation();
    initializeInteractiveList();
    initializeEventDelegation();
    initializeCustomEvents();
}); 