// Exercise 1: Basic Conditionals
// Implement these functions using if/else statements

// 1. Check if a number is positive, negative, or zero
export function checkNumber(num) {
    // TODO: Return:
    // "positive" if num is greater than 0
    // "negative" if num is less than 0
    // "zero" if num is 0
    return null;
}

// 2. Determine if someone can vote
export function canVote(age) {
    // TODO: Return true if age is 18 or higher, false otherwise
    return null;
}

// 3. Check if a year is a leap year
export function isLeapYear(year) {
    // TODO: Return true if year is a leap year, false otherwise
    // Hint: A leap year is:
    // - Divisible by 4 AND
    // - Not divisible by 100 OR divisible by 400
    return null;
}

// Exercise 2: Switch Statements

// 1. Get the day type
export function getDayType(dayName) {
    // TODO: Use a switch statement to return:
    // "weekend" for Saturday and Sunday
    // "workday" for Monday through Friday
    // "invalid" for any other input
    return null;
}

// 2. Convert number grade to letter grade
export function getLetterGrade(score) {
    // TODO: Use a switch statement to return:
    // 'A' for 90-100
    // 'B' for 80-89
    // 'C' for 70-79
    // 'D' for 60-69
    // 'F' for below 60
    // 'invalid' for scores above 100 or below 0
    return null;
}

// 3. Basic calculator
export function calculate(num1, num2, operation) {
    // TODO: Use a switch statement to perform:
    // "add" -> return num1 + num2
    // "subtract" -> return num1 - num2
    // "multiply" -> return num1 * num2
    // "divide" -> return num1 / num2 (handle division by zero!)
    // Return null for invalid operations
    return null;
}

// Exercise 3: Loops

// 1. Sum numbers from 1 to n
export function sumToN(n) {
    // TODO: Use a for loop to sum numbers from 1 to n
    // Return the sum
    // Return 0 for negative numbers
    return null;
}

// 2. Find the factorial of n
export function factorial(n) {
    // TODO: Use a while loop to calculate factorial
    // Return null for negative numbers
    // Return 1 for 0
    return null;
}

// 3. Create multiplication table
export function multiplicationTable(n) {
    // TODO: Use nested loops to create a multiplication table
    // Return an array of arrays, where each inner array
    // represents one row of the multiplication table
    // Example for n = 3:
    // [[1,2,3], [2,4,6], [3,6,9]]
    return null;
}

// Exercise 4: Advanced Challenges

// 1. FizzBuzz
export function fizzBuzz(n) {
    // TODO: Use a loop to build an array where:
    // - Numbers divisible by 3 are replaced with "Fizz"
    // - Numbers divisible by 5 are replaced with "Buzz"
    // - Numbers divisible by both 3 and 5 are replaced with "FizzBuzz"
    // - All other numbers remain as numbers
    // Return the array
    return null;
}

// 2. Find prime numbers
export function findPrimes(start, end) {
    // TODO: Return an array of all prime numbers between start and end (inclusive)
    // Use nested loops and conditions
    return null;
}

// 3. Pattern printing
export function createPattern(rows) {
    // TODO: Create a pattern of asterisks like this (for rows=4):
    // *
    // **
    // ***
    // ****
    // Return an array where each element is a string representing one row
    return null;
}

// Remember to test your code!
// You can uncomment these lines to test in the browser:
/*
console.log("Testing checkNumber:");
console.log(checkNumber(5));    // should print "positive"
console.log(checkNumber(-3));   // should print "negative"
console.log(checkNumber(0));    // should print "zero"

console.log("\nTesting canVote:");
console.log(canVote(20));       // should print true
console.log(canVote(17));       // should print false

// Add more test cases for other functions
*/ 