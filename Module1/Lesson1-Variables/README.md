# Lesson 1: Variables and Data Types in JavaScript

## Learning Objectives
By the end of this lesson, you will be able to:
- Declare variables using `var`, `let`, and `const`
- Understand the differences between variable declaration methods
- Work with basic JavaScript data types
- Use proper naming conventions for variables

## 1. Introduction to Variables

Variables are containers for storing data values. Think of them as labeled boxes where you can store different types of information.

### Variable Declaration

In JavaScript, we have three ways to declare variables:
```javascript
var oldWay = "I'm the old way";      // Old way, avoid using
let modern = "I'm modern";           // Modern way, use this
const constant = "I never change";   // For values that shouldn't change
```

### Rules for Variable Names
- Must start with a letter, underscore (_), or dollar sign ($)
- Can contain letters, numbers, underscores, or dollar signs
- Are case-sensitive
- Cannot use reserved JavaScript keywords

Good examples:
```javascript
let firstName = "John";
let user_age = 25;
let $price = 99.99;
```

## 2. Data Types

JavaScript has several basic data types:

### Primitive Types
1. **String**
   ```javascript
   let name = "John";
   let message = 'Hello';
   ```

2. **Number**
   ```javascript
   let age = 25;
   let price = 99.99;
   ```

3. **Boolean**
   ```javascript
   let isStudent = true;
   let isEmployed = false;
   ```

4. **Undefined**
   ```javascript
   let unknownVariable;  // Value is undefined
   ```

5. **Null**
   ```javascript
   let emptyValue = null;
   ```

### Special Number Values
```javascript
let infinity = Infinity;
let negativeInfinity = -Infinity;
let notANumber = NaN;
```

## Practice Exercises

### Exercise 1: Variable Declaration
Create variables for the following scenarios:
1. Create a variable for your name
2. Create a variable for your age
3. Create a constant for your birth year
4. Create a variable for your favorite hobby

```javascript
// Write your code here
let myName = "Your Name";
let myAge = 25;
const birthYear = 1998;
let hobby = "coding";
```

### Exercise 2: Data Types
Identify the data type of each value:
```javascript
let value1 = "Hello";           // What type is this?
let value2 = 42;                // What type is this?
let value3 = true;              // What type is this?
let value4;                     // What type is this?
let value5 = null;              // What type is this?
let value6 = 123.45;            // What type is this?
```

## Mini-Project: Personal Info Card

Create variables to store information for a personal info card. Include:
- Name
- Age
- Occupation
- Is Available for Work
- Hourly Rate

```javascript
// Create your variables here
const name = "John Doe";
let age = 30;
let occupation = "Web Developer";
let isAvailableForWork = true;
const hourlyRate = 50;

// Print the information
console.log("Name:", name);
console.log("Age:", age);
console.log("Occupation:", occupation);
console.log("Available for Work:", isAvailableForWork);
console.log("Hourly Rate: $" + hourlyRate);
```

## Key Takeaways
- Use `let` for variables that will change
- Use `const` for variables that won't change
- Avoid using `var` (it's outdated)
- JavaScript has 5 primitive data types: string, number, boolean, undefined, and null
- Always use meaningful variable names
- Use camelCase for variable names

## Next Steps
- Complete the practice exercises
- Try the mini-project
- Move on to Lesson 2: Control Flow 