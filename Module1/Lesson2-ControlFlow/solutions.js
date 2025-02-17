// Exercise 1: Age Checker
function checkAge(age) {
    if (age < 18) {
        console.log("Too young to vote, drive, or rent a car");
    } else if (age < 25) {
        console.log("Can vote, but cannot rent a car");
    } else if (age < 65) {
        console.log("Can vote and rent a car");
    } else {
        console.log("Can vote, rent a car, and get senior discount");
    }
}

// Test cases for Exercise 1
console.log("Exercise 1: Age Checker");
checkAge(16);
checkAge(20);
checkAge(30);
checkAge(70);

// Exercise 2: Grade Calculator
function calculateGrade(score) {
    if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else if (score >= 60) {
        return "D";
    } else {
        return "F";
    }
}

// Test cases for Exercise 2
console.log("\nExercise 2: Grade Calculator");
console.log("Score 95:", calculateGrade(95));
console.log("Score 88:", calculateGrade(88));
console.log("Score 75:", calculateGrade(75));
console.log("Score 65:", calculateGrade(65));
console.log("Score 50:", calculateGrade(50));

// Exercise 3: FizzBuzz
function fizzBuzz() {
    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}

// Test FizzBuzz
console.log("\nExercise 3: FizzBuzz");
fizzBuzz();

// Exercise 4: Day of Week Message
function getDayMessage(day) {
    switch (day) {
        case "Monday":
            return "Start of the work week";
        case "Friday":
            return "TGIF!";
        case "Saturday":
        case "Sunday":
            return "Weekend!";
        default:
            return "Regular work day";
    }
}

// Test cases for Exercise 4
console.log("\nExercise 4: Day of Week Message");
console.log("Monday:", getDayMessage("Monday"));
console.log("Friday:", getDayMessage("Friday"));
console.log("Saturday:", getDayMessage("Saturday"));
console.log("Wednesday:", getDayMessage("Wednesday"));

// Exercise 5: Number Guessing Game
function guessNumber() {
    const targetNumber = Math.floor(Math.random() * 10) + 1;
    let attempts = 0;
    let guess;
    
    console.log("I'm thinking of a number between 1 and 10...");
    
    do {
        // In a real implementation, you would use readline or prompt
        // This is a simulation of the game logic
        guess = parseInt(prompt("Enter your guess:"));
        attempts++;
        
        if (guess < targetNumber) {
            console.log("Too low! Try again.");
        } else if (guess > targetNumber) {
            console.log("Too high! Try again.");
        } else {
            console.log(`Congratulations! You got it in ${attempts} attempts!`);
        }
    } while (guess !== targetNumber);
}

// Note: The Number Guessing Game requires user input
// In a browser environment, you can use the prompt function
// For Node.js, you would need to use readline or another input method
console.log("\nExercise 5: Number Guessing Game");
// Uncomment to play: guessNumber(); 

// Exercise 1: Basic Conditionals

// 1. Check if a number is positive, negative, or zero
export function checkNumber(num) {
    if (num > 0) return 'positive';
    if (num < 0) return 'negative';
    return 'zero';
}

// 2. Determine if someone can vote
export function canVote(age) {
    return age >= 18;
}

// 3. Check if a year is a leap year
export function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Exercise 2: Switch Statements

// 1. Get the day type
export function getDayType(dayName) {
    switch (dayName.toLowerCase()) {
        case 'saturday':
        case 'sunday':
            return 'weekend';
        case 'monday':
        case 'tuesday':
        case 'wednesday':
        case 'thursday':
        case 'friday':
            return 'workday';
        default:
            return 'invalid';
    }
}

// 2. Convert number grade to letter grade
export function getLetterGrade(score) {
    if (score < 0 || score > 100) return 'invalid';
    
    switch (Math.floor(score / 10)) {
        case 10:
        case 9:
            return 'A';
        case 8:
            return 'B';
        case 7:
            return 'C';
        case 6:
            return 'D';
        default:
            return 'F';
    }
}

// 3. Basic calculator
export function calculate(num1, num2, operation) {
    switch (operation) {
        case 'add':
            return num1 + num2;
        case 'subtract':
            return num1 - num2;
        case 'multiply':
            return num1 * num2;
        case 'divide':
            return num2 === 0 ? null : num1 / num2;
        default:
            return null;
    }
}

// Exercise 3: Loops

// 1. Sum numbers from 1 to n
export function sumToN(n) {
    if (n < 0) return 0;
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// 2. Find the factorial of n
export function factorial(n) {
    if (n < 0) return null;
    if (n === 0) return 1;
    
    let result = 1;
    let i = n;
    while (i > 0) {
        result *= i;
        i--;
    }
    return result;
}

// 3. Create multiplication table
export function multiplicationTable(n) {
    const table = [];
    for (let i = 1; i <= n; i++) {
        const row = [];
        for (let j = 1; j <= n; j++) {
            row.push(i * j);
        }
        table.push(row);
    }
    return table;
}

// Exercise 4: Advanced Challenges

// 1. FizzBuzz
export function fizzBuzz(n) {
    const result = [];
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            result.push('FizzBuzz');
        } else if (i % 3 === 0) {
            result.push('Fizz');
        } else if (i % 5 === 0) {
            result.push('Buzz');
        } else {
            result.push(i);
        }
    }
    return result;
}

// 2. Find prime numbers
export function findPrimes(start, end) {
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
    const pattern = [];
    for (let i = 1; i <= rows; i++) {
        pattern.push('*'.repeat(i));
    }
    return pattern;
} 