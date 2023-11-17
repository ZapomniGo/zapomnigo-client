import { Navigation } from "./Navigation/Navigation";
import { Dashboard } from "./Dashboard/Dashboard";
import { useState } from "react";



export const MainPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarToggle = (isOpen) => {
    setSidebarOpen(isOpen);
    };

    return (
        <div className="main-page">
          <Navigation onSidebarToggle={handleSidebarToggle} />
          <Dashboard sidebarOpen={sidebarOpen} />
        </div>
      );
}