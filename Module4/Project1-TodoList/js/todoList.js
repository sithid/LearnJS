export class TodoList {
    constructor(storage) {
        this.storage = storage;
        this.tasks = [];
    }

    async loadTasks() {
        try {
            this.tasks = await this.storage.getTasks() || [];
            return this.tasks;
        } catch (error) {
            console.error('Error loading tasks:', error);
            throw new Error('Failed to load tasks');
        }
    }

    async addTask(task) {
        try {
            // Validate task
            this.validateTask(task);

            // Add task to array
            this.tasks.push(task);

            // Save to storage
            await this.storage.saveTasks(this.tasks);

            return task;
        } catch (error) {
            console.error('Error adding task:', error);
            throw new Error('Failed to add task');
        }
    }

    async updateTask(taskId, updates) {
        try {
            const taskIndex = this.tasks.findIndex(task => task.id === taskId);
            if (taskIndex === -1) {
                throw new Error('Task not found');
            }

            // Update task
            const updatedTask = {
                ...this.tasks[taskIndex],
                ...updates,
                updatedAt: new Date().toISOString()
            };

            // Validate updated task
            this.validateTask(updatedTask);

            // Replace task in array
            this.tasks[taskIndex] = updatedTask;

            // Save to storage
            await this.storage.saveTasks(this.tasks);

            return updatedTask;
        } catch (error) {
            console.error('Error updating task:', error);
            throw new Error('Failed to update task');
        }
    }

    async deleteTask(taskId) {
        try {
            const taskIndex = this.tasks.findIndex(task => task.id === taskId);
            if (taskIndex === -1) {
                throw new Error('Task not found');
            }

            // Remove task from array
            this.tasks.splice(taskIndex, 1);

            // Save to storage
            await this.storage.saveTasks(this.tasks);

            return true;
        } catch (error) {
            console.error('Error deleting task:', error);
            throw new Error('Failed to delete task');
        }
    }

    async toggleTaskComplete(taskId) {
        try {
            const task = this.tasks.find(task => task.id === taskId);
            if (!task) {
                throw new Error('Task not found');
            }

            // Toggle completion status
            await this.updateTask(taskId, {
                completed: !task.completed,
                completedAt: !task.completed ? new Date().toISOString() : null
            });

            return true;
        } catch (error) {
            console.error('Error toggling task completion:', error);
            throw new Error('Failed to update task status');
        }
    }

    async completeAllTasks() {
        try {
            // Update all tasks to completed
            this.tasks = this.tasks.map(task => ({
                ...task,
                completed: true,
                completedAt: task.completed ? task.completedAt : new Date().toISOString()
            }));

            // Save to storage
            await this.storage.saveTasks(this.tasks);

            return true;
        } catch (error) {
            console.error('Error completing all tasks:', error);
            throw new Error('Failed to complete all tasks');
        }
    }

    async clearCompletedTasks() {
        try {
            // Remove completed tasks
            this.tasks = this.tasks.filter(task => !task.completed);

            // Save to storage
            await this.storage.saveTasks(this.tasks);

            return true;
        } catch (error) {
            console.error('Error clearing completed tasks:', error);
            throw new Error('Failed to clear completed tasks');
        }
    }

    getFilteredTasks(filter = 'all', searchQuery = '') {
        let filteredTasks = [...this.tasks];

        // Apply status filter
        switch (filter) {
            case 'active':
                filteredTasks = filteredTasks.filter(task => !task.completed);
                break;
            case 'completed':
                filteredTasks = filteredTasks.filter(task => task.completed);
                break;
        }

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredTasks = filteredTasks.filter(task =>
                task.title.toLowerCase().includes(query) ||
                task.description.toLowerCase().includes(query)
            );
        }

        return filteredTasks;
    }

    sortTasks(tasks, sortBy = 'date-asc') {
        const sortedTasks = [...tasks];

        switch (sortBy) {
            case 'date-asc':
                sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
                break;
            case 'date-desc':
                sortedTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
                break;
            case 'priority':
                const priorityOrder = { high: 0, medium: 1, low: 2 };
                sortedTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
                break;
            case 'status':
                sortedTasks.sort((a, b) => {
                    if (a.completed === b.completed) return 0;
                    return a.completed ? 1 : -1;
                });
                break;
        }

        return sortedTasks;
    }

    validateTask(task) {
        // Required fields
        if (!task.title) {
            throw new Error('Task title is required');
        }

        // Title length
        if (task.title.length > 100) {
            throw new Error('Task title must be less than 100 characters');
        }

        // Description length
        if (task.description && task.description.length > 500) {
            throw new Error('Task description must be less than 500 characters');
        }

        // Due date format
        if (task.dueDate && isNaN(new Date(task.dueDate).getTime())) {
            throw new Error('Invalid due date format');
        }

        // Priority values
        if (task.priority && !['low', 'medium', 'high'].includes(task.priority)) {
            throw new Error('Invalid priority value');
        }

        // Completed flag
        if (typeof task.completed !== 'boolean') {
            throw new Error('Invalid completed status');
        }
    }

    getActiveTaskCount() {
        return this.tasks.filter(task => !task.completed).length;
    }

    getCompletedTaskCount() {
        return this.tasks.filter(task => task.completed).length;
    }
}