import { TodoList } from '../js/todoList.js';
import { Storage } from '../js/storage.js';
import { UI } from '../js/ui.js';

class TestRunner {
    constructor() {
        this.results = [];
        this.passCount = 0;
        this.totalTests = 0;
        this.storage = null;
        this.todoList = null;
        this.ui = null;
    }

    async setup() {
        // Clear localStorage before each test
        localStorage.clear();
        
        // Initialize components
        this.storage = new Storage('todo-list-test');
        this.todoList = new TodoList(this.storage);
        this.ui = new UI(this.todoList);
        
        // Reset results
        this.results = [];
        this.passCount = 0;
        this.totalTests = 0;
    }

    async teardown() {
        localStorage.clear();
        document.body.innerHTML = '';
    }

    async runTests() {
        await this.setup();
        
        // Run all tests
        await this.testTaskCreation();
        await this.testTaskCompletion();
        await this.testTaskDeletion();
        await this.testTaskFiltering();
        await this.testDataPersistence();
        await this.testUIResponsiveness();
        
        // Display results
        this.displayResults();
        
        await this.teardown();
    }

    async assert(condition, message) {
        if (!condition) {
            throw new Error(message);
        }
    }

    addResult(testName, passed, error = null) {
        this.results.push({ testName, passed, error });
        if (passed) this.passCount++;
        this.totalTests++;
    }

    displayResults() {
        const container = document.getElementById('test-results');
        const summary = document.getElementById('test-summary');
        
        this.results.forEach(result => {
            const div = document.createElement('div');
            div.className = `test-result ${result.passed ? 'pass' : 'fail'}`;
            div.textContent = `${result.passed ? '✅' : '❌'} ${result.testName}`;
            
            if (!result.passed && result.error) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.textContent = result.error;
                div.appendChild(errorDiv);
            }
            
            container.appendChild(div);
        });

        summary.textContent = `Passed ${this.passCount} of ${this.totalTests} tests (${Math.round(this.passCount/this.totalTests*100)}%)`;
    }

    // Test Cases
    async testTaskCreation() {
        try {
            // Test adding a new task
            const task = {
                id: '1',
                title: 'Test Task',
                description: 'Test Description',
                dueDate: '2024-02-20',
                priority: 'high',
                completed: false
            };

            await this.todoList.addTask(task);
            const tasks = await this.todoList.getTasks();
            
            await this.assert(tasks.length === 1, 'Task was not added');
            await this.assert(tasks[0].title === 'Test Task', 'Task title does not match');
            
            this.addResult('Task Creation', true);
        } catch (error) {
            this.addResult('Task Creation', false, error.message);
        }
    }

    async testTaskCompletion() {
        try {
            // Add a task and mark it as complete
            const task = {
                id: '2',
                title: 'Complete Me',
                completed: false
            };

            await this.todoList.addTask(task);
            await this.todoList.toggleTaskComplete('2');
            const tasks = await this.todoList.getTasks();
            
            await this.assert(tasks[0].completed === true, 'Task was not marked as complete');
            
            this.addResult('Task Completion', true);
        } catch (error) {
            this.addResult('Task Completion', false, error.message);
        }
    }

    async testTaskDeletion() {
        try {
            // Add and then delete a task
            const task = {
                id: '3',
                title: 'Delete Me',
                completed: false
            };

            await this.todoList.addTask(task);
            await this.todoList.deleteTask('3');
            const tasks = await this.todoList.getTasks();
            
            await this.assert(tasks.length === 0, 'Task was not deleted');
            
            this.addResult('Task Deletion', true);
        } catch (error) {
            this.addResult('Task Deletion', false, error.message);
        }
    }

    async testTaskFiltering() {
        try {
            // Add multiple tasks with different states
            const tasks = [
                { id: '4', title: 'Active Task', completed: false },
                { id: '5', title: 'Completed Task', completed: true }
            ];

            for (const task of tasks) {
                await this.todoList.addTask(task);
            }

            const allTasks = await this.todoList.getTasks();
            const activeTasks = await this.todoList.getActiveTasks();
            const completedTasks = await this.todoList.getCompletedTasks();
            
            await this.assert(allTasks.length === 2, 'Incorrect total task count');
            await this.assert(activeTasks.length === 1, 'Incorrect active task count');
            await this.assert(completedTasks.length === 1, 'Incorrect completed task count');
            
            this.addResult('Task Filtering', true);
        } catch (error) {
            this.addResult('Task Filtering', false, error.message);
        }
    }

    async testDataPersistence() {
        try {
            // Add a task and verify it persists in localStorage
            const task = {
                id: '6',
                title: 'Persistent Task',
                completed: false
            };

            await this.todoList.addTask(task);
            
            // Create new instances to test persistence
            const newStorage = new Storage('todo-list-test');
            const newTodoList = new TodoList(newStorage);
            
            const tasks = await newTodoList.getTasks();
            await this.assert(tasks.length === 1, 'Task did not persist in storage');
            await this.assert(tasks[0].title === 'Persistent Task', 'Persisted task data is incorrect');
            
            this.addResult('Data Persistence', true);
        } catch (error) {
            this.addResult('Data Persistence', false, error.message);
        }
    }

    async testUIResponsiveness() {
        try {
            // Test UI updates
            const task = {
                id: '7',
                title: 'UI Test Task',
                completed: false
            };

            // Add task and check if UI updates
            await this.todoList.addTask(task);
            this.ui.refreshTaskList();
            
            const taskElement = document.querySelector(`[data-id="7"]`);
            await this.assert(taskElement !== null, 'Task element was not created in UI');
            
            // Test task completion in UI
            await this.todoList.toggleTaskComplete('7');
            this.ui.refreshTaskList();
            
            const completedTaskElement = document.querySelector(`[data-id="7"].completed`);
            await this.assert(completedTaskElement !== null, 'Task completion not reflected in UI');
            
            this.addResult('UI Responsiveness', true);
        } catch (error) {
            this.addResult('UI Responsiveness', false, error.message);
        }
    }
}

// Initialize and run tests when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const runner = new TestRunner();
    await runner.runTests();
}); 