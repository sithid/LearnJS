// Exercise 1: Array Operations

// 1. Find maximum value in array
export function findMax(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) return null;
    return Math.max(...numbers);
}

// 2. Remove duplicates from array
export function removeDuplicates(array) {
    if (!Array.isArray(array)) return [];
    return [...new Set(array)];
}

// 3. Rotate array by k positions
export function rotateArray(array, k) {
    if (!Array.isArray(array) || array.length === 0) return null;
    if (typeof k !== 'number') return null;
    
    const normalizedK = ((k % array.length) + array.length) % array.length;
    return [...array.slice(-normalizedK), ...array.slice(0, -normalizedK)];
}

// Exercise 2: Array Transformations

// 1. Transform user objects
export function formatUsers(users) {
    if (!Array.isArray(users)) return [];
    
    const currentYear = new Date().getFullYear();
    return users.map(user => ({
        fullName: user.name,
        yearOfBirth: currentYear - user.age
    }));
}

// 2. Filter and transform products
export function processProducts(products) {
    if (!Array.isArray(products)) return [];
    
    return products
        .filter(product => product.inStock)
        .map(product => ({
            name: product.name,
            priceWithTax: product.price * 1.2
        }));
}

// 3. Group and count items
export function groupAndCount(items) {
    if (!Array.isArray(items)) return {};
    
    return items.reduce((groups, item) => {
        const category = item.category;
        groups[category] = (groups[category] || 0) + 1;
        return groups;
    }, {});
}

// Exercise 3: Object Manipulation

// 1. Deep clone object
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }
    
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, deepClone(value)])
    );
}

// 2. Merge objects
export function mergeObjects(obj1, obj2) {
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return null;
    if (obj1 === null || obj2 === null) return null;
    
    const merged = { ...obj1 };
    
    for (const [key, value] of Object.entries(obj2)) {
        if (typeof value === 'object' && value !== null && 
            typeof merged[key] === 'object' && merged[key] !== null) {
            merged[key] = mergeObjects(merged[key], value);
        } else {
            merged[key] = value;
        }
    }
    
    return merged;
}

// 3. Create object hierarchy
export function createHierarchy(data) {
    if (!Array.isArray(data)) return null;
    
    const nodeMap = new Map();
    const rootNodes = [];
    
    // Create nodes
    data.forEach(item => {
        nodeMap.set(item.id, { ...item, children: [] });
    });
    
    // Build hierarchy
    data.forEach(item => {
        const node = nodeMap.get(item.id);
        if (item.parent === null) {
            rootNodes.push(node);
        } else {
            const parent = nodeMap.get(item.parent);
            if (parent) {
                parent.children.push(node);
            }
        }
    });
    
    return rootNodes[0] || null;
}

// Exercise 4: Advanced Operations

// 1. Array intersection
export function findIntersection(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
    
    const set1 = new Set(arr1);
    return [...new Set(arr2.filter(item => set1.has(item)))];
}

// 2. Object validator
export function validateObject(obj, schema) {
    if (typeof obj !== 'object' || typeof schema !== 'object') return null;
    if (obj === null || schema === null) return null;
    
    const errors = [];
    
    for (const [key, rules] of Object.entries(schema)) {
        // Check required fields
        if (rules.required && !(key in obj)) {
            errors.push(`${key} is required`);
            continue;
        }
        
        // Skip if field is not present and not required
        if (!(key in obj)) continue;
        
        // Type validation
        const value = obj[key];
        if (rules.type && typeof value !== rules.type) {
            errors.push(`${key} should be of type ${rules.type}`);
        }
    }
    
    return errors;
}

// 3. Data transformer
export function transformData(data, transformations) {
    if (!Array.isArray(data) || !Array.isArray(transformations)) return null;
    
    return transformations.reduce((result, transformation) => {
        const [operation, param] = transformation.split(':');
        
        switch (operation) {
            case 'sort':
                return [...result].sort((a, b) => a[param] - b[param]);
            case 'filter':
                const [field, value] = param.split('>');
                return result.filter(item => item[field] > Number(value));
            case 'map':
                return result.map(item => item[param]);
            default:
                return result;
        }
    }, data);
}

// Advanced Challenges

// 1. Implement deep equality
export function deepEqual(value1, value2) {
    if (value1 === value2) return true;
    
    if (typeof value1 !== 'object' || typeof value2 !== 'object') return false;
    if (value1 === null || value2 === null) return false;
    
    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);
    
    if (keys1.length !== keys2.length) return false;
    
    return keys1.every(key => 
        key in value2 && deepEqual(value1[key], value2[key])
    );
}

// 2. Create object observer
export function createObservable(obj) {
    const handlers = {
        get: [],
        set: []
    };
    
    return new Proxy(obj, {
        get(target, property) {
            handlers.get.forEach(handler => handler(property));
            return target[property];
        },
        set(target, property, value) {
            const oldValue = target[property];
            target[property] = value;
            handlers.set.forEach(handler => 
                handler(property, value, oldValue)
            );
            return true;
        },
        onGet(handler) {
            handlers.get.push(handler);
        },
        onSet(handler) {
            handlers.set.push(handler);
        }
    });
}

// 3. Implement undo/redo
export function createVersioned(obj) {
    const history = [deepClone(obj)];
    let currentIndex = 0;
    
    return {
        get value() {
            return history[currentIndex];
        },
        commit() {
            // Remove any forward history
            history.splice(currentIndex + 1);
            // Add new version
            history.push(deepClone(this.value));
            currentIndex++;
        },
        undo() {
            if (currentIndex > 0) {
                currentIndex--;
            }
        },
        redo() {
            if (currentIndex < history.length - 1) {
                currentIndex++;
            }
        }
    };
} 