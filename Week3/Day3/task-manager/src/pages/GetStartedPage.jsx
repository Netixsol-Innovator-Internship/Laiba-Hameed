import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const GetStarted = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStart = () => {
        if (isAuthenticated) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 lg:py-16" style={{ backgroundColor: '#f1faee' }}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 lg:mb-10 text-center leading-tight text-[#1d3557]" >
                Welcome to Task Manager
            </h1>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl mb-8 sm:mb-10 lg:mb-12 text-center max-w-2xl lg:max-w-3xl xl:max-w-4xl px-4 text-[#1d3557]">
                Organize your tasks, stay productive, and manage your day efficiently.
            </p>
            <button
                onClick={handleStart}
                className="px-8 sm:px-10 lg:px-12 xl:px-16 py-4 sm:py-5 lg:py-6 font-semibold text-base sm:text-lg lg:text-xl text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer rounded-lg shadow-md bg-[#1d3557]"
                onMouseEnter={(e) => e.target.style.backgroundColor = '#457b9d '}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#1d3557'}
            >
                Get Started
            </button>
        </div>
    );
};

export default GetStarted;
