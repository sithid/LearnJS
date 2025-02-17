// Exercise 1: Age Checker
// Create a program that provides different messages based on age
function checkAge(age) {
    // TODO: Write your code here
    // Check if the person can:
    // 1. Vote (18+)
    // 2. Rent a car (25+)
    // 3. Get senior discount (65+)
}

// Test cases for Exercise 1
console.log("Exercise 1: Age Checker");
// TODO: Uncomment and test with different ages
// checkAge(16);  // Should show: Too young to vote, drive, or rent a car
// checkAge(20);  // Should show: Can vote, but cannot rent a car
// checkAge(30);  // Should show: Can vote and rent a car
// checkAge(70);  // Should show: Can vote, rent a car, and get senior discount

// Exercise 2: Grade Calculator
function calculateGrade(score) {
    // TODO: Write your code here
    // Convert numerical grade to letter grade
    // A: 90-100
    // B: 80-89
    // C: 70-79
    // D: 60-69
    // F: Below 60
}

// Test cases for Exercise 2
console.log("\nExercise 2: Grade Calculator");
// TODO: Uncomment and test with different scores
// console.log("Score 95:", calculateGrade(95));  // Should print A
// console.log("Score 88:", calculateGrade(88));  // Should print B
// console.log("Score 75:", calculateGrade(75));  // Should print C
// console.log("Score 65:", calculateGrade(65));  // Should print D
// console.log("Score 50:", calculateGrade(50));  // Should print F

// Exercise 3: FizzBuzz
function fizzBuzz() {
    // TODO: Write your code here
    // Print numbers from 1 to 100
    // For multiples of 3, print "Fizz"
    // For multiples of 5, print "Buzz"
    // For multiples of both 3 and 5, print "FizzBuzz"
}

// Test FizzBuzz
console.log("\nExercise 3: FizzBuzz");
// TODO: Uncomment to test FizzBuzz
// fizzBuzz();

// Exercise 4: Day of Week Message
function getDayMessage(day) {
    // TODO: Write your code here
    // Use a switch statement to return a message for each day
    // Monday - "Start of the work week"
    // Friday - "TGIF!"
    // Saturday/Sunday - "Weekend!"
    // Other days - "Regular work day"
}

// Test cases for Exercise 4
console.log("\nExercise 4: Day of Week Message");
// TODO: Uncomment and test with different days
// console.log("Monday:", getDayMessage("Monday"));
// console.log("Friday:", getDayMessage("Friday"));
// console.log("Saturday:", getDayMessage("Saturday"));
// console.log("Wednesday:", getDayMessage("Wednesday"));

// Exercise 5: Number Guessing Game
function guessNumber() {
    // TODO: Write your code here
    // Generate a random number between 1 and 10
    // Give the user hints (too high/too low)
    // Use a while loop to keep asking until they get it right
    const targetNumber = Math.floor(Math.random() * 10) + 1;
    let attempts = 0;
    
    // Your code here
}

// Test the Number Guessing Game
console.log("\nExercise 5: Number Guessing Game");
// TODO: Uncomment to play the game
// guessNumber();

// Remember to test your code by uncommenting the test cases!
// Happy coding! 🚀 