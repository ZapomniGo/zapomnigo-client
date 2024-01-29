import React from "react";
import parse from "html-react-parser";
const LevelCheck = (props) => {
  const [flipOpen, setFlipOpen] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState();
  const VerifyMyAnswerInternally = (answerOption) => {
    //answer object has everything you need for styling
    let answerObject = props.VerifyCorrectness(answerOption, 1, false);
    setSelectedAnswer(answerObject);
    setShowResults(true);
  };
  return (
    <div>
      <h2>Знаеш ли отговора на:</h2>
      <h3>{parse(props.currentFlashcardTerm)}</h3>
      {flipOpen ? (
        <h3>{parse(props.currentFlashcardDefinition)}</h3>
      ) : (
        <button onClick={() => setFlipOpen(true)}>Покажи</button>
      )}
      {flipOpen && (
        <>
          <button
            onClick={() => {
              // setFlipOpen(false); 
              VerifyMyAnswerInternally(props.currentFlashcardDefinition);
            }}
          >
            Да
          </button>
          <button
            disabled={showResults}
            onClick={() => {
              // setFlipOpen(false); 
              VerifyMyAnswerInternally(false);
            }}
          >
            Не
          </button>
        </>
      )}
      {showResults && (
        <p>Верният отговор е{parse(selectedAnswer.correctAnswer)}</p>
      )}

      {showResults && (
        <button onClick={() => {              setShowResults(false); setFlipOpen(false); 
          props.VerifyCorrectness(selectedAnswer, 1)}}>
          Следваща
        </button>
      )}
    </div>
  );
};

export default LevelCheck;
