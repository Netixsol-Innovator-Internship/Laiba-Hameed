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

// Reusable validation function
function validateInputs() {
    let isValid = true;

    // Validate bill
    if (billAmount.value.trim() === "" || parseFloat(billAmount.value) === 0) {
        billError.textContent = "Bill can't be zero";
        billError.classList.remove("hidden");
        billAmount.classList.add("border", "border-red-600");
        isValid = false;
    } else if (billAmount.value.length > 8) {
        billError.textContent = "Max 8 digits allowed";
        billError.classList.remove("hidden");
        billAmount.classList.add("border", "border-red-600");
        isValid = false;
    } else {
        billError.classList.add("hidden");
        billAmount.classList.remove("border", "border-red-600");
    }

    // Validate number of people
    const num = parseInt(numberOfPeople.value);
    if (numberOfPeople.value.trim() === "" || num === 0) {
        peopleError.textContent = "Can't be zero";
        peopleError.classList.remove("hidden");
        numberOfPeople.classList.add("border", "border-red-600");
        isValid = false;
    } else if (num > 9) {
        peopleError.textContent = "Only 1–9 people allowed.";
        peopleError.classList.remove("hidden");
        numberOfPeople.classList.add("border", "border-red-600");
        isValid = false;
    } else {
        peopleError.classList.add("hidden");
        numberOfPeople.classList.remove("border", "border-red-600");
    }

    return isValid;
}

// Animate numbers
function animateValue(element, start, end, duration = 400) {
    const range = end - start;
    let startTime = null;

    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = start + range * progress;
        element.textContent = `$${value.toFixed(2)}`;
        if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
}

function calculateTip(billAmount, tipPercentage, numberOfPeople) {
    const tipAmount = (billAmount * (tipPercentage / 100)) / numberOfPeople;
    const tip = parseFloat((Math.floor(tipAmount * 100) / 100).toFixed(2));
    const totalAmount = parseFloat(((tipAmount * numberOfPeople + billAmount) / numberOfPeople).toFixed(2));

    const currentTip = parseFloat(billTipAmount.textContent.replace("$", "")) || 0;
    const currentTotal = parseFloat(billTotalPerPerson.textContent.replace("$", "")) || 0;

    animateValue(billTipAmount, currentTip, tip);
    animateValue(billTotalPerPerson, currentTotal, totalAmount);
}

// Tip buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        buttons.forEach((btn) => btn.classList.remove("bg-[#26c2ae]", "text-[#00474b]"));
        button.classList.add("bg-[#26c2ae]", "text-[#00474b]");
        customTipPercentage.value = "";

        selectedTipPercentage = parseInt(button.innerText.replace("%", ""));

        if (!validateInputs()) return;

        calculateTip(
            parseFloat(billAmount.value),
            selectedTipPercentage,
            parseInt(numberOfPeople.value)
        );
    });
});

// Custom tip input
let debounce;
customTipPercentage.addEventListener("input", (e) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
        buttons.forEach((btn) => btn.classList.remove("bg-[#26c2ae]", "text-[#00474b]"));

        let tipPercent = parseFloat(e.target.value);
        if (tipPercent > 100) {
            tipPercent = 100;
            customTipPercentage.value = 100;
        }

        selectedTipPercentage = isNaN(tipPercent) ? 0 : tipPercent;

        if (!validateInputs()) return;

        calculateTip(
            parseFloat(billAmount.value),
            selectedTipPercentage,
            parseInt(numberOfPeople.value)
        );
    }, 300);
});

// Live validation
[billAmount, numberOfPeople].forEach((input) => {
    input.addEventListener("input", () => {
        if (billAmount.value.length > 8) {
            billAmount.value = billAmount.value.slice(0, 8);
        }
        if (numberOfPeople.value.length > 1) {
            numberOfPeople.value = numberOfPeople.value.slice(0, 1);
        }

        validateInputs();

        if (!validateInputs()) return;

        calculateTip(
            parseFloat(billAmount.value),
            selectedTipPercentage ?? 0,
            parseInt(numberOfPeople.value)
        );
    });

    // show validation on blur
    input.addEventListener("blur", () => {
        validateInputs();
    });
});

// Reset
resetButton.addEventListener("click", () => {
    billTipAmount.innerHTML = "$0.00";
    billTotalPerPerson.innerHTML = "$0.00";
    billAmount.value = "";
    numberOfPeople.value = "";
    customTipPercentage.value = "";
    billError.classList.add("hidden");
    peopleError.classList.add("hidden");
    billAmount.classList.remove("border", "border-red-600");
    numberOfPeople.classList.remove("border", "border-red-600");
    buttons.forEach((btn) => btn.classList.remove("bg-[#26c2ae]", "text-[#00474b]"));
    selectedTipPercentage = null;
});
