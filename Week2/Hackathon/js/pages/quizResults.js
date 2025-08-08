export const renderQuizResults = (score, total) => `
  <section class="flex flex-col items-center justify-center bg-white font-manrope">
    <div class="w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6">
      <div>
        <h1 class="font-bold text-3xl text-center py-6">Quiz Results</h1>

        <div class="flex items-center justify-between">
          <span class="font-medium">Quiz Completed</span>
          <span class="text-sm">100%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2 my-3">
          <div class="bg-[#121417] h-2 rounded-full" style="width: 100%"></div>
        </div>

        <div class="bg-[#F0F2F5] w-full py-6 px-6 rounded-lg my-6">
          <p class="font-medium">Score</p>
          <p class="font-bold text-2xl">${score} / ${total}</p>
        </div>
        <p class="max-w-4xl text-center mx-auto">
          Congratulations! You've completed the quiz with a score of ${score} out of ${total}.
        </p>
        <div class="w-full flex flex-col items-center justify-between px-6 py-6 gap-6">
          <button class="review-answers-btn w-fit font-bold text-sm bg-[#0D78F2] hover:bg-[#5f96d4] px-6 py-3 rounded-lg cursor-pointer text-white">Review Answers</button>
          <button class="take-another-btn w-fit font-bold text-sm bg-[#F0F2F5] hover:bg-[#a3a6ac] px-6 py-3 rounded-lg cursor-pointer">Take Another Quiz</button>
        </div>
      </div>
    </div>
  </section>
`;
