// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // ---- Text Content Modification ----
    const dynamicText = document.getElementById('dynamic-text');
    const changeTextBtn = document.getElementById('change-text-btn');
    
    const textOptions = [
        "JavaScript can dynamically change content on a webpage!",
        "This text was modified using the DOM API.",
        "Dynamic content makes websites interactive.",
        "You can update text without reloading the page."
    ];
    
    let textIndex = 0;
    
    changeTextBtn.addEventListener('click', function() {
        textIndex = (textIndex + 1) % textOptions.length;
        dynamicText.textContent = textOptions[textIndex];
    });

    // ---- Tabbed Interface ----
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // ---- Form Validation ----
    const userForm = document.getElementById('user-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const ageInput = document.getElementById('age');
    const interestsInput = document.getElementById('interests');
    const formSuccess = document.getElementById('form-success');
    
    // Input event listeners for real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    ageInput.addEventListener('input', validateAge);
    interestsInput.addEventListener('change', validateInterests);
    
    // Form submission
    userForm.addEventListener('submit', function(event) {
        // Prevent default form submission
        event.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isAgeValid = validateAge();
        const isInterestsValid = validateInterests();
        
        // If all validations pass
        if (isNameValid && isEmailValid && isPasswordValid && isAgeValid && isInterestsValid) {
            // Show success message
            formSuccess.style.display = 'block';
            
            // Reset form after successful submission
            setTimeout(function() {
                userForm.reset();
                formSuccess.style.display = 'none';
            }, 3000);
        }
    });
    
    // Reset button event listener
    document.getElementById('reset-form').addEventListener('click', function() {
        // Hide all error messages
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(function(element) {
            element.style.display = 'none';
        });
        
        // Remove invalid classes
        const inputElements = userForm.querySelectorAll('input, select');
        inputElements.forEach(function(element) {
            element.classList.remove('invalid');
        });
        
        // Hide success message
        formSuccess.style.display = 'none';
    });
    
    // Validation functions
    function validateName() {
        const nameValue = nameInput.value.trim();
        const nameError = document.getElementById('name-error');
        
        if (nameValue.length < 3) {
            nameInput.classList.add('invalid');
            nameError.style.display = 'block';
            return false;
        } else {
            nameInput.classList.remove('invalid');
            nameError.style.display = 'none';
            return true;
        }
    }
    
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailError = document.getElementById('email-error');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailPattern.test(emailValue)) {
            emailInput.classList.add('invalid');
            emailError.style.display = 'block';
            return false;
        } else {
            emailInput.classList.remove('invalid');
            emailError.style.display = 'none';
            return true;
        }
    }
    
    function validatePassword() {
        const passwordValue = passwordInput.value;
        const passwordError = document.getElementById('password-error');
        const hasLetters = /[a-zA-Z]/.test(passwordValue);
        const hasNumbers = /\d/.test(passwordValue);
        
        if (passwordValue.length < 8 || !hasLetters || !hasNumbers) {
            passwordInput.classList.add('invalid');
            passwordError.style.display = 'block';
            return false;
        } else {
            passwordInput.classList.remove('invalid');
            passwordError.style.display = 'none';
            return true;
        }
    }
    
    function validateAge() {
        const ageValue = ageInput.value;
        const ageError = document.getElementById('age-error');
        
        if (ageValue === '' || ageValue < 18 || ageValue > 120) {
            ageInput.classList.add('invalid');
            ageError.style.display = 'block';
            return false;
        } else {
            ageInput.classList.remove('invalid');
            ageError.style.display = 'none';
            return true;
        }
    }
    
    function validateInterests() {
        const interestsValue = interestsInput.value;
        const interestsError = document.getElementById('interests-error');
        
        if (interestsValue === '') {
            interestsInput.classList.add('invalid');
            interestsError.style.display = 'block';
            return false;
        } else {
            interestsInput.classList.remove('invalid');
            interestsError.style.display = 'none';
            return true;
        }
    }

    // ---- Interactive Color Picker ----
    const redSlider = document.getElementById('red');
    const greenSlider = document.getElementById('green');
    const blueSlider = document.getElementById('blue');
    
    const redValue = document.getElementById('red-value');
    const greenValue = document.getElementById('green-value');
    const blueValue = document.getElementById('blue-value');
    
    const colorPreview = document.getElementById('color-preview');
    const rgbValue = document.getElementById('rgb-value');
    
    // Function to update color preview
    function updateColorPreview() {
        const red = redSlider.value;
        const green = greenSlider.value;
        const blue = blueSlider.value;
        
        const rgbString = `rgb(${red}, ${green}, ${blue})`;
        
        // Update color preview and text
        colorPreview.style.backgroundColor = rgbString;
        rgbValue.textContent = rgbString;
        
        // Update slider value labels
        redValue.textContent = red;
        greenValue.textContent = green;
        blueValue.textContent = blue;
    }
    
    // Add event listeners to sliders
    redSlider.addEventListener('input', updateColorPreview);
    greenSlider.addEventListener('input', updateColorPreview);
    blueSlider.addEventListener('input', updateColorPreview);
    
    // Initialize color preview on page load
    updateColorPreview();

    // Add keyboard event listeners for accessibility
    document.addEventListener('keydown', function(event) {
        // Press 'Escape' to reset the form
        if (event.key === 'Escape') {
            document.getElementById('reset-form').click();
        }
    });

    // Add mouseover event listeners for additional interactivity
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#e6e6e6';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.backgroundColor = '#f0f0f0';
        });
    });
});