// Exercise 1: Arrow Functions
// TODO: Convert these traditional functions to arrow functions

// 1.1: Multiple parameters
function multiply(a, b) {
    return a * b;
}

// 1.2: Single parameter
function square(x) {
    return x * x;
}

// 1.3: No parameters
function getRandomNumber() {
    return Math.random();
}

// 1.4: This context
const counter = {
    count: 0,
    start: function() {
        setInterval(function() {
            this.count++;
            console.log(this.count);
        }.bind(this), 1000);
    }
};

// Exercise 2: Template Literals
// TODO: Rewrite these string concatenations using template literals

// 2.1: HTML Generation
function generateCard(title, content, imageUrl) {
    // Convert to template literal
    return '<div class="card">' +
           '<img src="' + imageUrl + '" alt="' + title + '">' +
           '<h2>' + title + '</h2>' +
           '<p>' + content + '</p>' +
           '</div>';
}

// 2.2: SQL Query Building
function buildQuery(table, conditions) {
    // Convert to template literal
    return 'SELECT * FROM ' + table + ' WHERE ' + conditions.join(' AND ');
}

// 2.3: Create a tagged template function
function highlight(strings, ...values) {
    // Your code here:
    // Wrap each value with <span class="highlight">value</span>
}

// Exercise 3: Destructuring
// TODO: Use destructuring to simplify these code snippets

// 3.1: Object Destructuring
function printUserInfo(user) {
    // Destructure user object to get name, age, and city
    const name = user.name;
    const age = user.age;
    const city = user.city;
    
    console.log(name + ' is ' + age + ' years old and lives in ' + city);
}

// 3.2: Array Destructuring
function getCoordinates() {
    return [33.8718, -118.3608];
}
// TODO: Destructure the coordinates into latitude and longitude variables

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
// TODO: Use destructuring to get street and city

// Exercise 4: Spread and Rest
// TODO: Use spread and rest operators to complete these tasks

// 4.1: Array Merging
function mergeArrays(arr1, arr2) {
    // Merge arrays using spread operator
}

// 4.2: Object Cloning and Merging
function cloneConfig(config, overrides) {
    // Clone config and merge with overrides using spread operator
}

// 4.3: Rest Parameters
function sum() {
    // Convert to use rest operator and reduce to sum all arguments
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

// Exercise 5: Classes
// TODO: Implement the following class hierarchy

// 5.1: Shape Classes
class Shape {
    // Base shape class
    // Should have a constructor that sets the name and color
    // Should have a getArea() method
}

class Circle extends Shape {
    // Circle class extending Shape
    // Should have a constructor that takes radius
    // Should implement getArea()
}

class Rectangle extends Shape {
    // Rectangle class extending Shape
    // Should have a constructor that takes width and height
    // Should implement getArea()
}

// 5.2: User Class
class User {
    // Implement user class with:
    // - Private fields for email and password
    // - Public fields for name and role
    // - Static method to validate email
    // - Method to update password
}

// Exercise 6: Modules
// Note: This is just a demonstration of module syntax
// These would normally be in separate files

// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

export default class Calculator {
    // Implement calculator class
}

// utils.js
export function formatDate(date) {
    // Implement date formatting
}

export function validateEmail(email) {
    // Implement email validation
}

// main.js
// TODO: Import the above modules and use them

// Test your solutions
document.addEventListener('DOMContentLoaded', function() {
    // Test Exercise 1
    console.log('Exercise 1: Arrow Functions');
    // Add your tests here

    // Test Exercise 2
    console.log('\nExercise 2: Template Literals');
    // Add your tests here

    // Test Exercise 3
    console.log('\nExercise 3: Destructuring');
    // Add your tests here

    // Test Exercise 4
    console.log('\nExercise 4: Spread and Rest');
    // Add your tests here

    // Test Exercise 5
    console.log('\nExercise 5: Classes');
    // Add your tests here
}); 