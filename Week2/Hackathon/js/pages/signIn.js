export const renderSignIn = () => `
      <section class="flex flex-col items-center justify-center bg-white font-manrope">
        <div class="w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-20">
            <div class="flex flex-col items-center">
                <h1 class="font-bold text-3xl text-center mb-10">Welcome Back</h1>
                <!-- Form -->
                <form id="sign-in-form" class="space-y-5 max-w-md w-full">
                    <!-- Email -->
                    <div>
                        <input type="email" id="loginEmail" name="email" placeholder="Email" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D78F2] focus:outline-none">
                            <p id="loginEmailError" class="text-red-500 text-sm mt-1 hidden">Email not found.</p>
                    </div>

                    <!-- Password -->
                    <div>
                        <input type="password" id="loginPassword" name="password" placeholder="Password" required
                            minlength="6"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D78F2] focus:outline-none">
                            <p id="loginPassError" class="text-red-500 text-sm mt-1 hidden">Incorrect password.</p>
                    </div>

                    <p class="text-gray-600 cursor-pointer hover:text-[#0D78F2]">Forget Password?</p>

                    <!-- Submit Button -->
                    <button type="submit"
                        class="w-full py-3 px-4 bg-[#0D78F2] hover:bg-[#0B69D4] text-white rounded-lg font-medium transition-all duration-300 ease-in-out cursor-pointer">
                        Log in
                    </button>

                    <!-- Link to Sign In -->
                    <p class="text-center text-sm text-gray-600">
                        Don't have an account?
                        <a href="./sign-up.html" id='goToSignUp' class="text-[#0D78F2] hover:underline">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    </section>
`;
