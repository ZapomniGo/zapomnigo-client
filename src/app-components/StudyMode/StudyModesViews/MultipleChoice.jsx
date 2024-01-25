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
  };

  const handleVerifyCorrectness = () => {
    setShowResults(true);
    props.VerifyCorrectness(selectedAnswer, 1);
  };

  return (
    <div>
      <div>{parse(props.currentFlashcardTerm)}</div>
      <div>
        {answerOptions.map((answerOption) => {
          let buttonClass = "";
          if (showResults) {
            if (answerOption === props.currentFlashcardDefinition) {
              buttonClass = "correct-answer";
            } else if (answerOption === selectedAnswer) {
              buttonClass = "wrong-answer";
            }
          }
          return (
            <button
              key={Math.random()}
              onClick={() => handleAnswerSelection(answerOption)}
              className={buttonClass}
            >
              {parse(answerOption)}
            </button>
          );
        })}
        <button onClick={() => handleAnswerSelection(false)}>Не знам</button>
        {selectedAnswer && (
          <button onClick={handleVerifyCorrectness}>Провери</button>
        )}
      </div>
    </div>
  );
};

export default MultipleChoice;
