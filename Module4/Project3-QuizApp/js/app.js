import { Quiz } from './quiz.js';
import { Storage } from './storage.js';
import { UI } from './ui.js';

class App {
    constructor() {
        console.log('App constructor started');
        this.storage = new Storage('quiz-app');
        this.ui = new UI();
        this.quiz = null;
        this.timer = null;
        this.soundEnabled = true;
        
        console.log('Starting app initialization');
        this.init();
    }

    async init() {
        try {
            console.log('Initializing app...');
            // Show loading state
            this.ui.showLoading();

            // Initialize storage
            console.log('Initializing storage...');
            await this.storage.init();

            // Load settings
            console.log('Loading settings...');
            const settings = await this.storage.getSettings();
            this.soundEnabled = settings?.soundEnabled ?? true;
            this.ui.updateSoundIcon(this.soundEnabled);

            // Initialize UI with theme
            console.log('Initializing UI theme...');
            this.ui.initializeTheme();

            // Load quiz categories
            console.log('Loading quiz categories...');
            const categories = await this.loadQuizCategories();

            // Load high scores
            console.log('Loading high scores...');
            const highScores = await this.storage.getHighScores();
            this.ui.updateHighScores(highScores);

            // Set up event listeners
            console.log('Setting up event listeners...');
            this.setupEventListeners();

            // Initialize UI with categories
            console.log('Initializing UI...');
            this.ui.initializeUI(categories);

            // Hide loading state
            console.log('Initialization complete!');
            this.ui.hideLoading();
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.ui.showError('Failed to load application. Please try again.');
            this.ui.hideLoading(); // Make sure to hide loading state even on error
        }
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.ui.toggleTheme();
        });

        // Sound toggle
        document.getElementById('sound-toggle').addEventListener('click', () => {
            this.toggleSound();
        });

        // Category selection
        document.getElementById('category-list').addEventListener('click', (e) => {
            const card = e.target.closest('.category-card');
            if (card) {
                const category = card.dataset.category;
                this.handleCategorySelect(category);
            }
        });

        // Quiz navigation
        document.getElementById('prev-question').addEventListener('click', () => {
            this.handlePreviousQuestion();
        });

        document.getElementById('next-question').addEventListener('click', () => {
            this.handleNextQuestion();
        });

        // Answer selection
        document.getElementById('answer-container').addEventListener('click', (e) => {
            const option = e.target.closest('.answer-option');
            if (option && !option.classList.contains('disabled')) {
                const index = parseInt(option.dataset.index);
                this.handleAnswerSelect(index);
            }
        });

        // Results screen actions
        document.getElementById('retry-quiz').addEventListener('click', () => {
            this.handleRetry();
        });

        document.getElementById('share-results').addEventListener('click', () => {
            this.handleShare();
        });

        document.getElementById('return-home').addEventListener('click', () => {
            this.handleReturn();
        });
    }

    async loadQuizCategories() {
        try {
            console.log('Fetching quiz categories...');
            const response = await fetch('/Module4/Project3-QuizApp/data/quizzes.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Quiz categories data:', data);
            
            if (!data.categories || !Array.isArray(data.categories)) {
                throw new Error('Invalid quiz categories data');
            }
            
            this.ui.renderCategories(data.categories);
            return data.categories;
        } catch (error) {
            console.error('Failed to load quiz categories:', error);
            this.ui.showError('Failed to load quiz categories. Please try again.');
            throw error; // Re-throw to be caught by init()
        }
    }

    async handleCategorySelect(category) {
        try {
            this.ui.showLoading();
            
            // Load quiz data for selected category
            const quizData = await this.loadQuizData(category);
            
            // Initialize new quiz
            this.quiz = new Quiz(quizData);
            
            // Start the quiz
            this.startQuiz();
            
            this.ui.hideLoading();
        } catch (error) {
            console.error('Failed to start quiz:', error);
            this.ui.showError('Failed to start quiz. Please try again.');
            this.ui.hideLoading();
        }
    }

    async loadQuizData(category) {
        try {
            const response = await fetch(`/Module4/Project3-QuizApp/data/quizzes/${category}.json`);
            const data = await response.json();
            
            // Load any saved progress
            const progress = await this.storage.getQuizProgress(category);
            if (progress) {
                Object.assign(data, progress);
            }
            
            return data;
        } catch (error) {
            throw new Error('Failed to load quiz data');
        }
    }

    startQuiz() {
        // Initialize quiz
        this.quiz.start();
        
        // Show quiz screen
        this.ui.showScreen('quiz-screen');
        
        // Update display
        this.updateQuizDisplay();
        
        // Start timer
        this.startTimer();
        
        // Play sound
        this.playSound('start');
    }

    updateQuizDisplay() {
        const question = this.quiz.getCurrentQuestion();
        const progress = this.quiz.getProgress();
        this.ui.updateQuizDisplay(question, progress);
    }

    handleAnswerSelect(answerIndex) {
        if (!this.quiz.isAnswered()) {
            const isCorrect = this.quiz.submitAnswer(answerIndex);
            
            // Show result
            this.ui.showAnswerResult(answerIndex, isCorrect);
            
            // Play sound
            this.playSound(isCorrect ? 'correct' : 'incorrect');
            
            // Auto-advance after delay if not last question
            if (!this.quiz.isLastQuestion()) {
                setTimeout(() => this.handleNextQuestion(), 1500);
            }
        }
    }

    handlePreviousQuestion() {
        if (this.quiz.hasPreviousQuestion()) {
            this.quiz.previousQuestion();
            this.updateQuizDisplay();
        }
    }

    handleNextQuestion() {
        if (this.quiz.hasNextQuestion()) {
            this.quiz.nextQuestion();
            this.updateQuizDisplay();
        } else if (this.quiz.isComplete()) {
            this.finishQuiz();
        }
    }

    async finishQuiz() {
        // Stop timer
        this.stopTimer();
        
        // Get results
        const results = this.quiz.getResults();
        
        // Save score
        await this.storage.saveScore(results);
        
        // Update high scores
        const highScores = await this.storage.getHighScores();
        this.ui.updateHighScores(highScores);
        
        // Show results screen
        this.ui.showResults(results);
        
        // Clear progress
        await this.storage.clearQuizProgress(this.quiz.category);
        
        // Play sound
        this.playSound('complete');
    }

    startTimer() {
        this.stopTimer(); // Clear any existing timer
        
        this.timer = setInterval(() => {
            this.quiz.updateTime();
            this.ui.updateTimer(this.quiz.getTime());
        }, 1000);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    handleRetry() {
        this.quiz.reset();
        this.startQuiz();
    }

    async handleShare() {
        const results = this.quiz.getResults();
        const text = `I scored ${results.score}% on the ${results.title} quiz!`;
        
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Quiz Results',
                    text: text,
                    url: window.location.href
                });
            } else {
                // Fallback to clipboard
                await navigator.clipboard.writeText(text);
                this.ui.showSuccess('Results copied to clipboard!');
            }
        } catch (error) {
            console.error('Failed to share results:', error);
            this.ui.showError('Failed to share results');
        }
    }

    handleReturn() {
        this.stopTimer();
        this.quiz = null;
        this.ui.showScreen('welcome-screen');
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.ui.updateSoundIcon(this.soundEnabled);
        this.storage.updateSettings({ soundEnabled: this.soundEnabled });
    }

    playSound(type) {
        if (!this.soundEnabled) return;
        
        // Skip sound if not implemented yet
        const sounds = {
            start: 'start.mp3',
            correct: 'correct.mp3',
            incorrect: 'incorrect.mp3',
            complete: 'complete.mp3'
        };
        
        try {
            const soundFile = sounds[type];
            if (!soundFile) return;
            
            const sound = new Audio(`assets/sounds/${soundFile}`);
            sound.play().catch(error => {
                // Silently fail if sound file is missing or can't be played
                console.log(`Sound effect ${type} not available`);
            });
        } catch (error) {
            // Ignore sound playback errors
            console.log('Sound playback not supported');
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
}); 