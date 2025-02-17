# Lesson 1: DOM Basics

## Learning Objectives
By the end of this lesson, you will be able to:
- Master modern DOM selection methods
- Manipulate DOM elements effectively
- Create and modify DOM content
- Handle DOM traversal
- Test DOM operations
- Apply best practices for DOM manipulation

## Prerequisites
- Understanding of HTML and CSS
- Completion of Module 1
- Modern browser with DevTools
- Local development environment

## 1. DOM Selection

### Modern Selectors
```javascript
// Single element selectors
const element = document.querySelector('.class-name');
const container = document.getElementById('container');

// Multiple element selectors
const elements = document.querySelectorAll('.item');
const buttons = document.getElementsByTagName('button');

// Complex selectors
const nestedElement = document.querySelector('.parent > .child');
const specificInput = document.querySelector('input[type="email"]');
```

### DOM Traversal
```javascript
// Parent and children
const parent = element.parentElement;
const children = element.children;
const firstChild = element.firstElementChild;
const lastChild = element.lastElementChild;

// Siblings
const nextSibling = element.nextElementSibling;
const previousSibling = element.previousElementSibling;

// Closest ancestor
const ancestor = element.closest('.ancestor');
```

## 2. DOM Manipulation

### Content Modification
```javascript
// Text content
element.textContent = 'New text';
element.innerText = 'Visible text';

// HTML content
element.innerHTML = '<span>New HTML</span>';

// Safe HTML insertion
const span = document.createElement('span');
span.textContent = 'Safe text';
element.appendChild(span);
```

### Attributes and Properties
```javascript
// Attribute manipulation
element.setAttribute('data-id', '123');
element.getAttribute('data-id');
element.hasAttribute('disabled');
element.removeAttribute('disabled');

// Dataset properties
element.dataset.userId = '456';
const userId = element.dataset.userId;

// Class manipulation
element.classList.add('active');
element.classList.remove('disabled');
element.classList.toggle('visible');
element.classList.replace('old', 'new');
```

## 3. DOM Creation and Removal

### Creating Elements
```javascript
// Create element
const div = document.createElement('div');
div.className = 'container';
div.textContent = 'New element';

// Clone element
const clone = div.cloneNode(true);

// Insert elements
parent.appendChild(div);
parent.insertBefore(div, referenceNode);
referenceNode.before(div);
referenceNode.after(div);
```

### Removing Elements
```javascript
// Remove element
element.remove();

// Remove child
parent.removeChild(child);

// Clear contents
while (element.firstChild) {
    element.firstChild.remove();
}
```

## 4. Style Manipulation

### CSS Styles
```javascript
// Direct style manipulation
element.style.backgroundColor = 'blue';
element.style.marginTop = '20px';

// Multiple styles
Object.assign(element.style, {
    color: 'white',
    padding: '10px',
    borderRadius: '4px'
});

// Computed styles
const computed = window.getComputedStyle(element);
const color = computed.getPropertyValue('color');
```

## Testing Your Code

### Running Tests
1. Open `test.html` in your browser
2. Write your code in `exercises.js`
3. Tests run automatically
4. Fix any failing tests
5. Verify all tests pass

### Test Cases Cover
- Element selection
- Content manipulation
- Attribute handling
- Style modifications
- DOM traversal
- Element creation/removal
- Error handling

## Practice Exercises

### Exercise 1: DOM Selection
Implement selection utilities:
- Custom selector functions
- Element filtering
- DOM traversal helpers
- Performance optimization

### Exercise 2: Content Manipulation
Create content handlers:
- Safe HTML insertion
- Text processing
- Attribute management
- Class manipulation

### Exercise 3: DOM Creation
Build element factories:
- Component creation
- Template handling
- Dynamic content
- Event binding

### Exercise 4: Style Management
Implement style utilities:
- Style application
- Animation helpers
- Theme switching
- Responsive adjustments

## Best Practices
- Use modern selection methods
- Avoid innerHTML when possible
- Batch DOM operations
- Implement error handling
- Consider performance
- Write comprehensive tests
- Follow accessibility guidelines

## Common Mistakes
- Direct innerHTML usage
- Excessive DOM queries
- Memory leaks
- Poor performance
- Missing error handling
- Accessibility issues

## Debugging Tips
1. Use browser DevTools
2. Inspect element state
3. Monitor performance
4. Test accessibility
5. Check memory usage
6. Validate HTML structure

## Additional Resources
- MDN DOM Documentation
- DOM Performance Guide
- Accessibility Guidelines
- Testing DOM Operations
- Browser DevTools Guide

## Next Steps
1. Complete all exercises
2. Pass all tests
3. Review solutions
4. Practice concepts
5. Move to Lesson 2: Events

Remember to consider accessibility and performance when manipulating the DOM. 