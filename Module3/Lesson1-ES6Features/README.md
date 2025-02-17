# Lesson 1: ES6+ Features in JavaScript

## Learning Objectives
By the end of this lesson, you will be able to:
- Master modern ES6+ syntax and features
- Use destructuring and spread operators
- Implement template literals effectively
- Work with modern variable declarations
- Apply modern object/array methods
- Write clean modern JavaScript code

## Prerequisites
- Understanding of basic JavaScript
- Completion of Module 2
- Modern browser with ES6+ support
- Local development environment

## 1. Modern Variable Declarations

### Let and Const
```javascript
// Block scoping
let counter = 0;
const MAX_COUNT = 10;

// Temporal Dead Zone
console.log(counter); // Works
console.log(newVar); // ReferenceError
let newVar = 5;
```

### Template Literals
```javascript
const name = 'John';
const age = 30;

// String interpolation
const greeting = `Hello, ${name}!`;
const bio = `${name} is ${age} years old.`;

// Multi-line strings
const html = `
    <div>
        <h1>${name}</h1>
        <p>Age: ${age}</p>
    </div>
`;
```

## 2. Destructuring

### Array Destructuring
```javascript
// Basic destructuring
const [first, second] = [1, 2];

// Skip elements
const [, , third] = [1, 2, 3];

// Rest pattern
const [head, ...tail] = [1, 2, 3, 4];

// Default values
const [x = 0, y = 0] = [1];
```

### Object Destructuring
```javascript
const user = {
    name: 'John',
    age: 30,
    address: {
        city: 'Boston',
        country: 'USA'
    }
};

// Basic destructuring
const { name, age } = user;

// Nested destructuring
const { address: { city } } = user;

// Rename variables
const { name: userName } = user;

// Default values
const { country = 'Unknown' } = user;
```

## 3. Spread and Rest

### Spread Operator
```javascript
// Array spreading
const numbers = [1, 2, 3];
const combined = [...numbers, 4, 5];

// Object spreading
const defaults = { theme: 'light' };
const custom = { ...defaults, theme: 'dark' };

// Clone arrays/objects
const clone = [...numbers];
const objClone = { ...user };
```

### Rest Parameters
```javascript
// Rest in functions
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

// Rest in destructuring
const [first, ...rest] = [1, 2, 3, 4];
const { name, ...userInfo } = user;
```

## 4. Arrow Functions

### Syntax and Usage
```javascript
// Basic arrow function
const add = (a, b) => a + b;

// Multiple lines
const process = (data) => {
    const result = doSomething(data);
    return result;
};

// Object literal return
const createUser = (name, age) => ({ name, age });
```

## Testing Your Code

### Running Tests
1. Open test.html in your browser
2. Complete exercises in exercises.js
3. Run tests to verify your solutions
4. Check solutions.js for reference

### Test Cases Cover
- Variable declarations
- Template literals
- Destructuring
- Spread/rest operators
- Arrow functions
- Modern methods

## Practice Exercises

### Exercise 1: Modern Syntax
1. Variable declarations
2. Template literals
3. String methods

### Exercise 2: Destructuring
1. Array destructuring
2. Object destructuring
3. Nested structures

### Exercise 3: Spread/Rest
1. Array operations
2. Object operations
3. Function parameters

### Exercise 4: Arrow Functions
1. Basic functions
2. Method context
3. Callbacks

## Best Practices
- Use const by default
- Prefer destructuring
- Apply template literals
- Utilize arrow functions
- Implement modern methods
- Write clean code

## Common Mistakes
- Temporal dead zone issues
- This context in arrows
- Destructuring depth
- Spread limitations
- Mutation problems
- Scope confusion

## Next Steps
- Complete all exercises
- Ensure all tests pass
- Review solutions
- Move to next lesson