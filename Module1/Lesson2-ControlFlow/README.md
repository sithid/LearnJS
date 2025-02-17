# Lesson 2: Control Flow in JavaScript

## Learning Objectives
By the end of this lesson, you will be able to:
- Write conditional statements using if/else
- Use comparison and logical operators
- Implement switch statements
- Create and control loops (for, while)
- Apply control flow concepts to solve real problems

## 1. Conditional Statements

### if/else Statements
Conditional statements help your code make decisions. The basic syntax is:

```javascript
if (condition) {
    // code to execute if condition is true
} else {
    // code to execute if condition is false
}
```

Example:
```javascript
let age = 18;

if (age >= 18) {
    console.log("You can vote!");
} else {
    console.log("Too young to vote.");
}
```

### else if Statements
For multiple conditions:

```javascript
let temperature = 75;

if (temperature < 32) {
    console.log("It's freezing!");
} else if (temperature < 60) {
    console.log("It's cool.");
} else if (temperature < 80) {
    console.log("It's perfect!");
} else {
    console.log("It's hot!");
}
```

## 2. Comparison Operators
- `==` Equal to (value only)
- `===` Strict equal to (value and type)
- `!=` Not equal to
- `!==` Strict not equal to
- `>` Greater than
- `<` Less than
- `>=` Greater than or equal to
- `<=` Less than or equal to

```javascript
let x = 5;
let y = "5";

console.log(x == y);   // true (value equality)
console.log(x === y);  // false (strict equality)
```

## 3. Logical Operators
- `&&` AND
- `||` OR
- `!` NOT

```javascript
let isAdult = age >= 18;
let hasID = true;

if (isAdult && hasID) {
    console.log("You can enter the venue.");
}

let isWeekend = true;
let isHoliday = false;

if (isWeekend || isHoliday) {
    console.log("No work today!");
}
```

## 4. Switch Statements
Useful for multiple conditions checking against a single value:

```javascript
let day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of work week");
        break;
    case "Friday":
        console.log("TGIF!");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend!");
        break;
    default:
        console.log("Regular work day");
}
```

## 5. Loops

### for Loop
Used when you know how many iterations you need:

```javascript
for (let i = 0; i < 5; i++) {
    console.log("Iteration: " + i);
}
```

### while Loop
Used when you don't know how many iterations you need:

```javascript
let count = 0;
while (count < 5) {
    console.log("Count: " + count);
    count++;
}
```

### do...while Loop
Ensures the code runs at least once:

```javascript
let num = 0;
do {
    console.log("Number: " + num);
    num++;
} while (num < 3);
```

## Practice Exercises

### Exercise 1: Age Checker
Create a program that checks if someone can:
- Vote (18+)
- Rent a car (25+)
- Get senior discount (65+)

### Exercise 2: Grade Calculator
Create a program that converts numerical grades to letters:
- A: 90-100
- B: 80-89
- C: 70-79
- D: 60-69
- F: Below 60

### Exercise 3: FizzBuzz
Write a program that prints numbers from 1 to 100:
- For multiples of 3, print "Fizz"
- For multiples of 5, print "Buzz"
- For multiples of both 3 and 5, print "FizzBuzz"

## Key Takeaways
- Always use `===` instead of `==` for comparison (strict equality)
- Break complex conditions into smaller, readable parts
- Use meaningful variable names in conditions
- Don't forget `break` statements in switch cases
- Choose the appropriate loop for your needs

## Next Steps
- Complete the practice exercises
- Try combining conditions in different ways
- Move on to Lesson 3: Functions and Scope 