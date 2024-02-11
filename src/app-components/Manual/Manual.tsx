import React from "react";
import Dashboard from "../Dashboard/Dashboard";
const Manual = () => {
  React.useEffect(() => {
    window.open("/ZapomniGo_Instructions", "_blank", "rel=noopener noreferrer");
  }, []);

  return (
    <Dashboard>
      <div id="wrapperManual" className="flashcard-design-panel">
        Зареждане на инструкции...
      </div>
    </Dashboard>
  );
};

export default Manual;
