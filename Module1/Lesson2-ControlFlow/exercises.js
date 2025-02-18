// Exercise 1: Basic Conditionals
// Implement these functions using if/else statements

// 1. Check if a number is positive, negative, or zero
export function checkNumber(num) {
    // TODO: Return:
    // "positive" if num is greater than 0
    // "negative" if num is less than 0
    // "zero" if num is 0

    if( num > 0 )
        return "positive";
    else if ( num < 0 )
        return "negative";
    else if ( num === 0 )
        return "zero";
    else
        return null;
}

// 2. Determine if someone can vote
export function canVote(age) {
    // TODO: Return true if age is 18 or higher, false otherwise
    if( age >= 18 )
        return true;
    else
        return false;
}

// 3. Check if a year is a leap year
export function isLeapYear(year) {
    // TODO: Return true if year is a leap year, false otherwise
    // Hint: A leap year is:
    // - Divisible by 4 AND
    // - Not divisible by 100 OR divisible by 400

    if( year % 4 === 0 )
    {
        if( year % 100 === 0 )
        {
            if( year % 400 === 0 )
                return true;
            else
                return false;
        }
        else
            return true;
    }
    return false;
}

// Exercise 2: Switch Statements

// 1. Get the day type
export function getDayType(dayName) {
    // TODO: Use a switch statement to return:
    // "weekend" for Saturday and Sunday
    // "workday" for Monday through Friday
    // "invalid" for any other input
    switch( dayName.toLowerCase() )
    {
        case "monday":
        case "tuesday":
        case "wednesday":
        case "thursday":
        case "friday":
            return "workday";
            break;
        case "saturday":
        case "sunday":
            return "weekend";
            break;
        default:
            return "invalid";
            break;
    }
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

    if( score < 0 || score > 100 )
        return 'invalid';

    switch( true )
    {
        case (score >= 90 && score <= 100):
            return "A";
        case (score >= 80 && score <= 89):
            return 'B';
        case (score >= 70 && score <= 79):
            return 'C';
        case (score >= 60 && score <= 69):
            return 'D';
        default:
            return 'F';
    }
}

// 3. Basic calculator
export function calculate(num1, num2, operation) {
    // TODO: Use a switch statement to perform:
    // "add" -> return num1 + num2
    // "subtract" -> return num1 - num2
    // "multiply" -> return num1 * num2
    // "divide" -> return num1 / num2 (handle division by zero!)
    // Return null for invalid operations

    if( operation === "divide" && num2 === 0 )
        return null;

    switch( operation )
    {
        case "add":
            return num1 + num2;
            break;
        case "subtract":
            return num1 - num2;
            break;
        case "multiply":
            return num1 * num2;
            break;
        case "divide":
            return num1 / num2;
            break;
        default:
            return null;    
            break;
    }
}

// Exercise 3: Loops

// 1. Sum numbers from 1 to n
export function sumToN(n) {
    // TODO: Use a for loop to sum numbers from 1 to n
    // Return the sum
    // Return 0 for negative numbers
    let sum = 0;

    for( let i = 0; i <= n; i++ ) {
        sum += i;
    }

    return sum;
}

// 2. Find the factorial of n
export function factorial(n) {
    // TODO: Use a while loop to calculate factorial
    // Return null for negative numbers
    // Return 1 for 0
    let factorial = 1;

    if( n < 0 )
        return null;
    else if( n === 0 )
        return 1;   

    while( n > 0 )
    {
        factorial *= n;
        n--;
    }

    return factorial;
}

// 3. Create multiplication table
export function multiplicationTable(n) {
    // TODO: Use nested loops to create a multiplication table
    // Return an array of arrays, where each inner array
    // represents one row of the multiplication table
    // Example for n = 3:
    // [[1,2,3], [2,4,6], [3,6,9]]
    let table = []; 

    for( let i = 1; i <= n; i++ )
    {
        let row = [];
        for( let j = 1; j <= n; j++ )   
        {
            row.push( i * j );
        }
        table.push( row );
    }

    return table;
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
    let result = [];

    for( let i = 1; i <= n; i++ )
    {
        if( i % 3 === 0 && i % 5 === 0 )
            result.push( "FizzBuzz" );
        else if( i % 3 === 0 )
            result.push( "Fizz" );
        else if( i % 5 === 0 )
            result.push( "Buzz" );
        else
            result.push( i );
    }

    return result;
}

// 2. Find prime numbers
export function findPrimes(start, end) {
    // TODO: Return an array of all prime numbers between start and end (inclusive)
    // Use nested loops and conditions
    const primes = [];
    
    function isPrime(num) {
        if (num < 2) return false;
    
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }

        return true;
    }
    
    for (let i = start; i <= end; i++) {
        if (isPrime(i)) primes.push(i);
    }
    
    return primes;
}

// 3. Pattern printing
export function createPattern(rows) {
    // TODO: Create a pattern of asterisks like this (for rows=4):
    // *
    // **
    // ***
    // ****
    // Return an array where each element is a string representing one row
    let pattern = [];

    for( let i = 1; i <= rows; i++) {
        pattern.push("*".repeat(i));
    }

    return pattern;
}

// Remember to test your code!
// You can uncomment these lines to test in the browser:

console.log("Testing checkNumber:");
console.log(checkNumber(5));    // should print "positive"
console.log(checkNumber(-3));   // should print "negative"
console.log(checkNumber(0));    // should print "zero"

console.log("\nTesting canVote:");
console.log(canVote(20));       // should print true
console.log(canVote(17));       // should print false

// Add more test cases for other functions 