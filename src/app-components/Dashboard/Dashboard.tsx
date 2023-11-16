import React from "react";

export const Dashboard = ({ sidebarOpen }) => {
  return (
    <section className={`home ${sidebarOpen ? "open" : "closed"}`}>
      <div className="text">
        Dashboard
      </div>
    </section>
  );
};
