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

  useEffect(() => {
    console.log(showResults);
  }, [showResults]);

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
    <div className="free-input">
      <div className="term">{parse(props.currentFlashcardTerm)}</div>
      <input
        onChange={(e) => setAnswer(e.target.value)}
        value={answer}
        placeholder="Отговор"
        type="text"
        className="answer-input"
      />
      {showResults && (
        <p className="correct-answer">
          Верният отговор е: <span>{parse(correctAnswer)}</span>
        </p>
      )}
      <div className="vert-flex">
      {!showResults && (
        <div className="donkno">
          <button
            className={showResults ? "disabled" : ""}
            onClick={() => VerifyMyAnswerInternally(false)}
          >
            Не знам
          </button>
        </div>
      )}
      {!showResults && (
        <button
          onClick={() => VerifyMyAnswerInternally(answer, 2)}
          className={showResults ? "disabled check" : "check"}
        >
          Провери
        </button>
      )}
      </div>
      {showResults && !selectedAnswer.isCorrect ? (
        <button
          onClick={() => {
            props.VerifyCorrectness("", 2, true, true);
            setShowResults(false);
          }}
        >
          Отговорът ми е верен
        </button>
      ) : (
        ""
      )}

      {showResults && (
        <button
          onClick={() => {
            setShowResults(false);
            props.VerifyCorrectness(selectedAnswer, 1);
          }}
          className="next"
        >
          Следваща
        </button>
      )}
    </div>
  );
};

export default FreeInput;
