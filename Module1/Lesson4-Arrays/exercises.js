// Exercise 1: Array Operations
// TODO: Implement the following array operation functions

function findLargestNumber(numbers) {
    // Your code here
    // Find the largest number in the array without using Math.max
}

function removeDuplicates(array) {
    // Your code here
    // Remove duplicates without using Set
}

function customReverse(array) {
    // Your code here
    // Reverse array without using array.reverse()
}

// Test cases for Exercise 1
console.log("Exercise 1: Array Operations");
// TODO: Uncomment and test your functions
// console.log("Largest number:", findLargestNumber([5, 3, 9, 1, 7]));
// console.log("Remove duplicates:", removeDuplicates([1, 2, 2, 3, 3, 4]));
// console.log("Custom reverse:", customReverse([1, 2, 3, 4, 5]));

// Exercise 2: Shopping List Manager
const shoppingList = {
    items: [],

    addItem(name, quantity = 1) {
        // Your code here
        // Add item with quantity to the list
    },

    removeItem(name) {
        // Your code here
        // Remove item from the list
    },

    updateQuantity(name, newQuantity) {
        // Your code here
        // Update quantity of an existing item
    },

    listItems() {
        // Your code here
        // Return formatted list of all items
    }
};

// Test cases for Exercise 2
console.log("\nExercise 2: Shopping List Manager");
// TODO: Uncomment and test the shopping list
// shoppingList.addItem("Apples", 5);
// shoppingList.addItem("Bananas", 3);
// console.log(shoppingList.listItems());
// shoppingList.updateQuantity("Apples", 7);
// console.log(shoppingList.listItems());
// shoppingList.removeItem("Bananas");
// console.log(shoppingList.listItems());

// Exercise 3: Student Grade Tracker
const gradeTracker = {
    students: [],

    addStudent(name, grades) {
        // Your code here
        // Add student with their grades
    },

    calculateAverage(studentName) {
        // Your code here
        // Calculate average grade for a student
    },

    findTopPerformer() {
        // Your code here
        // Find student with highest average grade
    },

    generateReport() {
        // Your code here
        // Generate report with all students and their averages
    }
};

// Test cases for Exercise 3
console.log("\nExercise 3: Student Grade Tracker");
// TODO: Uncomment and test the grade tracker
// gradeTracker.addStudent("John", [85, 90, 87]);
// gradeTracker.addStudent("Jane", [92, 88, 95]);
// console.log("John's average:", gradeTracker.calculateAverage("John"));
// console.log("Top performer:", gradeTracker.findTopPerformer());
// console.log("Class report:", gradeTracker.generateReport());

// Exercise 4: Library Catalog
const library = {
    books: [],

    addBook(title, author, genre, isbn) {
        // Your code here
        // Add book to the catalog
    },

    searchBooks(criteria) {
        // Your code here
        // Search books by title, author, or genre
    },

    borrowBook(isbn, borrower) {
        // Your code here
        // Mark book as borrowed
    },

    returnBook(isbn) {
        // Your code here
        // Mark book as returned
    },

    generateReport() {
        // Your code here
        // Generate report of all books and their status
    }
};

// Test cases for Exercise 4
console.log("\nExercise 4: Library Catalog");
// TODO: Uncomment and test the library
// library.addBook("The Hobbit", "J.R.R. Tolkien", "Fantasy", "978-0547928227");
// library.addBook("1984", "George Orwell", "Science Fiction", "978-0451524935");
// console.log("Fantasy books:", library.searchBooks({ genre: "Fantasy" }));
// library.borrowBook("978-0547928227", "John Smith");
// console.log("Library report:", library.generateReport());

// Exercise 5: Data Transformation
const salesData = [
    { product: "Laptop", price: 999.99, quantity: 5, category: "Electronics" },
    { product: "Mouse", price: 29.99, quantity: 10, category: "Electronics" },
    { product: "Desk", price: 199.99, quantity: 3, category: "Furniture" }
];

function filterByCategory(data, category) {
    // Your code here
    // Filter items by category
}

function calculateCategoryTotals(data) {
    // Your code here
    // Calculate total sales by category
}

function transformData(data) {
    // Your code here
    // Transform data into a new structure
    // Group by category with subtotals
}

// Test cases for Exercise 5
console.log("\nExercise 5: Data Transformation");
// TODO: Uncomment and test the data transformations
// console.log("Electronics items:", filterByCategory(salesData, "Electronics"));
// console.log("Category totals:", calculateCategoryTotals(salesData));
// console.log("Transformed data:", transformData(salesData));

// Remember to test your code by uncommenting the test cases!
// Happy coding! 🚀 