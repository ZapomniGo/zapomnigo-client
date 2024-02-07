import React from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import axios from "axios";
import Confetti from "react-confetti";
const FinishedView = (props) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = React.useState("");
  const [hideButton, setHideButton] = React.useState(false);
  React.useEffect(() => {
    axios
      .get("https://api.thecatapi.com/v1/images/search?limit=1")
      .then((response) => {
        setImageUrl(response.data[0].url);
      });
  }, []);
  const changeImg = () => {
    setHideButton(true);
    axios
      .get("https://api.thedogapi.com/v1/images/search?limit=1")
      .then((response) => {
        setImageUrl(response.data[0].url);
      });
  };
  return (
    <section className="finished-view">
      <Confetti numberOfPieces={100} />
      <h2>
        {" "}
        Машина, железен си! Свърши ученето на {props.flashcards.length}{" "}
        флашкарти, минавайки през тях {props.pastFlashcardsIndexes.length} пъти
      </h2>
      <p>Ето ти котка за награда:</p>
      <br />
      <center>
        {" "}
        <img src={imageUrl} alt="fox" style={{ width: "30vw" }} />
      </center>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Върни ме в тестето
      </button>
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        Учи отново
      </button>
      {!hideButton ? (
        <button onClick={changeImg}>Предпочитам кучета</button>
      ) : null}
    </section>
  );
};

export default FinishedView;
