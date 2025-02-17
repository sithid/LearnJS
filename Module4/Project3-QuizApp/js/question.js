export class Question {
    constructor(data) {
        this.text = data.text;
        this.type = data.type || 'multiple-choice';
        this.answers = data.answers;
        this.correctAnswer = data.correctAnswer;
        this.explanation = data.explanation || '';
        this.points = data.points || 1;
        this.timeLimit = data.timeLimit || 0;
        this.category = data.category || 'general';
        this.difficulty = data.difficulty || 'medium';
        this.media = data.media || null;
        this.userAnswer = null;
        this.isAnswered = false;
        this.isCorrect = false;
        this.timeSpent = 0;
    }

    checkAnswer(answerIndex) {
        this.userAnswer = answerIndex;
        this.isAnswered = true;
        
        switch (this.type) {
            case 'multiple-choice':
                this.isCorrect = this.checkMultipleChoice(answerIndex);
                break;
            case 'multiple-select':
                this.isCorrect = this.checkMultipleSelect(answerIndex);
                break;
            case 'true-false':
                this.isCorrect = this.checkTrueFalse(answerIndex);
                break;
            case 'fill-in':
                this.isCorrect = this.checkFillIn(answerIndex);
                break;
            default:
                this.isCorrect = false;
        }

        return this.isCorrect;
    }

    checkMultipleChoice(answerIndex) {
        return answerIndex === this.correctAnswer;
    }

    checkMultipleSelect(selectedAnswers) {
        if (!Array.isArray(selectedAnswers) || !Array.isArray(this.correctAnswer)) {
            return false;
        }
        
        // Check if arrays have the same length and all elements
        return selectedAnswers.length === this.correctAnswer.length &&
               selectedAnswers.every(answer => this.correctAnswer.includes(answer));
    }

    checkTrueFalse(answer) {
        return answer === this.correctAnswer;
    }

    checkFillIn(answer) {
        if (!answer || !this.correctAnswer) return false;
        
        // Case insensitive comparison and trim whitespace
        const userAnswer = answer.toString().trim().toLowerCase();
        const correctAnswer = this.correctAnswer.toString().trim().toLowerCase();
        
        return userAnswer === correctAnswer;
    }

    reset() {
        this.userAnswer = null;
        this.isAnswered = false;
        this.isCorrect = false;
        this.timeSpent = 0;
    }

    updateTimeSpent(seconds) {
        this.timeSpent = seconds;
    }

    hasTimeLimit() {
        return this.timeLimit > 0;
    }

    isTimeUp() {
        return this.hasTimeLimit() && this.timeSpent >= this.timeLimit;
    }

    getTimeRemaining() {
        if (!this.hasTimeLimit()) return null;
        const remaining = this.timeLimit - this.timeSpent;
        return remaining > 0 ? remaining : 0;
    }

    hasMedia() {
        return this.media !== null;
    }

    getMediaType() {
        if (!this.hasMedia()) return null;
        
        if (this.media.type) {
            return this.media.type;
        }
        
        // Try to determine type from URL
        const url = this.media.url.toLowerCase();
        if (url.match(/\.(jpg|jpeg|png|gif)$/)) return 'image';
        if (url.match(/\.(mp4|webm)$/)) return 'video';
        if (url.match(/\.(mp3|wav)$/)) return 'audio';
        
        return 'unknown';
    }

    shuffleAnswers() {
        if (this.type !== 'multiple-choice' && this.type !== 'multiple-select') {
            return;
        }

        const currentCorrect = this.answers[this.correctAnswer];
        
        // Fisher-Yates shuffle
        for (let i = this.answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.answers[i], this.answers[j]] = [this.answers[j], this.answers[i]];
        }

        // Update correct answer index
        this.correctAnswer = this.answers.indexOf(currentCorrect);
    }

    toJSON() {
        return {
            text: this.text,
            type: this.type,
            answers: this.answers,
            correctAnswer: this.correctAnswer,
            explanation: this.explanation,
            points: this.points,
            category: this.category,
            difficulty: this.difficulty,
            media: this.media
        };
    }
} 