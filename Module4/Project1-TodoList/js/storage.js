export class Storage {
    constructor(storageKey) {
        this.storageKey = storageKey;
    }

    async getTasks() {
        try {
            // Simulate async operation
            await this.simulateDelay();

            const tasksJson = localStorage.getItem(this.storageKey);
            return tasksJson ? JSON.parse(tasksJson) : [];
        } catch (error) {
            console.error('Error retrieving tasks from storage:', error);
            throw new Error('Failed to retrieve tasks from storage');
        }
    }

    async saveTasks(tasks) {
        try {
            // Validate input
            if (!Array.isArray(tasks)) {
                throw new Error('Tasks must be an array');
            }

            // Simulate async operation
            await this.simulateDelay();

            // Save to localStorage
            localStorage.setItem(this.storageKey, JSON.stringify(tasks));
            return true;
        } catch (error) {
            console.error('Error saving tasks to storage:', error);
            throw new Error('Failed to save tasks to storage');
        }
    }

    async clearTasks() {
        try {
            // Simulate async operation
            await this.simulateDelay();

            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Error clearing tasks from storage:', error);
            throw new Error('Failed to clear tasks from storage');
        }
    }

    simulateDelay() {
        // Simulate network delay for realistic async behavior
        return new Promise(resolve => setTimeout(resolve, Math.random() * 200));
    }

    // Helper method to check if localStorage is available
    isStorageAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }
} 