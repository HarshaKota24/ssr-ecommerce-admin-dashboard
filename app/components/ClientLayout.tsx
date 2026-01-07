"use client";

import { useState } from "react";
import Sidebar from "./sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen relative">
            {/* Sidebar Wrapper */}
            {isSidebarOpen && <Sidebar />}

            {/* Main Content */}
            <main className={`flex-1 p-8 ${isSidebarOpen ? "ml-64" : "ml-0"} transition-all duration-300`}>
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="p-2 mr-4 bg-white text-gray-600 rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                    >
                        {isSidebarOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
                {children}
            </main>
        </div>
    );
}
