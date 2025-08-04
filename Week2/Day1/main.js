function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getDaysInMonth(month, year) {
    const days = [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return days[month - 1] || 31;
}

function showError(id, message = 'Must be a valid value') {
    const input = document.getElementById(id);
    const label = document.getElementById(`${id}-label`);
    const error = document.getElementById(`${id}-error`);
    const section = document.getElementById(`input-section`);

    section.classList.add('sm:mb-6');
    input.classList.add('border-red-500', 'ring-red-500');
    label.classList.add('text-red-500');
    error.classList.remove('invisible');
    error.textContent = message;
}

function clearError(id) {
    const input = document.getElementById(id);
    const label = document.getElementById(`${id}-label`);
    const error = document.getElementById(`${id}-error`);
    const section = document.getElementById(`input-section`);

    section.classList.remove('sm:mb-6');
    input.classList.remove('border-red-500', 'ring-red-500');
    label.classList.remove('text-red-500');
    error.classList.add('invisible');
    error.textContent = '';
}

function animateValue(id, end, duration = 1000) {
    const element = document.getElementById(id);
    let start = 0;
    const range = end - start;
    const stepTime = Math.abs(Math.floor(duration / range));
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

function calculateAge() {
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');

    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    const today = new Date();
    const currentYear = today.getFullYear();

    let hasError = false;

    // Required Field Checks
    if (!dayInput.value) {
        showError('day', 'This field is required');
        hasError = true;
    } else {
        clearError('day');
    }

    if (!monthInput.value) {
        showError('month', 'This field is required');
        hasError = true;
    } else {
        clearError('month');
    }

    if (!yearInput.value) {
        showError('year', 'This field is required');
        hasError = true;
    } else {
        clearError('year');
    }

    if (hasError) {
        document.getElementById('years-result').textContent = '--';
        document.getElementById('months-result').textContent = '--';
        document.getElementById('days-result').textContent = '--';
        return;
    };

    // Validity Checks
    if (month < 1 || month > 12) {
        showError('month', 'Must be a valid month');
        hasError = true;
    } else {
        clearError('month');
    }

    const maxDay = getDaysInMonth(month, year);
    if (day < 1 || day > maxDay) {
        showError('day', `Must be between 1 and ${maxDay}`);
        hasError = true;
    } else {
        clearError('day');
    }

    if (year > currentYear || year < 1000) {
        showError('year', 'Must be in the past');
        hasError = true;
    } else {
        clearError('year');
    }

    if (hasError) {
        document.getElementById('years-result').textContent = '--';
        document.getElementById('months-result').textContent = '--';
        document.getElementById('days-result').textContent = '--';
        return;
    }

    // Final birth date object
    const birthDate = new Date(year, month - 1, day);

    if (birthDate > today) {
        showError('day', 'Date must be in the past');
        document.getElementById('years-result').textContent = '--';
        document.getElementById('months-result').textContent = '--';
        document.getElementById('days-result').textContent = '--';
        return;
    }

    // Calculate Age
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        ageDays += previousMonth.getDate();
        ageMonths--;
    }

    if (ageMonths < 0) {
        ageMonths += 12;
        ageYears--;
    }

    // Display Results
    document.getElementById('years-result').classList.remove('tracking-widest');
    document.getElementById('years-result').classList.add('tracking-normal');
    document.getElementById('months-result').classList.remove('tracking-widest');
    document.getElementById('months-result').classList.add('tracking-normal');
    document.getElementById('days-result').classList.remove('tracking-widest');
    document.getElementById('days-result').classList.add('tracking-normal');

    animateValue('years-result', ageYears);
    animateValue('months-result', ageMonths);
    animateValue('days-result', ageDays);

}

document.getElementById('age-form').addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault(); 
    calculateAge();    
}
