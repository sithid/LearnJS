// Exercise 1: Function Types
// Implement the same functionality (calculating area of a rectangle) using different function types

// TODO: 1. Function Declaration
// function calculateArea(width, height) { ... }

// TODO: 2. Function Expression
// const calculateAreaExpr = function(width, height) { ... }

// TODO: 3. Arrow Function
// const calculateAreaArrow = (width, height) => ...

// Test cases for Exercise 1
console.log("Exercise 1: Function Types");
// TODO: Uncomment and test your functions
// console.log("Function Declaration:", calculateArea(5, 3));
// console.log("Function Expression:", calculateAreaExpr(5, 3));
// console.log("Arrow Function:", calculateAreaArrow(5, 3));

// Exercise 2: Calculator Functions
// TODO: Implement calculator functions with error handling

function add(a, b) {
    // Your code here
}

function subtract(a, b) {
    // Your code here
}

function multiply(a, b) {
    // Your code here
}

function divide(a, b) {
    // Your code here
    // Remember to handle division by zero!
}

// Test cases for Exercise 2
console.log("\nExercise 2: Calculator Functions");
// TODO: Uncomment and test your calculator
// console.log("Addition:", add(10, 5));
// console.log("Subtraction:", subtract(10, 5));
// console.log("Multiplication:", multiply(10, 5));
// console.log("Division:", divide(10, 5));
// console.log("Division by zero:", divide(10, 0));

// Exercise 3: Personal Information
// Create a function that returns an object with personal details
function createPerson(
    name = "John Doe",
    age = 30,
    occupation = "Developer",
    location = "New York"
) {
    // Your code here
    // Return an object with the personal information
}

// Test cases for Exercise 3
console.log("\nExercise 3: Personal Information");
// TODO: Uncomment and test the function
// console.log("Default values:", createPerson());
// console.log("Custom values:", createPerson("Jane Smith", 25, "Designer", "San Francisco"));

// Exercise 4: Shopping Cart
// TODO: Implement shopping cart functionality

const shoppingCart = {
    items: [],
    
    addItem(name, price, quantity = 1) {
        // Your code here
    },
    
    removeItem(name) {
        // Your code here
    },
    
    calculateTotal() {
        // Your code here
    },
    
    applyDiscount(percentage) {
        // Your code here
    }
};

// Test cases for Exercise 4
console.log("\nExercise 4: Shopping Cart");
// TODO: Uncomment and test the shopping cart
// shoppingCart.addItem("Laptop", 999.99);
// shoppingCart.addItem("Mouse", 29.99, 2);
// console.log("Cart:", shoppingCart.items);
// console.log("Total:", shoppingCart.calculateTotal());
// console.log("Discounted Total:", shoppingCart.applyDiscount(10));
// shoppingCart.removeItem("Mouse");
// console.log("Updated Cart:", shoppingCart.items);

// Exercise 5: Temperature Converter
// TODO: Implement temperature conversion functions

function celsiusToFahrenheit(celsius) {
    // Your code here
}

function fahrenheitToCelsius(fahrenheit) {
    // Your code here
}

function celsiusToKelvin(celsius) {
    // Your code here
}

// Test cases for Exercise 5
console.log("\nExercise 5: Temperature Converter");
// TODO: Uncomment and test your conversion functions
// console.log("0°C to Fahrenheit:", celsiusToFahrenheit(0));
// console.log("98.6°F to Celsius:", fahrenheitToCelsius(98.6));
// console.log("25°C to Kelvin:", celsiusToKelvin(25));

// Bonus Exercise: Closure Counter
// TODO: Create a counter function that uses closure
function createCounter(startValue = 0) {
    // Your code here
}

// Test cases for Bonus Exercise
console.log("\nBonus Exercise: Closure Counter");
// TODO: Uncomment and test your counter
// const counter = createCounter(5);
// console.log(counter()); // Should print 6
// console.log(counter()); // Should print 7
// console.log(counter()); // Should print 8

// Remember to test your code by uncommenting the test cases!
// Happy coding! 🚀 