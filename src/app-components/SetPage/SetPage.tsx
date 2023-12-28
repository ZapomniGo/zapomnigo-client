import Dashboard from "../Dashboard/Dashboard";
import { Flashcard } from "./Flashcard";
import { useState, useEffect } from "react";
import { MdContentCopy } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { RiPencilLine } from "react-icons/ri";
import { FiShare2 } from "react-icons/fi";
import { PiExport } from "react-icons/pi";
//get the id from the url
import { useParams } from "react-router-dom";
import instance from "../../app-utils/axios";

export const SetPage = () => {
  const [setFlashcards, setSetFlashcards] = useState<FlashcardSet>();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id.length === 0 || id.length !== 26 || id.includes(" ")) {
      setSetFlashcards({
        set_name: "Хм, този сет не съществува",
        set_description: "Провери дали си въвел правилния линк",
        set_category: "",
        flashcards: [],
        username: "все още никого :<",
        organization: "",
      });
      return;
    }
    instance
      .get(`/sets/${id}`)
      .then((response) => {
        setSetFlashcards(response.data.set);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <Dashboard>
      <>
        {setFlashcards ? (
          <div id="set-page">
            <div className="set-info">
              <div className="set-title">
                <h1>{setFlashcards.set_name}</h1>
                <div className="institution">
                  <a href="#">{setFlashcards.organization}</a>
                </div>
              </div>
              <p className="description">{setFlashcards.set_description}</p>
              <p className="category">{setFlashcards.set_category}</p>
              <div className="actions">
              <a href="#">
                  <FaRegLightbulb />
                  Учи
                </a>
                <a href="#" className="rotate">
                  <MdContentCopy />
                  Прегледай
                </a>
                <a href="#">
                  <RiPencilLine />
                  Редактирай
                </a>
                <a href="#">
                  <FiShare2 />
                  Сподели
                </a>
                <a href="#">
                  <PiExport /> Експортирай
                </a>
              </div>
              <p className="creator">Създадено от {setFlashcards.username}</p>
            </div>
            <div className="cards-info">
              <h2>
                Флашкарти (
                {setFlashcards
                  ? setFlashcards.flashcards.length
                  : "Зареждане..."}
                )
              </h2>
              {setFlashcards.flashcards.map((flashcard) => (
                <Flashcard key={flashcard.flashcard_id} flashcard={flashcard} />
              ))}
            </div>
          </div>
        ) : (
          <center>
            {" "}
            <h1>Зареждане...</h1>
          </center>
        )}
      </>
    </Dashboard>
  );
};
