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
import { useParams } from "react-router-dom";
import instance from "../../app-utils/axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { MoreBtn } from "../MoreBtn/MoreBtn";
import { toast, ToastContainer } from "react-toastify";
import { FaPlus } from "react-icons/fa6";
import { FaFontAwesomeFlag } from "react-icons/fa";
import { MdOutlineVerifiedUser } from "react-icons/md";

export const SetPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState("");
  const [sortingOrder, setSortingOrder] = useState<string>(
    "&sort_by_date=true&ascending=true"
  );
  const [username, setUsername] = useState("");
  const [creator, setCreator] = useState("no one yet");
  const [page, setPage] = useState(1);
  const { id } = useParams<{ id: string }>();
  const [totalPages, setTotalPages] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [isSetVerified, setIsSetVerified] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      const decodedToken = jwtDecode(localStorage.getItem("access_token"));
      setIsAdmin(decodedToken.admin);
    } else {
      setIsAdmin(false);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      .post(`/set/${id}/copy`)
      .then((response) => {
        toast("Добре дошъл в новото си идентично тесте!");
        navigate(`/app/set/${response.data.set_id}`);
      })
      .catch((error) => {
        //   toast("Имаше грешка при копирането, пробвай отново по-късно");
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
        navigate(`/app/sets/${username}`);
      })
      .catch((error) => {
        toast("Имаше грешка при запазването, пробвай отново по-късно");
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
      window.location.href = "/app/not-found";
      return;
    }

    getSet();
  }, [id, page]);

  const getSet = (newFl = false) => {
    instance
      .get(`/sets/${id}?page=${page}&size=250` + sortingOrder)
      .then((response) => {
        console.log(response.data);
        document.title = response.data.set.set_name + " | ЗапомниГо";
        setTotalPages(response.data.total_pages);
        const newFlashcards = response.data.set.flashcards;
        let updatedFlashcards = [];
        if (flashcards && Array.isArray(flashcards.flashcards) && !newFl) {
          updatedFlashcards = [...flashcards.flashcards, ...newFlashcards];
        } else {
          updatedFlashcards = [...newFlashcards];
        }

        if (newFl) {
          setPage(1);
        }
        setFlashcards({
          ...response.data.set,
          flashcards: updatedFlashcards,
        });
        setIsSetVerified(response.data.set.verified);
        setUsername(response.data.set.username);
        setTotalItems(response.data.total_items);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          window.location.href = "/app/not-found";
        }
        console.error(error);
      });
  };

  useEffect(() => {
    getSet(true);
  }, [sortingOrder]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setToken(token || null);

    if (token) {
      const decodedToken: { username: string; institution: string } =
        jwtDecode(token);
      setCreator(decodedToken.username);
    }
  }, []);
  const report = () => {
    let reason = prompt("Защо смяташ, че тази папка е неподходяща?");
    if (reason === null) {
      alert("Не сте въвели причина");
      return;
    }
    if (reason.length > 1e5) {
      alert("Текстът е твърде дълъг");
      return;
    }
    if (localStorage.getItem("access_token") === null) {
      alert("Трябва да сте логнат за да докладвате");
      return;
    }
    if (reason) {
      instance
        .post(`/sets/${id}/report`, {
          reason: reason,
        })
        .then((response) => {
          toast("Благодарим за сигнала!");
        })
        .catch((error) => {
          toast(
            "Имаше грешка при изпращането на сигнала, пробвай отново по-късно"
          );
        });
    }
  };
  const verified = () => {
    toast("Това тесте е проверено и одобрено от ЗапомниГо");
  };

  const Study = () => {
    console.log(token)
    if(token === null){
      navigate("/app/login");
      toast("Трябва да влезете а акаунта си, за да учите")
    } else{
      flashcards.flashcards.length >= 4
        ? navigate(`/app/study/${id}`)
        : toast("Учи режимът работи с 4 или повече флашкарти!")
    }
  }

  useEffect(() => {
    console.log(setCreator);
  }, [setCreator]);

  return (
    <Dashboard>
      <>
        <ToastContainer />
        {flashcards ? (
          <div id="set-page">
            <div className="set-info">
              <div className="set-title">
                <h1 style={{ display: "flex" }}>
                  {flashcards.set_name}{" "}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: ".2vmax",
                    }}
                  >
                    {" "}
                   {isSetVerified ? (
                      <MdOutlineVerifiedUser
                        onClick={verified}
                        className="miniReport"
                        style={{ color: "orange" }}
                      />
                    ) : (
                      ""
                    )} 
                  </div>
                </h1>{" "}
                <FaFontAwesomeFlag
                  style={{ margin: "1vmax" }}
                  onClick={report}
                  className="miniReport"
                />
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
                {flashcards.subcategory_name ? (
                  <p className="category">{flashcards.subcategory_name}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="actions">
                <a
                  onClick={() =>{Study();}
                  }
                >
                  <FaRegLightbulb />
                  Учи
                </a>
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
                {(creator === username || isAdmin) && (
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
              <div className="spacialFlex"></div>
            </div>

            <div className="cards-info">
              <div className="cards-info-header">
                <h2>Флашкарти ({flashcards ? totalItems : "Зареждане..."})</h2>

                {flashcards.flashcards.length > 1 ? (
                  <select onChange={handleFilterChange}>
                    <option value="&sort_by_date=true&ascending=true">
                      По подразбиране
                    </option>
                    <option value="&sort_by_date=false&ascending=true">
                      По азбучен ред(А-Я)
                    </option>
                    <option value="&sort_by_date=false&ascending=false">
                      По азбучен ред(Я-А)
                    </option>
                  </select>
                ) : (
                  " "
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
            {flashcards.flashcards.length < totalItems && page < totalPages && (
              <MoreBtn onClick={handleLoadRecent} />
            )}
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
