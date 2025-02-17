// Exercise 1: Registration Form
function initializeRegistrationForm() {
    const form = document.getElementById('registration-form');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const strengthMeter = document.querySelector('.strength-meter');

    // Password strength meter
    function updatePasswordStrength(password) {
        let strength = 0;
        let feedback = [];

        // Length check
        if (password.length >= 8) {
            strength += 25;
        } else {
            feedback.push('Password should be at least 8 characters');
        }

        // Uppercase check
        if (/[A-Z]/.test(password)) {
            strength += 25;
        } else {
            feedback.push('Add an uppercase letter');
        }

        // Number check
        if (/\d/.test(password)) {
            strength += 25;
        } else {
            feedback.push('Add a number');
        }

        // Special character check
        if (/[!@#$%^&*]/.test(password)) {
            strength += 25;
        } else {
            feedback.push('Add a special character');
        }

        // Update strength meter
        strengthMeter.style.width = `${strength}%`;
        if (strength < 25) {
            strengthMeter.style.backgroundColor = '#ff4444';
        } else if (strength < 50) {
            strengthMeter.style.backgroundColor = '#ffbb33';
        } else if (strength < 75) {
            strengthMeter.style.backgroundColor = '#ffeb3b';
        } else {
            strengthMeter.style.backgroundColor = '#00C851';
        }

        return { strength, feedback };
    }

    // Real-time validation
    function validateField(field, value) {
        const errors = [];

        switch (field) {
            case 'username':
                if (value.length < 3) {
                    errors.push('Username must be at least 3 characters long');
                }
                break;

            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errors.push('Please enter a valid email address');
                }
                break;

            case 'password':
                const { feedback } = updatePasswordStrength(value);
                errors.push(...feedback);
                break;

            case 'confirm-password':
                if (value !== password.value) {
                    errors.push('Passwords do not match');
                }
                break;
        }

        const errorElement = document.getElementById(`${field}-error`);
        if (errors.length > 0) {
            errorElement.textContent = errors.join(', ');
            errorElement.style.display = 'block';
            return false;
        } else {
            errorElement.style.display = 'none';
            return true;
        }
    }

    // Add input event listeners
    ['username', 'email', 'password', 'confirm-password'].forEach(field => {
        const input = document.getElementById(field);
        input.addEventListener('input', () => validateField(field, input.value));
    });

    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let isValid = true;
        ['username', 'email', 'password', 'confirm-password'].forEach(field => {
            if (!validateField(field, document.getElementById(field).value)) {
                isValid = false;
            }
        });

        if (isValid) {
            alert('Registration successful!');
            form.reset();
            strengthMeter.style.width = '0';
        }
    });
}

// Exercise 2: Payment Form
function initializePaymentForm() {
    const form = document.getElementById('payment-form');
    const cardNumber = document.getElementById('card-number');
    const expiry = document.getElementById('expiry');
    const cvv = document.getElementById('cvv');

    // Format credit card number
    function formatCardNumber(value) {
        const digits = value.replace(/\D/g, '');
        const groups = digits.match(/(\d{1,4})/g) || [];
        return groups.join(' ').substr(0, 19);
    }

    // Format expiry date
    function formatExpiry(value) {
        const digits = value.replace(/\D/g, '');
        if (digits.length >= 2) {
            const month = digits.substr(0, 2);
            const year = digits.substr(2);
            return `${month}/${year}`;
        }
        return digits;
    }

    // Luhn algorithm for card validation
    function isValidCardNumber(number) {
        const digits = number.replace(/\D/g, '');
        let sum = 0;
        let isEven = false;

        for (let i = digits.length - 1; i >= 0; i--) {
            let digit = parseInt(digits[i]);

            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            isEven = !isEven;
        }

        return sum % 10 === 0;
    }

    // Validate form fields
    function validatePaymentField(field, value) {
        const errors = [];

        switch (field) {
            case 'card-number':
                const digits = value.replace(/\D/g, '');
                if (digits.length !== 16) {
                    errors.push('Card number must be 16 digits');
                } else if (!isValidCardNumber(digits)) {
                    errors.push('Invalid card number');
                }
                break;

            case 'expiry':
                const [month, year] = value.split('/');
                const now = new Date();
                const currentYear = now.getFullYear() % 100;
                const currentMonth = now.getMonth() + 1;

                if (!month || !year || month > 12 || month < 1) {
                    errors.push('Invalid expiry date');
                } else if (year < currentYear || (year == currentYear && month < currentMonth)) {
                    errors.push('Card has expired');
                }
                break;

            case 'cvv':
                if (!/^\d{3,4}$/.test(value)) {
                    errors.push('CVV must be 3 or 4 digits');
                }
                break;

            case 'postal-code':
                if (!/^\d{5}(-\d{4})?$/.test(value)) {
                    errors.push('Invalid postal code');
                }
                break;
        }

        const errorElement = document.getElementById(`${field}-error`);
        if (errors.length > 0) {
            errorElement.textContent = errors.join(', ');
            errorElement.style.display = 'block';
            return false;
        } else {
            errorElement.style.display = 'none';
            return true;
        }
    }

    // Add input event listeners
    cardNumber.addEventListener('input', function() {
        this.value = formatCardNumber(this.value);
        validatePaymentField('card-number', this.value);
    });

    expiry.addEventListener('input', function() {
        this.value = formatExpiry(this.value);
        validatePaymentField('expiry', this.value);
    });

    cvv.addEventListener('input', function() {
        validatePaymentField('cvv', this.value);
    });

    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let isValid = true;
        ['card-number', 'expiry', 'cvv', 'postal-code'].forEach(field => {
            if (!validatePaymentField(field, document.getElementById(field).value)) {
                isValid = false;
            }
        });

        if (isValid) {
            alert('Payment processed successfully!');
            form.reset();
        }
    });
}

