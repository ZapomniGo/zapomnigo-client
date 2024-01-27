// YourMainPage.tsx
import React, { useEffect, useState } from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import SetCard from "../SetCard/SetCard";
import { MoreBtn } from "../MoreBtn/MoreBtn";
import instance from "../../app-utils/axios";
import { LoadingAnimation } from "../LoadingAnimation/LoadingAnimtation";
import { FaRegFolderClosed } from "react-icons/fa6";

//this we should receive from backend when calling for categories/subcategories
const mockSets = [
  // {
  //   "category_name": "Test Category",
  //   "organization_name": "Test Organization",
  //   "set_description": "Test Description",
  //   "set_id": "01HN0GKK384ZQW03MWRZSR549K",
  //   "set_modification_date": "2024-01-25 14:32:57.704165",
  //   "set_name": "Test Set",
  //   "username": "testuser@test.com"
  // },
];

const mockCategories = [
  {
    category_id: '01HJKREA25THZE70QVPWN6W1E6',
    category_name: '1st Grade',
  },
  {
    category_id: '01HJKREA25THZE70QVPWN6W1E6',
    category_name: '2nd Grade',
  },
  {
    category_id: '01HJKREA25THZE70QVPWN6W1E6',
    category_name: '3rd Grade',
  }
]


export const MainPage: React.FC = () => {
  const [setCards, setSetCards] = useState([]);
  const [folderCards, setFolderCards] = useState([]);
  // const [exploreCards, setExploreCards] = useState(10);
  const [selectSet, setSelectSet] = useState<string | null>(null);
  const [pageSet, setPageSet] = useState(1);
  const [pageFolder, setPageFolder] = useState(1);
  const [totalSetPages, setTotalSetPages] = useState(1);
  const [totalFolderPages, setTotalFolderPages] = useState(1);
  const [allCategories, setAllCategories] = useState([]);
  const [title,setTitle] = useState('Разгледай')
  const [isLoading, setIsLoading] = useState(false);
  const [triggerEffect, setTriggerEffect] = useState(false);


  const handleLoadRecent = () => {
    setPageSet(pageSet + 1);
  };

  
 const resetSets = () => {
  setSetCards([]);
  setIsLoading(true);
  instance.get(
    `/sets?page=${pageSet}&size=20&sort_by_date=true&ascending=false`
    ).then((response) => {
    setTotalSetPages(response.data.total_pages);
    const newCards = [];
    response.data.sets.forEach(card => newCards.push(card));
    console.log(newCards)
    setSetCards(newCards);
    console.log(response.data)
    setIsLoading(false);
  });
  setTitle('Разгледай')
}

  useEffect(() => {

    setPageSet(1);
    instance.get(
      `/sets?page=${pageSet}&size=20&sort_by_date=true&ascending=false`
      ).then((response) => {
      setTotalSetPages(response.data.total_pages);
      const newCards = [...setCards];
      response.data.sets.forEach(card => newCards.push(card));
      setSetCards(newCards);      
      console.log(response.data)

    });
    instance.get("/categories").then((response) => {
      setAllCategories(response.data.categories);
      console.log(response.data)
    });
    
    setPageFolder(1);
    instance.get(`/folders`)
    .then((response) => {
      setTotalFolderPages(response.data.total_pages);
      const newFolderCards = [...folderCards];
      response.data.folders.forEach(card => newFolderCards.push(card));
      setFolderCards(newFolderCards);
      console.log(response.data)
    });
  }, [pageSet]);

  const changeCategory = (id: string, name: string) => {
    //ask ivan if they start from 0 or 1  
    setPageSet(1);
    //this should work when backend is ready
    setSetCards([]);
    setIsLoading(true);
    instance.get(
      `/sets?page=${pageSet}&size=20&sort_by_date=false&ascending=true&category_id=${id}`
      ).then((response) => {
      setTotalSetPages(response.data.total_pages);
      const newCards = [];
      response.data.sets.forEach(card => newCards.push(card));
      console.log(newCards)
      setSetCards(newCards);
      console.log(response.data)
      setIsLoading(false);
    });
    setTitle(name)

    //this calls for the subcategories
    // instance.get(`/sub-cats/${id}`).then((response) => {
    //   setAllCategories(response.data.categories);
    //   console.log(response.data);
    // });

    setAllCategories(mockCategories)
  }




  const handleMouseEnter = (id: string) => {
    setSelectSet(id);
  };

  const handleMouseLeave = () => {
    setSelectSet(null);
  };

  return (
    <Dashboard>
      <div className="category-wrapper">
      {allCategories.map((category) => (
        <div key={category.category_id} className="category-btn" onClick={() => changeCategory(category.category_id, category.category_name)}>
          <p >
            {category.category_name}
          </p>
        </div>
      ))}
      <div className="category-btn" onClick={() => {
        resetSets() // Toggle triggerEffect state
      }}> X </div>
      </div>
      <div className="set-wrapper">
        <h2 className="category-title">{title}</h2>
        <div className="sets">
        {isLoading ? (
          <LoadingAnimation />
          ) : setCards.length > 0 ? (
            setCards.map((card) => (
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
              category={card.category_name}
            />
          ))
        ) : (
          <p>No sets available.</p>
        )}
        </div>
        {!isLoading && pageSet < totalSetPages && setCards.length > 0 && <MoreBtn onClick={handleLoadRecent} />}
      </div>
      <div className="set-wrapper">
        <h2 className="category-title">{title}</h2>
        <div className="sets">
        {isLoading ? (
          <LoadingAnimation />
          ) : folderCards.length > 0 ? (
            folderCards.map((card) => (
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
          ))
        ) : (
          <p>No sets available.</p>
        )}
        </div>
        {!isLoading && pageSet < totalSetPages && setCards.length > 0 && <MoreBtn onClick={handleLoadRecent} />}
          
          
        
      </div>
    </Dashboard>
  );
};
