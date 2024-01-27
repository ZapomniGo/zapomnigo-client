// YourMainPage.tsx
import React, { useEffect, useState } from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import SetCard from "../SetCard/SetCard";
import { MoreBtn } from "../MoreBtn/MoreBtn";
import instance from "../../app-utils/axios";

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
  // const [exploreCards, setExploreCards] = useState(10);
  const [selectSet, setSelectSet] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allCategories, setAllCategories] = useState([]);
  const [title,setTitle] = useState('Разгледай')
  const handleLoadRecent = () => {
    setPage(page + 1);
  };

  


  useEffect(() => {
    //ask ivan if they start from 0 or 1  
    setPage(1);
    instance.get(
      `/sets?page=${page}&size=20&sort_by_date=false&ascending=true`
      ).then((response) => {
      setTotalPages(response.data.total_pages);
      const newCards = [...setCards];
      response.data.sets.forEach(card => newCards.push(card));
      setSetCards(newCards);      
      console.log(response.data)

    });
    instance.get("/categories").then((response) => {
      setAllCategories(response.data.categories);
      console.log(response.data)
    });

  }, [page]);

  const changeCategory = (id: string, name: string) => {
    //ask ivan if they start from 0 or 1  
    setPage(1);
    //this should work when backend is ready
    setSetCards([]);
    instance.get(
      `/sets?page=${page}&size=20&sort_by_date=false&ascending=true&category_id=${id}`
      ).then((response) => {
      setTotalPages(response.data.total_pages);
      const newCards = [];
      response.data.sets.forEach(card => newCards.push(card));
      console.log(newCards)
      setSetCards(newCards);
      console.log(response.data)
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
      </div>
      <div className="set-wrapper">
        <h2 className="category-title">{title}</h2>
        <div className="sets">
        {setCards.length > 0 ? (
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
        {page < totalPages && setCards.length > 0 && <MoreBtn onClick={handleLoadRecent} />}
      </div>
    </Dashboard>
  );
};
