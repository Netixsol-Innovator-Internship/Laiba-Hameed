const billAmount = document.getElementById("bill");
const numberOfPeople = document.getElementById("people");
const customTipPercentage = document.getElementById("custom");
const billTipAmount = document.getElementById("tipAmount");
const billTotalPerPerson = document.getElementById("total");
const resetButton = document.getElementById("resetBtn");
const buttons = document.querySelectorAll(".tip-btns button");

const billError = document.getElementById("billError");
const peopleError = document.getElementById("peopleError");

let selectedTipPercentage = null;

// Handle Tip Button Click
buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        // Remove highlight from all buttons
        buttons.forEach((btn) => btn.classList.remove("bg-[#26c2ae]", "text-[#00474b]"));
        // Highlight the selected button
        button.classList.add("bg-[#26c2ae]", "text-[#00474b]");

        // Clear custom input
        customTipPercentage.value = "";

        // Save selected tip percentage
        const tipvalue = parseInt(button.innerText.replace("%", ""));
        selectedTipPercentage = tipvalue;

        if (!validateInputs()) return;

        calculateTip(
            parseFloat(billAmount.value),
            selectedTipPercentage,
            parseInt(numberOfPeople.value)
        );
    });
});

// Handle Custom Tip Input
let debounce;
customTipPercentage.addEventListener("input", (e) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
        // Remove highlight from buttons
        buttons.forEach((btn) => btn.classList.remove("bg-[#26c2ae]", "text-[#00474b]"));

        // Update tip percentage
        const tipPercent = parseFloat(e.target.value);
        selectedTipPercentage = isNaN(tipPercent) ? 0 : tipPercent;

        if (!validateInputs()) return;

        calculateTip(
            parseFloat(billAmount.value),
            selectedTipPercentage,
            parseInt(numberOfPeople.value)
        );
    }, 300);
});


// Validate Inputs
function validateInputs() {
    let isValid = true;

    if (billAmount.value === "0" || billAmount.value.trim() === "") {
        billError.classList.remove("hidden");
        billAmount.classList.add("border", "border-red-600");
        isValid = false;
    } else {
        billError.classList.add("hidden");
        billAmount.classList.remove("border", "border-red-600");
    }

    if (numberOfPeople.value === "0" || numberOfPeople.value.trim() === "") {
        peopleError.classList.remove("hidden");
        numberOfPeople.classList.add("border", "border-red-600");
        isValid = false;
    } else {
        peopleError.classList.add("hidden");
        numberOfPeople.classList.remove("border", "border-red-600");
    }

    return isValid;
}

// Calculate Tip
function calculateTip(billAmount, tipPercentage, numberOfPeople) {
    const tipAmount = (billAmount * (tipPercentage / 100)) / numberOfPeople;
    const tip = parseFloat((Math.floor(tipAmount * 100) / 100).toFixed(2));

    const totalAmount = parseFloat(((tipAmount * numberOfPeople + billAmount) / numberOfPeople).toFixed(2));

    // Get current values
    const currentTip = parseFloat(billTipAmount.textContent.replace("$", "")) || 0;
    const currentTotal = parseFloat(billTotalPerPerson.textContent.replace("$", "")) || 0;

    // Animate to new values
    animateValue(billTipAmount, currentTip, tip);
    animateValue(billTotalPerPerson, currentTotal, totalAmount);
}

[billAmount, numberOfPeople].forEach((input) => {
    input.addEventListener("input", () => {
        if (!validateInputs()) return;

        calculateTip(
            parseFloat(billAmount.value),
            selectedTipPercentage ?? 0,
            parseInt(numberOfPeople.value)
        );
    });
});


// Reset Button
resetButton.addEventListener("click", resetEverything);

function resetEverything() {
    billTipAmount.innerHTML = "$0.00";
    billTotalPerPerson.innerHTML = "$0.00";
    billAmount.value = "";
    numberOfPeople.value = "";
    customTipPercentage.value = "";

    billError.classList.add("hidden");
    peopleError.classList.add("hidden");
    billAmount.classList.remove("border", "border-red-600");
    numberOfPeople.classList.remove("border", "border-red-600");
}


function animateValue(element, start, end, duration = 400) {
    const range = end - start;
    let startTime = null;

    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = start + range * progress;
        element.textContent = `$${value.toFixed(2)}`;

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
}

