import React from "react";
import parse from "html-react-parser";

const MultipleChoice = (props) => {
  const [answerOptions, setAnswerOptions] = React.useState([]);
  const [selectedAnswer, setSelectedAnswer] = React.useState();
  const [showResults, setShowResults] = React.useState(false);

  React.useEffect(() => {
    let arrCopy = [];
    let availableDefinitions = [
      ...props.flashcards.map((flashcard) => flashcard.definition),
    ];
    arrCopy.push(props.currentFlashcardDefinition);

    // Remove the correct answer from the available definitions
    availableDefinitions.splice(
      availableDefinitions.indexOf(props.currentFlashcardDefinition),
      1
    );

    // Let push random definitions into the array until we have 3 or run out of available definitions
    for (let i = 0; i < 3 && availableDefinitions.length > 0; i++) {
      let randomIndex = Math.floor(Math.random() * availableDefinitions.length);
      arrCopy.push(availableDefinitions[randomIndex]);
      availableDefinitions.splice(randomIndex, 1); // Remove the chosen definition from the available definitions
    }

    // Let shuffle the array
    setAnswerOptions(arrCopy.sort(() => Math.random() - 0.5));
  }, []);

  const handleAnswerSelection = (answerOption) => {
    setSelectedAnswer(answerOption);
    setShowResults(true);
    props.VerifyCorrectness(answerOption, 1);
  };

  const handleNextFlashcard = () => {
    setSelectedAnswer(null);
    setShowResults(false);
    props.goToNextFlashcard();
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
              buttonClass = "correct-answer";
            } else if (answerOption === selectedAnswer) {
              buttonClass = "wrong-answer";
            }
          } else if (answerOption === selectedAnswer) {
            buttonClass = "selected";
          }
          return (
            <div className="option">
              <button
                key={Math.random()}
                onClick={() => handleAnswerSelection(answerOption)}
                className={buttonClass}
              >
                {parse(answerOption)}
              </button>
            </div>
          );
        })}
        <button onClick={() => handleAnswerSelection(false)}>Не знам</button>
        {selectedAnswer && (
          <button onClick={handleNextFlashcard}>Следваща</button>
        )}
      </div>
    </div>
  );
};

export default MultipleChoice;
