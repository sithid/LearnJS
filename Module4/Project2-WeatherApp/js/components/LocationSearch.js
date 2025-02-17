import { debounce } from '../utils/events.js';

export class LocationSearch {
    constructor() {
        this.searchInput = document.getElementById('locationSearch');
        this.searchResults = document.getElementById('searchResults');
        this.searchCallback = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (!this.searchInput || !this.searchResults) return;

        // Debounce input to prevent too many API calls
        this.searchInput.addEventListener('input', debounce((e) => {
            const query = e.target.value.trim();
            if (query.length >= 3) {
                this.performSearch(query);
            } else {
                this.clearResults();
            }
        }, 300));

        // Handle result selection
        this.searchResults.addEventListener('click', (e) => {
            const resultItem = e.target.closest('.search-result');
            if (resultItem) {
                const location = {
                    name: resultItem.dataset.name,
                    lat: parseFloat(resultItem.dataset.lat),
                    lon: parseFloat(resultItem.dataset.lon)
                };
                this.handleSelection(location);
            }
        });

        // Close results when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && !this.searchResults.contains(e.target)) {
                this.clearResults();
            }
        });

        // Keyboard navigation
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearResults();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.focusNextResult();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.focusPreviousResult();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const focusedResult = this.searchResults.querySelector('.search-result:focus');
                if (focusedResult) {
                    focusedResult.click();
                }
            }
        });
    }

    async performSearch(query) {
        if (this.searchCallback) {
            try {
                const results = await this.searchCallback(query);
                this.displayResults(results);
            } catch (error) {
                console.error('Search failed:', error);
                this.displayError('Search failed. Please try again.');
            }
        }
    }

    displayResults(results) {
        if (!results.length) {
            this.searchResults.innerHTML = '<div class="no-results">No locations found</div>';
            return;
        }

        this.searchResults.innerHTML = results.map(result => `
            <button class="search-result" 
                    data-name="${result.name}"
                    data-lat="${result.lat}"
                    data-lon="${result.lon}"
                    role="option"
                    tabindex="0">
                ${result.name}
                ${result.state ? `<span class="state">${result.state}</span>` : ''}
                <span class="country">${result.country}</span>
            </button>
        `).join('');

        this.searchResults.classList.remove('hidden');
    }

    displayError(message) {
        this.searchResults.innerHTML = `<div class="search-error">${message}</div>`;
        this.searchResults.classList.remove('hidden');
    }

    clearResults() {
        this.searchResults.innerHTML = '';
        this.searchResults.classList.add('hidden');
    }

    handleSelection(location) {
        this.searchInput.value = location.name;
        this.clearResults();
        if (this.searchCallback) {
            this.searchCallback(location);
        }
    }

    focusNextResult() {
        const results = this.searchResults.querySelectorAll('.search-result');
        const currentFocus = document.activeElement;
        const currentIndex = Array.from(results).indexOf(currentFocus);
        const nextIndex = currentIndex + 1;
        if (nextIndex < results.length) {
            results[nextIndex].focus();
        }
    }

    focusPreviousResult() {
        const results = this.searchResults.querySelectorAll('.search-result');
        const currentFocus = document.activeElement;
        const currentIndex = Array.from(results).indexOf(currentFocus);
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
            results[prevIndex].focus();
        } else {
            this.searchInput.focus();
        }
    }

    onSearch(callback) {
        this.searchCallback = callback;
    }
} 