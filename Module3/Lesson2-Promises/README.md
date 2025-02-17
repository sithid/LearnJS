# Lesson 2: Promises and Async/Await

## Learning Objectives
By the end of this lesson, you will be able to:
- Understand asynchronous programming concepts
- Create and handle Promises
- Use async/await syntax
- Handle errors in asynchronous code
- Chain multiple asynchronous operations
- Implement concurrent operations

## 1. Understanding Asynchronous Programming

### Synchronous vs Asynchronous
```javascript
// Synchronous
console.log('Start');
console.log('Middle');
console.log('End');

// Asynchronous
console.log('Start');
setTimeout(() => {
    console.log('Middle');
}, 1000);
console.log('End');
```

### Callback Pattern (Old Way)
```javascript
function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: 'John' };
        callback(null, data);
    }, 1000);
}

fetchData((error, data) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Data:', data);
    }
});
```

## 2. Promises

### Creating Promises
```javascript
const promise = new Promise((resolve, reject) => {
    // Async operation
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve('Operation completed');
        } else {
            reject(new Error('Operation failed'));
        }
    }, 1000);
});
```

### Promise States
- Pending: Initial state
- Fulfilled: Operation completed successfully
- Rejected: Operation failed

### Handling Promises
```javascript
promise
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        console.log('Cleanup');
    });
```

## 3. Async/Await

### Basic Syntax
```javascript
async function getData() {
    try {
        const result = await promise;
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
```

### Converting Callbacks to Promises
```javascript
// Callback version
function oldFunction(callback) {
    setTimeout(() => callback(null, 'data'), 1000);
}

// Promise version
function newFunction() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('data'), 1000);
    });
}

// Usage with async/await
async function example() {
    const data = await newFunction();
    console.log(data);
}
```

## 4. Promise Chaining

### Sequential Operations
```javascript
async function processData() {
    const data = await fetchData();
    const processed = await processStep1(data);
    const result = await processStep2(processed);
    return result;
}
```

### Parallel Operations
```javascript
async function fetchAllData() {
    const results = await Promise.all([
        fetch('url1'),
        fetch('url2'),
        fetch('url3')
    ]);
    return results;
}
```

## 5. Error Handling

### Using try/catch
```javascript
async function handleErrors() {
    try {
        const data = await riskyOperation();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Operation failed');
    }
}
```

### Promise Error Handling
```javascript
Promise.all([
    fetch('url1'),
    fetch('url2')
])
.then(results => {
    // Handle results
})
.catch(error => {
    // Handle any error from any promise
});
```

## Practice Exercises

### Exercise 1: Basic Promises
Create functions that return promises for:
- Delayed execution
- Random success/failure
- Chained operations
- Error handling

### Exercise 2: Async/Await
Convert callback-based code to async/await:
- File operations
- API calls
- Database operations
- User authentication

### Exercise 3: Promise Patterns
Implement common promise patterns:
- Sequential execution
- Parallel execution
- Race conditions
- Timeout handling

### Exercise 4: Error Handling
Create robust error handling for:
- Network requests
- Data validation
- Resource cleanup
- Retry logic

### Exercise 5: Real-world Application
Build a mini-application that:
- Fetches data from an API
- Processes the results
- Handles errors gracefully
- Shows loading states

## Key Takeaways
- Promises provide a clean way to handle async operations
- Async/await makes async code look synchronous
- Error handling is crucial in async programming
- Promise chaining helps manage complex operations
- Parallel execution can improve performance

## Next Steps
- Complete the practice exercises
- Experiment with different promise patterns
- Move on to Lesson 3: Modules 