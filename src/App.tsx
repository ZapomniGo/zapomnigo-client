import { Navigation } from "./app-components/Navigation/Navigation";
import { Dashboard } from "./app-components/Dashboard/Dashboard";
import { useState } from "react";
export const App = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = (isOpen) => {
    setSidebarOpen(isOpen);
    console.log(sidebarOpen)
  };

  return (
    <>
      <Navigation onSidebarToggle={handleSidebarToggle} />
      <Dashboard sidebarOpen={sidebarOpen} />
    </>
  );
};
