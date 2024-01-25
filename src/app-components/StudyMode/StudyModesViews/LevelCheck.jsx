import React from "react";
import parse from 'html-react-parser';
const LevelCheck = (props) => {
  const [flipOpen, setFlipOpen] = React.useState(false);
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
              props.VerifyCorrectness(props.currentFlashcardDefinition, 3);
            }}
          >
            Да
          </button>
          <button
            onClick={() => {
              props.VerifyCorrectness(false, 3);
            }}
          >
            Не
          </button>
        </>
      )}
    </div>
  );
};

export default LevelCheck;
