import React from "react";

export const Dashboard = ({ sidebarOpen }) => {
  return (
    <section className={`home ${sidebarOpen ? "open" : "closed"}`}>
      <div className="recent">
        <div className="set-card">
          <div className="set-title">COS2001 C++</div>
          <div className="set-description">Description of this set of cards and it informs us about fds course</div>
          <div className="set-creator">Aleksandar Ivaylov Ivanov</div>
          <div className="set-institution">American University in Bulgaria</div>
        </div>
        <div className="set-card">
          <div className="set-title">COS2001 C++</div>
          <div className="set-description">Description of this set of cards and it informs us about fds course</div>
          <div className="set-creator">Aleksandar Ivaylov Ivanov</div>
          <div className="set-institution">American University in Bulgaria</div>
        </div>
        <div className="set-card">
          <div className="set-title">COS2001 C++</div>
          <div className="set-description">Description of this set of cards and it informs us about fds course</div>
          <div className="set-creator">Aleksandar Ivaylov Ivanov</div>
          <div className="set-institution">American University in Bulgaria</div>
        </div>
        <div className="set-card">
          <div className="set-title">COS2001 C++</div>
          <div className="set-description">Description of this set of cards and it informs us about fds course</div>
          <div className="set-creator">Aleksandar Ivaylov Ivanov</div>
          <div className="set-institution">American University in Bulgaria</div>
        </div>
      </div>
    </section>
  );
};
