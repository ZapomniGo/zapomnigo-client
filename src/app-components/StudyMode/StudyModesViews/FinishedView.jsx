import React from "react";
    
const FinishedView = (props) => {
  return (
    <section>
      Машина, железен си 💪 Свърши ученето на {props.flashcards.length} флашкарти, минавайки
      през тях {props.pastFlashcardsIndexes.length} пъти
    </section>
  );
};

export default FinishedView;
