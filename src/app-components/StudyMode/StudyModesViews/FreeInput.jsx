import React, { useEffect } from "react";
import parse from "html-react-parser";
const FreeInput = (props) => {
  const [answer, setAnswer] = React.useState("");
  //on enter press submit the flashcard
  useEffect(() => {
    const handleEnterPress = (e) => {
      if (e.keyCode === 13) {
        props.VerifyCorrectness(answer, 2);
      }
    };
    document.addEventListener("keydown", handleEnterPress);
    return () => {
      document.removeEventListener("keydown", handleEnterPress);
    };
  }, [answer]);

  React.useEffect(() => {
    setAnswer("");
  }, [props.currentFlashcardTerm]);
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
