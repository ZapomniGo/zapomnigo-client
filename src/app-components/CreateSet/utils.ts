import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Flashcard, { FLASHCARD_DIRECTIONS } from "./types";

const useFlashcards = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { term: "", definition: "", flashcard_id: uuidv4() },
  ]);

  const handleMoveFlashcard = (
    index: number,
    direction: FLASHCARD_DIRECTIONS
  ) => {
    setFlashcards((prevFlashcards) => {
      const swapIndex =
        direction === FLASHCARD_DIRECTIONS.UP ? index - 1 : index + 1;

      if (swapIndex < 0 || swapIndex >= prevFlashcards.length)
        return prevFlashcards;

      const newFlashcards = [...prevFlashcards];

      newFlashcards.splice(swapIndex, 0, newFlashcards.splice(index, 1)[0]);
      setFlashcards(newFlashcards);

      return newFlashcards;
    });
  };

  const handleChangeFlashcard = (
    index: number,
    field: "term" | "definition",
    value: string
  ) => {
    setFlashcards((prevFlashcards) => {
      return prevFlashcards.map((flashcard, i) =>
        i === index ? { ...flashcard, [field]: value } : flashcard
      );
    });
  };

  const handleAddFlashcard = () => {
    setFlashcards([
      ...flashcards,
      { term: "", definition: "", flashcard_id: uuidv4() },
    ]);
  };

  const handleDeleteFlashcard = (flashcard_id: string) => {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.filter(
        (flashcard) => flashcard.flashcard_id !== flashcard_id
      )
    );
  };

  const handleDuplicateFlashcard = (flashcard_id: string) => {
    setFlashcards((prevFlashcards) => {
      const originalIndex = prevFlashcards.findIndex(
        (flashcard) => flashcard.flashcard_id === flashcard_id
      );

      if (originalIndex !== -1) {
        const duplicate = {
          ...prevFlashcards[originalIndex],
          flashcard_id: uuidv4(),
        };

        return [
          ...prevFlashcards.slice(0, originalIndex + 1),
          duplicate,
          ...prevFlashcards.slice(originalIndex + 1),
        ];
      }

      return prevFlashcards;
    });
  };

  const handleFlipFlashcard = (flashcard_id: string) => {
    setFlashcards((prevFlashcards) => {
      const flippedFlashcards = prevFlashcards.map((flashcard) => {
        if (flashcard.flashcard_id === flashcard_id) {
          return {
            term: flashcard.definition,
            definition: flashcard.term,
            flashcard_id: flashcard.flashcard_id,
          };
        }
        return flashcard;
      });

      return flippedFlashcards;
    });
  };

  const handleFlipAllFlashcards = () => {
    setFlashcards((prevFlashcards) => {
      return prevFlashcards.map((flashcard) => {
        return {
          term: flashcard.definition,
          definition: flashcard.term,
          flashcard_id: flashcard.flashcard_id,
        };
      });
    });
  };

  const handleOnImportFlashcards = (importedData, delimiter, delimeter2) => {
    console.log(importedData, delimiter, delimeter2);
    let inputString = importedData;
    if (inputString.length === 0) {
      return;
    }
    if (inputString[inputString.length - 1] === delimiter) {
      inputString = inputString.slice(0, inputString.length - 1);
    }
    let newArr = inputString
      .split(delimeter2.trim())
      .map((item) => item.split(delimiter.trim()));

    let newFlashcards = newArr.map((item) => ({
      term: item[0],
      definition: item[1],
      flashcard_id: uuidv4(),
    }));
    if (
      newFlashcards[newFlashcards.length - 1].term === "" ||
      newFlashcards[newFlashcards.length - 1].definition === ""
    ) {
      newFlashcards.pop();
    }

    setFlashcards(newFlashcards);
  };

  const loadFlashcards = (responseData) => {
    setFlashcards(responseData);
  };

  return {
    flashcards,
    handleMoveFlashcard,
    handleChangeFlashcard,
    handleAddFlashcard,
    handleDeleteFlashcard,
    handleDuplicateFlashcard,
    handleFlipFlashcard,
    handleFlipAllFlashcards,
    handleOnImportFlashcards,
    loadFlashcards,
  };
};

export { useFlashcards };
