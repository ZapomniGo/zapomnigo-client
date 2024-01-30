import React from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

const FinishedView = (props) => {
  const navigate = useNavigate();
  return (
    <section className="finished-view">
      Машина, железен си 💪 Свърши ученето на {props.flashcards.length}{" "}
      флашкарти, минавайки през тях {props.pastFlashcardsIndexes.length} пъти
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Начало
      </button>
    </section>
  );
};

export default FinishedView;
