# Lesson 3: Forms and Validation

## Learning Objectives
By the end of this lesson, you will be able to:
- Create and style HTML forms
- Implement client-side form validation
- Handle form submissions
- Work with different input types
- Create custom validation rules
- Display validation feedback
- Use HTML5 form features

## 1. HTML Forms Basics

### Form Structure
```html
<form id="myForm" action="/submit" method="POST">
    <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
    </div>
    <button type="submit">Submit</button>
</form>
```

### Common Input Types
```html
<!-- Text input -->
<input type="text" name="username">

<!-- Password -->
<input type="password" name="password">

<!-- Email -->
<input type="email" name="email">

<!-- Number -->
<input type="number" name="age" min="0" max="120">

<!-- Checkbox -->
<input type="checkbox" name="subscribe" checked>

<!-- Radio buttons -->
<input type="radio" name="gender" value="male">
<input type="radio" name="gender" value="female">

<!-- Select dropdown -->
<select name="country">
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
</select>

<!-- Textarea -->
<textarea name="message" rows="4" cols="50"></textarea>
```

## 2. Form Validation

### HTML5 Validation Attributes
```html
<!-- Required field -->
<input type="text" required>

<!-- Minimum length -->
<input type="text" minlength="3">

<!-- Maximum length -->
<input type="text" maxlength="20">

<!-- Pattern matching -->
<input type="text" pattern="[A-Za-z]{3,}">

<!-- Number range -->
<input type="number" min="0" max="100">
```

### JavaScript Validation
```javascript
function validateForm(form) {
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    // Username validation
    if (username.length < 3) {
        showError('username', 'Username must be at least 3 characters');
        return false;
    }

    // Email validation
    if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email');
        return false;
    }

    // Password validation
    if (!isValidPassword(password)) {
        showError('password', 'Password must be at least 8 characters');
        return false;
    }

    return true;
}
```

## 3. Form Events

### Event Handling
```javascript
// Form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        submitForm(this);
    }
});

// Real-time validation
input.addEventListener('input', function() {
    validateField(this);
});

// Blur validation
input.addEventListener('blur', function() {
    validateField(this);
});
```

## 4. Custom Validation

### Creating Custom Rules
```javascript
function validatePassword(password) {
    const rules = {
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecial: /[!@#$%^&*]/.test(password)
    };

    return {
        isValid: Object.values(rules).every(Boolean),
        rules
    };
}
```

### Displaying Validation Feedback
```javascript
function showValidation(input, isValid, message) {
    const feedback = input.parentElement.querySelector('.feedback');
    
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        feedback.classList.remove('error');
        feedback.classList.add('success');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        feedback.classList.remove('success');
        feedback.classList.add('error');
    }
    
    feedback.textContent = message;
}
```

## 5. Form Submission

### Handling Form Data
```javascript
function handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Send data to server
    submitToServer(data)
        .then(response => {
            showSuccess('Form submitted successfully!');
            form.reset();
        })
        .catch(error => {
            showError('Submission failed. Please try again.');
        });
}
```

## Practice Exercises

### Exercise 1: Registration Form
Create a registration form with:
- Username validation
- Email validation
- Password strength meter
- Confirm password check
- Real-time validation feedback

### Exercise 2: Payment Form
Build a payment form that validates:
- Credit card number
- Expiration date
- CVV
- Billing address
- Postal code format

### Exercise 3: Survey Form
Create a survey form with:
- Multiple choice questions
- Rating scales
- Text feedback
- Required fields
- Progress tracking

### Exercise 4: File Upload
Implement a file upload form with:
- File type validation
- Size restrictions
- Multiple file support
- Upload progress
- Preview functionality

### Exercise 5: Dynamic Form
Build a form that:
- Adds/removes fields dynamically
- Validates dependencies
- Shows conditional fields
- Saves draft responses
- Implements multi-step navigation

## Key Takeaways
- Forms are essential for user input
- Validation improves data quality
- Immediate feedback helps users
- Custom validation enables complex rules
- Proper error handling is crucial

## Next Steps
- Complete the practice exercises
- Experiment with different validation rules
- Move on to Module 3: Modern JavaScript