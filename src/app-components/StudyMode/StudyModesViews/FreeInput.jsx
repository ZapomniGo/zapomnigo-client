import React, { useEffect } from "react";
import parse from "html-react-parser";
const FreeInput = (props) => {
  const [answer, setAnswer] = React.useState("");
  const [selectedAnswer, setSelectedAnswer] = React.useState();
  const [showResults, setShowResults] = React.useState(false);
  const [correctAnswer, setCorrectAnswer] = React.useState();
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

  const VerifyMyAnswerInternally = (answerOption) => {
    //answer object has everything you need for styling
    let answerObject = props.VerifyCorrectness(answerOption, 1, false);
    setCorrectAnswer(answerObject.correctAnswer);
    setSelectedAnswer(answerOption);
    setShowResults(true);
  };

  return (
    <div>
      <div>{parse(props.currentFlashcardTerm)}</div>
      <input
        onChange={(e) => setAnswer(e.target.value)}
        value={answer}
        placeholder="Отговор"
        type="text"
      />
      {showResults && (
        <p>
          Верният отговор е: <span>{parse(correctAnswer)}</span>
        </p>
      )}
      <button
        onClick={() => VerifyMyAnswerInternally(answer, 2)}
        className={showResults ? "disabled" : ""}
      >
        Провери
      </button>
      <button
        className={showResults ? "disabled" : ""}
        onClick={() => VerifyMyAnswerInternally(false)}
      >
        Не знам
      </button>
      {showResults && (
        <button onClick={() => props.VerifyCorrectness(selectedAnswer, 1)}>
          Следваща
        </button>
      )}
    </div>
  );
};

export default FreeInput;
