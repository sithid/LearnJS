export class UI {
    constructor() {
        this.screens = {
            'welcome-screen': document.getElementById('welcome-screen'),
            'quiz-screen': document.getElementById('quiz-screen'),
            'results-screen': document.getElementById('results-screen')
        };
        this.loadingOverlay = document.getElementById('loading-overlay');
        this.currentScreen = null;
    }

    initializeUI(categories) {
        console.log('Initializing UI with categories:', categories);
        this.renderCategories(categories);
        this.initializeTheme();
        this.showScreen('welcome-screen');
    }

    showScreen(screenName) {
        // Hide all screens
        Object.values(this.screens).forEach(screen => {
            screen.classList.add('hidden');
        });

        // Show requested screen
        const screen = this.screens[screenName];
        if (screen) {
            screen.classList.remove('hidden');
            this.currentScreen = screenName;
        }
    }

    renderCategories(categories) {
        const container = document.getElementById('category-list');
        const template = document.getElementById('category-template');
        
        container.innerHTML = '';
        
        categories.forEach(category => {
            const card = template.content.cloneNode(true);
            const cardElement = card.querySelector('.category-card');
            
            // Set the category ID in the dataset
            cardElement.dataset.category = category.id;
            
            card.querySelector('.category-title').textContent = category.title;
            card.querySelector('.category-description').textContent = category.description;
            card.querySelector('.category-icon').className = `category-icon ${category.icon}`;
            
            const badges = card.querySelector('.difficulty-badges');
            category.difficulties.forEach(difficulty => {
                const badge = document.createElement('span');
                badge.className = `difficulty-badge ${difficulty}`;
                badge.textContent = difficulty;
                badges.appendChild(badge);
            });
            
            container.appendChild(card);
        });
    }

    updateQuizDisplay(question, progress) {
        // Update progress
        document.getElementById('question-number').textContent = 
            `Question ${progress.current}/${progress.total}`;
        
        document.querySelector('.progress-fill').style.width = 
            `${progress.percentage}%`;

        // Update question
        document.getElementById('question-text').textContent = question.text;

        // Handle media if present
        const mediaContainer = document.getElementById('question-media');
        if (question.hasMedia()) {
            this.renderQuestionMedia(question.media, mediaContainer);
            mediaContainer.classList.remove('hidden');
        } else {
            mediaContainer.classList.add('hidden');
        }

        // Render answers
        this.renderAnswers(question);
    }

    renderQuestionMedia(media, container) {
        container.innerHTML = '';
        
        switch (media.type) {
            case 'image':
                const img = document.createElement('img');
                img.src = media.url;
                img.alt = media.alt || 'Question image';
                container.appendChild(img);
                break;
            
            case 'code':
                const pre = document.createElement('pre');
                const code = document.createElement('code');
                code.className = media.language || '';
                code.textContent = media.content;
                pre.appendChild(code);
                container.appendChild(pre);
                break;
            
            // Add other media types as needed
        }
    }

    renderAnswers(question) {
        const container = document.getElementById('answer-container');
        container.innerHTML = '';
        
        question.answers.forEach((answer, index) => {
            const option = document.createElement('div');
            option.className = 'answer-option';
            option.dataset.index = index;
            
            if (question.type === 'multiple-choice' || question.type === 'true-false') {
                option.innerHTML = `
                    <div class="answer-content">
                        <span class="answer-marker">${String.fromCharCode(65 + index)}</span>
                        <span class="answer-text">${answer}</span>
                    </div>
                `;
            } else if (question.type === 'multiple-select') {
                option.innerHTML = `
                    <div class="answer-content">
                        <input type="checkbox" id="answer-${index}">
                        <label for="answer-${index}">${answer}</label>
                    </div>
                `;
            }
            
            container.appendChild(option);
        });
    }

    showAnswerResult(answerIndex, isCorrect) {
        const options = document.querySelectorAll('.answer-option');
        
        options.forEach(option => {
            option.classList.add('disabled');
            
            const index = parseInt(option.dataset.index);
            if (index === answerIndex) {
                option.classList.add(isCorrect ? 'correct' : 'incorrect');
            }
        });
    }

    showResults(results) {
        // Update score display
        document.getElementById('final-score').textContent = `${results.score}%`;
        document.getElementById('correct-answers').textContent = results.correctAnswers;
        document.getElementById('time-taken').textContent = this.formatTime(results.timeElapsed);

        // Render answer review
        this.renderAnswerReview(results.questions);

        // Show results screen
        this.showScreen('results');
    }

    renderAnswerReview(questions) {
        const container = document.getElementById('review-container');
        const template = document.getElementById('review-template');
        
        container.innerHTML = '';
        
        questions.forEach((question, index) => {
            const review = template.content.cloneNode(true);
            
            review.querySelector('.review-question').textContent = 
                `${index + 1}. ${question.question}`;
            
            review.querySelector('.review-answer').textContent = 
                `Your answer: ${question.userAnswer || 'Not answered'}`;
            
            review.querySelector('.review-correct-answer').textContent = 
                `Correct answer: ${question.correctAnswer}`;
            
            if (question.explanation) {
                review.querySelector('.review-explanation').textContent = 
                    `Explanation: ${question.explanation}`;
            }
            
            const reviewItem = review.querySelector('.review-item');
            reviewItem.classList.add(question.isCorrect ? 'correct' : 'incorrect');
            
            container.appendChild(review);
        });
    }

    updateHighScores(scores) {
        const container = document.getElementById('high-scores-list');
        container.innerHTML = '';
        
        if (scores.length === 0) {
            container.innerHTML = '<p>No high scores yet!</p>';
            return;
        }
        
        const list = document.createElement('ol');
        scores.forEach(score => {
            const item = document.createElement('li');
            item.innerHTML = `
                <span class="score-name">${score.name}</span>
                <span class="score-details">
                    <span class="score-value">${score.score}%</span>
                    <span class="score-category">${score.category}</span>
                    <span class="score-date">${this.formatDate(score.date)}</span>
                </span>
            `;
            list.appendChild(item);
        });
        
        container.appendChild(list);
    }

    updateTimer(seconds) {
        document.getElementById('quiz-timer').textContent = this.formatTime(seconds);
    }

    showLoading() {
        console.log('Showing loading overlay');
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.remove('hidden');
        } else {
            console.error('Loading overlay element not found');
        }
    }

    hideLoading() {
        console.log('Hiding loading overlay');
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.add('hidden');
        } else {
            console.error('Loading overlay element not found');
        }
    }

    showError(message) {
        const toast = document.getElementById('error-toast');
        const messageEl = document.getElementById('error-message');
        
        messageEl.textContent = message;
        toast.classList.remove('hidden');
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }

    showSuccess(message) {
        // Could be implemented similarly to showError with a success toast
        console.log('Success:', message);
    }

    updateSoundIcon(enabled) {
        const icon = document.querySelector('#sound-toggle i');
        icon.className = enabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    }

    initializeTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        document.body.classList.toggle('dark-theme', theme === 'dark');
        this.updateThemeIcon(theme === 'dark');
    }

    toggleTheme() {
        const isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.updateThemeIcon(isDark);
    }

    updateThemeIcon(isDark) {
        const icon = document.querySelector('#theme-toggle i');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
} 