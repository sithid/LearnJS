// Exercise 1: Basic Functions

// 1. Calculate the area of a rectangle
export function calculateRectangleArea(width, height) {
    // TODO: Return the area of the rectangle (width * height)
    // Return null for invalid inputs (negative or zero)
    return null;
}

// 2. Convert Celsius to Fahrenheit
export function celsiusToFahrenheit(celsius) {
    // TODO: Convert Celsius to Fahrenheit using the formula: (C × 9/5) + 32
    // Return null for invalid inputs
    return null;
}

// 3. Find the longest word in a sentence
export function findLongestWord(sentence) {
    // TODO: Return the longest word in the sentence
    // Return empty string for invalid inputs
    // Hint: Split the sentence into words and compare lengths
    return null;
}

// Exercise 2: Arrow Functions

// 1. Double all numbers in an array
export const doubleNumbers = (numbers) => {
    // TODO: Use arrow function and map to double all numbers
    // Return empty array for invalid input
    return null;
};

// 2. Filter even numbers
export const filterEvenNumbers = (numbers) => {
    // TODO: Use arrow function and filter to keep only even numbers
    // Return empty array for invalid input
    return null;
};

// 3. Calculate average
export const calculateAverage = (numbers) => {
    // TODO: Use arrow function to calculate average of numbers
    // Return null for invalid input or empty array
    return null;
};

// Exercise 3: Closures and Scope

// 1. Create a counter
export function createCounter(startValue = 0) {
    // TODO: Return an object with increment(), decrement(), and getValue() functions
    // Use closure to maintain the counter value
    return null;
}

// 2. Create a private variable
export function createPrivateVariable(initialValue) {
    // TODO: Return an object with get() and set() methods
    // The variable should only be accessible through these methods
    return null;
}

// 3. Function factory
export function createMultiplier(factor) {
    // TODO: Return a function that multiplies its input by factor
    // Use closure to remember the factor
    return null;
}

// Exercise 4: Callbacks

// 1. Implement forEach
export function customForEach(array, callback) {
    // TODO: Implement a simple version of forEach
    // The callback should receive (element, index, array)
    return null;
}

// 2. Create an event system
export function createEventSystem() {
    // TODO: Return an object with on(), off(), and trigger() methods
    // on(event, callback) - adds a callback for an event
    // off(event, callback) - removes a callback for an event
    // trigger(event, data) - calls all callbacks for an event with data
    return null;
}

// 3. Async operation handler
export function createAsyncOperationManager() {
    // TODO: Return an object with addOperation() and executeOperations() methods
    // addOperation(callback) - adds an operation to the queue
    // executeOperations() - executes all operations in sequence
    // Each operation should receive a done callback as parameter
    return null;
}

// Advanced Challenges

// 1. Function composition
export function compose(...functions) {
    // TODO: Implement function composition
    // compose(f, g, h)(x) should return f(g(h(x)))
    return null;
}

// 2. Memoization decorator
export function memoize(fn) {
    // TODO: Create a memoization decorator
    // Cache results of the function for given inputs
    return null;
}

// 3. Currying function
export function curry(fn) {
    // TODO: Implement a currying function
    // Convert a function with multiple arguments into a series of functions
    // with single arguments
    return null;
}

// Remember to test your code!
// You can uncomment these lines to test in the browser:
/*
console.log("Testing calculateRectangleArea:");
console.log(calculateRectangleArea(5, 3));  // should print 15
console.log(calculateRectangleArea(-1, 3)); // should print null

console.log("\nTesting celsiusToFahrenheit:");
console.log(celsiusToFahrenheit(0));   // should print 32
console.log(celsiusToFahrenheit(100)); // should print 212

// Add more test cases for other functions
*/

// Remember to test your code by uncommenting the test cases!
// Happy coding! 🚀 