// Exercise 1: Function Types
// 1. Function Declaration
function calculateArea(width, height) {
    return width * height;
}

// 2. Function Expression
const calculateAreaExpr = function(width, height) {
    return width * height;
};

// 3. Arrow Function
const calculateAreaArrow = (width, height) => width * height;

// Test cases for Exercise 1
console.log("Exercise 1: Function Types");
console.log("Function Declaration:", calculateArea(5, 3));
console.log("Function Expression:", calculateAreaExpr(5, 3));
console.log("Arrow Function:", calculateAreaArrow(5, 3));

// Exercise 2: Calculator Functions
function add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    return a + b;
}

function subtract(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    return a - b;
}

function multiply(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    return a * b;
}

function divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    if (b === 0) {
        throw new Error('Division by zero is not allowed');
    }
    return a / b;
}

// Test cases for Exercise 2
console.log("\nExercise 2: Calculator Functions");
console.log("Addition:", add(10, 5));
console.log("Subtraction:", subtract(10, 5));
console.log("Multiplication:", multiply(10, 5));
console.log("Division:", divide(10, 5));
try {
    console.log("Division by zero:", divide(10, 0));
} catch (error) {
    console.log("Error:", error.message);
}

// Exercise 3: Personal Information
function createPerson(
    name = "John Doe",
    age = 30,
    occupation = "Developer",
    location = "New York"
) {
    return {
        name,
        age,
        occupation,
        location,
        getInfo() {
            return `${this.name} is a ${this.age}-year-old ${this.occupation} from ${this.location}`;
        }
    };
}

// Test cases for Exercise 3
console.log("\nExercise 3: Personal Information");
const defaultPerson = createPerson();
const customPerson = createPerson("Jane Smith", 25, "Designer", "San Francisco");
console.log("Default values:", defaultPerson.getInfo());
console.log("Custom values:", customPerson.getInfo());

// Exercise 4: Shopping Cart
const shoppingCart = {
    items: [],
    
    addItem(name, price, quantity = 1) {
        this.items.push({ name, price, quantity });
    },
    
    removeItem(name) {
        const index = this.items.findIndex(item => item.name === name);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    },
    
    calculateTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    applyDiscount(percentage) {
        const total = this.calculateTotal();
        const discount = (total * percentage) / 100;
        return total - discount;
    }
};

// Test cases for Exercise 4
console.log("\nExercise 4: Shopping Cart");
shoppingCart.addItem("Laptop", 999.99);
shoppingCart.addItem("Mouse", 29.99, 2);
console.log("Cart:", shoppingCart.items);
console.log("Total:", shoppingCart.calculateTotal());
console.log("Discounted Total:", shoppingCart.applyDiscount(10));
shoppingCart.removeItem("Mouse");
console.log("Updated Cart:", shoppingCart.items);

// Exercise 5: Temperature Converter
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function celsiusToKelvin(celsius) {
    return celsius + 273.15;
}

// Test cases for Exercise 5
console.log("\nExercise 5: Temperature Converter");
console.log("0°C to Fahrenheit:", celsiusToFahrenheit(0));
console.log("98.6°F to Celsius:", fahrenheitToCelsius(98.6));
console.log("25°C to Kelvin:", celsiusToKelvin(25));

// Bonus Exercise: Closure Counter
function createCounter(startValue = 0) {
    let count = startValue;
    return function() {
        return ++count;
    };
}

// Test cases for Bonus Exercise
console.log("\nBonus Exercise: Closure Counter");
const counter = createCounter(5);
console.log(counter()); // 6
console.log(counter()); // 7
console.log(counter()); // 8 