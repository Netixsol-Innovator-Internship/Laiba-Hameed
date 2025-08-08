export const renderProfile = () => {
    const user = JSON.parse(localStorage.getItem("User")) || {
        name: "Guest",
        email: "guest@example.com",
    };

    return `
    <section class="flex flex-col items-center justify-center bg-white font-manrope">
        <div class="w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6">
            <div>
                <div class="flex items-center justify-center flex-col">
                    <img src="./assets/user.png" alt="user profile img" class="w-24 my-3 rounded-full">
                    <h3 class="font-bold text-xl">${user.name}</h3>
                    <p class="text-[#61738A]">Quiz Enthusiast</p>
                    <p class="text-[#61738A]">Joined ${new Date().getFullYear()}</p>
                </div>

                <div class="my-12">
                    <!-- Tabs -->
                    <div class="flex items-center gap-12 text-sm font-bold border-b border-b-[#F0F2F5] my-6 pb-4 px-6">
                        <button id="tabProfile" class="cursor-pointer">Profile</button>
                        <button id="tabActivity" class="cursor-pointer">Activity</button>
                    </div>


                    <!-- Profile Section -->
                    <section id="personalInformation" class="px-6">
                        <h1 class="font-bold text-2xl">Personal Information</h1>
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4 sm:gap-2">
                            <div class="sm:w-1/3">
                                <h6 class="text-sm text-[#61738A]">Name</h6>
                                <p class="text-sm">${user.name}</p>
                            </div>
                            <div class="sm:w-1/3">
                                <h6 class="text-sm text-[#61738A]">Email</h6>
                                <p class="text-sm">${user.email}</p>
                            </div>
                            <div class="sm:w-1/3">
                                <h6 class="text-sm text-[#61738A]">Bio</h6>
                                <p class="text-sm">Always up for a challenge!</p>
                            </div>
                        </div>
                    </section>

                    <!-- Activity Section (hidden by default) -->
                    <section id="activity" class="px-6 hidden">
                        <h2 class="text-2xl font-bold mb-6">Quiz History</h2>
                        <div class="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow">
                            <table class="min-w-full text-left text-sm table-fixed">
                                <thead class="border-b border-gray-200">
                                    <tr>
                                        <th class="w-1/3 px-6 py-4 font-medium">Quiz Name</th>
                                        <th class="w-1/3 px-6 py-4 font-medium">Score</th>
                                        <th class="w-1/3 px-6 py-4 font-medium">Date</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200">
                                    <tr>
                                        <td class="px-6 py-6">HTML Basics</td>
                                        <td class="px-6 py-6 text-[#61738A]">8/10</td>
                                        <td class="px-6 py-6 text-[#61738A]">Aug 5, 2025</td>
                                    </tr>
                                    <tr>
                                        <td class="px-6 py-6">JavaScript Fundamentals</td>
                                        <td class="px-6 py-6 text-[#61738A]">7/10</td>
                                        <td class="px-6 py-6 text-[#61738A]">Aug 6, 2025</td>
                                    </tr>
                                    <tr>
                                        <td class="px-6 py-6">CSS Flexbox</td>
                                        <td class="px-6 py-6 text-[#61738A]">9/10</td>
                                        <td class="px-6 py-6 text-[#61738A]">Aug 7, 2025</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </section>
    `;
};

const renderActivityTable = (history) => {
    const tbody = document.querySelector("#activity tbody");
    tbody.innerHTML = ''; // Clear previous rows

    if (history.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td colspan="3" class="px-6 py-6 text-center text-gray-500 italic">
        You don't attempt any quiz yet.
      </td>
    `;
        tbody.appendChild(tr);
        return;
    }

    history.forEach(({ quizName, score, date }) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
      <td class="px-6 py-6">${quizName}</td>
      <td class="px-6 py-6 text-[#61738A]">${score}</td>
      <td class="px-6 py-6 text-[#61738A]">${date}</td>
    `;

        tbody.appendChild(tr);
    });
};



export const initProfilePage = () => {
    const tabProfile = document.getElementById("tabProfile");
    const tabActivity = document.getElementById("tabActivity");

    const profileSection = document.getElementById("personalInformation");
    const activitySection = document.getElementById("activity");

    // Helper to set active tab
    const activateTab = (activeBtn, inactiveBtn, showSection, hideSection) => {
        [tabProfile, tabActivity].forEach(tab => {
            tab.classList.remove("text-blue-600", "border-b-2", "border-blue-600");
        });

        activeBtn.classList.add("text-blue-600", "border-b-2", "border-blue-600");

        showSection.classList.remove("hidden");
        hideSection.classList.add("hidden");
    };

    tabProfile.classList.remove("active-tab");

    // Default: Profile active
    activateTab(tabProfile, tabActivity, profileSection, activitySection);

    // Event listeners
    tabProfile.addEventListener("click", () => {
        activateTab(tabProfile, tabActivity, profileSection, activitySection);
    });

    tabActivity.addEventListener("click", () => {
        activateTab(tabActivity, tabProfile, activitySection, profileSection);
        const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
        renderActivityTable(quizHistory);
    });
};
