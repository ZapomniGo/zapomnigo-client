import React from "react";

export const Dashboard = ({ sidebarOpen }) => {
  return (
    <section className={`home ${sidebarOpen ? "open" : "closed"}`}>
      <div className="recent">
        <h2 className="recent-title">Recent</h2>
        <div className="recent-sets">
          <div className="set-card">
            <div className="set-title">COS2001 C++</div>
            <div className="set-description">Description of this set of cards and it informs us about fds course</div>
            <div className="set-creator closed">Aleksandar Ivaylov Ivanov</div>
            <div className="set-institution closed">American University in Bulgaria</div>
          </div>
          <div className="set-card">
            <div className="set-title">COS2001 C++</div>
            <div className="set-description">Description of this set of cards and it informs us about fds course</div>
            <div className="set-creator closed">Aleksandar Ivaylov Ivanov</div>
            <div className="set-institution closed">American University in Bulgaria</div>
          </div>
          <div className="set-card">
            <div className="set-title">COS2001 C++</div>
            <div className="set-description">Description of this set of cards and it informs us about fds course</div>
            <div className="set-creator closed">Aleksandar Ivaylov Ivanov</div>
            <div className="set-institution closed">American University in Bulgaria</div>
          </div>
          <div className="set-card">
            <div className="set-title">COS2001 C++</div>
            <div className="set-description">Description of this set of cards and it informs us about fds course</div>
            <div className="set-creator closed">Aleksandar Ivaylov Ivanov</div>
            <div className="set-institution closed">American University in Bulgaria</div>
          </div>
        </div>
      </div>
    </section>
  );
};
