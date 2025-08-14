import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TaskManager from "../components/TaskManager";
import Profile from "../components/Profile";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("tasks");

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="flex-1 p-4">
                {activeTab === "tasks" && <TaskManager />}
                {activeTab === "profile" && <Profile />}
            </main>
        </div>
    );
};

export default Dashboard;
