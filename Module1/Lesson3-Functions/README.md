# Lesson 3: Functions in JavaScript

## Learning Objectives
By the end of this lesson, you will be able to:
- Write functions using different syntax styles
- Understand function parameters and return values
- Implement arrow functions effectively
- Use modern function patterns
- Test function behavior
- Apply function best practices

## Prerequisites
- Understanding of variables and control flow
- Completion of previous lessons
- Modern browser with ES6+ support
- Local development environment

## 1. Function Types

### Function Declaration
```javascript
function calculateArea(width, height) {
    return width * height;
}
```

### Function Expression
```javascript
const calculateAreaExpr = function(width, height) {
    return width * height;
};
```

### Arrow Function
```javascript
const calculateAreaArrow = (width, height) => width * height;
```

## 2. Parameters and Arguments
- Default parameters
- Rest parameters
- Spread operator
- Parameter destructuring

## 3. Return Values
- Explicit returns
- Implicit returns in arrow functions
- Multiple return values using objects
- Early returns for validation

## 4. Modern Function Patterns
- Higher-order functions
- Callback functions
- Method chaining
- Function composition

## 5. Testing Functions
- Input validation
- Output verification
- Edge cases
- Error handling

## Practice Exercises
1. Calculator functions
2. Personal information handler
3. Shopping cart operations
4. Temperature converter
5. Counter with closure

## Best Practices
- Use descriptive function names
- Keep functions focused and small
- Handle edge cases
- Validate inputs
- Write comprehensive tests
- Document complex logic

## Common Mistakes
- Forgetting return statements
- Improper scope usage
- Side effect management
- Missing error handling
- Inadequate testing

## Testing Your Code
1. Open test.html in your browser
2. Complete exercises in exercises.js
3. Run tests to verify your solutions
4. Check solutions.js for reference

## Next Steps
- Complete all exercises
- Ensure all tests pass
- Review solutions
- Move to next lesson 