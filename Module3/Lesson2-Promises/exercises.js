// Exercise 1: Basic Promises
// TODO: Implement the following promise-based functions

// 1.1: Create a delay function that returns a promise
function delay(ms) {
    // Return a promise that resolves after ms milliseconds
}

// 1.2: Create a function that randomly succeeds or fails
function randomResult() {
    // Return a promise that randomly resolves or rejects
}

// 1.3: Chain multiple operations
function chainedOperations(input) {
    // Return a promise that:
    // 1. Takes a number as input
    // 2. Doubles it after 1 second
    // 3. Adds 100 after another second
    // 4. Divides by 3 after another second
}

// Exercise 2: Async/Await
// TODO: Convert these callback-based functions to use async/await

// 2.1: Simulated file reading
function readFile(filename, callback) {
    setTimeout(() => {
        if (filename.startsWith('file')) {
            callback(null, `Content of ${filename}`);
        } else {
            callback(new Error('Invalid filename'));
        }
    }, 1000);
}

// Convert to async/await
async function readFileAsync(filename) {
    // Implement async version here
}

// 2.2: Simulated API call
function fetchUser(id, callback) {
    setTimeout(() => {
        const users = {
            1: { id: 1, name: 'John' },
            2: { id: 2, name: 'Jane' }
        };
        const user = users[id];
        if (user) {
            callback(null, user);
        } else {
            callback(new Error('User not found'));
        }
    }, 1000);
}

// Convert to async/await
async function fetchUserAsync(id) {
    // Implement async version here
}

// Exercise 3: Promise Patterns
// TODO: Implement the following promise patterns

// 3.1: Sequential execution
async function sequential() {
    // Fetch three users one after another
    // Wait for each response before fetching the next
}

// 3.2: Parallel execution
async function parallel() {
    // Fetch three users in parallel using Promise.all
}

// 3.3: Race condition
async function race() {
    // Create a race between:
    // 1. A successful response after 1 second
    // 2. A failure after 2 seconds
    // Return the first result using Promise.race
}

// 3.4: Timeout
async function withTimeout(promise, ms) {
    // Add timeout functionality to any promise
    // Reject if the promise doesn't resolve within ms milliseconds
}

// Exercise 4: Error Handling
// TODO: Implement robust error handling

// 4.1: Retry mechanism
async function withRetry(fn, maxAttempts = 3) {
    // Implement a retry mechanism that:
    // 1. Attempts to execute the function
    // 2. Retries up to maxAttempts times if it fails
    // 3. Increases delay between attempts
}

// 4.2: Cleanup on error
async function withCleanup(fn) {
    // Implement a function that:
    // 1. Executes the provided function
    // 2. Ensures cleanup is performed whether it succeeds or fails
    // 3. Returns the result if successful
}

// Exercise 5: Real-world Application
// TODO: Implement a mini application that fetches and displays user data

class UserAPI {
    // 5.1: Implement fetch methods
    async fetchUserList() {
        // Simulate fetching a list of user IDs
    }

    async fetchUserDetails(id) {
        // Simulate fetching details for a specific user
    }

    async fetchUserPosts(id) {
        // Simulate fetching posts for a specific user
    }
}

class UserDisplay {
    constructor() {
        this.api = new UserAPI();
        this.loading = false;
        this.error = null;
    }

    // 5.2: Implement display logic
    async displayUserProfile(id) {
        // 1. Show loading state
        // 2. Fetch user details and posts
        // 3. Handle and display errors if they occur
        // 4. Update the display with user data
        // 5. Hide loading state
    }
}

// Test your solutions
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Test Exercise 1
        console.log('Testing Exercise 1: Basic Promises');
        await delay(1000);
        console.log('Delay complete');

        const randomResult = await randomResult();
        console.log('Random result:', randomResult);

        const chainedResult = await chainedOperations(5);
        console.log('Chained result:', chainedResult);

        // Test Exercise 2
        console.log('\nTesting Exercise 2: Async/Await');
        const fileContent = await readFileAsync('file1.txt');
        console.log('File content:', fileContent);

        const user = await fetchUserAsync(1);
        console.log('User:', user);

        // Test Exercise 3
        console.log('\nTesting Exercise 3: Promise Patterns');
        const sequentialResult = await sequential();
        console.log('Sequential result:', sequentialResult);

        const parallelResult = await parallel();
        console.log('Parallel result:', parallelResult);

        const raceResult = await race();
        console.log('Race result:', raceResult);

        // Test Exercise 4
        console.log('\nTesting Exercise 4: Error Handling');
        const retryResult = await withRetry(() => fetchUserAsync(1));
        console.log('Retry result:', retryResult);

        // Test Exercise 5
        console.log('\nTesting Exercise 5: Real-world Application');
        const userDisplay = new UserDisplay();
        await userDisplay.displayUserProfile(1);

    } catch (error) {
        console.error('Test error:', error);
    }
});

// Exercise 1: Basic Promise Creation
export const createDelayedPromise = (value, delay) => {
    // TODO: Return a promise that resolves with the value after delay milliseconds
};

// Exercise 2: Promise Chaining
export const processUserData = (userId) => {
    // TODO: Simulate fetching user data, then their posts
    // Return a promise that resolves with { user, posts }
    // Use the fetchUser and fetchUserPosts helper functions
};

// Exercise 3: Promise Error Handling
export const fetchWithRetry = (url, maxRetries) => {
    // TODO: Implement a fetch with retry mechanism
    // Retry failed requests up to maxRetries times
    // Use exponential backoff between retries
};

// Exercise 4: Promise.all Usage
export const fetchAllUserData = (userIds) => {
    // TODO: Fetch data for all users in parallel using Promise.all
    // Return array of user data
};

// Exercise 5: Promise.race Implementation
export const fetchWithTimeout = (url, timeoutMs) => {
    // TODO: Race between fetch request and timeout
    // Reject if request takes longer than timeoutMs
};

// Exercise 6: Async/Await Basics
export const getUserDetails = async (userId) => {
    // TODO: Use async/await to fetch user and their posts
    // Handle errors appropriately
};

// Exercise 7: Async Error Handling
export const processDataWithRetry = async (data) => {
    // TODO: Process data with retry mechanism using async/await
    // Implement exponential backoff
    // Maximum 3 retries
};

// Exercise 8: Parallel Processing
export const processInParallel = async (tasks) => {
    // TODO: Execute multiple async tasks in parallel
    // Return results as they complete
    // Handle errors for individual tasks
};

// Exercise 9: Sequential Processing
export const processInSequence = async (tasks) => {
    // TODO: Execute async tasks in sequence
    // Each task depends on the previous task's result
};

// Exercise 10: Real-world Example
export const fetchAndCacheUserData = async (userId, cache) => {
    // TODO: Implement a caching mechanism for user data
    // Check cache before fetching
    // Update cache with new data
    // Handle errors appropriately
};

// Helper functions (simulated API calls)
const fetchUser = async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return { id: userId, name: `User ${userId}`, email: `user${userId}@example.com` };
};

const fetchUserPosts = async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [
        { id: 1, userId, title: 'Post 1' },
        { id: 2, userId, title: 'Post 2' }
    ];
};

// Helper function for processDataWithRetry
const processData = async (data) => {
    if (Math.random() < 0.5) { // Simulate random failures
        throw new Error('Processing failed');
    }
    return `Processed: ${data}`;
};