import React from 'react';
import parse from 'html-react-parser';
import speak from '../../app-utils/speechSynthesis';
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
            <h3 onClick={()=>speak(flashcard.term)}>{parse(flashcard.term)}</h3>
        </div>
        <div className='description'>
            <p>{parse(flashcard.definition)}</p>
        </div>
        {/* leave for future image implementation 
      {flashcard.image && 
        <div className='image'>
            <img src={flashcard.image} alt={flashcard.term} />
        </div>
      } */}

    </div>
  );
};

