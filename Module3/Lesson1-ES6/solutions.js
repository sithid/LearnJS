// Exercise 1: Arrow Functions

// 1.1: Multiple parameters
const multiply = (a, b) => a * b;

// 1.2: Single parameter
const square = x => x * x;

// 1.3: No parameters
const getRandomNumber = () => Math.random();

// 1.4: This context
const counter = {
    count: 0,
    start() {
        setInterval(() => {
            this.count++;
            console.log(this.count);
        }, 1000);
    }
};

// Exercise 2: Template Literals

// 2.1: HTML Generation
function generateCard(title, content, imageUrl) {
    return `
        <div class="card">
            <img src="${imageUrl}" alt="${title}">
            <h2>${title}</h2>
            <p>${content}</p>
        </div>
    `;
}

// 2.2: SQL Query Building
function buildQuery(table, conditions) {
    return `SELECT * FROM ${table} WHERE ${conditions.join(' AND ')}`;
}

// 2.3: Tagged Template
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => 
        `${result}${str}${values[i] ? `<span class="highlight">${values[i]}</span>` : ''}`
    , '');
}

// Exercise 3: Destructuring

// 3.1: Object Destructuring
function printUserInfo(user) {
    const { name, age, city } = user;
    console.log(`${name} is ${age} years old and lives in ${city}`);
}

// 3.2: Array Destructuring
function getCoordinates() {
    return [33.8718, -118.3608];
}
const [latitude, longitude] = getCoordinates();

// 3.3: Nested Destructuring
const data = {
    user: {
        profile: {
            name: 'John',
            address: {
                street: '123 Main St',
                city: 'Boston'
            }
        }
    }
};
const { user: { profile: { address: { street, city } } } } = data;

// Exercise 4: Spread and Rest

// 4.1: Array Merging
function mergeArrays(arr1, arr2) {
    return [...arr1, ...arr2];
}

// 4.2: Object Cloning and Merging
function cloneConfig(config, overrides) {
    return { ...config, ...overrides };
}

// 4.3: Rest Parameters
const sum = (...numbers) => numbers.reduce((total, num) => total + num, 0);

// Exercise 5: Classes

// 5.1: Shape Classes
class Shape {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    getArea() {
        throw new Error('getArea() must be implemented');
    }

    toString() {
        return `${this.color} ${this.name}`;
    }
}

class Circle extends Shape {
    constructor(radius, color) {
        super('circle', color);
        this.radius = radius;
    }

    getArea() {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape {
    constructor(width, height, color) {
        super('rectangle', color);
        this.width = width;
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
}

// 5.2: User Class
class User {
    #email;
    #password;
    
    constructor(name, email, password) {
        this.name = name;
        this.role = 'user';
        this.#email = email;
        this.#password = password;
    }

    static validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    updatePassword(oldPassword, newPassword) {
        if (oldPassword === this.#password) {
            this.#password = newPassword;
            return true;
        }
        return false;
    }

    getEmail() {
        return this.#email;
    }
}

// Exercise 6: Modules

// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

export default class Calculator {
    constructor() {
        this.value = 0;
    }

    add(n) {
        this.value += n;
        return this;
    }

    subtract(n) {
        this.value -= n;
        return this;
    }

    multiply(n) {
        this.value *= n;
        return this;
    }

    divide(n) {
        if (n === 0) throw new Error('Division by zero');
        this.value /= n;
        return this;
    }

    getResult() {
        return this.value;
    }
}

// utils.js
export function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

export function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// main.js
import Calculator, { add, subtract } from './math.js';
import { formatDate, validateEmail } from './utils.js';

// Test your solutions
document.addEventListener('DOMContentLoaded', function() {
    // Test Exercise 1: Arrow Functions
    console.log('Exercise 1: Arrow Functions');
    console.log('multiply(2, 3):', multiply(2, 3));
    console.log('square(4):', square(4));
    console.log('getRandomNumber():', getRandomNumber());
    // counter.start(); // Uncomment to test counter

    // Test Exercise 2: Template Literals
    console.log('\nExercise 2: Template Literals');
    console.log(generateCard('Hello', 'World', 'image.jpg'));
    console.log(buildQuery('users', ['age > 18', 'city = "New York"']));
    console.log(highlight`Hello, ${data.user.profile.name}!`);

    // Test Exercise 3: Destructuring
    console.log('\nExercise 3: Destructuring');
    printUserInfo({ name: 'Alice', age: 25, city: 'Chicago' });
    console.log('Coordinates:', { latitude, longitude });
    console.log('Address:', { street, city });

    // Test Exercise 4: Spread and Rest
    console.log('\nExercise 4: Spread and Rest');
    console.log('Merged arrays:', mergeArrays([1, 2], [3, 4]));
    console.log('Cloned config:', cloneConfig({ theme: 'dark' }, { fontSize: 14 }));
    console.log('Sum:', sum(1, 2, 3, 4, 5));

    // Test Exercise 5: Classes
    console.log('\nExercise 5: Classes');
    const circle = new Circle(5, 'red');
    const rectangle = new Rectangle(4, 6, 'blue');
    console.log('Circle area:', circle.getArea());
    console.log('Rectangle area:', rectangle.getArea());
    
    const user = new User('John', 'john@example.com', 'password123');
    console.log('User:', user.name, user.getEmail());
    console.log('Valid email:', User.validateEmail('test@example.com'));
}); 