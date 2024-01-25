import React from "react";
import { convert } from "html-to-text";
const FreeInput = (props) => {
  const [answer, setAnswer] = React.useState("");
  return (
    <div>
      <div>{convert(props.currentFlashcardTerm)}</div>
      <input
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Отговор"
        type="text"
      />
      <button onClick={() => props.VerifyCorrectness(answer, 2)}>
        Провери
      </button>
    </div>
  );
};

export default FreeInput;
