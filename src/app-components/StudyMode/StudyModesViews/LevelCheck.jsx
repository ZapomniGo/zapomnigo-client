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
    <div className="lvl-check">
      <h2 className="title">Знаеш ли отговора на:</h2>
      <h3 className="term">{parse(props.currentFlashcardTerm)}</h3>
      {flipOpen ? (
        <p className="correct-answer">Верният отговор е:{parse(props.currentFlashcardDefinition)}</p>
      ) : (
        <button onClick={() => setFlipOpen(true)}>Покажи</button>
      )}
      {flipOpen && (
        <>
          <button
            disabled={showResults}
            onClick={() => {
              VerifyMyAnswerInternally(props.currentFlashcardDefinition);
            }}
          >
            Да
          </button>
          <button
            disabled={showResults}
            onClick={() => {
              VerifyMyAnswerInternally(false);
            }}
          >
            Не
          </button>
        </>
      )}

      {showResults && (
        <button onClick={() => {setShowResults(false); setFlipOpen(false); 
          props.VerifyCorrectness(selectedAnswer.givenAnswer, 1)}}>
          Следваща
        </button>
      )}
    </div>
  );
};

export default LevelCheck;
