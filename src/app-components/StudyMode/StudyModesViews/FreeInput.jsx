import React from "react";
import parse from 'html-react-parser';
const FreeInput = (props) => {
  const [answer, setAnswer] = React.useState("");
  return (
    <div>
      <div>{parse(props.currentFlashcardTerm)}</div>
      <input
        onChange={(e) => setAnswer(e.target.value)}
        value={answer}
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
