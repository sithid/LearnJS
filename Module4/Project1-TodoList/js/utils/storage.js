export class Storage {
    constructor(storageKey) {
        this.storageKey = storageKey;
    }

    async getTasks() {
        try {
            const tasksJson = localStorage.getItem(this.storageKey);
            return tasksJson ? JSON.parse(tasksJson) : [];
        } catch (error) {
            console.error('Error retrieving tasks from storage:', error);
            throw new Error('Failed to retrieve tasks from storage');
        }
    }

    async saveTasks(tasks) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(tasks));
        } catch (error) {
            console.error('Error saving tasks to storage:', error);
            throw new Error('Failed to save tasks to storage');
        }
    }

    async clearTasks() {
        try {
            localStorage.removeItem(this.storageKey);
        } catch (error) {
            console.error('Error clearing tasks from storage:', error);
            throw new Error('Failed to clear tasks from storage');
        }
    }
}