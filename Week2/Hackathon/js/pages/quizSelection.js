export const renderQuizSelection = (quizzes, categories, featuredQuizzes) => `
  <section class="flex flex-col items-center justify-center bg-white font-manrope">
    <div class="w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6">
      <div class="py-6">
        <h1 class="font-bold text-3xl">Select a Quiz</h1>

        <!-- Category Tabs -->
        <div class="flex flex-wrap items-center gap-3 py-6">
          ${categories.map(category => {
    const isActive = category === "All" ? "bg-[#0D78F2] text-white" : "bg-[#F0F2F5]";
    return `<span class="category-tab ${isActive} rounded-lg px-4 py-2 cursor-pointer hover:bg-[#0D78F2]">${category}</span>`;
}).join("")}
        </div>

        <!-- Featured -->
        <h1 class="font-bold text-xl">Featured Quizzes</h1>
        <div class="flex flex-wrap gap-6 py-8">
          ${featuredQuizzes.map(q => `
            <div class="cursor-pointer quiz-card" data-id="${q.id}">
              <div class="h-40 w-60 mb-3">
                <img src="${q.image}" alt="${q.title} logo" class="rounded-lg h-full w-full object-cover">
              </div>
              <h5 class="font-medium">${q.title}</h5>
              <p class="text-sm text-[#61738A] max-w-60">${q.description}</p>
            </div>
          `).join("")}
        </div>

        <!-- All -->
        <h1 class="font-bold text-xl" id="quiz-section-title">All Quizzes</h1>
        <div id="all-quizzes" class="w-full py-6 flex flex-col gap-4">
          ${renderQuizList(quizzes)}
        </div>
      </div>
    </div>
  </section>
`;

const renderQuizList = (list) => list.map(q => `
  <div class="w-full flex flex-col-reverse sm:flex-row items-start justify-between cursor-pointer quiz-card" data-id="${q.id}">
    <div class="py-2">
      <h6 class="font-bold">${q.title}</h6>
      <p class="text-sm text-[#61738A]">${q.description}</p>
    </div>
    <div class="h-40 w-60 mb-3">
      <img src="${q.image}" alt="${q.title} logo" class="rounded-lg h-full w-full object-cover">
    </div>
  </div>
`).join("");
