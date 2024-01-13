import Dashboard from "../Dashboard/Dashboard";
import { Flashcard } from "./Flashcard";
import { useState, useEffect } from "react";
import { MdContentCopy } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { RiPencilLine } from "react-icons/ri";
import { FiShare2 } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";
//get the id from the url
import { useParams } from "react-router-dom";
import instance from "../../app-utils/axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { all } from "axios";

export const SetPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<FlashcardSet>();
  const [allData, setAllData] = useState<any>();
  const [sortingOrder, setSortingOrder] = useState<string>("");
  const [username, setUsername] = useState("");
  const [creator, setCreator] = useState("");
  const { id } = useParams<{ id: string }>();

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

  const Export = () => {
    if (!token) {
      return;
    }
    let dataObj = allData;
    let flashcards2 = dataObj.set.flashcards;
    let csvContent = "Term,Definition\n";

    for (let card of flashcards2) {
      const parser = new DOMParser();
      const htmlTerm = parser.parseFromString(card.term, "text/html");
      const textTerm = htmlTerm.body.textContent || "";
      const htmlCard = parser.parseFromString(card.definition, "text/html");
      const textCard = htmlCard.body.textContent || "";
      csvContent += `${textTerm},${textCard}\n`;
    }

    let blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    let link = document.createElement("a");
    if (link.download !== undefined) {
      let url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", allData.set.set_name + ".csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const DuplicateSet = () => {
    if (!token) {
      return;
    }
    if (!window.confirm("Сигурен ли си, че искаш да копираш този сет?")) {
      return;
    }
    instance
      .post(`/sets/${id}/duplicate`)
      .then((response) => {
        navigate(`/set/${response.data.set_id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteSet = () => {
    if (!token) {
      return;
    }
    if (creator !== username) {
      return;
    }
    if (!window.confirm("Сигурен ли си, че искаш да изтриеш този сет?")) {
      return;
    }
    instance
      .delete(`/sets/${id}`)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Share = () => {
    const url = window.location.href;
    try {
      navigator.share({
        title: "Сподели този сет",
        url: url,
      });
    } catch (e) {
      console.log(e);
    }
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast("Линкът е копиран в клипборда");
      })
      .catch(() => {
        toast("Копирането не се поддържа от браузъра :(");
      });
  };
  useEffect(() => {
    if (id.length === 0 || id.length !== 26 || id.includes(" ")) {
      setFlashcards({
        set_name: "Хм, това тесте не съществува",
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
        setAllData(response.data);
        setUsername(response.data.set.username);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setToken(token || null);

    if (token) {
      const decodedToken: { username: string; institution: string } =
        jwtDecode(token);
      setCreator(decodedToken.username);
      console.log(creator);
    }
  }, []);

  return (
    <Dashboard>
      <>
        <ToastContainer />
        {flashcards ? (
          <div id="set-page">
            <div className="set-info">
              <div className="set-title">
                <h1>{flashcards.set_name}</h1>
                {flashcards && flashcards.organization ? (
                  <div
                    className={`set-institution ${
                      flashcards.organization ? "open" : "close"
                    }`}
                  >
                    <a href="#">{flashcards.organization}</a>
                  </div>
                ) : (
                  ""
                )}
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
                {creator === username && (
                  <a href={`/edit-set/${id}`}>
                    <RiPencilLine />
                    Редактирай
                  </a>
                )}
                {/* <a href="#">
                  <RiPencilLine />
                  Редактирай
                </a> */}
                <a onClick={DuplicateSet} href="#">
                  <FaRegCopy />
                  Копирай
                </a>
                <a onClick={Share} href="#">
                  <FiShare2 />
                  Сподели
                </a>
                <a onClick={Export} href="#">
                  <FiDownload /> Експортирай
                </a>
                {creator === username && (
                  <a onClick={deleteSet}>
                    <MdDeleteOutline />
                    Изтрий
                  </a>
                )}
              </div>
              <p className="creator">Създадено от {flashcards.username}</p>
            </div>
            <div className="cards-info">
              <div className="cards-info-header">
                <h2>
                  Флашкарти (
                  {flashcards ? flashcards.flashcards.length : "Зареждане..."})
                </h2>
                <select onChange={handleFilterChange}>
                  <option value="">По подразбиране</option>
                  <option value="a-z">По азбучен ред(А-Я)</option>
                  <option value="z-a">По азбучен ред(Я-А)</option>
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
      <div style={{ marginBottom: "5vmax" }}></div>
    </Dashboard>
  );
};
