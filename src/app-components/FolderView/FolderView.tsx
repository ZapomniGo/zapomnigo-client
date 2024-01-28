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

  const { id } = useParams<{ id: string }>();
  const [setCards, setSetCards] = useState([]);
  const [recentCards, setRecentCards] = useState(10);
  // const [exploreCards, setExploreCards] = useState(10);
  const [selectSet, setSelectSet] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [desciption, setDesciption] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [creator, setCreator] = useState("no one yet");
  const [user, setUser] = useState("");
  const [settings, setSettings] = useState(false);

  const viewSettings = () => {
    setSettings(!settings);
    console.log(settings)
  }


  useEffect(() => {
  
    if (localStorage.getItem("access_token")) {
      const decodedToken = jwtDecode(localStorage.getItem("access_token"));
      setIsAdmin(decodedToken.admin);
      setUser(decodedToken.username);
    } else {
      setIsAdmin(false);
    }
  }, []);
  useEffect(() => {
    // instance.get(`/users/${userID}/sets`).then((response) => {

    instance
      .get(`/folders/${id}/sets`)
      .then((response) => {
        setSetCards(response.data.sets);
        setTitle(response.data.folder.folder_title);
        setDesciption(response.data.folder.folder_description)
        setCreator(response.data.folder.username);
        document.title = `${response.data.folder.folder_title} | ЗапомниГо`;
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setTitle("Няма такава папка :<");
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
    if (!window.confirm("Сигурни ли сте, че искате да изтриете тази папка?")) {
      return;
    }
    instance.delete(`/folders/${id}`).then((response) => {
      window.location.href = "/app/folders";
    });
  }

  return (
    <Dashboard>
      <div className="set-wrapper">
        <h2 className="category-title">
          {title}                                  
          <a href={`/app/edit-folder/${id}`}><FaPen /></a>              
          <a onClick={handleDelete} className="delete"><MdDeleteOutline /></a>
        </h2>
        {/* namali font weigth */}
        <h4 className="category-title">{desciption}</h4>

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
          {isAdmin ||
            (creator === user && (
              <div className="add-set set-card">
                <a href={`/app/edit-folder/${id}`}>
                  <FaPen />
                </a>
              </div>
            ))}
        </div>
      </div>
    </Dashboard>
  );
};
