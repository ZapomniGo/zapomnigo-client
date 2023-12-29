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
  const [flashcards, setFlashcards] = useState<FlashcardSet>();
  const [sortingOrder, setSortingOrder] = useState<string>("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingOrder(event.target.value);
  };

  const sortedFlashcards = flashcards?.flashcards.slice().sort((a, b) => {
    if (sortingOrder === "a-z") {
      return a.term.localeCompare(b.term);
    } else if (sortingOrder === "z-a") {
      return b.term.localeCompare(a.term);
    }
    return 0;
  });
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id.length === 0 || id.length !== 26 || id.includes(" ")) {
      setFlashcards({
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
        setFlashcards(response.data.set);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <Dashboard>
      <>
        {flashcards ? (
          <div id="set-page">
            <div className="set-info">
              <div className="set-title">
                <h1>
                {flashcards.set_name}
                </h1>
                <div className="institution">
                  <a href="#">{flashcards.organization}</a>
                </div>
              </div>
              <p className="description">{flashcards.set_description}</p>
              <p className="category">{flashcards.set_category}</p>
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
              <p className="creator">Създадено от {flashcards.username}</p>
            </div>
            <div className="cards-info">
              <div className="cards-info-header">
                <h2>
                  Флашкарти (
                  {flashcards
                    ? flashcards.flashcards.length
                    : "Зареждане..."}
                  )
                </h2>
                <select onChange={handleFilterChange}>
                  <option value="">Default</option>
                  <option value="a-z">Alphabetical(A-Z)</option>
                  <option value="z-a">Alphabetical(Z-A)</option>
                </select>
              </div>
              {sortedFlashcards.map((flashcard) => (
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
