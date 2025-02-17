# Lesson 1: ES6+ Features

## Learning Objectives
By the end of this lesson, you will be able to:
- Use modern JavaScript syntax and features
- Work with arrow functions and lexical scope
- Implement template literals
- Use destructuring for arrays and objects
- Work with spread and rest operators
- Understand and use default parameters
- Implement classes and inheritance
- Use modules for code organization

## 1. Arrow Functions

### Basic Syntax
```javascript
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With single parameter (parentheses optional)
const square = x => x * x;

// With no parameters
const sayHello = () => 'Hello!';

// With function body
const greet = name => {
    const message = `Hello, ${name}!`;
    return message;
};
```

### Lexical `this`
```javascript
class Timer {
    constructor() {
        this.seconds = 0;
        
        // Arrow function preserves 'this'
        setInterval(() => {
            this.seconds++;
            console.log(this.seconds);
        }, 1000);
    }
}
```

## 2. Template Literals

### Basic Usage
```javascript
const name = 'John';
const age = 30;

// String concatenation (old way)
console.log('My name is ' + name + ' and I am ' + age + ' years old');

// Template literal (new way)
console.log(`My name is ${name} and I am ${age} years old`);
```

### Multiline Strings
```javascript
const html = `
    <div>
        <h1>Title</h1>
        <p>Content</p>
    </div>
`;
```

### Tagged Templates
```javascript
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => 
        `${result}${str}${values[i] ? `<span class="highlight">${values[i]}</span>` : ''}`
    , '');
}

const name = 'John';
const html = highlight`Hello, ${name}!`;
```

## 3. Destructuring

### Array Destructuring
```javascript
// Basic array destructuring
const numbers = [1, 2, 3];
const [first, second, third] = numbers;

// Skip elements
const [a, , c] = numbers;

// Rest pattern
const [head, ...tail] = numbers;

// Default values
const [x = 0, y = 0] = [];
```

### Object Destructuring
```javascript
const person = {
    name: 'John',
    age: 30,
    city: 'New York'
};

// Basic object destructuring
const { name, age } = person;

// Rename variables
const { name: fullName, age: years } = person;

// Default values
const { country = 'USA' } = person;

// Nested destructuring
const data = {
    user: {
        id: 1,
        profile: {
            avatar: 'url'
        }
    }
};
const { user: { profile: { avatar } } } = data;
```

## 4. Spread and Rest Operators

### Spread Operator
```javascript
// Array spread
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];

// Object spread
const obj1 = { foo: 'bar', x: 42 };
const obj2 = { ...obj1, y: 13 };

// Copy arrays/objects
const copy = [...arr1];
const objCopy = { ...obj1 };
```

### Rest Parameters
```javascript
// Rest in functions
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

// Rest in destructuring
const [first, ...rest] = [1, 2, 3, 4];
const { name, ...others } = { name: 'John', age: 30, city: 'NY' };
```

## 5. Classes and Inheritance

### Class Syntax
```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        return `${this.name} makes a sound.`;
    }

    static isAnimal(obj) {
        return obj instanceof Animal;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }

    speak() {
        return `${this.name} barks!`;
    }
}
```

## 6. Modules

### Module Syntax
```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export default class Calculator {
    // ...
}

// main.js
import Calculator, { add, subtract } from './math.js';
```

## Practice Exercises

### Exercise 1: Arrow Functions
Convert traditional functions to arrow functions and handle scope:
- Function with multiple parameters
- Function with single parameter
- Function with no parameters
- Method with `this` context

### Exercise 2: Template Literals
Create template literals for:
- HTML generation
- SQL query building
- Multiline strings
- Tagged templates

### Exercise 3: Destructuring
Practice destructuring with:
- Complex objects
- Nested arrays
- Function parameters
- Mixed data structures

### Exercise 4: Spread/Rest
Implement functions using:
- Array merging
- Object cloning
- Function arguments
- Collection manipulation

### Exercise 5: Classes
Build a class hierarchy for:
- Shape calculations
- User management
- Game characters
- Data structures

## Key Takeaways
- Arrow functions provide cleaner syntax and lexical `this`
- Template literals make string manipulation easier
- Destructuring simplifies working with complex data
- Spread/rest operators enhance array/object manipulation
- Classes provide cleaner OOP syntax
- Modules help organize code better

## Next Steps
- Complete the practice exercises
- Experiment with combining features
- Move on to Lesson 2: Promises and Async/Await 