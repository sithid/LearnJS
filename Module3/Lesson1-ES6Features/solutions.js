// Exercise 1: Arrow Functions and Lexical Scope
export const createCounter = () => {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
};

// Exercise 2: Template Literals
export const formatUser = (user) => {
    return `User ${user.name} is ${user.age} years old and lives in ${user.city}`;
};

// Exercise 3: Destructuring
export const getPersonInfo = (person) => {
    const { name, age, city } = person;
    return { name, age, city };
};

// Exercise 4: Spread/Rest Operators
export const combineArrays = (...arrays) => {
    return arrays.flat();
};

// Exercise 5: Classes
export class Shape {
    constructor(side) {
        this.side = side;
    }

    getArea() {
        return this.side * this.side;
    }

    getPerimeter() {
        return 4 * this.side;
    }
}

// Exercise 6: Map and Set
export const removeDuplicates = (array) => {
    return [...new Set(array)];
};

export const createPhoneBook = () => {
    const contacts = new Map();
    return {
        add: (name, phone) => contacts.set(name, phone),
        get: (name) => contacts.get(name)
    };
};

// Exercise 7: Optional Chaining and Nullish Coalescing
export const getNestedValue = (obj) => {
    return obj?.a?.b?.c ?? 'default';
};

// Exercise 8: Enhanced Object Literals
export const createPerson = (name, age, city) => ({
    name,
    age,
    city
});

// Exercise 9: Default Parameters
export const greet = (name, greeting = 'Hello') => {
    return `${greeting}, ${name}!`;
};

// Exercise 10: Array Methods
export const processNumbers = (numbers) => {
    return {
        sum: numbers.reduce((acc, curr) => acc + curr, 0),
        evens: numbers.filter(num => num % 2 === 0),
        doubled: numbers.map(num => num * 2)
    };
}; 