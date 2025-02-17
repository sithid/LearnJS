# Lesson 1: DOM Basics

## Learning Objectives
By the end of this lesson, you will be able to:
- Understand what the DOM (Document Object Model) is
- Select elements using different methods
- Modify element content and attributes
- Create and remove elements
- Navigate the DOM tree
- Modify element styles

## 1. Understanding the DOM

The DOM (Document Object Model) is a programming interface for HTML documents. It represents the page as a tree-like structure where each HTML element is a node.

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Welcome</h1>
    <div id="container">
        <p>This is a paragraph</p>
    </div>
</body>
</html>
```

This HTML creates a tree structure:
```
document
└── html
    ├── head
    │   └── title
    │       └── "My Page"
    └── body
        ├── h1
        │   └── "Welcome"
        └── div
            └── p
                └── "This is a paragraph"
```

## 2. Selecting Elements

### By ID
```javascript
// Select a single element by ID
const container = document.getElementById('container');
```

### By Class Name
```javascript
// Select elements by class name
const items = document.getElementsByClassName('item');
```

### By Tag Name
```javascript
// Select elements by tag name
const paragraphs = document.getElementsByTagName('p');
```

### Modern Selectors
```javascript
// Select first matching element
const firstItem = document.querySelector('.item');

// Select all matching elements
const allItems = document.querySelectorAll('.item');
```

## 3. Modifying Elements

### Content Modification
```javascript
// Change text content
element.textContent = 'New text';

// Change HTML content
element.innerHTML = '<span>New HTML</span>';
```

### Attribute Modification
```javascript
// Get attribute
const value = element.getAttribute('class');

// Set attribute
element.setAttribute('class', 'new-class');

// Remove attribute
element.removeAttribute('class');

// Check if attribute exists
const hasAttribute = element.hasAttribute('class');
```

## 4. Creating and Removing Elements

### Creating Elements
```javascript
// Create new element
const newDiv = document.createElement('div');

// Add text content
newDiv.textContent = 'New Element';

// Add to document
parentElement.appendChild(newDiv);
```

### Removing Elements
```javascript
// Remove element
element.remove();

// Remove child element
parentElement.removeChild(childElement);
```

## 5. DOM Navigation

### Parent-Child Navigation
```javascript
// Get parent
const parent = element.parentElement;

// Get children
const children = element.children;
const firstChild = element.firstElementChild;
const lastChild = element.lastElementChild;
```

### Sibling Navigation
```javascript
// Get siblings
const nextSibling = element.nextElementSibling;
const previousSibling = element.previousElementSibling;
```

## 6. Modifying Styles

### Direct Style Modification
```javascript
// Change single style
element.style.color = 'red';
element.style.backgroundColor = 'blue';

// Multiple styles
Object.assign(element.style, {
    color: 'red',
    backgroundColor: 'blue',
    padding: '10px'
});
```

### CSS Classes
```javascript
// Add class
element.classList.add('highlight');

// Remove class
element.classList.remove('highlight');

// Toggle class
element.classList.toggle('active');

// Check if class exists
const hasClass = element.classList.contains('highlight');
```

## Practice Exercises

### Exercise 1: Element Selection
Create functions to:
- Find element by ID
- Find elements by class
- Find elements by tag name
- Use querySelector for complex selection

### Exercise 2: Content Manipulation
Create a system to:
- Change text content
- Update HTML content
- Modify attributes
- Toggle classes

### Exercise 3: DOM Creation
Build a function that:
- Creates new elements
- Adds them to the document
- Removes specific elements
- Moves elements around

### Exercise 4: Style Manipulation
Create functions to:
- Change element colors
- Modify dimensions
- Update visibility
- Apply multiple styles

### Exercise 5: Dynamic List
Build a dynamic list that:
- Adds items
- Removes items
- Updates items
- Sorts items

## Key Takeaways
- The DOM represents HTML as a tree structure
- Multiple methods exist for selecting elements
- Elements can be created, modified, and removed
- Styles can be changed programmatically
- DOM manipulation is key to dynamic web pages

## Next Steps
- Complete the practice exercises
- Experiment with different selection methods
- Move on to Lesson 2: Event Handling 