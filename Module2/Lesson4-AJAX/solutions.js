// Exercise 1: Basic GET Request
export async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch user data: ${error.message}`);
    }
}

// Exercise 2: POST Request
export async function createPost(data) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to create post: ${error.message}`);
    }
}

// Exercise 3: Error Handling
export async function fetchWithErrorHandling(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return {
                error: `HTTP error! status: ${response.status}`,
                statusCode: response.status
            };
        }
        const data = await response.json();
        return { data };
    } catch (error) {
        return {
            error: error.message,
            isNetworkError: true
        };
    }
}

// Exercise 4: Loading States
export function createLoadingManager() {
    let loadingCount = 0;

    return {
        startLoading() {
            loadingCount++;
        },
        stopLoading() {
            loadingCount = Math.max(0, loadingCount - 1);
        },
        isLoading() {
            return loadingCount > 0;
        },
        getLoadingCount() {
            return loadingCount;
        }
    };
}

// Exercise 5: Multiple Requests
export async function fetchUserWithPosts(userId) {
    try {
        const [user, posts] = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(res => res.json()),
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(res => res.json())
        ]);
        return { user, posts };
    } catch (error) {
        throw new Error(`Failed to fetch user data: ${error.message}`);
    }
}

// Exercise 6: Request Cancellation
export function createCancellableFetch() {
    let controller = new AbortController();

    return {
        fetch: async (url, options = {}) => {
            controller = new AbortController();
            try {
                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal
                });
                return await response.json();
            } catch (error) {
                if (error.name === 'AbortError') {
                    throw new Error('Request was cancelled');
                }
                throw error;
            }
        },
        cancel: () => {
            controller.abort();
        }
    };
}

// Exercise 7: Response Caching
export function createCachedFetch() {
    const cache = new Map();

    return async (url) => {
        const cached = cache.get(url);
        if (cached && !isExpired(cached.timestamp)) {
            return cached.data;
        }

        const response = await fetch(url);
        const data = await response.json();
        cache.set(url, {
            data,
            timestamp: Date.now()
        });
        return data;
    };
}

// Exercise 8: File Upload
export async function uploadFile(file, onProgress) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('file', file);

        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percentage = Math.round((event.loaded * 100) / event.total);
                onProgress(percentage);
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(new Error(`Upload failed: ${xhr.statusText}`));
            }
        });

        xhr.addEventListener('error', () => {
            reject(new Error('Upload failed'));
        });

        xhr.open('POST', 'https://api.example.com/upload');
        xhr.send(formData);
    });
}

// Exercise 9: API Authentication
export function createAuthenticatedFetch(token) {
    return async (url, options = {}) => {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                throw new Error('Unauthorized');
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            throw new Error(`Authentication error: ${error.message}`);
        }
    };
}

// Exercise 10: Real-time Updates
export function createRealtimeConnection(url, onUpdate) {
    let websocket = null;
    let pollInterval = null;

    const connect = () => {
        if (isWebSocketUrl(url)) {
            websocket = new WebSocket(url);
            websocket.onmessage = (event) => onUpdate(JSON.parse(event.data));
            websocket.onerror = (error) => console.error('WebSocket error:', error);
        } else {
            pollInterval = setInterval(async () => {
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    onUpdate(data);
                } catch (error) {
                    console.error('Polling error:', error);
                }
            }, 5000); // Poll every 5 seconds
        }
    };

    const disconnect = () => {
        if (websocket) {
            websocket.close();
            websocket = null;
        }
        if (pollInterval) {
            clearInterval(pollInterval);
            pollInterval = null;
        }
    };

    return { connect, disconnect };
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