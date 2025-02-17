// Exercise 1: Variable Declaration Solutions
// Basic Information
let yourName = "Jane Smith";        // Example name
let yourAge = 25;                   // Example age
const birthYear = 1998;             // Example birth year
let yourHobby = "painting";         // Example hobby

console.log("My name is " + yourName);
console.log("I am " + yourAge + " years old");
console.log("I was born in " + birthYear);
console.log("I love " + yourHobby);

// Exercise 2: Working with Different Data Types Solutions
// String examples
let greeting = "Hello, World!";
let message = "Welcome to JavaScript!";

// Number examples
let temperature = 72.6;
let score = 95;

// Boolean examples
let isRaining = false;
let isSunny = true;

// Exercise 3: Variable Operations Solutions
// String concatenation
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName;
console.log("Full name: " + fullName);

// Number operations
let num1 = 10;
let num2 = 5;
let sum = num1 + num2;
let product = num1 * num2;
console.log("Sum: " + sum);
console.log("Product: " + product);

// Exercise 4: Constants vs Variables Solutions
const pi = 3.14159;
let radius = 5;
let circleArea = pi * radius * radius;
console.log("Circle area: " + circleArea);

// Exercise 5: Type Conversion Solutions
let stringNumber = "42";
let convertedNumber = Number(stringNumber);
console.log("Converted to number: " + convertedNumber + " (type: " + typeof convertedNumber + ")");

let numberToString = 123;
let convertedString = String(numberToString);
console.log("Converted to string: " + convertedString + " (type: " + typeof convertedString + ")");

// Bonus Challenge Solution:
const itemName = "JavaScript Book";
const itemPrice = 29.99;
let quantity = 2;
let totalPrice = itemPrice * quantity;

console.log("Shopping Cart Summary:");
console.log("Item: " + itemName);
console.log("Price: $" + itemPrice);
console.log("Quantity: " + quantity);
console.log("Total: $" + totalPrice); 