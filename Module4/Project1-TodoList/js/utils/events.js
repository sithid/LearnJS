export function createEventEmitter() {
    const listeners = new Map();

    return {
        on(event, callback) {
            if (!listeners.has(event)) {
                listeners.set(event, new Set());
            }
            listeners.get(event).add(callback);
        },

        off(event, callback) {
            if (listeners.has(event)) {
                listeners.get(event).delete(callback);
            }
        },

        emit(event, data) {
            if (listeners.has(event)) {
                listeners.get(event).forEach(callback => {
                    try {
                        callback(data);
                    } catch (error) {
                        console.error(`Error in event listener for ${event}:`, error);
                    }
                });
            }
        }
    };
}

export function delegate(element, eventType, selector, handler) {
    element.addEventListener(eventType, event => {
        const target = event.target.closest(selector);
        
        if (target && element.contains(target)) {
            handler.call(target, event);
        }
    });
}

export function debounce(func, wait) {
    let timeout;
    
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function throttle(func, limit) {
    let inThrottle;
    
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
} 