import React from 'react';
import parse from 'html-react-parser';

interface FlashcardProps {
  flashcard: {
    id: string;
    term: string;
    description: string;
    image?: string;
  };
}

export const Flashcard: React.FC<FlashcardProps> = ({ flashcard }) => {
  return (
    <div id="flashcard" className={!flashcard.image ? 'no-image' : ''}>
        <div className="term">
            <h3>{parse(flashcard.term)}</h3>
        </div>
        <div className='description'>
            <p>{parse(flashcard.description)}</p>
        </div>
      {/* {flashcard.image && 
        <div className='image'>

            <img src={flashcard.image} alt={flashcard.term} />
        </div>
      } */}

    </div>
  );
};

