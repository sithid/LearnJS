# Lesson 3: Modules in JavaScript

## Learning Objectives
By the end of this lesson, you will be able to:
- Understand JavaScript module system
- Use import and export statements
- Work with default and named exports
- Implement module patterns
- Handle circular dependencies
- Use dynamic imports

## 1. Module Basics

### Module Syntax
```javascript
// Exporting
export const value = 42;
export function doSomething() { }
export class MyClass { }

// Default export
export default class MainClass { }

// Importing
import { value, doSomething } from './module.js';
import MainClass from './module.js';
import * as module from './module.js';
```

### Module Types

#### Named Exports
```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const PI = 3.14159;

// main.js
import { add, subtract, PI } from './math.js';
```

#### Default Exports
```javascript
// user.js
export default class User {
    constructor(name) {
        this.name = name;
    }
}

// main.js
import User from './user.js';
```

#### Mixed Exports
```javascript
// utils.js
export const helper = () => { };
export default class MainUtil { }

// main.js
import MainUtil, { helper } from './utils.js';
```

## 2. Module Organization

### File Structure
```
project/
├── src/
│   ├── modules/
│   │   ├── math.js
│   │   ├── user.js
│   │   └── utils.js
│   └── main.js
└── index.html
```

### Module Patterns
```javascript
// Namespace Pattern
export const MathUtils = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b
};

// Factory Pattern
export const createUser = (name, role) => ({
    name,
    role,
    getInfo: () => `${name} (${role})`
});
```

## 3. Advanced Module Features

### Dynamic Imports
```javascript
async function loadModule() {
    try {
        const module = await import('./dynamic-module.js');
        module.init();
    } catch (error) {
        console.error('Module loading failed:', error);
    }
}
```

### Module Aggregation
```javascript
// index.js
export { default as User } from './user.js';
export { default as Product } from './product.js';
export * from './utils.js';
```

### Circular Dependencies
```javascript
// Avoid circular dependencies by:
// 1. Restructuring modules
// 2. Using dependency injection
// 3. Creating an intermediary module
```

## Practice Exercises

### Exercise 1: Basic Modules
Create modules for:
- Mathematical operations
- String utilities
- Date formatting
- Number validation

### Exercise 2: Module Organization
Implement a module system for:
- User management
- Product catalog
- Shopping cart
- Order processing

### Exercise 3: Advanced Patterns
Create modules using:
- Factory pattern
- Singleton pattern
- Observer pattern
- Builder pattern

### Exercise 4: Dynamic Loading
Implement:
- Lazy loading of modules
- Conditional module loading
- Error handling for module loading
- Loading progress indicators

### Exercise 5: Real Application
Build a modular application with:
- Core functionality module
- UI components module
- Data management module
- Utility functions module

## Key Takeaways
- Modules help organize and maintain code
- Use named exports for multiple items
- Use default exports for main functionality
- Consider module patterns for better organization
- Handle dynamic imports carefully
- Avoid circular dependencies

## Next Steps
- Complete the practice exercises
- Experiment with different module patterns
- Move on to Module 4: Projects 