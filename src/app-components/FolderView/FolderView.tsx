// YourMainPage.tsx
import React, { useEffect, useState } from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import SetCard from "../SetCard/SetCard";
// import { MoreBtn } from "../MoreBtn/MoreBtn";
import instance from "../../app-utils/axios";
import { useParams } from "react-router";
import { FaPen } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { TbSettings } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { FaFontAwesomeFlag } from "react-icons/fa";
import { toast } from "react-toastify";

export const FolderView: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const [setCards, setSetCards] = useState([]);
  const [recentCards, setRecentCards] = useState(10);
  const [selectSet, setSelectSet] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("no one yet");
  const [user, setUser] = useState("");
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [allowReport, setAllowReport] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      if (decodedToken.admin) {
        setIsAdmin(true);
      } else {
        setCreator(decodedToken.username);
      }
    }
  }, []);
  useEffect(() => {
    instance
      .get(`/folders/${id}/sets`)
      .then((response) => {
        console.log(response.data.folder.verified);
        setSetCards(response.data.sets);
        setTitle(response.data.folder.folder_title);
        setDescription(response.data.folder.folder_description);
        setUser(response.data.folder.username);
        document.title = `${response.data.folder.folder_title} | ЗапомниГо`;
        setCategory(response.data.folder.category_name);
        setSubCategory(response.data.folder.subcategory_name);
        setIsVerified(response.data.folder.verified);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          window.location.href = "/app/not-found";
        }
      });
  }, []);

  const handleLoadRecent = () => {
    setRecentCards((prevRecentCards) => prevRecentCards + 10);
  };

  // const handleLoadExplore = () => {
  //   setExploreCards((prevExploreCards) => prevExploreCards + 10);
  // };

  const handleMouseEnter = (id: string) => {
    setSelectSet(id);
  };

  const handleMouseLeave = () => {
    setSelectSet(null);
  };
  const report = () => {
    let reason = prompt("Защо смяташ, че това тесте е неподходящо?");
    if (reason === null) {
      alert("Не си въвел причина");
      return;
    }
    if (reason.length > 1e5) {
      alert("Текстът е твърде дълъг");
      return;
    }
    if (localStorage.getItem("access_token") === null) {
      alert("Трябва да си логнат, за да докладваш");
      return;
    }
    if (reason) {
      instance
        .post(`/folders/${id}/report`, {
          reason: reason,
        })
        .then((response) => {
          toast("Благодарим за сигнала!");
          setAllowReport(false);
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

  const handleDelete = () => {
    if (!window.confirm("Сигурен ли сте, че искаш да изтриеш тази папка?")) {
      return;
    }
    instance.delete(`/folders/${id}`).then((response) => {
      window.location.href = "/app/folders";
    });
  };
  const verifyAdmin = () => {
    if (
      !confirm(
        "Сигурен ли сте, че искате да направите папката" +
          (isVerified ? " непотвърдена" : " потвърдена") +
          "?"
      )
    ) {
      return;
    }
    if (isVerified === true) {
      instance
        .post(`/folders/${id}/verify`, {
          verified: false,
        })
        .then((response) => {
          toast("Папката не е потвърденa");
          location.reload();
        })
        .catch((error) => {
          toast("Грешка");
        });
    } else {
      instance
        .post(`/folders/${id}/verify`, {
          verified: true,
        })
        .then((response) => {
          toast("Папката е потвърденa");
          location.reload();
        })
        .catch((error) => {
          toast("Грешка");
        });
    }
  };

  return (
    <Dashboard>
      <div className="set-wrapper folder-wrapper">
        <h2 className="folder-title">
          <h1 style={{ fontWeight: 900 }}>
            {title}{" "}
            {isAdmin ? (
              <MdOutlineVerifiedUser
                onClick={verifyAdmin}
                className="miniReport"
                style={{
                  color: isVerified ? "orange" : "gray",
                  cursor: "pointer",
                  fontSize: "30px",
                }}
              />
            ) : (
              ""
            )}
            {isVerified && !isAdmin ? (
              <MdOutlineVerifiedUser
                onClick={verified}
                className="miniReport"
                style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
              />
            ) : null}
          </h1>
        </h2>
        <h4
          className="folder-description"
          style={{
            fontWeight: 500,
          }}
        >
          {description}
        </h4>
        <div className="btnWrapper">
          <div style={{ display: "flex" }}>
            {category ? (
              <h6 className="miniLabel folderLabel">{category}</h6>
            ) : (
              " "
            )}
            {subCategory ? (
              <h6 className="miniLabel folderLabel">{subCategory}</h6>
            ) : (
              " "
            )}
          </div>
          <div className="btnEdit">
            {(isAdmin || creator === user) && (
              <a href={`/app/edit-folder/${id}`} className="pen">
                <FaPen />
              </a>
            )}
            {(isAdmin || creator === user) && (
              <a onClick={handleDelete} className="delete">
                <MdDeleteOutline />
              </a>
            )}
            {allowReport ? (
              <FaFontAwesomeFlag
                style={{ width: "25px" }}
                onClick={report}
                className="miniReport"
              />
            ) : null}
          </div>
        </div>

        <div className="sets">
          {setCards.map((card) => (
            <SetCard
              key={card.set_id}
              id={card.set_id}
              title={card.set_name}
              description={card.set_description}
              institution={card.organization_name}
              image={"/logo.jpg"}
              creator_name={card.username}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              isSelected={selectSet === card.set_id}
            />
          ))}
        </div>
      </div>
    </Dashboard>
  );
};
