import React from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import axios from "axios";
const FinishedView = (props) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = React.useState("");
  React.useEffect(() => {
    axios.get("https://randomfox.ca/floof/").then((response) => {
      setImageUrl(response.data.image);
    });
  }, []);
  return (
    <section className="finished-view">
      <h2>
        {" "}
        Машина, железен си! Свърши ученето на {props.flashcards.length}{" "}
        флашкарти, минавайки през тях {props.pastFlashcardsIndexes.length} пъти
      </h2>
      <p>Ето ти лисичка за награда:</p>
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
    </section>
  );
};

export default FinishedView;
