// Exercise 1: Basic Event Handling
function initializeEventHandling() {
    const eventBox = document.getElementById('event-box');
    const eventLog = document.getElementById('event-log');

    // TODO: Add event listeners for:
    // 1. Click
    // 2. Mouse enter and leave
    // 3. Mouse move (show coordinates)
    // 4. Double click

    // TODO: Add window resize handler

    // Helper function to log events
    function logEvent(message) {
        const logEntry = document.createElement('div');
        logEntry.textContent = message;
        eventLog.insertBefore(logEntry, eventLog.firstChild);
        
        // Keep only the last 5 events
        while (eventLog.children.length > 5) {
            eventLog.removeChild(eventLog.lastChild);
        }
    }
}

// Exercise 2: Form Validation
function initializeFormValidation() {
    const form = document.getElementById('validation-form');
    
    // TODO: Add validation for:
    // 1. Username (required, at least 3 characters)
    // 2. Email (required, valid email format)
    // 3. Password (required, at least 8 characters, one number, one uppercase)

    // TODO: Add real-time validation

    // TODO: Handle form submission

    // Helper function to show error
    function showError(elementId, message) {
        const errorDiv = document.getElementById(`${elementId}-error`);
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    // Helper function to hide error
    function hideError(elementId) {
        const errorDiv = document.getElementById(`${elementId}-error`);
        errorDiv.style.display = 'none';
    }
}

// Exercise 3: Interactive List
function initializeInteractiveList() {
    const input = document.getElementById('list-input');
    const list = document.getElementById('interactive-list');
    
    // TODO: Implement
    // 1. Add item when Enter is pressed
    // 2. Add delete button to each item
    // 3. Make items editable on double-click
    // 4. Add drag and drop functionality

    // Helper function to create list item
    function createListItem(text) {
        const li = document.createElement('li');
        // Your code here
        return li;
    }
}

// Exercise 4: Event Delegation
function initializeEventDelegation() {
    const menuContainer = document.getElementById('menu-container');
    const addButton = document.getElementById('add-menu-item');
    
    // TODO: Implement
    // 1. Handle clicks on all menu items
    // 2. Toggle submenus
    // 3. Track active items
    // 4. Add new menu items

    // Helper function to create menu item
    function createMenuItem(text) {
        const li = document.createElement('li');
        // Your code here
        return li;
    }
}

// Exercise 5: Custom Events
function initializeCustomEvents() {
    const publisher = document.getElementById('publisher');
    const subscriber1 = document.getElementById('subscriber1');
    const subscriber2 = document.getElementById('subscriber2');
    const triggerButton = document.getElementById('trigger-event');
    
    // TODO: Implement
    // 1. Create custom event
    // 2. Add event listeners to subscribers
    // 3. Dispatch event with data
    // 4. Clean up listeners when needed

    // Helper function to update subscriber display
    function updateSubscriber(element, data) {
        const dataDiv = element.querySelector('.event-data');
        dataDiv.textContent = JSON.stringify(data);
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