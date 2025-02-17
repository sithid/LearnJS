# Lesson 4: Arrays and Objects in JavaScript

## Learning Objectives
By the end of this lesson, you will be able to:
- Create and manipulate arrays
- Work with array methods
- Create and manage objects
- Use object methods and properties
- Understand destructuring and spreading
- Work with nested data structures

## 1. Arrays

### Array Basics
Arrays are ordered collections of values:

```javascript
// Creating arrays
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "hello", true, null];

// Accessing elements
console.log(fruits[0]);     // "apple"
console.log(numbers[2]);    // 3

// Modifying elements
fruits[1] = "grape";
console.log(fruits);        // ["apple", "grape", "orange"]
```

### Array Methods

#### Adding and Removing Elements
```javascript
let arr = ["a", "b", "c"];

// Adding elements
arr.push("d");         // Add to end: ["a", "b", "c", "d"]
arr.unshift("z");      // Add to start: ["z", "a", "b", "c", "d"]

// Removing elements
arr.pop();             // Remove from end: ["z", "a", "b", "c"]
arr.shift();           // Remove from start: ["a", "b", "c"]

// Splicing
arr.splice(1, 1);      // Remove 1 element at index 1: ["a", "c"]
arr.splice(1, 0, "b"); // Insert "b" at index 1: ["a", "b", "c"]
```

#### Array Iteration Methods
```javascript
let numbers = [1, 2, 3, 4, 5];

// forEach
numbers.forEach(num => console.log(num));

// map
let doubled = numbers.map(num => num * 2);
// [2, 4, 6, 8, 10]

// filter
let evenNumbers = numbers.filter(num => num % 2 === 0);
// [2, 4]

// reduce
let sum = numbers.reduce((total, num) => total + num, 0);
// 15

// find
let firstEven = numbers.find(num => num % 2 === 0);
// 2
```

## 2. Objects

### Object Basics
Objects are collections of key-value pairs:

```javascript
// Creating objects
let person = {
    name: "John",
    age: 30,
    isStudent: false
};

// Accessing properties
console.log(person.name);      // Dot notation
console.log(person["age"]);    // Bracket notation

// Modifying properties
person.age = 31;
person["isStudent"] = true;
```

### Object Methods

```javascript
let calculator = {
    add: function(a, b) {
        return a + b;
    },
    // Shorthand method syntax
    subtract(a, b) {
        return a - b;
    }
};

console.log(calculator.add(5, 3));      // 8
console.log(calculator.subtract(5, 3)); // 2
```

## 3. Modern JavaScript Features

### Destructuring
Extracting values from arrays and objects:

```javascript
// Array destructuring
let [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(rest);   // [3, 4, 5]

// Object destructuring
let { name, age } = person;
console.log(name);   // "John"
```

### Spread Operator
Spreading elements:

```javascript
// Array spreading
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];
// [1, 2, 3, 4, 5]

// Object spreading
let defaults = { theme: "dark", lang: "en" };
let userPrefs = { ...defaults, theme: "light" };
// { theme: "light", lang: "en" }
```

## 4. Working with Nested Structures

```javascript
// Nested arrays
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Nested objects
let company = {
    name: "Tech Corp",
    departments: {
        engineering: {
            head: "Jane",
            employees: 50
        },
        marketing: {
            head: "Bob",
            employees: 30
        }
    }
};
```

## Practice Exercises

### Exercise 1: Array Operations
Create functions to:
- Find the largest number in an array
- Remove duplicates from an array
- Reverse an array without using reverse()

### Exercise 2: Shopping List Manager
Create an object with methods to:
- Add items with quantities
- Remove items
- Update quantities
- List all items

### Exercise 3: Student Grade Tracker
Create a system to:
- Add students and grades
- Calculate average grades
- Find top performers
- Generate grade reports

### Exercise 4: Library Catalog
Create a nested structure for:
- Books with authors and genres
- Search by various criteria
- Track borrowed books
- Generate reports

### Exercise 5: Data Transformation
Work with an array of objects to:
- Filter by criteria
- Transform data structure
- Calculate statistics
- Generate summaries

## Key Takeaways
- Arrays and objects are fundamental data structures
- Modern JavaScript provides powerful methods for data manipulation
- Destructuring and spreading simplify working with complex data
- Nested structures help organize related data
- Method chaining can create elegant solutions

## Next Steps
- Complete the practice exercises
- Experiment with different array and object methods
- Move on to Module 2: DOM Manipulation 