import React from "react";
import { useState } from "react";

export const Dashboard = ({ sidebarOpen }) => {
  return (
    <section className={`home ${sidebarOpen ? "open" : "closed"}`}>
      <div className="recent">
        <h2 className="recent-title">Recent</h2>
        <div className="recent-sets">
          <div className="set-card">
            <div className="set-title">COS2001 C++</div>
            <div className="set-description closed">Description of this set of cards and it informs us about fds course</div>
            <div className="set-institution closed">American University in Bulgaria</div>
            <div className="set-creator">
              <div className="creator-img">
                <span className="image">
                  <img src="src/app-components/Navigation/logo.png"></img>
                </span>
              </div>
              <div className="creator-name">
                Aleksandar Ivaylov Ivanov
              </div>
            </div>
          </div>
          <div className="set-card">
            <div className="set-title">COS2001 C++</div>
            <div className="set-description">Description of this set of cards and it informs us about fds course</div>
            <div className="set-creator closed">Aleksandar Ivaylov Ivanov</div>
            <div className="set-institution closed">American University in Bulgaria</div>
          </div>
          <div className="set-card">
            <div className="set-title">COS2001 C++</div>
            <div className="set-description">Description of this set of </div>
            <div className="set-creator closed">Aleksandar Ivaylov Ivanov</div>
            <div className="set-institution ">American University in Bulgaria</div>
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
