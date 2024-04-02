import { MdArrowBack } from "react-icons/md";
import { useState, useEffect } from "react";

export const BackBtn = () => {
  const [disabled, setDisabled] = useState("");
  useEffect(() => {
    if (location.pathname === "/app/") {
      setDisabled("disabled");
    }
  }, []);

  return (
    <div
      className={"back-btn " + disabled}
      onClick={() => window.history.back()}
    >
      <MdArrowBack />{" "}
    </div>
  );
};
