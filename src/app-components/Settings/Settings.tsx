import { useAppSelector } from "../../app-context/store";
import React from "react";
export const Settings = () => {
  React.useEffect(() => {
    document.title = "Настройки | ЗапомниГо";
  }, []);
  const navigationSliceManager = useAppSelector(
    (state) => state.navigationReducer
  );

  return (
    <div
      className={`container ${navigationSliceManager.open ? "open" : "close"}`}
    >
      <div className="content">
        <h1>Settings</h1>
      </div>
    </div>
  );
};
