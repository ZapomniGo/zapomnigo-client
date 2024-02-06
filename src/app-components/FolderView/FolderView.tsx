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
        setSetCards(response.data.sets);
        setTitle(response.data.folder.folder_title);
        setDescription(response.data.folder.folder_description);
        setUser(response.data.folder.username);
        document.title = `${response.data.folder.folder_title} | ЗапомниГо`;
        setCategory(response.data.folder.category_name);
        setSubCategory(response.data.folder.subcategory_name);
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

  const handleDelete = () => {
    if (!window.confirm("Сигурен ли сте, че искаш да изтриеш тази папка?")) {
      return;
    }
    instance.delete(`/folders/${id}`).then((response) => {
      window.location.href = "/app/folders";
    });
  };

  return (
    <Dashboard>
      <div className="set-wrapper folder-wrapper">
        <h2 className="folder-title">
          <h1 style={{ fontWeight: 900 }}>{title}</h1>
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
            <div style={{ display: "flex"}}>
              {category ? <h6 className="miniLabel folderLabel">{category}</h6> : " "}
              {subCategory ? <h6 className="miniLabel folderLabel">{subCategory}</h6> : " "}
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
