# Lesson 4: Arrays and Objects in JavaScript

## Learning Objectives
By the end of this lesson, you will be able to:
- Create and manipulate arrays and objects
- Use array methods effectively (map, filter, reduce, etc.)
- Work with object properties and methods
- Understand array and object destructuring
- Implement common array/object algorithms
- Handle nested data structures
- Debug array and object operations

## Prerequisites
- Completion of Lesson 1: Variables and Data Types
- Completion of Lesson 2: Control Flow
- Completion of Lesson 3: Functions
- Understanding of basic JavaScript syntax

## 1. Arrays

### Array Creation and Access
```javascript
// Array literal
const fruits = ['apple', 'banana', 'orange'];

// Array constructor
const numbers = new Array(1, 2, 3);

// Accessing elements
console.log(fruits[0]);        // 'apple'
console.log(fruits.length);    // 3
```

### Array Methods

#### Adding/Removing Elements
```javascript
const arr = ['a', 'b', 'c'];

// Add to end
arr.push('d');           // ['a', 'b', 'c', 'd']

// Remove from end
arr.pop();              // ['a', 'b', 'c']

// Add to beginning
arr.unshift('x');       // ['x', 'a', 'b', 'c']

// Remove from beginning
arr.shift();            // ['a', 'b', 'c']

// Splice
arr.splice(1, 1, 'y');  // ['a', 'y', 'c']
```

#### Transformation Methods
```javascript
const numbers = [1, 2, 3, 4, 5];

// Map
const doubled = numbers.map(n => n * 2);

// Filter
const evens = numbers.filter(n => n % 2 === 0);

// Reduce
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Sort
numbers.sort((a, b) => a - b);
```

## 2. Objects

### Object Creation and Access
```javascript
// Object literal
const person = {
    name: 'John',
    age: 30,
    greet() {
        return `Hello, I'm ${this.name}`;
    }
};

// Accessing properties
console.log(person.name);          // Dot notation
console.log(person['age']);        // Bracket notation
```

### Object Methods

#### Object Operations
```javascript
// Add/modify properties
person.location = 'New York';
person['email'] = 'john@example.com';

// Delete properties
delete person.age;

// Check property existence
console.log('name' in person);
console.log(person.hasOwnProperty('age'));
```

#### Object Methods
```javascript
// Object.keys()
const keys = Object.keys(person);

// Object.values()
const values = Object.values(person);

// Object.entries()
const entries = Object.entries(person);
```

## 3. Destructuring

### Array Destructuring
```javascript
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(rest);   // [3, 4, 5]
```

### Object Destructuring
```javascript
const { name, age, location = 'Unknown' } = person;
console.log(name);     // 'John'
console.log(location); // 'Unknown' (default value)
```

## Practice Exercises

### Exercise 1: Array Operations
```javascript
// 1. Find maximum value in array
// 2. Remove duplicates from array
// 3. Rotate array by k positions
```

### Exercise 2: Array Transformations
```javascript
// 1. Map array of objects
// 2. Filter and transform data
// 3. Complex data aggregation
```

### Exercise 3: Object Manipulation
```javascript
// 1. Deep clone an object
// 2. Merge objects
// 3. Create object hierarchy
```

### Exercise 4: Advanced Operations
```javascript
// 1. Implement array intersection
// 2. Create object validator
// 3. Build data transformer
```

## Best Practices
- Use array methods over loops when possible
- Keep objects focused and cohesive
- Use meaningful property names
- Handle edge cases (empty arrays, null values)
- Consider immutability
- Use destructuring for cleaner code
- Document complex data structures

## Common Mistakes
- Mutating arrays/objects unintentionally
- Not handling array bounds
- Incorrect use of array methods
- Deep vs shallow copying
- Property access on null/undefined
- Forgetting to check for existence

## Debugging Tips
1. Use console.table for arrays/objects
2. Check array lengths and object keys
3. Verify data types
4. Test edge cases
5. Use browser debugger
6. Add data validation

## Additional Resources
- MDN Array Documentation
- MDN Object Documentation
- JavaScript.info Arrays
- JavaScript.info Objects
- Clean Code Data Structures
- Array Methods Cheatsheet

## Next Steps
1. Complete all exercises
2. Pass all tests
3. Review solutions
4. Practice with real data
5. Move to Module 2: DOM Manipulation

Remember: Arrays and objects are fundamental data structures in JavaScript. Understanding how to work with them effectively is crucial for becoming a proficient developer.