// Exercise 3: Survey Form
function initializeSurveyForm() {
    const form = document.getElementById('survey-form');
    const progressBar = document.getElementById('survey-progress');
    const ratingContainer = document.getElementById('satisfaction-rating');
    let selectedRating = null;

    // Handle rating selection
    function handleRatingSelection(event) {
        const option = event.target;
        if (option.classList.contains('rating-option')) {
            // Update selection
            document.querySelectorAll('.rating-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            option.classList.add('selected');
            selectedRating = option.dataset.value;

            // Clear error if exists
            document.getElementById('satisfaction-error').style.display = 'none';
            
            // Update progress
            updateProgress();
        }
    }

    // Update progress bar
    function updateProgress() {
        const requiredFields = [
            selectedRating !== null,
            Array.from(document.querySelectorAll('input[name="features"]:checked')).length > 0,
            document.getElementById('feedback').value.trim().length > 0
        ];

        const progress = (requiredFields.filter(Boolean).length / requiredFields.length) * 100;
        progressBar.style.width = `${progress}%`;

        if (progress < 33) {
            progressBar.style.backgroundColor = '#ff4444';
        } else if (progress < 66) {
            progressBar.style.backgroundColor = '#ffbb33';
        } else {
            progressBar.style.backgroundColor = '#00C851';
        }
    }

    // Add event listeners
    ratingContainer.addEventListener('click', handleRatingSelection);

    document.querySelectorAll('input[name="features"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });

    document.getElementById('feedback').addEventListener('input', updateProgress);

    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validate rating
        if (!selectedRating) {
            document.getElementById('satisfaction-error').textContent = 'Please select a rating';
            document.getElementById('satisfaction-error').style.display = 'block';
            return;
        }

        // Validate features
        const selectedFeatures = Array.from(document.querySelectorAll('input[name="features"]:checked'));
        if (selectedFeatures.length === 0) {
            document.getElementById('features-error').textContent = 'Please select at least one feature';
            document.getElementById('features-error').style.display = 'block';
            return;
        }

        // Collect data
        const surveyData = {
            rating: selectedRating,
            features: selectedFeatures.map(cb => cb.value),
            feedback: document.getElementById('feedback').value.trim()
        };

        console.log('Survey submitted:', surveyData);
        alert('Thank you for your feedback!');
        form.reset();
        selectedRating = null;
        document.querySelectorAll('.rating-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        updateProgress();
    });
}

// Exercise 4: File Upload
function initializeFileUpload() {
    const form = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-upload');
    const preview = document.getElementById('file-preview');
    const progressBar = document.getElementById('upload-progress');
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    // Handle file selection
    function handleFileSelect(event) {
        const files = Array.from(event.target.files);
        preview.innerHTML = '';
        progressBar.style.width = '0';
        
        // Validate files
        const invalidFiles = files.filter(file => {
            if (!file.type.startsWith('image/')) {
                return 'Only image files are allowed';
            }
            if (file.size > maxFileSize) {
                return 'File size must be less than 5MB';
            }
            return false;
        });

        if (invalidFiles.length > 0) {
            document.getElementById('file-error').textContent = 'Invalid files selected';
            document.getElementById('file-error').style.display = 'block';
            fileInput.value = '';
            return;
        }

        document.getElementById('file-error').style.display = 'none';
        files.forEach(showPreview);
    }

    // Show file preview
    function showPreview(file) {
        const reader = new FileReader();
        const container = document.createElement('div');
        container.className = 'preview-item';

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'preview-image';
            container.appendChild(img);

            const removeBtn = document.createElement('button');
            removeBtn.textContent = '×';
            removeBtn.className = 'remove-file';
            removeBtn.onclick = () => {
                container.remove();
                updateFileList();
            };
            container.appendChild(removeBtn);
        };

        reader.readAsDataURL(file);
        preview.appendChild(container);
    }

    // Update file list after removal
    function updateFileList() {
        const dataTransfer = new DataTransfer();
        const currentPreviews = preview.querySelectorAll('.preview-item');
        
        Array.from(fileInput.files).forEach((file, index) => {
            if (currentPreviews[index]) {
                dataTransfer.items.add(file);
            }
        });

        fileInput.files = dataTransfer.files;
    }

    // Simulate file upload
    function simulateUpload() {
        let progress = 0;
        progressBar.style.width = '0';

        const interval = setInterval(() => {
            progress += 5;
            progressBar.style.width = `${progress}%`;

            if (progress >= 100) {
                clearInterval(interval);
                alert('Files uploaded successfully!');
                form.reset();
                preview.innerHTML = '';
                progressBar.style.width = '0';
            }
        }, 100);
    }

    // Add event listeners
    fileInput.addEventListener('change', handleFileSelect);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (fileInput.files.length > 0) {
            simulateUpload();
        } else {
            document.getElementById('file-error').textContent = 'Please select at least one file';
            document.getElementById('file-error').style.display = 'block';
        }
    });
}

