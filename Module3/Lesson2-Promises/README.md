# Lesson 2: Promises and Async Programming

## Learning Objectives
By the end of this lesson, you will be able to:
- Master asynchronous programming concepts
- Create and handle Promises effectively
- Implement async/await patterns
- Handle errors in async code
- Test asynchronous operations
- Apply async best practices

## Prerequisites
- Understanding of ES6+ features
- Completion of previous lessons
- Modern browser with Promise support
- Local development environment

## 1. Promise Basics

### Creating Promises
```javascript
// Basic Promise
const promise = new Promise((resolve, reject) => {
    // Async operation
    if (success) {
        resolve(result);
    } else {
        reject(error);
    }
});

// Promise with timeout
const timeoutPromise = new Promise((resolve) => {
    setTimeout(() => resolve('Done!'), 1000);
});
```

### Promise Methods
```javascript
// Then/Catch chain
promise
    .then(result => processResult(result))
    .catch(error => handleError(error))
    .finally(() => cleanup());

// Multiple handlers
promise
    .then(successHandler)
    .then(nextHandler)
    .catch(errorHandler);
```

## 2. Promise Operations

### Promise.all
```javascript
const promises = [
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments')
];

Promise.all(promises)
    .then(([users, posts, comments]) => {
        // Process all results
    })
    .catch(error => {
        // Handle any error
    });
```

### Promise.race and allSettled
```javascript
// Race - first to complete
Promise.race([
    fetch('/api/fast'),
    fetch('/api/slow')
]).then(result => console.log('First response:', result));

// AllSettled - wait for all
Promise.allSettled([
    Promise.resolve(1),
    Promise.reject('error'),
    Promise.resolve(3)
]).then(results => {
    // Process all results, including rejections
});
```

## 3. Async/Await

### Basic Usage
```javascript
async function fetchUserData() {
    try {
        const response = await fetch('/api/user');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

### Advanced Patterns
```javascript
// Parallel execution
async function fetchAllData() {
    const [users, posts] = await Promise.all([
        fetchUsers(),
        fetchPosts()
    ]);
    
    return { users, posts };
}

// Sequential execution
async function processSequential() {
    const result1 = await step1();
    const result2 = await step2(result1);
    return await step3(result2);
}
```

## Testing Your Code

### Running Tests
1. Open test.html in your browser
2. Complete exercises in exercises.js
3. Run tests to verify your solutions
4. Check solutions.js for reference

### Test Cases Cover
- Promise creation
- Error handling
- Async/await usage
- Promise methods
- Error scenarios
- Timing issues

## Practice Exercises

### Exercise 1: Promise Basics
1. Create promises
2. Handle resolution
3. Handle rejection

### Exercise 2: Promise Operations
1. Promise.all usage
2. Promise.race implementation
3. Error handling

### Exercise 3: Async/Await
1. Basic async functions
2. Error handling
3. Parallel operations

### Exercise 4: Real-world Tasks
1. API requests
2. File operations
3. Timer functions

## Best Practices
- Handle all errors
- Use try/catch blocks
- Avoid callback hell
- Implement proper cleanup
- Consider performance
- Write clean async code

## Common Mistakes
- Missing error handling
- Promise chain breaks
- Async/await misuse
- Memory leaks
- Race conditions
- Unhandled rejections

## Next Steps
- Complete all exercises
- Ensure all tests pass
- Review solutions
- Move to next lesson