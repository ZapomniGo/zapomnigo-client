import React, { useEffect } from "react";
import parse from "html-react-parser";
import { useNavigate } from "react-router";

const MultipleChoice = (props) => {
  const navigate = useNavigate();

  const [answerOptions, setAnswerOptions] = React.useState([]);
  const [selectedAnswer, setSelectedAnswer] = React.useState();
  const [showResults, setShowResults] = React.useState(false);

  React.useEffect(() => {
    //generate answer options
    let answerOptions = [];
    let answerOptionsSet = [];
    answerOptionsSet.push(props.currentFlashcardDefinition);
    let numAnswers = 4;
    while (answerOptionsSet.length < numAnswers) {
      let randomIndex = Math.floor(Math.random() * props.flashcards.length);
      let randomFlashcard = props.flashcards[randomIndex];
      if (!answerOptionsSet.includes(randomFlashcard.definition)) {
        answerOptionsSet.push(randomFlashcard.definition);
      }else{
        numAnswers--;
      }
    }
    answerOptionsSet = answerOptionsSet.sort(() => Math.random() - 0.5);
    setAnswerOptions(answerOptionsSet);
  }, [
    props.originalFlashacards,
    props.flashcards,
    props.currentFlashcardDefinition,
    props.currentFlashcardTerm,
  ]);

  useEffect(() => {
    const handleEnterPress = (e) => {
      // if (e.keyCode === 13) {
      //   props.VerifyCorrectness(selectedAnswer, 1);
      //   setSelectedAnswer();
      //   setShowResults(false);
      // }
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

      </div>
      <div className="btn donkno">
          {!selectedAnswer ? (
            <button onClick={() => props.VerifyCorrectness(false, 1)}>
              {" "}
              Не знам{" "}
            </button>
          ) : null}
        </div>
        <div className="btn gonext">
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
  );
};

export default MultipleChoice;
