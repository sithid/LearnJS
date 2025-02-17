# Lesson 3: Functions in JavaScript

## Learning Objectives
By the end of this lesson, you will be able to:
- Declare and call functions using different syntaxes
- Understand function parameters and return values
- Work with arrow functions
- Use function scope and closures
- Implement callback functions
- Handle function hoisting
- Debug function-related issues

## Prerequisites
- Completion of Lesson 1: Variables and Data Types
- Completion of Lesson 2: Control Flow
- Understanding of basic JavaScript syntax

## 1. Function Declaration

### Basic Function Syntax
```javascript
function greet(name) {
    return `Hello, ${name}!`;
}
```

### Function Expression
```javascript
const greet = function(name) {
    return `Hello, ${name}!`;
};
```

### Arrow Function
```javascript
const greet = (name) => `Hello, ${name}!`;
```

## 2. Parameters and Arguments

### Default Parameters
```javascript
function greet(name = 'Guest') {
    return `Hello, ${name}!`;
}
```

### Rest Parameters
```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
```

### Parameter Destructuring
```javascript
function displayUser({ name, age }) {
    console.log(`${name} is ${age} years old`);
}
```

## 3. Return Values

### Single Value Return
```javascript
function add(a, b) {
    return a + b;
}
```

### Multiple Values (using objects)
```javascript
function getStats(numbers) {
    return {
        sum: numbers.reduce((a, b) => a + b),
        average: numbers.reduce((a, b) => a + b) / numbers.length
    };
}
```

## 4. Function Scope and Closures

### Lexical Scope
```javascript
function outer() {
    const message = 'Hello';
    function inner() {
        console.log(message);
    }
    return inner;
}
```

### Closures
```javascript
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        getCount: () => count
    };
}
```

## 5. Callback Functions

### Basic Callback
```javascript
function processUser(name, callback) {
    const user = { name };
    callback(user);
}
```

### Array Methods with Callbacks
```javascript
const numbers = [1, 2, 3, 4, 5];
numbers.map(num => num * 2);
numbers.filter(num => num % 2 === 0);
```

## Practice Exercises

### Exercise 1: Basic Functions
Write functions that:
```javascript
// 1. Calculate the area of a rectangle
// 2. Convert temperature between Celsius and Fahrenheit
// 3. Find the longest word in a sentence
```

### Exercise 2: Arrow Functions
```javascript
// 1. Transform an array of numbers (multiply by 2)
// 2. Filter an array for even numbers
// 3. Calculate average of numbers
```

### Exercise 3: Closures and Scope
```javascript
// 1. Create a counter function
// 2. Implement a private variable
// 3. Create a function factory
```

### Exercise 4: Callbacks
```javascript
// 1. Implement forEach from scratch
// 2. Create a simple event system
// 3. Build an async operation handler
```

## Best Practices
- Use descriptive function names (verbs for actions)
- Keep functions small and focused
- Use arrow functions for short operations
- Handle all possible return cases
- Document complex functions
- Use parameter defaults when appropriate
- Avoid side effects when possible

## Common Mistakes
- Forgetting to return a value
- Incorrect use of this keyword
- Not handling edge cases
- Mutating external state
- Callback hell
- Forgetting to pass required arguments

## Debugging Tips
1. Use console.log for function inputs/outputs
2. Check function scope variables
3. Verify callback execution
4. Test edge cases
5. Use browser debugger
6. Add parameter validation

## Additional Resources
- MDN Functions Guide
- JavaScript.info Functions
- Clean Code JavaScript
- Functional Programming Concepts
- Callback and Promise Patterns

## Next Steps
1. Complete all exercises
2. Pass all tests
3. Review solutions
4. Practice with real scenarios
5. Move to Lesson 4: Arrays and Objects

Remember: Functions are the building blocks of JavaScript applications. Take time to understand each concept thoroughly before moving on. 