import React from "react";
import { useNavigate } from "react-router";
const FinishedView = (props) => {
  
  const navigate = useNavigate();
  return (
    <section className="finished-view">
      Машина, железен си 💪 Свърши ученето на {props.flashcards.length} флашкарти, минавайки
      през тях {props.pastFlashcardsIndexes.length} пъти
      <button onClick={ () => {
        navigate(`/app/set/${props.id}`)
      }} >Начало</button>
    </section>
  );
};

export default FinishedView;
