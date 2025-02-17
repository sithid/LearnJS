// Exercise 1: Basic Modules

// math.js
export const MathOperations = {
    add: (a, b) => {
        return a + b;
    },
    subtract: (a, b) => {
        return a - b;
    },
    multiply: (a, b) => {
        return a * b;
    },
    divide: (a, b) => {
        if (b === 0) {
            throw new Error('Division by zero is not allowed');
        }
        return a / b;
    }
};

// string-utils.js
export const StringUtils = {
    capitalize: (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
    reverse: (str) => {
        return str.split('').reverse().join('');
    },
    countWords: (str) => {
        return str.trim().split(/\s+/).length;
    },
    format: (template, ...args) => {
        return template.replace(/{(\d+)}/g, (match, index) => {
            return typeof args[index] !== 'undefined' ? args[index] : match;
        });
    }
};

// date-formatter.js
export const DateFormatter = {
    formatDate: (date) => {
        return date.toISOString().split('T')[0];
    },
    formatTime: (date) => {
        return date.toTimeString().split(' ')[0];
    },
    getRelativeTime: (date) => {
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
};

// validator.js
export const NumberValidator = {
    isInteger: (num) => {
        return Number.isInteger(num);
    },
    isInRange: (num, min, max) => {
        return num >= min && num <= max;
    },
    isPositive: (num) => {
        return num > 0;
    },
    isValidPhoneNumber: (num) => {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        return phoneRegex.test(num);
    }
};

// Exercise 2: Module Organization

// user.js
export class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = new Date();
    }

    updateProfile(data) {
        Object.assign(this, data);
        this.updatedAt = new Date();
    }

    static validate(userData) {
        const errors = [];
        if (!userData.name) errors.push('Name is required');
        if (!userData.email?.includes('@')) errors.push('Invalid email');
        return errors;
    }
}

// product.js
export class Product {
    static #products = new Map();

    constructor(id, name, price, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        Product.#products.set(id, this);
    }

    updatePrice(newPrice) {
        if (newPrice < 0) throw new Error('Price cannot be negative');
        this.price = newPrice;
    }

    static search(query) {
        query = query.toLowerCase();
        return Array.from(Product.#products.values())
            .filter(product => 
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
    }
}

// cart.js
export class ShoppingCart {
    constructor() {
        this.items = new Map();
        this.total = 0;
    }

    addItem(product, quantity = 1) {
        const currentQuantity = this.items.get(product.id)?.quantity || 0;
        this.items.set(product.id, {
            product,
            quantity: currentQuantity + quantity
        });
        this.calculateTotal();
    }

    removeItem(productId) {
        this.items.delete(productId);
        this.calculateTotal();
    }

    calculateTotal() {
        this.total = Array.from(this.items.values())
            .reduce((sum, { product, quantity }) => 
                sum + product.price * quantity, 0);
        return this.total;
    }
}

// order.js
export class Order {
    constructor(cart, user) {
        this.cart = cart;
        this.user = user;
        this.status = 'pending';
        this.createdAt = new Date();
        this.total = cart.total;
    }

    async process() {
        try {
            await this.validateStock();
            await this.processPayment();
            this.status = 'completed';
            return true;
        } catch (error) {
            this.status = 'failed';
            throw error;
        }
    }

    generateInvoice() {
        return {
            orderId: Math.random().toString(36).substr(2, 9),
            customerName: this.user.name,
            items: Array.from(this.cart.items.values()),
            total: this.total,
            date: this.createdAt,
            status: this.status
        };
    }
}

// Exercise 3: Advanced Patterns

// factory.js
export const UserFactory = {
    createCustomer(data) {
        return {
            ...data,
            type: 'customer',
            permissions: ['read', 'write'],
            createdAt: new Date()
        };
    },
    createAdmin(data) {
        return {
            ...data,
            type: 'admin',
            permissions: ['read', 'write', 'delete', 'manage'],
            createdAt: new Date()
        };
    },
    createGuest() {
        return {
            id: `guest-${Date.now()}`,
            type: 'guest',
            permissions: ['read'],
            createdAt: new Date()
        };
    }
};

// singleton.js
export class Database {
    static #instance = null;
    #connections = new Set();

    constructor() {
        if (Database.#instance) {
            return Database.#instance;
        }
        Database.#instance = this;
    }

    async query(sql) {
        const connection = await this.#getConnection();
        try {
            return await connection.execute(sql);
        } finally {
            this.#releaseConnection(connection);
        }
    }

    #getConnection() {
        // Simulated connection pool
        return Promise.resolve({
            execute: async (sql) => ({ rows: [], sql })
        });
    }

    #releaseConnection(connection) {
        // Release connection back to pool
    }
}

// observer.js
export class EventSystem {
    #subscribers = new Map();

    constructor() {
        this.#subscribers = new Map();
    }

    subscribe(event, callback) {
        if (!this.#subscribers.has(event)) {
            this.#subscribers.set(event, new Set());
        }
        this.#subscribers.get(event).add(callback);
        
        return () => this.unsubscribe(event, callback);
    }

    unsubscribe(event, callback) {
        const subscribers = this.#subscribers.get(event);
        if (subscribers) {
            subscribers.delete(callback);
        }
    }

