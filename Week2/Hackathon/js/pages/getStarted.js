export const renderGetStarted = () => {
    return `
        <section class="flex flex-col items-center justify-center bg-white font-manrope">
        <div class="w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6">
            <div
            class="relative bg-[url(./assets/bg.png)] bg-cover bg-center rounded-lg p-6 sm:p-10 md:p-14 lg:p-16 xl:p-20 gap-6 min-h-[480px] flex items-center justify-center text-white">
            <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20"></div>
            <div class="flex items-center justify-center flex-col z-20">
                    <h1 class="font-extrabold text-5xl font-manrope">Welcome To Quiz Master </h1>
                    <p class="max-w-4xl text-center py-6">
                        Test your knowledge with our engaging quizzes. Compete with friends and climb the leaderboard.
                        Start your quiz journey today!
                    </p>
                    <button id="get-started-btn" class="cursor-pointer bg-[#0D78F2] px-6 py-4 rounded-lg font-bold">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    </section>
`
}




