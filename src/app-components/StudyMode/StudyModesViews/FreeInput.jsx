import React, { useEffect } from "react";
import parse from "html-react-parser";
import { convert } from "html-to-text";
const FreeInput = (props) => {
  const [answer, setAnswer] = React.useState("");
  const [selectedAnswer, setSelectedAnswer] = React.useState();
  const [showResults, setShowResults] = React.useState(false);
  const [correctAnswer, setCorrectAnswer] = React.useState();
  const [showCorrectAnswer, setShowCorrectAnswer] = React.useState(false);
  const [showComp, setShowComp] = React.useState(false);
  const [correctlyAnswered, setCorrectlyAnswered] = React.useState(false);

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
    setShowResults(false);
    setShowCorrectAnswer(false);
    setShowComp(false);
    setCorrectlyAnswered(false);
  }, [props.currentFlashcardTerm]);

  const VerifyMyAnswerInternally = (answerOption) => {
    setShowComp(true);
    //answer object has everything you need for styling
    let answerObject = props.VerifyCorrectness(answerOption, 1, false);
    setCorrectAnswer(answerObject.correctAnswer);
    setSelectedAnswer(answerOption);
    setShowResults(true);
    if (!answerObject.isCorrect) {
      setCorrectlyAnswered(false);
      setShowCorrectAnswer(false);
    } else {
      setCorrectlyAnswered(true);
    }
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
      {!correctlyAnswered && showResults && (
        <p className="correct-answer">
          Верният отговор е{" "}
          <span style={{ display: "inline-block" }}>
            {parse(correctAnswer)}
          </span>
          , а твоят отговор е <span>{parse(answer)}</span>
        </p>
      )}
      {correctlyAnswered && showResults && <p>Вярно</p>}

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
        {!showResults && answer ? (
          <button
            onClick={() => VerifyMyAnswerInternally(answer, 2)}
            className={showResults ? "disabled check" : "check"}
          >
            Провери
          </button>
        ) : (
          ""
        )}
      </div>
      <div style={{ display: "flex" }}>
        {showCorrectAnswer ? (
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
    </div>
  );
};

export default FreeInput;
