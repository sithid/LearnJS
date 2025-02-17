export class TodoFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.sortSelect = document.getElementById('sortSelect');
        this.filterCallback = null;
        this.sortCallback = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Filter buttons
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.setActiveFilter(button);
                if (this.filterCallback) {
                    this.filterCallback(button.dataset.filter);
                }
            });
        });

        // Sort select
        this.sortSelect.addEventListener('change', () => {
            if (this.sortCallback) {
                this.sortCallback(this.sortSelect.value);
            }
        });
    }

    setActiveFilter(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.toggle('active', button === activeButton);
        });
    }

    onFilterChange(callback) {
        this.filterCallback = callback;
    }

    onSortChange(callback) {
        this.sortCallback = callback;
    }
} 