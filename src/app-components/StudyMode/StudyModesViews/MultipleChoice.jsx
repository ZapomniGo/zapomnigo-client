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
    while (answerOptionsSet.size < 4) {
      let randomIndex = Math.floor(Math.random() * props.flashcards.length);
      answerOptionsSet.add(props.flashcards[randomIndex].definition);
    }
    answerOptions = Array.from(answerOptionsSet);
    answerOptions.sort(() => Math.random() - 0.5);
    setAnswerOptions(answerOptions);
    console.log("all answerOptions are: ", answerOptions);
    console.log("correct answer is: ", props.currentFlashcardDefinition);
  }, [
    props.currentFlashcardTerm,
    props.flashcards,
    props.currentFlashcardDefinition,
  ]);

  const VerifyMyAnswerInternally = (answerOption) => {
    //answer object has everything you need for styling
    let answerObject = props.VerifyCorrectness(answerOption, 1, false);
    setSelectedAnswer(answerOption);
    setShowResults(true);
  };
  useEffect(() => {
    setSelectedAnswer();
    setShowResults(false);
  }, [props.currentFlashcardTerm]);
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
                  VerifyMyAnswerInternally(answerOption, 1, false);
                }}
                // className={buttonClass}
              >
                {parse(answerOption)}
              </button>
            </div>
          );
        })}
        <div className="btn">
        </div>
        <div className="btn">
          {selectedAnswer ? (
            <button onClick={() => props.VerifyCorrectness(selectedAnswer, 1)}>
              Следваща
            </button>
          ) : (
            <button onClick={() => props.VerifyCorrectness(false, 1)}>
              {" "}
              Не знам{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultipleChoice;
