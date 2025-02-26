import React, { useEffect, useState } from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import SetCard from "../SetCard/SetCard";
import { MoreBtn } from "../MoreBtn/MoreBtn";
import instance from "../../app-utils/axios";
import { jwtDecode } from "jwt-decode";
import { FaRegFolderClosed } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

export const Folders: React.FC = () => {
  const [setCards, setSetCards] = useState([]);
  const [recentCards, setRecentCards] = useState(10);
  // const [exploreCards, setExploreCards] = useState(10);
  const [selectSet, setSelectSet] = useState<string | null>(null);

  const token = localStorage.getItem("access_token");
  let userID = null;

  if (token) {
    const decodedToken: any = jwtDecode(token);
    userID = decodedToken.sub;
  }

  useEffect(() => {
    instance.get(`/users/${userID}/folders`).then((response) => {
      setSetCards(response.data.folders);
    });
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
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

  return (
    <Dashboard>
      <div className="set-wrapper">
        <h2 className="category-title">Моите папки</h2>
        <div className="sets folders">
          <div className="add-set set-card add-folder">
            <a href={`/app/create-folder`}>
              <FaPlus className="single" />
            </a>
          </div>
          {setCards.map((card) => (
            <SetCard
              key={card.folder_id}
              id={card.folder_id}
              title={card.folder_title}
              description={card.folder_description}
              category={card.category_name}
              subcategory={card.subcategory_name}
              image={"/logo.jpg"}
              creator_name={card.username}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              isSelected={selectSet === card.set_id}
              icon={<FaRegFolderClosed />}
              type={"folder"}
            />
          ))}
        </div>
        {recentCards <
          setCards.filter((card) => card.category_name === "recent").length && (
          <MoreBtn onClick={handleLoadRecent} />
        )}
      </div>
    </Dashboard>
  );
};
