import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

const Match = ({
  currentFlashcardTerm,
  currentFlashcardDefinition,
  flashcards,
  VerifyCorrectness,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [randomFlashcards, setRandomFlashcards] = useState([]);

  useEffect(() => {
    // Shuffle the flashcards array
    const shuffledFlashcards = flashcards.sort(() => Math.random() - 0.5);
    // Take the first 3 terms and definitions
    const selectedFlashcards = shuffledFlashcards.slice(0, 3);
    // Create an array with both terms and definitions in random order
    const randomItems = selectedFlashcards
      .flatMap((flashcard) => [flashcard.term, flashcard.definition])
      .sort(() => Math.random() - 0.5);
    setRandomFlashcards(randomItems);
  }, [flashcards]);

  useEffect(() => {
    if (selectedItems.length === 2) {
      const selectedFlashcards = selectedItems.map(
        (selectedItem) => randomFlashcards[selectedItem],
      );
      let element1Definition = flashcards.find(
        (flashcard) =>
          flashcard.term === selectedFlashcards[0] ||
          flashcard.definition === selectedFlashcards[0],
      )?.definition;
      let element2Definition = flashcards.find(
        (flashcard) =>
          flashcard.term === selectedFlashcards[1] ||
          flashcard.definition === selectedFlashcards[1],
      )?.definition;

      setSelectedItems([]);
    }
  }, [
    selectedItems,
    currentFlashcardTerm,
    currentFlashcardDefinition,
    VerifyCorrectness,
  ]);

  const handleItemClick = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item),
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div>
      {randomFlashcards.map((item, index) => (
        <div
          key={index}
          onClick={() => handleItemClick(index)}
          style={{
            backgroundColor: selectedItems.includes(index) ? "orange" : "white",
          }}
        >
          {parse(item)}
        </div>
      ))}
    </div>
  );
};

export default Match;
