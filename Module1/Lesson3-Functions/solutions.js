// Exercise 1: Basic Functions

// 1. Calculate the area of a rectangle
export function calculateRectangleArea(width, height) {
    if (width <= 0 || height <= 0) return null;
    return width * height;
}

// 2. Convert Celsius to Fahrenheit
export function celsiusToFahrenheit(celsius) {
    if (typeof celsius !== 'number') return null;
    return (celsius * 9/5) + 32;
}

// 3. Find the longest word in a sentence
export function findLongestWord(sentence) {
    if (typeof sentence !== 'string') return '';
    if (sentence.trim() === '') return '';
    
    const words = sentence.split(' ');
    return words.reduce((longest, current) => 
        current.length > longest.length ? current : longest
    );
}

// Exercise 2: Arrow Functions

// 1. Double all numbers in an array
export const doubleNumbers = (numbers) => {
    if (!Array.isArray(numbers)) return [];
    return numbers.map(num => num * 2);
};

// 2. Filter even numbers
export const filterEvenNumbers = (numbers) => {
    if (!Array.isArray(numbers)) return [];
    return numbers.filter(num => num % 2 === 0);
};

// 3. Calculate average
export const calculateAverage = (numbers) => {
    if (!Array.isArray(numbers) || numbers.length === 0) return null;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
};

// Exercise 3: Closures and Scope

// 1. Create a counter
export function createCounter(startValue = 0) {
    let count = startValue;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getValue: () => count
    };
}

// 2. Create a private variable
export function createPrivateVariable(initialValue) {
    let value = initialValue;
    return {
        get: () => value,
        set: (newValue) => { value = newValue; }
    };
}

// 3. Function factory
export function createMultiplier(factor) {
    return (number) => number * factor;
}

// Exercise 4: Callbacks

// 1. Implement forEach
export function customForEach(array, callback) {
    if (!Array.isArray(array) || typeof callback !== 'function') return;
    
    for (let i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

// 2. Create an event system
export function createEventSystem() {
    const listeners = new Map();
    
    return {
        on: (event, callback) => {
            if (!listeners.has(event)) {
                listeners.set(event, []);
            }
            listeners.get(event).push(callback);
        },
        off: (event, callback) => {
            if (!listeners.has(event)) return;
            const callbacks = listeners.get(event);
            const index = callbacks.indexOf(callback);
            if (index !== -1) {
                callbacks.splice(index, 1);
            }
        },
        trigger: (event, data) => {
            if (!listeners.has(event)) return;
            listeners.get(event).forEach(callback => callback(data));
        }
    };
}

// 3. Async operation handler
export function createAsyncOperationManager() {
    const operations = [];
    
    return {
        addOperation: (operation) => {
            operations.push(operation);
        },
        executeOperations: () => {
            let index = 0;
            
            function executeNext() {
                if (index >= operations.length) return;
                
                operations[index](() => {
                    index++;
                    executeNext();
                });
            }
            
            executeNext();
        }
    };
}

// Advanced Challenges

// 1. Function composition
export function compose(...functions) {
    return (x) => functions.reduceRight((acc, fn) => fn(acc), x);
}

// 2. Memoization decorator
export function memoize(fn) {
    const cache = new Map();
    
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

// 3. Currying function
export function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return (...moreArgs) => curried(...args, ...moreArgs);
    };
} 