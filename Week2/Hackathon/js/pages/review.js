export const reviewPage = (wrongAnswers) => `
  <section class="flex flex-col items-center justify-center bg-white font-manrope">
    <div class="w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6">
      <div>
        <h1 class="font-bold text-3xl py-6">Review Incorrect Answers</h1>
        <div class="flex flex-col gap-3 py-2">
          ${wrongAnswers.length === 0
        ? `<p class="text-green-700 font-semibold text-lg">Your all answers were correct! Nothing to review.</p>`
        : wrongAnswers.map(({ questionIndex, question, userAnswer, correctAnswer }) => `
                <div class="mb-6 border border-gray-300 p-4 rounded">
                  <h2 class="font-bold text-lg mb-2">Question ${questionIndex + 1}</h2>
                  <p>${question}</p>
                  <p>Your answer: <span class="text-red-600">${userAnswer || 'No answer'}</span></p>
                  <p>Correct answer: <span class="text-green-600">${correctAnswer}</span></p>
                </div>
              `).join('')
    }
        </div>
        <div class="w-full flex flex-col items-end justify-end px-6 py-6 gap-6">
          <button id="back-to-quizzes-btn" class="w-fit font-bold text-sm bg-[#0D78F2] hover:bg-[#5f96d4] px-6 py-3 rounded-lg cursor-pointer text-white">Back to Quizzes</button>
        </div>
      </div>
    </div>
  </section>
`;
