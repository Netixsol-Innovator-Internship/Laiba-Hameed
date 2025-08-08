import { renderGetStarted } from './pages/getStarted.js';
import { renderSignUp } from './pages/signUp.js';
import { renderSignIn } from './pages/signIn.js';
import { renderProfile, initProfilePage } from './pages/account.js';
import { renderQuizSelection } from './pages/quizSelection.js';
import { handleSignUpEvents, handleSignInEvents } from './auth.js';
import { renderQuizPage } from './pages/quizQs.js';
import { showToast } from './utils/toast.js';
import { renderQuizResults } from './pages/quizResults.js';
import { reviewPage } from './pages/review.js';

let currentQuiz = null;
let currentQuestionIndex = 0;
let timerInterval = null;
let timeLeft = 30;
const userAnswers = {};
let allQuizzes = [];

const attachQuizSelectionEvents = () => {
    document.querySelectorAll(".category-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".category-tab").forEach(t => {
                t.classList.remove("bg-[#0D78F2]", "text-white");
                t.classList.add("bg-[#F0F2F5]");
            });

            tab.classList.remove("bg-[#F0F2F5]");
            tab.classList.add("bg-[#0D78F2]", "text-white");

            const category = tab.textContent.trim();
            const filtered = category === "All" ? allQuizzes : allQuizzes.filter(q => q.category === category);

            document.getElementById("quiz-section-title").textContent =
                category === "All" ? "All Quizzes" : `${category} Quizzes`;

            document.getElementById("all-quizzes").innerHTML = renderQuizList(filtered);
            bindQuizCardClicks();
        });
    });
};

const renderListAndBind = (quizzes) => {
    document.getElementById("all-quizzes").innerHTML = renderQuizList(quizzes);
    bindQuizCardClicks();
};

const renderListAndBindFeatured = (featured) => {
    // You can attach events for featured quizzes if needed
    bindQuizCardClicks();
};

const bindQuizCardClicks = () => {
    document.querySelectorAll(".quiz-card").forEach(card => {
        card.addEventListener("click", () => {
            const quizId = parseInt(card.getAttribute("data-id"));
            const selectedQuiz = allQuizzes.find(q => q.id === quizId);
            if (selectedQuiz) {
                renderPage("quiz", selectedQuiz);
            }
        });
    });
};

const resetTimer = () => {
    clearInterval(timerInterval);
    timeLeft = 30;
    updateTimerDisplay(timeLeft);
    startTimer();
};

const startTimer = () => {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            autoMoveNext();
        }
    }, 1000);
};

const updateTimerDisplay = (seconds) => {
    const secondsSpan = document.getElementById("seconds");
    if (secondsSpan) secondsSpan.textContent = seconds.toString().padStart(2, '0');
    // similarly update hours, minutes if needed
};

const renderCurrentQuestion = () => {
    const app = document.getElementById("app");
    app.innerHTML = renderQuizPage(currentQuiz, currentQuestionIndex, userAnswers);
    resetTimer();
    attachQuizEvents();
};

const attachQuizEvents = () => {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentQuestionIndex > 0) {
                clearInterval(timerInterval);
                currentQuestionIndex--;
                renderCurrentQuestion();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
            if (!selectedOption) {
                alert("Please select an option before moving to the next question.");
                return;
            }
            userAnswers[currentQuestionIndex] = selectedOption.value;

            clearInterval(timerInterval);
            if (currentQuestionIndex < currentQuiz.questions.length - 1) {
                currentQuestionIndex++;
                renderCurrentQuestion();
            } else {
                finishQuiz();
            }
        });
    }
};

const autoMoveNext = () => {
    const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
    userAnswers[currentQuestionIndex] = selectedOption ? selectedOption.value : null;

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        renderCurrentQuestion();
    } else {
        finishQuiz();
    }
};

const addQuizResultToHistory = (quizName, score, date) => {
    const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    quizHistory.push({ quizName, score, date });
    localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
};

const finishQuiz = () => {
    clearInterval(timerInterval);
    let score = 0;
    const total = currentQuiz.questions.length;
    const wrongAnswers = [];

    currentQuiz.questions.forEach((q, index) => {
        const user = userAnswers[index];
        const correct = typeof q.answer !== "undefined"
            ? q.answer
            : typeof q.correctIndex === "number"
                ? q.options[q.correctIndex]
                : undefined;

        if (user === correct) {
            score++;
        } else {
            wrongAnswers.push({
                questionIndex: index,
                question: q.question,
                userAnswer: user,
                correctAnswer: correct,
            });
        }
    });

    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    addQuizResultToHistory(currentQuiz.title, `${score}/${total}`, date);

    renderPage("quiz-results", { score, total, wrongAnswers });
};

const app = document.getElementById("app");

