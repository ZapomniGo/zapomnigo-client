import { MdArrowBack } from "react-icons/md";
import { useState, useEffect } from "react";

export const BackBtn = () => {
  const [disabled, setDisabled] = useState("");
  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname === "/app/" || location.pathname === "/app") {
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
