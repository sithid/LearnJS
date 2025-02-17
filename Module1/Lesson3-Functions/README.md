# Lesson 3: Functions and Scope in JavaScript

## Learning Objectives
By the end of this lesson, you will be able to:
- Define and call functions
- Work with function parameters and return values
- Understand function scope and variable visibility
- Use arrow functions
- Apply different function types (named, anonymous, callback)
- Understand closures and their practical uses

## 1. Function Basics

### Function Declaration
The basic syntax for declaring a function:

```javascript
function greet(name) {
    return "Hello, " + name + "!";
}

// Calling the function
console.log(greet("John")); // Output: Hello, John!
```

### Function Expression
Assigning a function to a variable:

```javascript
const greet = function(name) {
    return "Hello, " + name + "!";
};

console.log(greet("Jane")); // Output: Hello, Jane!
```

### Arrow Functions
A more concise way to write functions (ES6+):

```javascript
const greet = (name) => {
    return "Hello, " + name + "!";
};

// Even shorter for single expressions
const greetShort = name => "Hello, " + name + "!";
```

## 2. Parameters and Arguments

### Default Parameters
```javascript
function greet(name = "Guest") {
    return "Hello, " + name + "!";
}

console.log(greet());        // Output: Hello, Guest!
console.log(greet("John")); // Output: Hello, John!
```

### Rest Parameters
Handling multiple arguments:

```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // Output: 10
```

## 3. Scope and Variable Visibility

### Global Scope
Variables declared outside any function:

```javascript
let globalVar = "I'm global";

function testScope() {
    console.log(globalVar); // Can access global variable
}
```

### Local Scope
Variables declared inside a function:

```javascript
function testScope() {
    let localVar = "I'm local";
    console.log(localVar); // Can access local variable
}
// console.log(localVar); // Error: localVar is not defined
```

### Block Scope
Variables declared with let and const inside blocks:

```javascript
if (true) {
    let blockVar = "I'm in a block";
    const alsoInBlock = "Me too";
}
// console.log(blockVar); // Error: blockVar is not defined
```

## 4. Closures
A closure is a function that has access to variables in its outer scope:

```javascript
function createCounter() {
    let count = 0;
    return function() {
        return ++count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

## 5. Callback Functions
Functions passed as arguments to other functions:

```javascript
function doOperation(x, y, operation) {
    return operation(x, y);
}

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

console.log(doOperation(5, 3, add));      // 8
console.log(doOperation(5, 3, multiply)); // 15
```

## Practice Exercises

### Exercise 1: Function Types
Create the same functionality using:
1. Function Declaration
2. Function Expression
3. Arrow Function

### Exercise 2: Calculator Functions
Create functions for:
- Addition
- Subtraction
- Multiplication
- Division
With proper error handling

### Exercise 3: Personal Information
Create a function that returns an object with personal details using default parameters

### Exercise 4: Shopping Cart
Create functions to:
- Add items
- Remove items
- Calculate total
- Apply discount

### Exercise 5: Temperature Converter
Create functions to convert between:
- Celsius to Fahrenheit
- Fahrenheit to Celsius
- Celsius to Kelvin

## Key Takeaways
- Functions are reusable blocks of code
- Arrow functions provide a concise syntax
- Understanding scope is crucial for managing variables
- Closures help maintain private state
- Callbacks are essential for asynchronous operations

## Next Steps
- Complete the practice exercises
- Experiment with different function types
- Move on to Lesson 4: Arrays and Objects 