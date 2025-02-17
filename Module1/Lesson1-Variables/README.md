# Lesson 1: Variables and Data Types in JavaScript

## Learning Objectives
By the end of this lesson, you will be able to:
- Declare variables using `let` and `const`
- Understand modern variable declaration best practices
- Work with JavaScript data types
- Use proper naming conventions
- Test variable declarations and operations

## Prerequisites
- Basic understanding of programming concepts
- Text editor installed
- Modern web browser
- Local development server running

## 1. Introduction to Variables

Variables are containers for storing data values. In modern JavaScript, we primarily use `let` and `const` for variable declarations.

### Variable Declaration

Modern JavaScript variable declaration:
```javascript
let changeable = "I can be changed";    // Use for values that will change
const constant = "I never change";      // Use for values that shouldn't change
```

### Rules for Variable Names
- Must start with a letter, underscore (_), or dollar sign ($)
- Can contain letters, numbers, underscores, or dollar signs
- Are case-sensitive
- Cannot use reserved JavaScript keywords
- Use camelCase for variable names

Good examples:
```javascript
let firstName = "John";
let userAge = 25;
const API_KEY = "abc123";
```

## 2. Data Types

### Primitive Types
1. **String**
   ```javascript
   let name = "John";
   let message = 'Hello';
   ```

2. **Number**
   ```javascript
   let age = 25;
   let price = 99.99;
   ```

3. **Boolean**
   ```javascript
   let isActive = true;
   let isLoggedIn = false;
   ```

4. **Undefined**
   ```javascript
   let unknownVariable;  // Value is undefined
   ```

5. **Null**
   ```javascript
   let emptyValue = null;
   ```

### Special Number Values
```javascript
let infinity = Infinity;
let negativeInfinity = -Infinity;
let notANumber = NaN;
```

## Testing Your Code

### Running Tests
1. Open `test.html` in your browser
2. Write your code in `exercises.js`
3. Tests run automatically
4. Fix any failing tests
5. Verify all tests pass

### Test Cases Cover
- Variable declaration
- Type checking
- Value assignment
- Scope rules
- Type conversion

## Practice Exercises

### Exercise 1: Variable Declaration
Create variables for the following scenarios:
```javascript
// TODO: Create variables for:
// 1. Your name (string)
// 2. Your age (number)
// 3. Your birth year (constant)
// 4. Your favorite hobby (string)
```

### Exercise 2: Data Types
Identify and create variables of different types:
```javascript
// TODO: Create variables demonstrating each data type
// 1. String
// 2. Number
// 3. Boolean
// 4. Undefined
// 5. Null
```

### Exercise 3: Type Conversion
Practice type conversion operations:
```javascript
// TODO: Convert between different types
// 1. String to Number
// 2. Number to String
// 3. Boolean to String
// 4. String to Boolean
```

## Best Practices
- Always use `const` by default
- Use `let` only when reassignment is needed
- Never use `var`
- Use meaningful variable names
- Follow consistent naming conventions
- Initialize variables when declared
- Use strict mode ('use strict')

## Common Mistakes
- Using `var` instead of `let/const`
- Not initializing variables
- Using confusing variable names
- Forgetting to declare variables
- Incorrect type conversion
- Ignoring scope rules

## Debugging Tips
1. Check variable declarations
2. Verify data types
3. Use console.log()
4. Check for typos
5. Run tests frequently

## Additional Resources
- MDN Variables Guide
- JavaScript.info Data Types
- Clean Code JavaScript
- Testing Documentation
- ES6+ Features Guide

## Next Steps
1. Complete all exercises
2. Pass all tests
3. Review solutions
4. Practice concepts
5. Move to Lesson 2: Control Flow

Remember to run the tests frequently and ensure all test cases pass before moving on. 