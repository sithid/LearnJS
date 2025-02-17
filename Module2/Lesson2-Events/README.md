# Lesson 2: Events in JavaScript

## Learning Objectives
By the end of this lesson, you will be able to:
- Master event handling techniques
- Implement event delegation
- Create custom events
- Handle browser events effectively
- Test event-driven code
- Apply event best practices
- Ensure accessibility in event handling

## Prerequisites
- Understanding of DOM manipulation
- Completion of Lesson 1
- Modern browser with DevTools
- Local development environment

## 1. Event Fundamentals

### Event Listeners
```javascript
// Basic event listener
element.addEventListener('click', (event) => {
    console.log('Clicked!', event);
});

// Multiple events
const handleHover = (event) => {
    const { type, target } = event;
    console.log(`${type} event on`, target);
};

element.addEventListener('mouseenter', handleHover);
element.addEventListener('mouseleave', handleHover);

// Remove listener
element.removeEventListener('click', handleClick);
```

### Event Object Properties
```javascript
function handleEvent(event) {
    // Common properties
    const {
        type,        // Event type
        target,      // Element that triggered the event
        currentTarget, // Element handling the event
        timeStamp,   // When the event occurred
        bubbles,     // Whether event bubbles
        cancelable   // Whether event can be canceled
    } = event;
    
    // Mouse event properties
    const {
        clientX, clientY,   // Coordinates relative to viewport
        pageX, pageY,       // Coordinates relative to document
        button              // Mouse button pressed
    } = event;
    
    // Keyboard event properties
    const {
        key,        // Key pressed
        code,       // Physical key code
        altKey,     // Whether Alt was pressed
        ctrlKey,    // Whether Ctrl was pressed
        shiftKey    // Whether Shift was pressed
    } = event;
}
```

## 2. Event Delegation

### Implementation
```javascript
// Event delegation pattern
document.querySelector('.list').addEventListener('click', (event) => {
    if (event.target.matches('.list-item')) {
        handleItemClick(event);
    } else if (event.target.matches('.delete-button')) {
        handleDeleteClick(event);
    }
});

// Dynamic content handling
function setupDynamicList() {
    const list = document.querySelector('.dynamic-list');
    
    list.addEventListener('click', handleListClick);
    
    function handleListClick(event) {
        const button = event.target.closest('.action-button');
        if (!button) return;
        
        const action = button.dataset.action;
        const item = button.closest('.list-item');
        
        actions[action]?.(item);
    }
}
```

### Event Bubbling and Capturing
```javascript
// Event phases
element.addEventListener('click', (event) => {
    console.log('Bubbling phase');
}, false); // default

element.addEventListener('click', (event) => {
    console.log('Capture phase');
}, true);

// Stop propagation
element.addEventListener('click', (event) => {
    event.stopPropagation();
    // Handle event
});
```

## 3. Custom Events

### Creating Custom Events
```javascript
// Custom event creation
const customEvent = new CustomEvent('userAction', {
    bubbles: true,
    cancelable: true,
    detail: {
        userId: 123,
        action: 'save'
    }
});

// Dispatch event
element.dispatchEvent(customEvent);

// Listen for custom event
element.addEventListener('userAction', (event) => {
    const { userId, action } = event.detail;
    console.log(`User ${userId} performed ${action}`);
});
```

### Event Communication
```javascript
class EventBus {
    constructor() {
        this.events = new Map();
    }
    
    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(callback);
    }
    
    emit(event, data) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(callback => {
                callback(data);
            });
        }
    }
}
```

## 4. Form Events

### Form Handling
```javascript
// Form submission
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
        await submitForm(data);
        showSuccess('Form submitted successfully');
    } catch (error) {
        showError('Form submission failed');
    }
});

// Input validation
input.addEventListener('input', (event) => {
    const value = event.target.value;
    const isValid = validateInput(value);
    
    updateValidationUI(event.target, isValid);
});
```

## Testing Your Code

### Running Tests
1. Open `test.html` in your browser
2. Write your code in `exercises.js`
3. Tests run automatically
4. Fix any failing tests
5. Verify all tests pass

### Test Cases Cover
- Event listener handling
- Event delegation
- Custom events
- Form validation
- Error scenarios
- Event bubbling
- Performance impact

## Practice Exercises

### Exercise 1: Event Basics
Implement event handlers:
- Click events
- Mouse events
- Keyboard events
- Form events

### Exercise 2: Event Delegation
Create delegation systems:
- Dynamic lists
- Complex UIs
- Nested elements
- Performance optimization

### Exercise 3: Custom Events
Build event systems:
- Custom event creation
- Event communication
- State management
- Error handling

### Exercise 4: Form Handling
Implement form features:
- Real-time validation
- Submit handling
- File uploads
- Error display

## Best Practices
- Use event delegation
- Remove unused listeners
- Optimize event handlers
- Handle errors properly
- Consider performance
- Ensure accessibility
- Test thoroughly

## Common Mistakes
- Memory leaks
- Missing cleanup
- Event bubbling issues
- Performance problems
- Accessibility oversights
- Poor error handling

## Debugging Tips
1. Use browser DevTools
2. Monitor event listeners
3. Check event propagation
4. Test performance
5. Verify accessibility
6. Inspect event objects

## Additional Resources
- MDN Events Guide
- Event Performance Tips
- Accessibility Guidelines
- Testing Event Handlers
- Browser DevTools Guide

## Next Steps
1. Complete all exercises
2. Pass all tests
3. Review solutions
4. Practice patterns
5. Move to Lesson 3: Forms

Remember to clean up event listeners and ensure proper error handling.