export const renderPage = async (page, data = null) => {
    if (page === "get-started") app.innerHTML = renderGetStarted();
    if (page === "sign-up") app.innerHTML = renderSignUp();
    if (page === "sign-in") app.innerHTML = renderSignIn();
    if (page === "profile") app.innerHTML = renderProfile();
    if (page === "quiz-selection") {
        const res = await fetch("./data/quizzes.json");
        allQuizzes = await res.json();

        const categories = ["All", ...new Set(allQuizzes.map(q => q.category))];
        const featuredQuizzes = allQuizzes.filter(q => q.featured);

        app.innerHTML = renderQuizSelection(allQuizzes, categories, featuredQuizzes);

        attachQuizSelectionEvents();
        bindQuizCardClicks();

        return;
    }
    if (page === "quiz") {
        currentQuiz = data;
        currentQuestionIndex = 0;
        Object.keys(userAnswers).forEach(k => delete userAnswers[k]); // clear previous answers

        renderCurrentQuestion();
        return;
    }

    // Pass score and total correctly
    if (page === "quiz-results") app.innerHTML = renderQuizResults(data.score, data.total);

    if (page === "review") {
        app.innerHTML = reviewPage(data);

        document.getElementById("back-to-quizzes-btn").addEventListener("click", () => {
            renderPage("quiz-selection");
        });

        return;
    }


    attachEvents(page, data);
};

const attachEvents = (page, data) => {
    if (page === "get-started") {
        document.getElementById("get-started-btn").addEventListener("click", () => {
            if (localStorage.getItem("isLoggedIn") === "true") {
                renderPage("quiz-selection")
            }
            const existingUser = JSON.parse(localStorage.getItem("User"));
            existingUser ? renderPage("sign-in") : renderPage("sign-up");
        });
    }
    if (page === "sign-up") handleSignUpEvents();
    if (page === "sign-in") handleSignInEvents();
    if (page === "profile") initProfilePage();
    if (page === "quiz-selection") initQuizSelection();
    if (page === "quiz") {
        initQuizPage(data);
    }

    if (page === "quiz-results") {
        app.innerHTML = renderQuizResults(data.score, data.total);

        document.querySelector(".review-answers-btn").addEventListener("click", () => {
            renderPage("review", data.wrongAnswers);
        });

        document.querySelector(".take-another-btn").addEventListener("click", () => {
            renderPage("quiz-selection");
        });

        return;
    }


    if (page === "review") {
        document.getElementById("back-to-quizzes-btn").addEventListener("click", () => {
            renderPage("quiz-selection");
        });
    }
};

// Navigation listeners
document.addEventListener("DOMContentLoaded", () => renderPage("get-started"));

document.getElementById("goHome").addEventListener("click", () => renderPage("get-started"));
document.getElementById("Home").addEventListener("click", () => renderPage("get-started"));
document.getElementById("HomePage").addEventListener("click", () => renderPage("get-started"));

document.getElementById("goToProfile").addEventListener("click", () => {
    const existingUser = JSON.parse(localStorage.getItem("User"));
    if (existingUser) {
        if (localStorage.getItem("isLoggedIn") === "true") {
            renderPage("profile")
        } else {
            showToast(`You are not logged in. Please SignIn`, "error")
            setTimeout(() => renderPage("sign-in"), 500)
        }
    } else {
        showToast(`You don't have account. Please SignUP`, "error")
        setTimeout(() => renderPage("sign-up"), 500)
    }
});
document.getElementById("UserProfile").addEventListener("click", () => {
    const existingUser = JSON.parse(localStorage.getItem("User"));
    if (existingUser) {
        if (localStorage.getItem("isLoggedIn") === "true") {
            renderPage("profile")
        } else {
            showToast(`You are not logged in. Please SignIn`, "error")
            setTimeout(() => renderPage("sign-in"), 500)
        }
    } else {
        showToast(`You don't have account. Please SignUP`, "error")
        setTimeout(() => renderPage("sign-up"), 500)
    }
});

document.getElementById("Profile").addEventListener("click", () => {
    const existingUser = JSON.parse(localStorage.getItem("User"));
    if (existingUser) {
        if (localStorage.getItem("isLoggedIn") === "true") {
            renderPage("profile")
        } else {
            showToast(`You are not logged in. Please SignIn`, "error")
            setTimeout(() => renderPage("sign-in"), 500)
        }
    } else {
        showToast(`You don't have account. Please SignUP`, "error")
        setTimeout(() => renderPage("sign-up"), 500)
    }
});

document.getElementById("quizSelection").addEventListener("click", async () => {
    const existingUser = JSON.parse(localStorage.getItem("User"));
    if (existingUser) {
        if (localStorage.getItem("isLoggedIn") === "true") {
            await renderPage("quiz-selection");
        } else {
            showToast(`You are not logged in. Please SignIn`, "error")
            setTimeout(() => renderPage("sign-in"), 500)
        }
    } else {
        showToast(`You don't have account. Please SignUP`, "error")
        setTimeout(() => renderPage("sign-up"), 500);
    }
});

document.getElementById("QuizSelection").addEventListener("click", async () => {
    const existingUser = JSON.parse(localStorage.getItem("User"));
    if (existingUser) {
        if (localStorage.getItem("isLoggedIn") === "true") {
            await renderPage("quiz-selection");
        } else {
            showToast(`You are not logged in. Please SignIn`, "error")
            setTimeout(() => renderPage("sign-in"), 500)
        }
    } else {
        showToast(`You don't have account. Please SignUP`, "error")
        setTimeout(() => renderPage("sign-up"), 500);
    }
});

