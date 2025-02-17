export class Storage {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.highScoresKey = `${storageKey}_high_scores`;
        this.settingsKey = `${storageKey}_settings`;
        this.maxHighScores = 10;
    }

    async init() {
        try {
            if (!this.isStorageAvailable()) {
                throw new Error('Local storage is not available');
            }

            // Initialize high scores if not exists
            if (!localStorage.getItem(this.highScoresKey)) {
                localStorage.setItem(this.highScoresKey, JSON.stringify([]));
            }

            // Initialize settings if not exists
            if (!localStorage.getItem(this.settingsKey)) {
                const defaultSettings = {
                    theme: 'light',
                    sound: true,
                    difficulty: 'medium'
                };
                localStorage.setItem(this.settingsKey, JSON.stringify(defaultSettings));
            }

            return true;
        } catch (error) {
            console.error('Storage initialization error:', error);
            throw new Error('Failed to initialize storage');
        }
    }

    async saveScore(results) {
        try {
            const highScores = await this.getHighScores();
            
            const newScore = {
                name: 'Anonymous', // Could be updated with user's name
                score: results.score,
                category: results.category,
                difficulty: results.difficulty,
                date: new Date().toISOString(),
                timeElapsed: results.timeElapsed,
                correctAnswers: results.correctAnswers,
                totalQuestions: results.totalQuestions
            };

            highScores.push(newScore);

            // Sort by score (descending) and time (ascending)
            highScores.sort((a, b) => {
                if (b.score !== a.score) {
                    return b.score - a.score;
                }
                return a.timeElapsed - b.timeElapsed;
            });

            // Keep only top scores
            const topScores = highScores.slice(0, this.maxHighScores);

            await this.setHighScores(topScores);
            return true;
        } catch (error) {
            console.error('Error saving score:', error);
            throw new Error('Failed to save score');
        }
    }

    async getHighScores() {
        try {
            const scores = localStorage.getItem(this.highScoresKey);
            return scores ? JSON.parse(scores) : [];
        } catch (error) {
            console.error('Error getting high scores:', error);
            return [];
        }
    }

    async setHighScores(scores) {
        try {
            localStorage.setItem(this.highScoresKey, JSON.stringify(scores));
            return true;
        } catch (error) {
            console.error('Error setting high scores:', error);
            throw new Error('Failed to set high scores');
        }
    }

    async clearHighScores() {
        try {
            localStorage.setItem(this.highScoresKey, JSON.stringify([]));
            return true;
        } catch (error) {
            console.error('Error clearing high scores:', error);
            throw new Error('Failed to clear high scores');
        }
    }

    async getSettings() {
        try {
            const settings = localStorage.getItem(this.settingsKey);
            return settings ? JSON.parse(settings) : null;
        } catch (error) {
            console.error('Error getting settings:', error);
            return null;
        }
    }

    async updateSettings(newSettings) {
        try {
            const currentSettings = await this.getSettings();
            const updatedSettings = { ...currentSettings, ...newSettings };
            localStorage.setItem(this.settingsKey, JSON.stringify(updatedSettings));
            return true;
        } catch (error) {
            console.error('Error updating settings:', error);
            throw new Error('Failed to update settings');
        }
    }

    async getQuizProgress(quizId) {
        try {
            const key = `${this.storageKey}_progress_${quizId}`;
            const progress = localStorage.getItem(key);
            return progress ? JSON.parse(progress) : null;
        } catch (error) {
            console.error('Error getting quiz progress:', error);
            return null;
        }
    }

    async saveQuizProgress(quizId, progress) {
        try {
            const key = `${this.storageKey}_progress_${quizId}`;
            localStorage.setItem(key, JSON.stringify(progress));
            return true;
        } catch (error) {
            console.error('Error saving quiz progress:', error);
            throw new Error('Failed to save quiz progress');
        }
    }

    async clearQuizProgress(quizId) {
        try {
            const key = `${this.storageKey}_progress_${quizId}`;
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error clearing quiz progress:', error);
            throw new Error('Failed to clear quiz progress');
        }
    }

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

    clearAll() {
        try {
            // Clear only items related to this app
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.storageKey)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            console.error('Error clearing storage:', error);
            throw new Error('Failed to clear storage');
        }
    }
} 