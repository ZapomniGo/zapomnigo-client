import React, { useEffect } from "react";
import parse from "html-react-parser";
const MultipleChoice = (props) => {
  const [answerOptions, setAnswerOptions] = React.useState([]);
  const [selectedAnswer, setSelectedAnswer] = React.useState();
  const [showResults, setShowResults] = React.useState(false);

  React.useEffect(() => {
    //generate answer options
    let answerOptions = [];
    let answerOptionsSet = new Set();
    answerOptionsSet.add(props.currentFlashcardDefinition);
    if (props.flashcards.length < 2) {
      alert(
        "Няма достатъчно картички за да се използва този режим. Моля изберете друг!"
      );
      return;
    }
    let answerOptionsCount =
      props.flashcards.length - 2 > 4 ? 4 : props.flashcards.length - 2;
    while (answerOptionsSet.size < answerOptionsCount) {
      let randomIndex = Math.floor(Math.random() * props.flashcards.length);
      answerOptionsSet.add(props.flashcards[randomIndex].definition);
    }
    answerOptions = Array.from(answerOptionsSet);
    answerOptions.sort(() => Math.random() - 0.5);
    setAnswerOptions(answerOptions);
  }, [
    props.currentFlashcardTerm,
    props.flashcards,
    props.currentFlashcardDefinition,
  ]);

  useEffect(() => {
    const handleEnterPress = (e) => {
      if (e.keyCode === 13) {
        props.VerifyCorrectness(selectedAnswer, 1);
        setSelectedAnswer();
        setShowResults(false);
      }
    };
    document.addEventListener("keydown", handleEnterPress);
    return () => {
      document.removeEventListener("keydown", handleEnterPress);
    };
  }, [showResults]);

  const VerifyMyAnswerInternally = (answerOption) => {
    //answer object has everything you need for styling
    let answerObject = props.VerifyCorrectness(answerOption, 1, false);
    setSelectedAnswer(answerOption);
    setShowResults(true);
  };
  return (
    <div>
      <div id="flashcard" className={"no-image-flashcard"}>
        <div className={`term `}>
          <h3>{parse(props.currentFlashcardTerm)}</h3>
        </div>
      </div>
      <div className="answer-options">
        {answerOptions.map((answerOption) => {
          let buttonClass = "";
          if (showResults) {
            if (answerOption === props.currentFlashcardDefinition) {
              buttonClass = "correct";
            } else if (answerOption === selectedAnswer) {
              buttonClass = "incorrect";
            }
          } else if (answerOption === selectedAnswer) {
            buttonClass = "selected";
          }
          return (
            <div className={`option ${buttonClass}`}>
              <button
                key={Math.random()}
                onClick={() => {
                  VerifyMyAnswerInternally(answerOption);
                }}
                disabled={selectedAnswer}
              >
                {parse(answerOption)}
              </button>
            </div>
          );
        })}
        <div className="btn donkno">
          {!selectedAnswer ? (
            <button onClick={() => props.VerifyCorrectness(false, 1)}>
              {" "}
              Не знам{" "}
            </button>
          ) : null}
        </div>
        <div className="btn">
          {selectedAnswer ? (
            <button
              onClick={() => {
                props.VerifyCorrectness(selectedAnswer, 1);
                setSelectedAnswer();
                setShowResults(false);
              }}
            >
              Следваща
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MultipleChoice;
