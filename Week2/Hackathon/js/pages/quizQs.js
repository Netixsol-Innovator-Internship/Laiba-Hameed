export const renderQuizPage = (quiz, currentIndex = 0, userAnswers = {}) => {
    const question = quiz.questions[currentIndex];
    const total = quiz.questions.length;

    return `
    <section class="flex flex-col items-center justify-center bg-white font-manrope">
      <div class="w-full max-w-[1280px] px-4 py-6">
        <div>
          <!-- Progress bar -->
          <h1 class="font-medium">Progress</h1>
          <div class="w-full bg-gray-200 rounded-full h-2 my-4">
            <div class="bg-[#121417] h-2 rounded-full" style="width: ${(currentIndex + 1) / total * 100}%"></div>
          </div>
          <p class="text-[#61738A]">Question ${currentIndex + 1} of ${total}</p>

          <!-- Timer -->
          <div class="w-full flex items-center py-10 px-6 gap-6">
            <div class="w-1/3 flex flex-col items-center">
              <span id="hours" class="font-bold text-lg bg-[#F0F2F5] rounded-lg w-full text-center py-4">00</span>
              <span class="text-sm py-4">Hours</span>
            </div>
            <div class="w-1/3 flex flex-col items-center">
              <span id="minutes" class="font-bold text-lg bg-[#F0F2F5] rounded-lg w-full text-center py-4">00</span>
              <span class="text-sm py-4">Minutes</span>
            </div>
            <div class="w-1/3 flex flex-col items-center">
              <span id="seconds" class="font-bold text-lg bg-[#F0F2F5] rounded-lg w-full text-center py-4">30</span>
              <span class="text-sm py-4">Seconds</span>
            </div>
          </div>

          <!-- Question -->
          <div class="px-6">
            <h1 class="font-bold text-2xl">${question.question}</h1>
            <div class="flex flex-col gap-4 py-6">
              ${question.options.map((opt, i) => `
                <label class="flex items-center gap-2 cursor-pointer w-full border border-[#F0F2F5] hover:border-gray-400 px-6 py-4 
                rounded-lg transition-all duration-300 ease-in-out">
                  <input type="radio" name="quiz-option" value="${opt}" ${userAnswers[currentIndex] === opt ? 'checked' : ''}  class="text-black focus:ring-black cursor-pointer" />
                  <span class="text-sm font-medium px-2">${opt}</span>
                </label>
              `).join('')}
            </div>
          </div>

          <div class="w-full flex justify-between px-6 py-2">
            <button id="prev-btn" class="font-bold text-sm bg-[#F0F2F5] px-6 py-3 rounded-lg cursor-pointer" ${currentIndex === 0 ? 'disabled' : ''}>Previous</button>
            <button id="next-btn" 
                class="font-bold text-sm px-6 py-3 rounded-lg cursor-pointer bg-[#0D78F2] text-white">
                    ${currentIndex === total - 1 ? "Finish" : "Next"}
                </button>
          </div>
        </div>
      </div>
    </section>
  `;
};
