// Exercise 1: Variable Declaration
// Declare variables for your personal information
// TODO: Replace the null values with your information


// Basic Information
export let yourName = "James Glosser"; // Add your name as a string
export let yourAge = 38;         // Add your age as a number
export const birthYear = 1986;     // Add your birth year as a number
export let yourHobby = "Gaming and Coding";       // Add your favorite hobby as a string

// Test your variables by uncommenting these lines:
console.log("My name is " + yourName);
console.log("I am " + yourAge + " years old");
console.log("I was born in " + birthYear);
console.log("I love " + yourHobby);


// Exercise 2: Working with Different Data Types
// TODO: Create variables using different data types

// String examples
export let greeting = "Hello, World!";
export let message = "I love to code and game!";         // Create a message of your choice

// Number examples
export let temperature = 72.6;
export let score = 100;          // Add a number for a game score

// Boolean examples
export let isRaining = false;
export let isSunny = true;        // Set this to true or false based on your weather

// Exercise 3: Variable Operations
// TODO: Try some basic operations with your variables

// String concatenation
export let firstName = "John";
export let lastName = "Doe";
export let fullName = firstName + " " + lastName;       // Combine firstName and lastName

// Number operations
export let num1 = 10;
export let num2 = 5;
export let sum = num1 + num2;           // Add num1 and num2
export let product = num1 * num2;       // Multiply num1 and num2

// Exercise 4: Constants vs Variables
// TODO: Try to understand the difference between const and let

export const pi = 3.14159;
export let radius = 5;
export let circleArea = pi * Math.pow(radius, 2);    // Calculate the area of a circle (pi * radius * radius)

// Try uncommenting the line below - it will cause an error because pi is a constant
// pi = 3.14;

// Exercise 5: Type Conversion
// TODO: Convert between different data types

export let stringNumber = "42";
export let convertedNumber = Number(stringNumber);    // Convert stringNumber to a number using Number()

export let numberToString = 123;
export let convertedString = String(numberToString);    // Convert numberToString to a string using String()

// Bonus Challenge:
// Create variables for a simple shopping cart
export const itemName = "JavaScript Book";
export const itemPrice = 29.99;
export let quantity = 2;
export let totalPrice = itemPrice * quantity;         // Calculate the total price

// Print shopping cart info
console.log("Item: " + itemName);
console.log("Price: $" + itemPrice);
console.log("Quantity: " + quantity);
console.log("Total: $" + totalPrice);

// Remember to test your code by uncommenting the test cases!
// Happy coding! ðŸš€ 