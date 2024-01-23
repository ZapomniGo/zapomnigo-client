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
import { MoreBtn } from "../MoreBtn/MoreBtn";
import { toast, ToastContainer } from "react-toastify";
import { FaPlus } from "react-icons/fa6";
import { all } from "axios";

export const SetPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState("");
  const [sortingOrder, setSortingOrder] = useState<string>("");
  const [username, setUsername] = useState("");
  const [creator, setCreator] = useState("no one yet");
  const [page, setPage] = useState(1);
  const { id } = useParams<{ id: string }>();
  const [totalPages, setTotalPages] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      const decodedToken = jwtDecode(localStorage.getItem("access_token"));
      setIsAdmin(decodedToken.admin);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const handleLoadRecent = () => {
    setPage(page + 1);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingOrder(event.target.value);
  };

  const Export = () => {
    if (!token) {
      return;
    }
    let dataObj = flashcards;
    let flashcards2 = dataObj.flashcards;
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
      link.setAttribute("download", dataObj.set_name + ".csv");
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
    if (!window.confirm("Сигурен ли си, че искаш да копираш това тесте?")) {
      return;
    }
    instance
      .post(`/sets/${id}/copy`)
      .then((response) => {
        toast("Добре дошъл в новото си идентично тесте!");
        navigate(`set/${response.data.set_id}`);
      })
      .catch((error) => {
        toast("Имаше грешка при копирането, пробвай отново по-късно");
      });
  };

  const deleteSet = () => {
    if (!token) {
      return;
    }
    if (!window.confirm("Сигурен ли си, че искаш да изтриеш това тесте?")) {
      return;
    }
    instance
      .delete(`/sets/${id}`)
      .then((response) => {
        navigate("/app");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Share = () => {
    const url = window.location.href;
    try {
      navigator.share({
        title: "Сподели това тесте",
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
        organization_name: "",
      });
      return;
    }

    instance
      .get(`/sets/${id}?page=${page}&size=20`)
      .then((response) => {
        setTotalPages(response.data.total_pages);
        const newFlashcards = response.data.set.flashcards;
        let updatedFlashcards = [];
        if (flashcards && Array.isArray(flashcards.flashcards)) {
          updatedFlashcards = [...flashcards.flashcards, ...newFlashcards];
        } else {
          updatedFlashcards = [...newFlashcards];
        }
        setFlashcards({
          ...response.data.set,
          flashcards: updatedFlashcards,
        });
        setUsername(response.data.set.username);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, page]);

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
              <div className="hrz-flex">
                {flashcards.category_name ? (
                  <p className="category">{flashcards.category_name}</p>
                ) : (
                  ""
                )}
                {flashcards.organization_name ? (
                  <p className="category">{flashcards.organization_name}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="actions">
                {localStorage.getItem("access_token") && (
                  <a
                    onClick={() =>
                      flashcards.flashcards.length > 4
                        ? navigate(`/study/${id}`)
                        : toast("Учи режимът работи с 4 или повече флашкарти!")
                    }
                  >
                    <FaRegLightbulb />
                    Учи
                  </a>
                )}
                <a href={"/app/flip-set/" + id} className="rotate">
                  <MdContentCopy />
                  Прегледай
                </a>
                {(creator === username || isAdmin) && (
                  <a href={`/app/edit-set/${id}`}>
                    <RiPencilLine />
                    Редактирай
                  </a>
                )}
                {/* <a href="#">
                  <RiPencilLine />
                  Редактирай
                </a> */}
                {localStorage.getItem("access_token") && (
                  <a onClick={DuplicateSet} href="#">
                    <FaRegCopy />
                    Копирай
                  </a>
                )}
                <a onClick={Share} href="#">
                  <FiShare2 />
                  Сподели
                </a>
                {creator !== "no one yet" && (
                  <a onClick={Export} href="#">
                    <FiDownload /> Експортирай
                  </a>
                )}
                {(creator === username || isAdmin) && (
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
                {flashcards.flashcards.length !== 1 ? (
                  <>
                    <select onChange={handleFilterChange}>
                      <option value="">По подразбиране</option>
                      <option value="a-z">По азбучен ред(А-Я)</option>
                      <option value="z-a">По азбучен ред(Я-А)</option>
                    </select>
                  </>
                ) : (
                  ""
                )}
              </div>
              {flashcards.flashcards.map((flashcard) => (
                <Flashcard key={flashcard.flashcard_id} flashcard={flashcard} />
              ))}
              {(creator == username) | isAdmin ? (
                <div
                  id="flashcard"
                  className={"hvr"}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2vmax",
                  }}
                  onClick={() => navigate(`/app/edit-set/${id}`)}
                >
                  <FaPlus className="single" />
                </div>
              ) : (
                ""
              )}
            </div>
            {page < totalPages && <MoreBtn onClick={handleLoadRecent} />}
          </div>
        ) : (
          <center>
            {" "}
            <h1 className="loadingBanner">Зареждане...</h1>
          </center>
        )}
      </>
      <div style={{ marginBottom: "5vmax" }}></div>
    </Dashboard>
  );
};
