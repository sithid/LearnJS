# Lesson 4: Arrays and Objects in JavaScript

## Learning Objectives
By the end of this lesson, you will be able to:
- Master modern array methods and operations
- Work with complex data structures
- Implement object manipulation techniques
- Use modern array/object features
- Test array and object operations
- Apply best practices for data handling

## Prerequisites
- Understanding of basic JavaScript
- Completion of previous lessons
- Modern browser with ES6+ support
- Local development environment

## 1. Modern Array Methods

### Array Creation and Manipulation
```javascript
// Creating arrays
const numbers = [1, 2, 3, 4, 5];
const fruits = Array.from('🍎🍌🍇');
const range = Array.from({ length: 5 }, (_, i) => i + 1);

// Array spreading
const combined = [...numbers, ...range];
const copy = [...numbers];
```

### Transformation Methods
```javascript
// Map
const doubled = numbers.map(num => num * 2);

// Filter
const evenNumbers = numbers.filter(num => num % 2 === 0);

// Reduce
const sum = numbers.reduce((total, num) => total + num, 0);

// Chain operations
const processedNumbers = numbers
    .filter(num => num > 2)
    .map(num => num * 2)
    .reduce((sum, num) => sum + num, 0);
```

### Search and Sort
```javascript
// Find elements
const firstEven = numbers.find(num => num % 2 === 0);
const hasNegative = numbers.some(num => num < 0);
const allPositive = numbers.every(num => num > 0);

// Sorting
const sorted = [...numbers].sort((a, b) => a - b);
const sortedObjects = items.sort((a, b) => 
    a.name.localeCompare(b.name)
);
```

## 2. Object Operations

### Object Creation
```javascript
// Object literal with computed properties
const key = 'dynamic';
const obj = {
    name: 'John',
    [key]: 'value',
    method() {
        return this.name;
    }
};

// Object spreading
const defaults = { theme: 'light', size: 'medium' };
const custom = { ...defaults, theme: 'dark' };
```

### Object Methods
```javascript
// Object manipulation
const keys = Object.keys(obj);
const values = Object.values(obj);
const entries = Object.entries(obj);

// Transform entries
const transformed = Object.fromEntries(
    entries.map(([key, value]) => [key, value.toUpperCase()])
);
```

## 3. Complex Data Structures

### Nested Objects
```javascript
const user = {
    id: 1,
    name: 'John',
    address: {
        street: '123 Main St',
        city: 'Boston',
        coordinates: {
            lat: 42.3601,
            lng: -71.0589
        }
    },
    orders: [
        { id: 1, total: 29.99 },
        { id: 2, total: 39.99 }
    ]
};
```

### Working with Nested Data
```javascript
// Destructuring nested data
const { 
    name, 
    address: { city, coordinates: { lat, lng } },
    orders: [firstOrder, ...otherOrders]
} = user;

// Updating nested data
const updatedUser = {
    ...user,
    address: {
        ...user.address,
        city: 'New York'
    }
};
```

## Testing Your Code

### Running Tests
1. Open `test.html` in your browser
2. Write your code in `exercises.js`
3. Tests run automatically
4. Fix any failing tests
5. Verify all tests pass

### Test Cases Cover
- Array method operations
- Object manipulations
- Data structure operations
- Error handling
- Edge cases
- Performance considerations

## Practice Exercises

### Exercise 1: Array Operations
Implement array utilities:
- Custom map/filter/reduce
- Array transformations
- Search operations
- Sorting algorithms

### Exercise 2: Object Manipulation
Create object utilities:
- Deep cloning
- Object merging
- Property validation
- Data transformation

### Exercise 3: Data Processing
Build data processing functions:
- Filter and sort collections
- Group and aggregate data
- Transform data structures
- Handle nested updates

### Exercise 4: Advanced Operations
Implement complex operations:
- Deep object comparison
- Custom sorting algorithms
- Data structure conversions
- Performance optimizations

## Best Practices
- Use modern array methods
- Avoid mutating data
- Implement proper error handling
- Consider performance
- Write comprehensive tests
- Handle edge cases
- Use appropriate methods

## Common Mistakes
- Mutating original arrays
- Incorrect array method usage
- Deep clone issues
- Performance bottlenecks
- Missing error handling
- Improper comparisons

## Debugging Tips
1. Use console.table for arrays
2. Inspect object structure
3. Check method returns
4. Test edge cases
5. Monitor performance
6. Use browser DevTools

## Additional Resources
- MDN Array Documentation
- JavaScript.Info Arrays
- Object Manipulation Guide
- Performance Best Practices
- Testing Data Structures

## Next Steps
1. Complete all exercises
2. Pass all tests
3. Review solutions
4. Practice concepts
5. Move to Module 2: DOM Manipulation

Remember to test your code thoroughly and handle edge cases properly.