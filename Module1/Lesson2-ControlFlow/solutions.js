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