// Exercise 5: Dynamic Form
function initializeDynamicForm() {
    const form = document.getElementById('dynamic-form');
    const fieldsContainer = document.getElementById('form-fields');
    const addButton = document.getElementById('add-field');
    const prevButton = document.getElementById('prev-step');
    const nextButton = document.getElementById('next-step');
    let currentStep = 1;
    let totalSteps = 1;

    // Add new field
    function addField() {
        const fieldGroup = document.createElement('div');
        fieldGroup.className = 'form-group';
        fieldGroup.dataset.step = currentStep;

        const fieldNumber = fieldsContainer.querySelectorAll(`[data-step="${currentStep}"]`).length + 1;
        
        fieldGroup.innerHTML = `
            <label for="field${currentStep}-${fieldNumber}">Field ${currentStep}.${fieldNumber}:</label>
            <input type="text" id="field${currentStep}-${fieldNumber}" name="field${currentStep}-${fieldNumber}" required>
            <div class="error" id="field${currentStep}-${fieldNumber}-error"></div>
        `;

        fieldsContainer.appendChild(fieldGroup);
        updateNavigation();
    }

    // Handle navigation
    function navigate(direction) {
        // Validate current step
        const currentFields = fieldsContainer.querySelectorAll(`[data-step="${currentStep}"]`);
        let isValid = true;

        if (direction > 0) {
            currentFields.forEach(field => {
                const input = field.querySelector('input');
                if (!input.value.trim()) {
                    const error = field.querySelector('.error');
                    error.textContent = 'This field is required';
                    error.style.display = 'block';
                    isValid = false;
                }
            });

            if (!isValid) return;
        }

        // Update step
        currentStep += direction;
        if (currentStep > totalSteps) {
            totalSteps = currentStep;
        }

        // Show/hide fields
        fieldsContainer.querySelectorAll('.form-group').forEach(group => {
            group.style.display = group.dataset.step == currentStep ? 'block' : 'none';
        });

        updateNavigation();
    }

    // Update navigation buttons
    function updateNavigation() {
        prevButton.disabled = currentStep === 1;
        nextButton.disabled = currentStep === 3; // Maximum 3 steps
        addButton.disabled = fieldsContainer.querySelectorAll(`[data-step="${currentStep}"]`).length >= 5; // Maximum 5 fields per step
    }

    // Add event listeners
    addButton.addEventListener('click', addField);
    prevButton.addEventListener('click', () => navigate(-1));
    nextButton.addEventListener('click', () => navigate(1));

    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validate all fields
        let isValid = true;
        const formData = {};

        fieldsContainer.querySelectorAll('.form-group').forEach(group => {
            const input = group.querySelector('input');
            const error = group.querySelector('.error');

            if (!input.value.trim()) {
                error.textContent = 'This field is required';
                error.style.display = 'block';
                isValid = false;
            } else {
                error.style.display = 'none';
                formData[input.name] = input.value;
            }
        });

        if (isValid) {
            console.log('Form data:', formData);
            alert('Form submitted successfully!');
            form.reset();
            
            // Reset to initial state
            currentStep = 1;
            totalSteps = 1;
            fieldsContainer.innerHTML = `
                <div class="form-group" data-step="1">
                    <label for="field1">Field 1:</label>
                    <input type="text" id="field1" name="field1" required>
                    <div class="error" id="field1-error"></div>
                </div>
            `;
            updateNavigation();
        }
    });

    // Initialize navigation
    updateNavigation();
}

// Initialize all exercises when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeRegistrationForm();
    initializePaymentForm();
    initializeSurveyForm();
    initializeFileUpload();
    initializeDynamicForm();
}); 