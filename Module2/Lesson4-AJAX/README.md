# Lesson 4: AJAX and Fetch API

## Overview
This lesson covers modern approaches to making HTTP requests in JavaScript using AJAX and the Fetch API. You'll learn how to interact with web APIs, handle responses, and manage asynchronous data flow in web applications.

## Learning Objectives
By completing this lesson, you will:
- Understand AJAX and XMLHttpRequest
- Master the Fetch API
- Handle HTTP responses and errors
- Process JSON data
- Implement error handling
- Create loading states
- Apply best practices for API calls

## Prerequisites
- Completion of Lesson 3: Forms
- Understanding of Promises (Module 3, Lesson 2)
- Basic knowledge of HTTP methods
- Familiarity with JSON format

## Exercises

### Exercise 1: Basic GET Request
Create a function that fetches data from a public API using the Fetch API and displays the results.

### Exercise 2: POST Request
Implement a function that sends form data to an API endpoint using POST method and handles the response.

### Exercise 3: Error Handling
Create a robust error handling system for API calls, including network errors and invalid responses.

### Exercise 4: Loading States
Implement loading indicators and state management for asynchronous operations.

### Exercise 5: Multiple Requests
Handle multiple API calls using Promise.all and display combined results.

### Exercise 6: Request Cancellation
Implement request cancellation using AbortController when new requests are made.

### Exercise 7: Response Caching
Create a simple caching mechanism for API responses to improve performance.

### Exercise 8: File Upload
Implement file upload functionality with progress tracking.

### Exercise 9: API Authentication
Add authentication headers to requests and handle token management.

### Exercise 10: Real-time Updates
Implement polling or WebSocket connection for real-time data updates.

## Getting Started

1. Open `exercises.js` in your editor
2. Implement each exercise following the TODO comments
3. Run `test.html` in your browser to check your solutions
4. Use `solutions.js` for reference if needed

## Testing
Open `test.html` in your browser to run the test suite. Each test will show:
- ✓ Green check for passing tests
- ✗ Red X for failing tests
- Error messages for failed tests

## Tips
- Always handle network errors
- Implement proper loading states
- Use appropriate HTTP methods
- Set correct headers
- Handle CORS issues
- Cache responses when appropriate
- Consider offline scenarios
- Implement request timeouts
- Use async/await for cleaner code

## Common Pitfalls
- Not handling network errors
- Missing loading states
- Ignoring CORS requirements
- Memory leaks in event listeners
- Not cleaning up cancelled requests
- Missing error feedback to users
- Race conditions in requests
- Excessive polling intervals

## Browser Support
- Chrome 42+
- Firefox 39+
- Safari 10.1+
- Edge 14+

Note: Some features like AbortController might need polyfills for older browsers.

## Additional Resources
- [MDN Fetch API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [JavaScript.info AJAX Tutorial](https://javascript.info/network)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [CORS Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

Move on to Module 3 once you've completed all exercises and their tests successfully. 