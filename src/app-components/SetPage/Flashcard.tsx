import React from 'react';

interface FlashcardProps {
  flashcard: {
    id: string;
    term: string;
    description: string;
    image: string;
  };
}

export const Flashcard: React.FC<FlashcardProps> = ({ flashcard }) => {
  return (
    <div id="flashcard">
      <h3>{flashcard.term}</h3>
      <p>{flashcard.description}</p>
      <img src={flashcard.image} alt={flashcard.term} />
    </div>
  );
};

