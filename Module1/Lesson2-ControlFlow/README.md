# Lesson 2: Control Flow in JavaScript

## Learning Objectives
By the end of this lesson, you will be able to:
- Write and understand if/else statements
- Use switch statements effectively
- Implement different types of loops (for, while, do-while)
- Work with logical operators
- Handle conditional execution
- Debug control flow issues

## Prerequisites
- Completion of Lesson 1: Variables and Data Types
- Understanding of basic JavaScript syntax
- Familiarity with boolean operations

## 1. Conditional Statements

### If/Else Statements
The most basic form of control flow:
```javascript
if (condition) {
    // code to run if condition is true
} else {
    // code to run if condition is false
}
```

### Multiple Conditions
Using else if for multiple conditions:
```javascript
if (condition1) {
    // code for condition1
} else if (condition2) {
    // code for condition2
} else {
    // default code
}
```

### Switch Statements
For multiple specific cases:
```javascript
switch (value) {
    case 'option1':
        // code for option1
        break;
    case 'option2':
        // code for option2
        break;
    default:
        // default code
}
```

## 2. Loops

### For Loop
```javascript
for (let i = 0; i < 5; i++) {
    // code to repeat
}
```

### While Loop
```javascript
while (condition) {
    // code to repeat while condition is true
}
```

### Do-While Loop
```javascript
do {
    // code to repeat at least once
} while (condition);
```

### For...of Loop (Arrays)
```javascript
for (const item of array) {
    // code for each item
}
```

### For...in Loop (Objects)
```javascript
for (const key in object) {
    // code for each property
}
```

## 3. Logical Operators

### Basic Operators
- AND (&&)
- OR (||)
- NOT (!)

Example:
```javascript
if (age >= 18 && hasLicense) {
    // can drive
}
```

### Short-Circuit Evaluation
```javascript
const name = userInput || 'Default Name';
```

## Practice Exercises

### Exercise 1: Basic Conditionals
Write conditions for:
```javascript
// TODO: Create if/else statements for:
// 1. Checking if a number is positive/negative
// 2. Determining if a person can vote (18+ years)
// 3. Checking if a year is a leap year
```

### Exercise 2: Switch Statements
```javascript
// TODO: Create a switch statement for:
// 1. Days of the week
// 2. Grade scoring (A, B, C, D, F)
// 3. Basic calculator operations
```

### Exercise 3: Loops
```javascript
// TODO: Implement loops for:
// 1. Counting from 1 to 10
// 2. Finding sum of numbers in an array
// 3. Creating a multiplication table
```

## Best Practices
- Keep conditions simple and readable
- Use switch for multiple specific cases
- Avoid infinite loops
- Use appropriate loop types
- Include break and continue where needed
- Add default cases in switch statements

## Common Mistakes
- Forgetting break in switch statements
- Infinite loops
- Complex nested conditions
- Missing curly braces
- Incorrect logical operators
- Off-by-one errors in loops

## Debugging Tips
1. Use console.log() to track flow
2. Check loop conditions
3. Verify logical operators
4. Test edge cases
5. Use browser debugger

## Additional Resources
- MDN Control Flow
- JavaScript.info Loops
- Clean Code Conditionals
- Loop Performance Guide
- Debugging Strategies

## Next Steps
1. Complete all exercises
2. Pass all tests
3. Review solutions
4. Practice with real scenarios
5. Move to Lesson 3: Functions

Remember: Control flow is fundamental to programming. Take time to understand each concept thoroughly before moving on. 