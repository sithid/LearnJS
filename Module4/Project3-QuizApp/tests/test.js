import { Quiz } from '../js/quiz.js';
import { Question } from '../js/question.js';
import { Storage } from '../js/storage.js';
import { UI } from '../js/ui.js';

// Mock quiz data for testing
const mockQuizData = {
    title: "JavaScript Basics",
    category: "javascript-basics",
    description: "Test your knowledge of JavaScript fundamentals",
    difficulty: "medium",
    timeLimit: 1200,
    questions: [
        {
            text: "Which keyword is used to declare a variable that can be reassigned?",
            type: "multiple-choice",
            answers: ["let", "const", "var", "def"],
            correctAnswer: 0,
            points: 1,
            explanation: "The 'let' keyword is used to declare variables that can be reassigned."
        },
        {
            text: "JavaScript is a case-sensitive language.",
            type: "true-false",
            answers: ["True", "False"],
            correctAnswer: 0,
            points: 1,
            explanation: "JavaScript is case-sensitive."
        },
        {
            text: "Select all primitive data types in JavaScript:",
            type: "multiple-select",
            answers: ["String", "Array", "Number", "Object", "Boolean", "Undefined"],
            correctAnswer: [0, 2, 4, 5],
            points: 2,
            explanation: "Primitive data types are String, Number, Boolean, Undefined, Null, and Symbol."
        }
    ]
};

class TestRunner {
    constructor() {
        this.results = [];
        this.passCount = 0;
        this.totalTests = 0;
        this.quiz = null;
        this.storage = null;
        this.ui = null;
    }

    async setup() {
        // Clear localStorage
        localStorage.clear();
        
        // Initialize components
        this.storage = new Storage('quiz-test');
        this.quiz = new Quiz(mockQuizData);
        this.ui = new UI();
        
        // Reset results
        this.results = [];
        this.passCount = 0;
        this.totalTests = 0;
        
        // Set up DOM test environment
        document.getElementById('test-environment').innerHTML = `
            <div id="quiz-title"></div>
            <div id="question-text"></div>
            <div id="answer-container"></div>
            <div id="quiz-timer"></div>
            <div id="progress-bar"></div>
        `;
    }

    async teardown() {
        localStorage.clear();
        document.getElementById('test-environment').innerHTML = '';
    }

    async runTests() {
        await this.setup();
        
        // Run all tests
        await this.testQuizInitialization();
        await this.testQuestionHandling();
        await this.testAnswerSubmission();
        await this.testScoring();
        await this.testTimer();
        await this.testProgress();
        await this.testResultsCalculation();
        await this.testDataPersistence();
        
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
    async testQuizInitialization() {
        try {
            await this.assert(this.quiz.title === mockQuizData.title, 'Quiz title should match');
            await this.assert(this.quiz.questions.length === 3, 'Quiz should have 3 questions');
            await this.assert(this.quiz.timeLimit === 1200, 'Time limit should be set');
            
            this.addResult('Quiz Initialization', true);
        } catch (error) {
            this.addResult('Quiz Initialization', false, error.message);
        }
    }

    async testQuestionHandling() {
        try {
            const question = this.quiz.getCurrentQuestion();
            
            await this.assert(question instanceof Question, 'Should return a Question instance');
            await this.assert(question.type === 'multiple-choice', 'First question should be multiple choice');
            await this.assert(question.answers.length === 4, 'Should have 4 answer options');
            
            this.addResult('Question Handling', true);
        } catch (error) {
            this.addResult('Question Handling', false, error.message);
        }
    }

    async testAnswerSubmission() {
        try {
            // Test multiple choice question
            let result = this.quiz.submitAnswer(0); // Correct answer
            await this.assert(result === true, 'Should be correct answer');
            
            this.quiz.nextQuestion();
            
            // Test true/false question
            result = this.quiz.submitAnswer(0); // Correct answer
            await this.assert(result === true, 'Should be correct answer');
            
            this.quiz.nextQuestion();
            
            // Test multiple select question
            result = this.quiz.submitAnswer([0, 2, 4, 5]); // Correct answer
            await this.assert(result === true, 'Should be correct answer');
            
            this.addResult('Answer Submission', true);
        } catch (error) {
            this.addResult('Answer Submission', false, error.message);
        }
    }

    async testScoring() {
        try {
            this.quiz.reset();
            
            // Answer all questions correctly
            this.quiz.submitAnswer(0); // 1 point
            this.quiz.nextQuestion();
            this.quiz.submitAnswer(0); // 1 point
            this.quiz.nextQuestion();
            this.quiz.submitAnswer([0, 2, 4, 5]); // 2 points
            
            const results = this.quiz.getResults();
            await this.assert(results.score === 100, 'Score should be 100%');
            await this.assert(results.correctAnswers === 3, 'Should have 3 correct answers');
            
            this.addResult('Scoring', true);
        } catch (error) {
            this.addResult('Scoring', false, error.message);
        }
    }

    async testTimer() {
        try {
            this.quiz.reset();
            this.quiz.start();
            
            // Wait 1 second
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            await this.assert(this.quiz.getTime() >= 1, 'Timer should be running');
            await this.assert(!this.quiz.isTimeUp(), 'Time should not be up');
            
            this.addResult('Timer', true);
        } catch (error) {
            this.addResult('Timer', false, error.message);
        }
    }

    async testProgress() {
        try {
            this.quiz.reset();
            
            const initialProgress = this.quiz.getProgress();
            await this.assert(initialProgress.current === 1, 'Should start at first question');
            await this.assert(initialProgress.total === 3, 'Should have 3 total questions');
            
            this.quiz.nextQuestion();
            const nextProgress = this.quiz.getProgress();
            await this.assert(nextProgress.current === 2, 'Should move to second question');
            
            this.addResult('Progress Tracking', true);
        } catch (error) {
            this.addResult('Progress Tracking', false, error.message);
        }
    }

    async testResultsCalculation() {
        try {
            this.quiz.reset();
            
            // Mix of correct and incorrect answers
            this.quiz.submitAnswer(0); // Correct
            this.quiz.nextQuestion();
            this.quiz.submitAnswer(1); // Incorrect
            this.quiz.nextQuestion();
            this.quiz.submitAnswer([0, 2, 4, 5]); // Correct
            
            const results = this.quiz.getResults();
            await this.assert(results.score === 75, 'Score should be 75%'); // 3 points out of 4
            await this.assert(results.correctAnswers === 2, 'Should have 2 correct answers');
            await this.assert(results.incorrectAnswers === 1, 'Should have 1 incorrect answer');
            
            this.addResult('Results Calculation', true);
        } catch (error) {
            this.addResult('Results Calculation', false, error.message);
        }
    }

    async testDataPersistence() {
        try {
            // Complete a quiz
            this.quiz.reset();
            this.quiz.submitAnswer(0);
            this.quiz.nextQuestion();
            this.quiz.submitAnswer(0);
            this.quiz.nextQuestion();
            this.quiz.submitAnswer([0, 2, 4, 5]);
            
            const results = this.quiz.getResults();
            
            // Save results
            await this.storage.saveScore(results);
            
            // Get high scores
            const highScores = await this.storage.getHighScores();
            await this.assert(highScores.length > 0, 'High scores should be saved');
            await this.assert(highScores[0].score === 100, 'Score should be persisted');
            
            this.addResult('Data Persistence', true);
        } catch (error) {
            this.addResult('Data Persistence', false, error.message);
        }
    }
}

// Initialize and run tests when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const runner = new TestRunner();
    await runner.runTests();
}); 