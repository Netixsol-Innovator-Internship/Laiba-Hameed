export const renderSignUp = () => `
    <section class="flex flex-col items-center justify-center bg-white font-manrope">
        <div class="w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-20">
            <div class="flex flex-col items-center">
                <h1 class="font-bold text-3xl text-center mb-10">Create your account</h1>
                <!-- Form -->
                <form id="sign-up-form" class="space-y-5 max-w-md w-full">
                    <!-- Name -->
                    <div>
                        <input type="text" id="name" name="name" placeholder="Full Name" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D78F2] focus:outline-none">
                            <p id="nameError" class="text-red-500 text-sm mt-1 hidden">Name must be at least 3 characters.</p>
                    </div>

                    <!-- Email -->
                    <div>
                        <input type="email" id="email" name="email" placeholder="Email" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D78F2] focus:outline-none">
                            <p id="emailError" class="text-red-500 text-sm mt-1 hidden">Please enter a valid email.</p>
                    </div>

                    <!-- Password -->
                    <div>
                        <input type="password" id="password" name="password" placeholder="Password" required
                            minlength="6"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D78F2] focus:outline-none">
                    </div>

                    <!-- Confirm Password -->
                    <div>
                        <input type="password" id="confirmPassword" name="password" placeholder="Confirm Password"
                            required minlength="6"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D78F2] focus:outline-none">
                            <p id="passError" class="text-red-500 text-sm mt-1 hidden">Passwords do not match.</p>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit"
                        class="w-full py-3 px-4 bg-[#0D78F2] hover:bg-[#0B66CC] text-white rounded-lg font-medium transition-all duration-300 ease-in-out cursor-pointer">
                        Sign Up
                    </button>

                    <!-- Link to Sign In -->
                    <p class="text-center text-sm text-gray-600">
                        Already have an account?
                        <a href="#" id='goToSignIn' class="text-[#0D78F2] hover:underline">Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    </section>
`;