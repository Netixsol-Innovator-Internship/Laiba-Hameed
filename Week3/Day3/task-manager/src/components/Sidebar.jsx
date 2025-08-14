const Sidebar = ({ activeTab, setActiveTab }) => {
    return (
        <>
            <aside className="hidden md:block w-48 sm:w-52 lg:w-56 xl:w-64 py-6 text-[#f1faee] bg-[#1d3557]" >
                <h2 className="text-lg px-4 font-bold mb-4 sm:mb-5 lg:mb-6 xl:mb-8">
                    DashBoard
                </h2>
                <ul className="text-white">
                    <li
                        onClick={() => setActiveTab("tasks")}
                        className={`p-3 sm:p-4 lg:p-5 text-white cursor-pointer transition-all duration-300 ease-in-out transform hover:shadow-md ${activeTab === "tasks"
                            ? "font-semibold"
                            : "hover:font-medium"
                            } ${activeTab === "tasks" ? "bg-[#457b9d] text-white" : "bg-transparent text-white"} `}
                    >
                        Tasks
                    </li>
                    <li
                        onClick={() => setActiveTab("profile")}
                        className={`p-3 sm:p-4 lg:p-5 text-white cursor-pointer transition-all duration-300 ease-in-out transform hover:shadow-md ${activeTab === "profile"
                            ? "font-semibold"
                            : "hover:font-medium"
                            }  ${activeTab === "profile" ? "bg-[#457b9d] text-white" : "bg-transparent text-white"} `}
                    >
                        Profile
                    </li>
                </ul>
            </aside>
            <div className="flex items-center justify-between md:hidden bg-[#457b9d]">
                <h2 className="text-lg px-4 py-4 font-bold text-white">
                    DashBoard
                </h2>
                <ul className=" flex px-3">
                    <li
                        onClick={() => setActiveTab("tasks")}
                        className={`px-6 sm:px-10 py-3  text-white cursor-pointer transition-all duration-300 ease-in-out transform hover:shadow-md ${activeTab === "tasks"
                            ? "font-semibold"
                            : "hover:font-medium"
                            } ${activeTab === "tasks" ? "bg-[#1d3557] text-white" : "bg-transparent text-white"} `}
                    >
                        Tasks
                    </li>
                    <li
                        onClick={() => setActiveTab("profile")}
                        className={`px-6 sm:px-10 py-3 text-white cursor-pointer transition-all duration-300 ease-in-out transform hover:shadow-md ${activeTab === "profile"
                            ? "font-semibold"
                            : "hover:font-medium"
                            }  ${activeTab === "profile" ? "bg-[#1d3557] text-white" : "bg-transparent text-white"} `}
                    >
                        Profile
                    </li>
                </ul>
            </div>
            
        </>
    );
};

export default Sidebar;
