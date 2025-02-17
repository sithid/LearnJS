// Exercise 1: Basic Module Exports
export const PI = 3.14159;
export const E = 2.71828;
export const square = x => x * x;
export const cube = x => x * x * x;

// Exercise 2: Default Export - Calculator Class
export default class Calculator {
    add(a, b) {
        return a + b;
    }
    
    subtract(a, b) {
        return a - b;
    }
    
    multiply(a, b) {
        return a * b;
    }
    
    divide(a, b) {
        if (b === 0) {
            throw new Error('Division by zero');
        }
        return a / b;
    }
}

// Exercise 3: Module Organization - User Utils
export const userUtils = {
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    formatName(firstName, lastName) {
        const formatWord = word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        return `${formatWord(firstName)} ${formatWord(lastName)}`;
    }
};

// Exercise 4: Module Dependencies - Process User Data
export const processUserData = async ({ firstName, lastName, date }) => {
    try {
        // Validate inputs
        if (!firstName || !lastName || !date) {
            throw new Error('Missing required fields');
        }
        
        // Process data
        const fullName = userUtils.formatName(firstName, lastName);
        const formattedDate = new Date(date).toISOString();
        
        return {
            fullName,
            formattedDate,
            processed: true,
            timestamp: Date.now()
        };
    } catch (error) {
        throw new Error(`Error processing user data: ${error.message}`);
    }
};

// Exercise 5: Dynamic Imports
export const loadModule = async (moduleName) => {
    try {
        const module = await import(`./${moduleName}.js`);
        await module.initialize?.(); // Call initialize if it exists
        return module;
    } catch (error) {
        throw new Error(`Failed to load module ${moduleName}: ${error.message}`);
    }
};

// Exercise 6: Module Aggregation
export const api = {
    math: {
        PI,
        E,
        square,
        cube
    },
    calculator: new Calculator(),
    user: userUtils
};

// Exercise 7: Circular Dependencies
const moduleB = {
    getData: () => 'Data from B'
};

export const moduleA = {
    getValue() {
        return 42;
    },
    
    useModuleB() {
        return `Module A using: ${moduleB.getData()}`;
    }
};

// Lazy initialization for moduleB to avoid circular dependency issues
Object.assign(moduleB, {
    useModuleA() {
        return `Module B using: ${moduleA.getValue()}`;
    }
});

// Exercise 8: Module State
export const stateManager = (function() {
    let state = {};
    const listeners = new Set();
    
    return {
        setState(newState) {
            state = { ...state, ...newState };
            listeners.forEach(listener => listener(state));
        },
        
        getState() {
            return { ...state };
        },
        
        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        }
    };
})();

// Exercise 9: Module Initialization
export const databaseModule = {
    _connection: null,
    _initialized: false,
    
    async initialize(config) {
        if (this._initialized) {
            throw new Error('Database already initialized');
        }
        
        try {
            // Simulate database connection
            await new Promise(resolve => setTimeout(resolve, 100));
            this._connection = {
                ...config,
                timestamp: Date.now()
            };
            this._initialized = true;
            console.log('Database initialized');
        } catch (error) {
            throw new Error(`Database initialization failed: ${error.message}`);
        }
    },
    
    async query(sql) {
        if (!this._initialized) {
            throw new Error('Database not initialized');
        }
        
        // Simulate query execution
        await new Promise(resolve => setTimeout(resolve, 50));
        return {
            sql,
            timestamp: Date.now(),
            connection: this._connection
        };
    },
    
    async cleanup() {
        if (!this._initialized) {
            return;
        }
        
        try {
            // Simulate cleanup
            await new Promise(resolve => setTimeout(resolve, 100));
            this._connection = null;
            this._initialized = false;
            console.log('Database connection closed');
        } catch (error) {
            throw new Error(`Database cleanup failed: ${error.message}`);
        }
    }
};

// Exercise 10: Module Patterns
export const modulePatterns = {
    // Singleton Logger
    logger: (function() {
        let instance;
        
        function createLogger() {
            const logs = [];
            
            return {
                log(message) {
                    const timestamp = new Date().toISOString();
                    logs.push({ timestamp, message, type: 'log' });
                    console.log(`[${timestamp}] ${message}`);
                },
                
                error(message) {
                    const timestamp = new Date().toISOString();
                    logs.push({ timestamp, message, type: 'error' });
                    console.error(`[${timestamp}] ERROR: ${message}`);
                },
                
                getLogs() {
                    return [...logs];
                }
            };
        }
        
        return {
            getInstance() {
                if (!instance) {
                    instance = createLogger();
                }
                return instance;
            }
        };
    })(),
    
    // Calculator using module pattern
    calculator: (function() {
        const history = [];
        
        function addToHistory(operation, a, b, result) {
            history.push({
                operation,
                a,
                b,
                result,
                timestamp: Date.now()
            });
        }
        
        return {
            add(a, b) {
                const result = a + b;
                addToHistory('add', a, b, result);
                return result;
            },
            
            subtract(a, b) {
                const result = a - b;
                addToHistory('subtract', a, b, result);
                return result;
            },
            
            multiply(a, b) {
                const result = a * b;
                addToHistory('multiply', a, b, result);
                return result;
            },
            
            divide(a, b) {
                if (b === 0) {
                    throw new Error('Division by zero');
                }
                const result = a / b;
                addToHistory('divide', a, b, result);
                return result;
            },
            
            getHistory() {
                return [...history];
            }
        };
    })(),
    
    // User Factory
    userFactory: {
        createUser(role, data) {
            const baseUser = {
                id: Date.now(),
                createdAt: new Date(),
                role,
                ...data
            };
            
            switch (role) {
                case 'admin':
                    return {
                        ...baseUser,
                        permissions: ['read', 'write', 'delete', 'manage'],
                        isAdmin: true
                    };
                    
                case 'moderator':
                    return {
                        ...baseUser,
                        permissions: ['read', 'write', 'delete'],
                        isModerator: true
                    };
                    
                case 'user':
                    return {
                        ...baseUser,
                        permissions: ['read', 'write'],
                        isUser: true
                    };
                    
                default:
                    return {
                        ...baseUser,
                        permissions: ['read'],
                        isGuest: true
                    };
            }
        }
    }
}; 