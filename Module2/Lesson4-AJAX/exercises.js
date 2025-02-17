// Exercise 1: Basic GET Request
export async function fetchUserData(userId) {
    // TODO: Fetch user data from https://jsonplaceholder.typicode.com/users/{userId}
    // Return the user object
    // Handle errors appropriately
}

// Exercise 2: POST Request
export async function createPost(data) {
    // TODO: Send a POST request to https://jsonplaceholder.typicode.com/posts
    // data should include: { title, body, userId }
    // Return the created post object
    // Handle errors appropriately
}

// Exercise 3: Error Handling
export async function fetchWithErrorHandling(url) {
    // TODO: Implement robust error handling for fetch requests
    // Handle network errors, 404s, and other HTTP errors
    // Return { data: response } or { error: message }
}

// Exercise 4: Loading States
export function createLoadingManager() {
    // TODO: Create an object to manage loading states
    // Methods: startLoading(), stopLoading(), isLoading()
    // Should handle multiple concurrent requests
}

// Exercise 5: Multiple Requests
export async function fetchUserWithPosts(userId) {
    // TODO: Fetch both user data and their posts in parallel
    // Use Promise.all
    // Return { user, posts }
}

// Exercise 6: Request Cancellation
export function createCancellableFetch() {
    // TODO: Implement a fetch wrapper with cancellation support
    // Use AbortController
    // Return { fetch: function, cancel: function }
}

// Exercise 7: Response Caching
export function createCachedFetch() {
    // TODO: Implement a caching layer for fetch requests
    // Cache responses for 5 minutes
    // Return cached response if available and not expired
}

// Exercise 8: File Upload
export async function uploadFile(file, onProgress) {
    // TODO: Implement file upload with progress tracking
    // Use XMLHttpRequest for progress support
    // Call onProgress with percentage (0-100)
}

// Exercise 9: API Authentication
export function createAuthenticatedFetch(token) {
    // TODO: Create a fetch wrapper that adds authentication headers
    // Add error handling for 401 responses
    // Return a function that makes authenticated requests
}

// Exercise 10: Real-time Updates
export function createRealtimeConnection(url, onUpdate) {
    // TODO: Implement real-time updates
    // Use WebSocket or polling depending on URL protocol
    // Return { connect: function, disconnect: function }
}

// Helper function for Exercise 4
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper function for Exercise 7
function isExpired(timestamp) {
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
    return Date.now() - timestamp > CACHE_DURATION;
}

// Helper function for Exercise 10
function isWebSocketUrl(url) {
    return url.startsWith('ws://') || url.startsWith('wss://');
} 