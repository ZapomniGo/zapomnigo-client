import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Flashcard, { FLASHCARD_DIRECTIONS } from "./types";

const useFlashcards = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { term: "", description: "", rnd: uuidv4() },
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
    field: "term" | "description",
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
      { term: "", description: "", rnd: uuidv4() },
    ]);
  };

  const handleDeleteFlashcard = (rnd: string) => {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.filter((flashcard) => flashcard.rnd !== rnd)
    );
  };

  const handleDuplicateFlashcard = (rnd: string) => {
    setFlashcards((prevFlashcards) => {
      let duplicate = prevFlashcards.find((flashcard) => flashcard.rnd === rnd);

      duplicate = { ...duplicate!, rnd: uuidv4() };
      return duplicate ? [...prevFlashcards, duplicate] : prevFlashcards;
    });
  };

  return {
    flashcards,
    handleMoveFlashcard,
    handleChangeFlashcard,
    handleAddFlashcard,
    handleDeleteFlashcard,
    handleDuplicateFlashcard,
  };
};

export { useFlashcards };
