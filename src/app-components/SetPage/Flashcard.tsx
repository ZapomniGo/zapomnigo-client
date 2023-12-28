import React from 'react';
import parse from 'html-react-parser';

interface FlashcardProps {
  flashcard: {
    id: string;
    term: string;
    definition: string;
  };
}

export const Flashcard: React.FC<FlashcardProps> = ({ flashcard }) => {
  return (
    <div id="flashcard" className={"no-image"}>
        <div className="term">
            {parse(flashcard.term)}
        </div>
        <div className='description'>
            {parse(flashcard.definition)}
        </div>
    </div>
  );
};

