# Lesson 3: JavaScript Modules

## Overview
This lesson covers JavaScript modules, a fundamental feature for organizing and structuring code in modern JavaScript applications. You'll learn how to create, export, and import modules, understand different module patterns, and implement best practices for module organization.

## Learning Objectives
By the end of this lesson, you will be able to:
- Create and use ES6 modules with import/export statements
- Understand and implement different types of exports (named, default, and aggregated)
- Organize code using module patterns and best practices
- Handle module dependencies and circular dependencies
- Implement dynamic module loading
- Maintain module state safely
- Use module initialization patterns
- Apply common module design patterns

## Prerequisites
- Completion of Lesson 1 (ES6 Features)
- Completion of Lesson 2 (Promises and Async/Await)
- Basic understanding of JavaScript objects and functions
- Familiarity with modern JavaScript syntax

## Exercises

### Exercise 1: Basic Module Exports
Create a module that exports mathematical constants and utility functions using named exports.

### Exercise 2: Default Exports
Implement a Calculator class as a default export with basic arithmetic operations.

### Exercise 3: Module Organization
Create a User module with proper interface organization using both named and default exports.

### Exercise 4: Module Dependencies
Implement a data processing module that depends on utility modules for date formatting and input validation.

### Exercise 5: Dynamic Imports
Create a module that demonstrates dynamic loading of features based on runtime conditions.

### Exercise 6: Module Aggregation
Implement a module that re-exports functionality from multiple other modules.

### Exercise 7: Circular Dependencies
Create two modules that depend on each other and handle the circular dependency properly.

### Exercise 8: Module State
Implement a module that maintains internal state while providing a clean interface.

### Exercise 9: Module Initialization
Create a module with proper initialization and cleanup patterns.

### Exercise 10: Module Patterns
Implement common module patterns including Singleton, Factory, and Observer patterns.

## Getting Started
1. Open `exercises.js` in your code editor
2. Implement each exercise following the provided comments and instructions
3. Use `test.html` to check your implementations
4. Review the solutions in `solutions.js` after completing the exercises

## Testing Your Code
1. Open `test.html` in your browser
2. Each exercise has corresponding test cases
3. Tests will show as passing (green) or failing (red)
4. Review error messages for failing tests to understand what needs to be fixed

## Tips and Common Pitfalls
- Always use `export` and `import` statements at the module level
- Be careful with circular dependencies
- Remember that modules are singleton by default
- Use default exports sparingly and prefer named exports
- Keep modules focused and follow single responsibility principle
- Consider using barrel files (index.js) for cleaner imports
- Be mindful of module initialization order
- Use async imports only when necessary

## Additional Resources
- [MDN: JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [JavaScript.info: Modules](https://javascript.info/modules)
- [Exploring ES6: Modules](https://exploringjs.com/es6/ch_modules.html)
- [Clean Code in JavaScript](https://github.com/ryanmcdermott/clean-code-javascript#modules)

## Next Steps
After completing this lesson, you'll be ready to:
- Build larger applications with proper module organization
- Implement advanced module patterns in real-world projects
- Create maintainable and scalable JavaScript applications
- Move on to more advanced JavaScript topics 