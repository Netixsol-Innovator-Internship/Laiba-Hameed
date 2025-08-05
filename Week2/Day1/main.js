// Utility Functions
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getDaysInMonth(month, year) {
    const days = [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return days[month - 1] || 31;
}

// DOM Element Cache for better performance
const elements = {
    dayInput: document.getElementById('day'),
    monthInput: document.getElementById('month'),
    yearInput: document.getElementById('year'),
    dayLabel: document.getElementById('day-label'),
    monthLabel: document.getElementById('month-label'),
    yearLabel: document.getElementById('year-label'),
    dayError: document.getElementById('day-error'),
    monthError: document.getElementById('month-error'),
    yearError: document.getElementById('year-error'),
    inputSection: document.getElementById('input-section'),
    yearsResult: document.getElementById('years-result'),
    monthsResult: document.getElementById('months-result'),
    daysResult: document.getElementById('days-result'),
    form: document.getElementById('age-form')
};

// Error Management
function showError(field, message = 'Must be a valid value') {
    const input = elements[`${field}Input`];
    const label = elements[`${field}Label`];
    const error = elements[`${field}Error`];

    if (!input || !label || !error) return;

    elements.inputSection.classList.add('sm:mb-6');
    input.classList.add('border-red-500', 'ring-red-500');
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', `${field}-error`);
    label.classList.add('text-red-500');
    error.classList.remove('invisible');
    error.textContent = message;
    error.setAttribute('role', 'alert');
}

function clearError(field) {
    const input = elements[`${field}Input`];
    const label = elements[`${field}Label`];
    const error = elements[`${field}Error`];

    if (!input || !label || !error) return;

    input.classList.remove('border-red-500', 'ring-red-500');
    input.setAttribute('aria-invalid', 'false');
    input.removeAttribute('aria-describedby');
    label.classList.remove('text-red-500');
    error.classList.add('invisible');
    error.textContent = '';
    error.removeAttribute('role');
}

function clearAllErrors() {
    ['day', 'month', 'year'].forEach(field => clearError(field));
    elements.inputSection.classList.remove('sm:mb-6');
}

// Improved Animation Function
function animateValue(elementId, end, duration = 1000) {
    const element = elements[`${elementId}Result`];
    if (!element) return;

    const start = 0;
    const range = Math.abs(end - start);

    // Handle edge case where end is 0
    if (range === 0) {
        element.textContent = end;
        return;
    }

    const stepTime = Math.max(Math.floor(duration / range), 1);
    let current = start;
    const increment = end > start ? 1 : -1;

    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;

        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Input Validation Functions
function validateInput(value, fieldName) {
    // Trim whitespace and check if empty
    const trimmedValue = String(value).trim();

    if (!trimmedValue) {
        return { isValid: false, error: 'This field is required', value: null };
    }

    // Check if it's a valid number
    const numValue = parseInt(trimmedValue, 10);

    if (isNaN(numValue) || numValue.toString() !== trimmedValue) {
        return { isValid: false, error: 'Must be a valid number', value: null };
    }

    // Check for negative numbers
    if (numValue < 0) {
        return { isValid: false, error: 'Must be a positive number', value: null };
    }

    return { isValid: true, error: null, value: numValue };
}

function validateDate(day, month, year) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    // Validate year range
    if (year < 1000) {
        return { isValid: false, field: 'year', error: 'Year must be 1000 or later' };
    }

    if (year > currentYear) {
        return { isValid: false, field: 'year', error: 'Year cannot be in the future' };
    }

    // Validate month
    if (month < 1 || month > 12) {
        return { isValid: false, field: 'month', error: 'Must be between 1 and 12' };
    }

    // Validate day
    const maxDaysInMonth = getDaysInMonth(month, year);
    if (day < 1 || day > maxDaysInMonth) {
        return { isValid: false, field: 'day', error: `Must be between 1 and ${maxDaysInMonth}` };
    }

    // Check if date is in the future
    if (year === currentYear && month === currentMonth && day >= currentDay) {
        return { isValid: false, field: 'day', error: 'Birth date must be in the past' };
    }

    if (year === currentYear && month > currentMonth) {
        return { isValid: false, field: 'month', error: 'Birth date must be in the past' };
    }

    // Validate that the date actually exists (handles edge cases)
    const testDate = new Date(year, month - 1, day);
    if (testDate.getFullYear() !== year ||
        testDate.getMonth() !== month - 1 ||
        testDate.getDate() !== day) {
        return { isValid: false, field: 'day', error: 'Invalid date' };
    }

    return { isValid: true, field: null, error: null };
}

// Age Calculation Function
function calculateAge() {
    // Clear all previous errors
    clearAllErrors();

    // Get and validate inputs
    const dayValidation = validateInput(elements.dayInput.value, 'day');
    const monthValidation = validateInput(elements.monthInput.value, 'month');
    const yearValidation = validateInput(elements.yearInput.value, 'year');

    let hasError = false;

    // Show input validation errors
    if (!dayValidation.isValid) {
        showError('day', dayValidation.error);
        hasError = true;
    }

    if (!monthValidation.isValid) {
        showError('month', monthValidation.error);
        hasError = true;
    }

    if (!yearValidation.isValid) {
        showError('year', yearValidation.error);
        hasError = true;
    }

    // Reset results if there are input errors
    if (hasError) {
        resetResults();
        return;
    }

    // Extract validated values
    const day = dayValidation.value;
    const month = monthValidation.value;
    const year = yearValidation.value;

    // Validate date logic
    const dateValidation = validateDate(day, month, year);

    if (!dateValidation.isValid) {
        showError(dateValidation.field, dateValidation.error);
        resetResults();
        return;
    }

    // Calculate age
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    // Adjust for negative days
    if (ageDays < 0) {
        const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        ageDays += previousMonth.getDate();
        ageMonths--;
    }

    // Adjust for negative months
    if (ageMonths < 0) {
        ageMonths += 12;
        ageYears--;
    }

    // Ensure non-negative results (edge case protection)
    ageYears = Math.max(0, ageYears);
    ageMonths = Math.max(0, ageMonths);
    ageDays = Math.max(0, ageDays);

    // Update result styling
    updateResultStyling();

    // Animate results
    animateValue('years', ageYears);
    animateValue('months', ageMonths);
    animateValue('days', ageDays);
}

// Helper Functions
function resetResults() {
    elements.yearsResult.textContent = '--';
    elements.monthsResult.textContent = '--';
    elements.daysResult.textContent = '--';

    // Reset styling
    [elements.yearsResult, elements.monthsResult, elements.daysResult].forEach(element => {
        element.classList.remove('tracking-normal');
        element.classList.add('tracking-widest');
    });
}

function updateResultStyling() {
    [elements.yearsResult, elements.monthsResult, elements.daysResult].forEach(element => {
        element.classList.remove('tracking-widest');
        element.classList.add('tracking-normal');
    });
}

// Event Handlers
function handleSubmit(e) {
    e.preventDefault();
    calculateAge();
}

function handleInputChange(e) {
    // Clear error for the specific field when user starts typing
    const fieldName = e.target.id;
    if (['day', 'month', 'year'].includes(fieldName)) {
        clearError(fieldName);
    }
}

// Initialize Event Listeners
function initializeEventListeners() {
    if (elements.form) {
        elements.form.addEventListener('submit', handleSubmit);
    }

    // Add input event listeners for real-time error clearing
    ['dayInput', 'monthInput', 'yearInput'].forEach(inputKey => {
        if (elements[inputKey]) {
            elements[inputKey].addEventListener('input', handleInputChange);

            // Prevent negative numbers and non-numeric input
            elements[inputKey].addEventListener('keydown', function (e) {
                // Allow: backspace, delete, tab, escape, enter
                if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
                    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                    (e.keyCode === 65 && e.ctrlKey === true) ||
                    (e.keyCode === 67 && e.ctrlKey === true) ||
                    (e.keyCode === 86 && e.ctrlKey === true) ||
                    (e.keyCode === 88 && e.ctrlKey === true)) {
                    return;
                }

                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            });

            // Prevent pasting non-numeric content
            elements[inputKey].addEventListener('paste', function (e) {
                setTimeout(() => {
                    const value = e.target.value;
                    if (!/^\d*$/.test(value)) {
                        e.target.value = value.replace(/\D/g, '');
                    }
                }, 10);
            });
        }
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    initializeEventListeners();

    // Set initial ARIA attributes
    ['day', 'month', 'year'].forEach(field => {
        const input = elements[`${field}Input`];
        if (input) {
            input.setAttribute('aria-invalid', 'false');
        }
    });
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isLeapYear,
        getDaysInMonth,
        validateInput,
        validateDate,
        calculateAge
    };
}