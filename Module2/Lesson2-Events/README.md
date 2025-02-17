# Lesson 2: Event Handling in JavaScript

## Learning Objectives
By the end of this lesson, you will be able to:
- Understand different types of events
- Add and remove event listeners
- Work with the event object
- Handle form events
- Implement event delegation
- Manage event propagation

## 1. Understanding Events

Events are actions or occurrences that happen in a web page, such as:
- User interactions (clicks, key presses, mouse movements)
- Document loading
- Form submissions
- Window resizing

### Common Event Types
```javascript
// Mouse Events
element.addEventListener('click', handler);
element.addEventListener('dblclick', handler);
element.addEventListener('mouseenter', handler);
element.addEventListener('mouseleave', handler);

// Keyboard Events
element.addEventListener('keydown', handler);
element.addEventListener('keyup', handler);
element.addEventListener('keypress', handler);

// Form Events
element.addEventListener('submit', handler);
element.addEventListener('change', handler);
element.addEventListener('input', handler);

// Document/Window Events
window.addEventListener('load', handler);
window.addEventListener('resize', handler);
document.addEventListener('DOMContentLoaded', handler);
```

## 2. Event Listeners

### Adding Event Listeners
```javascript
// Basic syntax
element.addEventListener(eventType, handlerFunction);

// With options
element.addEventListener(eventType, handlerFunction, options);

// Example
const button = document.getElementById('myButton');
button.addEventListener('click', function(event) {
    console.log('Button clicked!');
});
```

### Removing Event Listeners
```javascript
// Must use the same function reference
function handleClick(event) {
    console.log('Clicked!');
}

element.addEventListener('click', handleClick);
element.removeEventListener('click', handleClick);
```

## 3. The Event Object

### Event Object Properties
```javascript
element.addEventListener('click', function(event) {
    // Event type
    console.log(event.type);  // 'click'
    
    // Target element
    console.log(event.target);  // The clicked element
    
    // Current target (element with listener)
    console.log(event.currentTarget);
    
    // Mouse coordinates
    console.log(event.clientX, event.clientY);
    
    // Keyboard info
    console.log(event.key, event.keyCode);
});
```

### Preventing Default Behavior
```javascript
form.addEventListener('submit', function(event) {
    // Prevent form submission
    event.preventDefault();
    
    // Your custom handling code
});

link.addEventListener('click', function(event) {
    // Prevent navigation
    event.preventDefault();
});
```

## 4. Event Propagation

### Bubbling and Capturing
Events in the DOM bubble up through the ancestor elements:
```javascript
// Bubbling (default)
element.addEventListener('click', handler);

// Capturing
element.addEventListener('click', handler, { capture: true });

// Stop propagation
element.addEventListener('click', function(event) {
    event.stopPropagation();
});
```

### Event Delegation
Handle events on multiple elements using a single listener:
```javascript
// Instead of adding listeners to each button
document.getElementById('button-container').addEventListener('click', function(event) {
    if (event.target.matches('button')) {
        console.log('Button clicked:', event.target.textContent);
    }
});
```

## 5. Custom Events

### Creating Custom Events
```javascript
// Create event
const customEvent = new CustomEvent('myEvent', {
    detail: { message: 'Hello!' }
});

// Dispatch event
element.dispatchEvent(customEvent);

// Listen for custom event
element.addEventListener('myEvent', function(event) {
    console.log(event.detail.message);
});
```

## Practice Exercises

### Exercise 1: Basic Event Handling
Create handlers for:
- Click events
- Mouse movement
- Keyboard input
- Window resize

### Exercise 2: Form Validation
Build a form that:
- Validates input in real-time
- Prevents submission if invalid
- Shows error messages
- Handles different input types

### Exercise 3: Interactive List
Create a list where you can:
- Add items with enter key
- Remove items with delete button
- Edit items with double-click
- Drag and drop to reorder

### Exercise 4: Event Delegation
Build a dynamic menu system:
- Handle clicks on all menu items
- Add/remove items dynamically
- Toggle submenus
- Track active items

### Exercise 5: Custom Event System
Create a pub/sub system:
- Define custom events
- Dispatch events with data
- Handle events in different components
- Clean up event listeners

## Key Takeaways
- Events are fundamental to interactive web pages
- Event listeners should be properly managed
- Event delegation improves performance
- The event object provides useful information
- Custom events enable component communication

## Next Steps
- Complete the practice exercises
- Experiment with different event types
- Move on to Lesson 3: Forms and Validation 