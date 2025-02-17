import { Question } from './question.js';

export class Quiz {
    constructor(quizData) {
        this.title = quizData.title;
        this.category = quizData.category;
        this.description = quizData.description;
        this.difficulty = quizData.difficulty;
        this.questions = this.initializeQuestions(quizData.questions);
        this.currentIndex = 0;
        this.score = 0;
        this.timeStarted = null;
        this.timeElapsed = 0;
        this.isActive = false;
    }

    initializeQuestions(questionData) {
        return questionData.map(data => new Question(data));
    }

    start() {
        this.currentIndex = 0;
        this.score = 0;
        this.timeStarted = new Date();
        this.timeElapsed = 0;
        this.isActive = true;
        this.shuffleQuestions();
    }

    reset() {
        this.questions.forEach(question => question.reset());
        this.start();
    }

    shuffleQuestions() {
        // Fisher-Yates shuffle algorithm
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    getCurrentQuestion() {
        return this.questions[this.currentIndex];
    }

    submitAnswer(answerIndex) {
        const question = this.getCurrentQuestion();
        const isCorrect = question.checkAnswer(answerIndex);
        
        if (isCorrect) {
            this.score += question.points;
        }
        
        return isCorrect;
    }

    nextQuestion() {
        if (this.hasNextQuestion()) {
            this.currentIndex++;
            return true;
        }
        return false;
    }

    previousQuestion() {
        if (this.hasPreviousQuestion()) {
            this.currentIndex--;
            return true;
        }
        return false;
    }

    hasNextQuestion() {
        return this.currentIndex < this.questions.length - 1;
    }

    hasPreviousQuestion() {
        return this.currentIndex > 0;
    }

    isLastQuestion() {
        return this.currentIndex === this.questions.length - 1;
    }

    isAnswered() {
        return this.getCurrentQuestion().isAnswered;
    }

    isComplete() {
        return this.questions.every(question => question.isAnswered);
    }

    updateTime() {
        if (this.isActive && this.timeStarted) {
            this.timeElapsed = Math.floor((new Date() - this.timeStarted) / 1000);
        }
    }

    getTime() {
        return this.timeElapsed;
    }

    getProgress() {
        return {
            current: this.currentIndex + 1,
            total: this.questions.length,
            percentage: ((this.currentIndex + 1) / this.questions.length) * 100,
            answered: this.questions.filter(q => q.isAnswered).length
        };
    }

    getResults() {
        const totalPoints = this.questions.reduce((sum, q) => sum + q.points, 0);
        const scorePercentage = Math.round((this.score / totalPoints) * 100);

        return {
            title: this.title,
            category: this.category,
            difficulty: this.difficulty,
            score: scorePercentage,
            timeElapsed: this.timeElapsed,
            totalQuestions: this.questions.length,
            correctAnswers: this.questions.filter(q => q.isCorrect).length,
            incorrectAnswers: this.questions.filter(q => q.isAnswered && !q.isCorrect).length,
            questions: this.questions.map(q => ({
                question: q.text,
                userAnswer: q.userAnswer !== null ? q.answers[q.userAnswer] : null,
                correctAnswer: q.answers[q.correctAnswer],
                isCorrect: q.isCorrect,
                explanation: q.explanation
            }))
        };
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
} 