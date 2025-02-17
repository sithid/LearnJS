// Exercise 1: Basic Promises

// 1.1: Create a delay function that returns a promise
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 1.2: Create a function that randomly succeeds or fails
function randomResult() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve('Success!');
            } else {
                reject(new Error('Random failure'));
            }
        }, 1000);
    });
}

// 1.3: Chain multiple operations
function chainedOperations(input) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(input * 2), 1000);
    })
    .then(result => {
        return new Promise(resolve => {
            setTimeout(() => resolve(result + 100), 1000);
        });
    })
    .then(result => {
        return new Promise(resolve => {
            setTimeout(() => resolve(result / 3), 1000);
        });
    });
}

// Exercise 2: Async/Await

// 2.1: Simulated file reading
async function readFileAsync(filename) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (filename.startsWith('file')) {
                resolve(`Content of ${filename}`);
            } else {
                reject(new Error('Invalid filename'));
            }
        }, 1000);
    });
}

// 2.2: Simulated API call
async function fetchUserAsync(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = {
                1: { id: 1, name: 'John' },
                2: { id: 2, name: 'Jane' }
            };
            const user = users[id];
            if (user) {
                resolve(user);
            } else {
                reject(new Error('User not found'));
            }
        }, 1000);
    });
}

// Exercise 3: Promise Patterns

// 3.1: Sequential execution
async function sequential() {
    const results = [];
    for (let i = 1; i <= 3; i++) {
        const user = await fetchUserAsync(i).catch(err => ({ error: err.message }));
        results.push(user);
    }
    return results;
}

// 3.2: Parallel execution
async function parallel() {
    const promises = [1, 2, 3].map(id => 
        fetchUserAsync(id).catch(err => ({ error: err.message }))
    );
    return Promise.all(promises);
}

// 3.3: Race condition
async function race() {
    return Promise.race([
        new Promise(resolve => setTimeout(() => resolve('Success'), 1000)),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
    ]);
}

// 3.4: Timeout
async function withTimeout(promise, ms) {
    const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Operation timed out')), ms);
    });
    return Promise.race([promise, timeout]);
}

// Exercise 4: Error Handling

// 4.1: Retry mechanism
async function withRetry(fn, maxAttempts = 3) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (attempt < maxAttempts) {
                const delay = Math.pow(2, attempt - 1) * 1000; // Exponential backoff
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    throw new Error(`Failed after ${maxAttempts} attempts: ${lastError.message}`);
}

// 4.2: Cleanup on error
async function withCleanup(fn) {
    let result;
    try {
        result = await fn();
    } finally {
        // Perform cleanup
        console.log('Performing cleanup...');
        // Add your cleanup logic here
    }
    return result;
}

// Exercise 5: Real-world Application

class UserAPI {
    async fetchUserList() {
        await delay(1000);
        return [1, 2, 3, 4, 5];
    }

    async fetchUserDetails(id) {
        await delay(800);
        const users = {
            1: { id: 1, name: 'John Doe', email: 'john@example.com' },
            2: { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
            3: { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
            4: { id: 4, name: 'Alice Brown', email: 'alice@example.com' },
            5: { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com' }
        };
        const user = users[id];
        if (!user) throw new Error('User not found');
        return user;
    }

    async fetchUserPosts(id) {
        await delay(1200);
        const posts = {
            1: [
                { id: 1, title: 'First Post', content: 'Hello World' },
                { id: 2, title: 'Second Post', content: 'Hello Again' }
            ],
            2: [
                { id: 3, title: 'My Story', content: 'Once upon a time...' }
            ],
            3: [
                { id: 4, title: 'Tech Tips', content: 'Always backup your data' },
                { id: 5, title: 'More Tips', content: 'Use version control' }
            ]
        };
        return posts[id] || [];
    }
}

class UserDisplay {
    constructor() {
        this.api = new UserAPI();
        this.loading = false;
        this.error = null;
    }

    async displayUserProfile(id) {
        try {
            this.loading = true;
            this.error = null;
            console.log('Loading user profile...');

            // Fetch user details and posts in parallel
            const [user, posts] = await Promise.all([
                this.api.fetchUserDetails(id),
                this.api.fetchUserPosts(id)
            ]);

            // Process and display the data
            console.log('User Profile:', {
                ...user,
                posts: posts.map(post => ({
                    title: post.title,
                    preview: post.content.substring(0, 50)
                }))
            });

            return { user, posts };
        } catch (error) {
            this.error = error.message;
            console.error('Error loading profile:', error.message);
            throw error;
        } finally {
            this.loading = false;
            console.log('Loading complete');
        }
    }
}

// Test your solutions
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Test Exercise 1
        console.log('Testing Exercise 1: Basic Promises');
        await delay(1000);
        console.log('Delay complete');

        try {
            const randomResult = await randomResult();
            console.log('Random result:', randomResult);
        } catch (error) {
            console.log('Random failure:', error.message);
        }

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

        const cleanupResult = await withCleanup(() => fetchUserAsync(1));
        console.log('Cleanup result:', cleanupResult);

        // Test Exercise 5
        console.log('\nTesting Exercise 5: Real-world Application');
        const userDisplay = new UserDisplay();
        await userDisplay.displayUserProfile(1);

    } catch (error) {
        console.error('Test error:', error);
    }
}); 