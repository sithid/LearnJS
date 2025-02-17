// Exercise 1: Array Operations

function findLargestNumber(numbers) {
    let largest = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > largest) {
            largest = numbers[i];
        }
    }
    return largest;
}

function removeDuplicates(array) {
    let result = [];
    for (let item of array) {
        if (!result.includes(item)) {
            result.push(item);
        }
    }
    return result;
}

function customReverse(array) {
    let result = [];
    for (let i = array.length - 1; i >= 0; i--) {
        result.push(array[i]);
    }
    return result;
}

// Test cases for Exercise 1
console.log("Exercise 1: Array Operations");
console.log("Largest number:", findLargestNumber([5, 3, 9, 1, 7]));
console.log("Remove duplicates:", removeDuplicates([1, 2, 2, 3, 3, 4]));
console.log("Custom reverse:", customReverse([1, 2, 3, 4, 5]));

// Exercise 2: Shopping List Manager
const shoppingList = {
    items: [],

    addItem(name, quantity = 1) {
        const existingItem = this.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ name, quantity });
        }
    },

    removeItem(name) {
        const index = this.items.findIndex(item => item.name === name);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    },

    updateQuantity(name, newQuantity) {
        const item = this.items.find(item => item.name === name);
        if (item) {
            item.quantity = newQuantity;
        }
    },

    listItems() {
        return this.items.map(item => 
            `${item.name}: ${item.quantity}`
        ).join('\n');
    }
};

// Test cases for Exercise 2
console.log("\nExercise 2: Shopping List Manager");
shoppingList.addItem("Apples", 5);
shoppingList.addItem("Bananas", 3);
console.log(shoppingList.listItems());
shoppingList.updateQuantity("Apples", 7);
console.log(shoppingList.listItems());
shoppingList.removeItem("Bananas");
console.log(shoppingList.listItems());

// Exercise 3: Student Grade Tracker
const gradeTracker = {
    students: [],

    addStudent(name, grades) {
        this.students.push({ name, grades });
    },

    calculateAverage(studentName) {
        const student = this.students.find(s => s.name === studentName);
        if (!student) return null;
        const sum = student.grades.reduce((total, grade) => total + grade, 0);
        return sum / student.grades.length;
    },

    findTopPerformer() {
        return this.students.reduce((top, current) => {
            const currentAvg = this.calculateAverage(current.name);
            const topAvg = top ? this.calculateAverage(top.name) : 0;
            return currentAvg > topAvg ? current : top;
        }, null);
    },

    generateReport() {
        return this.students.map(student => ({
            name: student.name,
            average: this.calculateAverage(student.name)
        }));
    }
};

// Test cases for Exercise 3
console.log("\nExercise 3: Student Grade Tracker");
gradeTracker.addStudent("John", [85, 90, 87]);
gradeTracker.addStudent("Jane", [92, 88, 95]);
console.log("John's average:", gradeTracker.calculateAverage("John"));
console.log("Top performer:", gradeTracker.findTopPerformer().name);
console.log("Class report:", gradeTracker.generateReport());

// Exercise 4: Library Catalog
const library = {
    books: [],

    addBook(title, author, genre, isbn) {
        this.books.push({
            title,
            author,
            genre,
            isbn,
            borrowed: false,
            borrower: null
        });
    },

    searchBooks(criteria) {
        return this.books.filter(book => {
            return Object.entries(criteria).every(([key, value]) => 
                book[key].toLowerCase().includes(value.toLowerCase())
            );
        });
    },

    borrowBook(isbn, borrower) {
        const book = this.books.find(b => b.isbn === isbn);
        if (book && !book.borrowed) {
            book.borrowed = true;
            book.borrower = borrower;
            return true;
        }
        return false;
    },

    returnBook(isbn) {
        const book = this.books.find(b => b.isbn === isbn);
        if (book && book.borrowed) {
            book.borrowed = false;
            book.borrower = null;
            return true;
        }
        return false;
    },

    generateReport() {
        return this.books.map(book => ({
            title: book.title,
            status: book.borrowed ? `Borrowed by ${book.borrower}` : 'Available'
        }));
    }
};

// Test cases for Exercise 4
console.log("\nExercise 4: Library Catalog");
library.addBook("The Hobbit", "J.R.R. Tolkien", "Fantasy", "978-0547928227");
library.addBook("1984", "George Orwell", "Science Fiction", "978-0451524935");
console.log("Fantasy books:", library.searchBooks({ genre: "Fantasy" }));
library.borrowBook("978-0547928227", "John Smith");
console.log("Library report:", library.generateReport());

// Exercise 5: Data Transformation
const salesData = [
    { product: "Laptop", price: 999.99, quantity: 5, category: "Electronics" },
    { product: "Mouse", price: 29.99, quantity: 10, category: "Electronics" },
    { product: "Desk", price: 199.99, quantity: 3, category: "Furniture" }
];

function filterByCategory(data, category) {
    return data.filter(item => item.category === category);
}

function calculateCategoryTotals(data) {
    return data.reduce((totals, item) => {
        const total = item.price * item.quantity;
        totals[item.category] = (totals[item.category] || 0) + total;
        return totals;
    }, {});
}

function transformData(data) {
    const groupedData = data.reduce((result, item) => {
        if (!result[item.category]) {
            result[item.category] = {
                items: [],
                subtotal: 0
            };
        }
        result[item.category].items.push({
            product: item.product,
            total: item.price * item.quantity
        });
        result[item.category].subtotal += item.price * item.quantity;
        return result;
    }, {});

    return Object.entries(groupedData).map(([category, data]) => ({
        category,
        items: data.items,
        subtotal: data.subtotal
    }));
}

// Test cases for Exercise 5
console.log("\nExercise 5: Data Transformation");
console.log("Electronics items:", filterByCategory(salesData, "Electronics"));
console.log("Category totals:", calculateCategoryTotals(salesData));
console.log("Transformed data:", transformData(salesData)); 