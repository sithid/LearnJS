# Lesson 3: Modules in JavaScript

## Learning Objectives
By the end of this lesson, you will be able to:
- Understand JavaScript module system
- Use import and export statements
- Create modular code architecture
- Handle module dependencies
- Test modular applications
- Implement modern module patterns
- Apply module best practices

## Prerequisites
- Understanding of ES6+ features
- Completion of previous lessons
- Modern browser with module support
- Local development server

## 1. Module Basics

### Export Syntax
```javascript
// Named exports
export const PI = 3.14159;
export function square(x) {
    return x * x;
}
export class Circle {
    constructor(radius) {
        this.radius = radius;
    }
}

// Default export
export default class Calculator {
    // Implementation
}
```

### Import Syntax
```javascript
// Named imports
import { PI, square, Circle } from './math.js';

// Default import
import Calculator from './calculator.js';

// Namespace import
import * as MathUtils from './math-utils.js';

// Mixed imports
import Calculator, { add, subtract } from './calculator.js';
```

## 2. Module Organization

### File Structure
```
src/
├── index.js
├── modules/
│   ├── user/
│   │   ├── index.js
│   │   ├── user.js
│   │   └── validation.js
│   ├── auth/
│   │   ├── index.js
│   │   └── auth.js
│   └── utils/
│       ├── index.js
│       └── helpers.js
└── tests/
    └── user.test.js
```

### Barrel Files (index.js)
```javascript
// modules/user/index.js
export { User } from './user.js';
export { validateUser } from './validation.js';

// Usage
import { User, validateUser } from './modules/user';
```

## 3. Advanced Patterns

### Dynamic Imports
```javascript
async function loadFeature() {
    try {
        const module = await import('./feature.js');
        module.initialize();
    } catch (error) {
        console.error('Failed to load feature:', error);
    }
}
```

### Module Augmentation
```javascript
// base-logger.js
export class Logger {
    log(message) {
        console.log(message);
    }
}

// enhanced-logger.js
import { Logger } from './base-logger.js';

export class EnhancedLogger extends Logger {
    logWithTimestamp(message) {
        super.log(`${new Date().toISOString()} - ${message}`);
    }
}
```

### Circular Dependencies
```javascript
// Avoid this pattern
// a.js
import { b } from './b.js';
export const a = 1;

// b.js
import { a } from './a.js';
export const b = a + 1;

// Better approach
// shared.js
export const state = {
    a: 1,
    b: 2
};
```

## 4. Testing Modules

### Test Setup
```javascript
// math.test.js
import { expect } from 'chai';
import { add, multiply } from './math.js';

describe('Math Module', () => {
    it('should add numbers correctly', () => {
        expect(add(2, 3)).to.equal(5);
    });

    it('should multiply numbers correctly', () => {
        expect(multiply(2, 3)).to.equal(6);
    });
});
```

### Mocking Modules
```javascript
// user.test.js
import { jest } from '@jest/globals';
import { User } from './user.js';

jest.mock('./api.js', () => ({
    fetchUser: jest.fn().mockResolvedValue({
        id: 1,
        name: 'Test User'
    })
}));
```

## Testing Your Code

### Running Tests
1. Open `test.html` in your browser
2. Write your code in `exercises.js`
3. Tests run automatically
4. Fix any failing tests
5. Verify all tests pass

### Test Cases Cover
- Module exports/imports
- Dynamic loading
- Error handling
- Circular dependencies
- Module patterns
- Integration tests
- Mock implementations

## Practice Exercises

### Exercise 1: Basic Modules
Create and export:
- Constants and functions
- Classes and objects
- Default exports
- Mixed exports

### Exercise 2: Module Organization
Implement a modular system:
- User management
- Authentication
- Data handling
- Utility functions

### Exercise 3: Advanced Patterns
Build features using:
- Dynamic imports
- Module augmentation
- Dependency injection
- Error boundaries

### Exercise 4: Testing
Create comprehensive tests:
- Unit tests
- Integration tests
- Mock modules
- Test coverage

## Best Practices
- Use clear naming conventions
- Keep modules focused
- Avoid circular dependencies
- Implement proper error handling
- Write comprehensive tests
- Document module interfaces
- Use barrel files appropriately

## Common Mistakes
- Circular dependencies
- Large monolithic modules
- Missing error handling
- Improper exports
- Inconsistent naming
- Poor documentation

## Debugging Tips
1. Use source maps
2. Check module loading
3. Verify import paths
4. Test module isolation
5. Monitor dependencies
6. Use browser DevTools

## Additional Resources
- MDN Modules Guide
- JavaScript.info Modules
- Testing Documentation
- Module Best Practices
- Dependency Management

## Next Steps
1. Complete all exercises
2. Pass all tests
3. Review solutions
4. Practice patterns
5. Move to Module 4: Projects

Remember to maintain clean module architecture and comprehensive test coverage. 