    emit(event, data) {
        const subscribers = this.#subscribers.get(event);
        if (subscribers) {
            subscribers.forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event handler for ${event}:`, error);
                }
            });
        }
    }
}

// builder.js
export class QueryBuilder {
    constructor() {
        this.query = {
            select: ['*'],
            from: null,
            where: [],
            orderBy: null,
            limit: null
        };
    }

    select(fields) {
        this.query.select = Array.isArray(fields) ? fields : [fields];
        return this;
    }

    from(table) {
        this.query.from = table;
        return this;
    }

    where(condition) {
        this.query.where.push(condition);
        return this;
    }

    orderBy(field, direction = 'ASC') {
        this.query.orderBy = { field, direction };
        return this;
    }

    limit(count) {
        this.query.limit = count;
        return this;
    }

    build() {
        if (!this.query.from) {
            throw new Error('FROM clause is required');
        }

        let sql = `SELECT ${this.query.select.join(', ')} FROM ${this.query.from}`;
        
        if (this.query.where.length > 0) {
            sql += ` WHERE ${this.query.where.join(' AND ')}`;
        }
        
        if (this.query.orderBy) {
            sql += ` ORDER BY ${this.query.orderBy.field} ${this.query.orderBy.direction}`;
        }
        
        if (this.query.limit !== null) {
            sql += ` LIMIT ${this.query.limit}`;
        }

        return sql;
    }
}

// Exercise 4: Dynamic Loading

export async function loadFeature(featureName) {
    const progressCallback = (progress) => {
        // Update loading progress UI
        document.dispatchEvent(new CustomEvent('moduleLoadProgress', {
            detail: { featureName, progress }
        }));
    };

    try {
        progressCallback(0);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        progressCallback(30);

        const module = await import(/* webpackChunkName: "[request]" */ `./features/${featureName}.js`);
        progressCallback(60);

        // Initialize the feature
        await module.default.initialize();
        progressCallback(90);

        // Final setup
        await new Promise(resolve => setTimeout(resolve, 500));
        progressCallback(100);

        return module.default;
    } catch (error) {
        throw new Error(`Failed to load feature "${featureName}": ${error.message}`);
    }
}

// Exercise 5: Real Application

// core.js
export class Core {
    #modules = new Map();
    #status = 'idle';

    constructor() {
        this.eventSystem = new EventSystem();
        this.database = new Database();
    }

    async start() {
        this.#status = 'starting';
        this.eventSystem.emit('core:starting');

        try {
            await this.#initializeModules();
            this.#status = 'running';
            this.eventSystem.emit('core:started');
        } catch (error) {
            this.#status = 'error';
            this.eventSystem.emit('core:error', error);
            throw error;
        }
    }

    async stop() {
        this.#status = 'stopping';
        this.eventSystem.emit('core:stopping');

        try {
            await this.#shutdownModules();
            this.#status = 'stopped';
            this.eventSystem.emit('core:stopped');
        } catch (error) {
            this.#status = 'error';
            this.eventSystem.emit('core:error', error);
            throw error;
        }
    }

    async #initializeModules() {
        for (const [name, module] of this.#modules) {
            await module.initialize?.();
        }
    }

    async #shutdownModules() {
        for (const [name, module] of this.#modules) {
            await module.shutdown?.();
        }
    }
}

// ui.js
export class UI {
    #components = new Map();
    #root = null;

    constructor(rootElement) {
        this.#root = rootElement;
        this.eventSystem = new EventSystem();
    }

    render(component, data) {
        const element = this.#components.get(component)?.render(data);
        if (element) {
            this.#root.appendChild(element);
            this.eventSystem.emit('ui:rendered', { component, data });
        }
    }

    update(component, data) {
        const instance = this.#components.get(component);
        if (instance?.update) {
            instance.update(data);
            this.eventSystem.emit('ui:updated', { component, data });
        }
    }

    registerComponent(name, component) {
        this.#components.set(name, component);
    }
}

// data.js
export class DataManager {
    #cache = new Map();
    #db = new Database();

    constructor() {
        this.eventSystem = new EventSystem();
    }

    async fetch(resource) {
        // Check cache first
        if (this.#cache.has(resource)) {
            return this.#cache.get(resource);
        }

        try {
            const data = await this.#db.query(`SELECT * FROM ${resource}`);
            this.#cache.set(resource, data);
            this.eventSystem.emit('data:fetched', { resource, data });
            return data;
        } catch (error) {
            this.eventSystem.emit('data:error', { resource, error });
            throw error;
        }
    }

    async save(resource, data) {
        try {
            await this.#db.query(`INSERT INTO ${resource} VALUES (?)`, [data]);
            this.#cache.delete(resource); // Invalidate cache
            this.eventSystem.emit('data:saved', { resource, data });
        } catch (error) {
            this.eventSystem.emit('data:error', { resource, error });
            throw error;
        }
    }
}

// utils.js
export const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    memoize(func) {
        const cache = new Map();
        return function memoized(...args) {
            const key = JSON.stringify(args);
            if (cache.has(key)) {
                return cache.get(key);
            }
            const result = func.apply(this, args);
            cache.set(key, result);
            return result;
        };
    }
}; 