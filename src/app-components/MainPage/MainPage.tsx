// YourMainPage.tsx
import React, { useEffect, useState } from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import SetCard from "../SetCard/SetCard";
import { MoreBtn } from "../MoreBtn/MoreBtn";
import instance from "../../app-utils/axios";
import { LoadingAnimation } from "../LoadingAnimation/LoadingAnimtation";
import { FaRegFolderClosed } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export const MainPage: React.FC = () => {
  const [setCards, setSetCards] = useState([]);
  const [folderCards, setFolderCards] = useState([]);
  const [selectSet, setSelectSet] = useState<string | null>(null);
  const [pageSet, setPageSet] = useState(1);
  const [pageFolder, setPageFolder] = useState(1);
  const [totalSetPages, setTotalSetPages] = useState(1);
  const [totalFolderPages, setTotalFolderPages] = useState(1);
  const [allCategories, setAllCategories] = useState([]);
  const [title, setTitle] = useState("Разгледай");
  const [categoryID, setCategoryID] = useState("");
  const [category, setCategory] = useState("");
  const [isFolderLoading, setIsFolderLoading] = useState(false);
  const [isSetLoading, setIsSetLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [hasSets, setHasSets] = useState(true);
  const [hasFolders, setHasFolders] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);

  // const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubCategory(subcategory);
  };

  const handleLoadRecentSet = (category) => {
    const newPageSet = pageSet + 1;
    setPageSet(newPageSet);
    setIsSetLoading(true);
    instance
      .get(
        `/sets?page=${newPageSet}&size=10&sort_by_date=false&ascending=true&category_id=${category}`
      )
      .then((response) => {
        setTotalSetPages(response.data.total_pages);
        const newCards = [...setCards];
        response.data.sets.forEach((card) => newCards.push(card));
        setSetCards(newCards);
        setTimeout(() => {
          setIsSetLoading(false);
          //doesn't work for some reason
          // document
          //   .querySelector("div.set-wrapper > .sets >div:last-child")
          //   .scrollIntoView();
        }, 250);
      });
  };

  const handleLoadRecentFolder = (category) => {
    const newPageFolder = pageFolder + 1;
    setPageFolder(newPageFolder);
    setIsFolderLoading(true);

    instance
      .get(
        `/folders?page=${newPageFolder}&size=10&sort_by_date=true&ascending=true&category_id=${category}`
      )
      .then((response) => {
        setTotalFolderPages(response.data.total_pages);
        const newFolderCards = [...folderCards];
        response.data.folders.forEach((card) => newFolderCards.push(card));
        setFolderCards(newFolderCards);
        setTimeout(() => {
          setIsFolderLoading(false);
          //doesn't work for some reason
          // document
          //   .querySelector("div.set-wrapper > div.folder >div:last-child")
          //   .scrollIntoView();
        }, 250);
      });
  };

  //used to reset sets and folders
  //reset works
  const resetSets = () => {
    if (selectedSubCategory !== "") {
      setSelectedSubCategory("");
      setPageSet(1);
      setTitle(category);
      setIsFolderLoading(true);
      setIsSetLoading(true);
      setAllCategories([]);
      instance
        .get(
          `/sets?page=1&size=10&sort_by_date=false&ascending=true&category_id=${categoryID}`
        )
        .then((response) => {
          setTotalSetPages(response.data.total_pages);
          const newCards = [];
          response.data.sets.forEach((card) => newCards.push(card));
          setSetCards(newCards);
          setHasSets(true);
          setTimeout(() => {
            setIsSetLoading(false);
          }, 250);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setHasSets(false); // Update hasSets if a 404 error is received
          }
          setIsSetLoading(false);
        });

      setPageFolder(1);
      instance
        .get(
          `/folders?page=${pageFolder}&size=10&sort_by_date=true&ascending=false&category_id=${categoryID}`
        )
        .then((response) => {
          setTotalFolderPages(response.data.total_pages);
          const newFolderCards = [];
          response.data.folders.forEach((card) => newFolderCards.push(card));
          setFolderCards(newFolderCards);
          setHasFolders(true);
          setTimeout(() => {
            setIsFolderLoading(false);
          }, 250);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setHasFolders(false); // Update hasSets if a 404 error is received
          }
          setIsFolderLoading(false);
        });
    } else {
      setPageSet(1);
      setIsFolderLoading(true);
      setIsSetLoading(true);
      setIsCategoryLoading(true);
      setSubCategories([]);
      instance
        .get(
          `/sets?page=1&size=10&sort_by_date=false&ascending=true&category_id=`
        )
        .then((response) => {
          setTotalSetPages(response.data.total_pages);
          const newCards = [];
          response.data.sets.forEach((card) => newCards.push(card));
          setSetCards(newCards);
          setHasSets(true);
          setTimeout(() => {
            setIsSetLoading(false);
          }, 250);
        });
      setTitle("Разгледай");

      instance.get("/categories").then((response) => {
        setAllCategories(response.data.categories);
        setTimeout(() => {
          setIsCategoryLoading(false);
        }, 250);
      });

      setPageFolder(1);
      instance
        .get(
          `/folders?page=${pageFolder}&size=10&sort_by_date=true&ascending=false&category_id=`
        )
        .then((response) => {
          setTotalFolderPages(response.data.total_pages);
          const newFolderCards = [];
          response.data.folders.forEach((card) => newFolderCards.push(card));
          setFolderCards(newFolderCards);
          setHasFolders(true);
          setTimeout(() => {
            setIsFolderLoading(false);
          }, 250);
        });
      setCategoryID("");
      setSubCategories([]);
    }
  };

  //used for inital load for sets and folders
  useEffect(() => {
    setPageSet(1);
    instance
      .get(`/sets?page=${pageSet}&size=10&sort_by_date=true&ascending=false`)
      .then((response) => {
        setTotalSetPages(response.data.total_pages);
        const newCards = [...setCards];
        response.data.sets.forEach((card) => newCards.push(card));
        setSetCards(newCards);
        setHasSets(true);
        setTimeout(() => {
          setIsSetLoading(false);
        }, 250);
      });
    instance.get("/categories").then((response) => {
      setAllCategories(response.data.categories);
      setTimeout(() => {
        setIsCategoryLoading(false);
      }, 250);
    });

    setPageFolder(1);
    instance
      .get(
        `/folders?page=${pageFolder}&size=10&sort_by_date=true&ascending=false`
      )
      .then((response) => {
        setTotalFolderPages(response.data.total_pages);
        const newFolderCards = [...folderCards];
        response.data.folders.forEach((card) => newFolderCards.push(card));
        setFolderCards(newFolderCards);
        setHasFolders(true);
        setTimeout(() => {
          setIsFolderLoading(false);
        }, 250);
      });
  }, []);

  const changeCategory = (id: string, name: string) => {
    //this should work when backend is ready
    setSetCards([]);
    setIsFolderLoading(true);
    setIsSetLoading(true);
    setIsCategoryLoading(true);
    setPageSet(1);
    instance
      .get(
        `/sets?page=1&size=10&sort_by_date=false&ascending=true&category_id=${id}`
      )
      .then((response) => {
        setTotalSetPages(response.data.total_pages);
        const newCards = [];
        response.data.sets.forEach((card) => newCards.push(card));
        setSetCards(newCards);
        setHasSets(true);
        setTimeout(() => {
          setIsSetLoading(false);
        }, 250);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setHasSets(false);
        }
        setIsSetLoading(false);
      });

    setPageFolder(1);
    setFolderCards([]);
    instance
      .get(
        `/folders?page=1&size=10&sort_by_date=true&ascending=true&category_id=${id}`
      )
      .then((response) => {
        setTotalFolderPages(response.data.total_pages);
        const newFolderCards = [];
        response.data.folders.forEach((card) => newFolderCards.push(card));
        setFolderCards(newFolderCards);
        setHasFolders(true);
        setTimeout(() => {
          setIsFolderLoading(false);
        }, 250);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setHasFolders(false);
        }
        setIsFolderLoading(false);
      });

    setTitle(name);
    setCategoryID(id);
    setCategory(name);

    //this calls for the subcategories
    instance.get(`/categories/${id}/subcategories`).then((response) => {
      setAllCategories([]);
      setSubCategories(response.data.subcategories);
      setTimeout(() => {
        setIsCategoryLoading(false);
      }, 250);
    });
  };

  const changeSubCategory = (id: string, name: string) => {
    //this should work when backend is ready
    setSetCards([]);
    setSelectedSubCategory(id);
    setIsFolderLoading(true);
    setIsSetLoading(true);
    setPageSet(1);

    instance
      .get(
        `/sets?page=1&size=10&sort_by_date=false&ascending=true&category_id=${categoryID}&subcategory_id=${id}`
      )
      .then((response) => {
        setTotalSetPages(response.data.total_pages);
        const newCards = [];
        response.data.sets.forEach((card) => newCards.push(card));
        setSetCards(newCards);
        setHasSets(true);
        setTimeout(() => {
          setIsSetLoading(false);
        }, 250);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setHasSets(false); // Update hasSets if a 404 error is received
        }
        setIsSetLoading(false);
      });

    setPageFolder(1);
    setFolderCards([]);
    instance
      .get(
        `/folders?page=1&size=10&sort_by_date=true&ascending=true&category_id=${categoryID}&subcategory_id=${id}`
      )
      .then((response) => {
        setTotalFolderPages(response.data.total_pages);
        const newFolderCards = [];
        response.data.folders.forEach((card) => newFolderCards.push(card));
        setFolderCards(newFolderCards);
        setIsFolderLoading(false);
        setHasFolders(true);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setHasFolders(false); // Update hasSets if a 404 error is received
        }
        setIsFolderLoading(false);
      });

    setTitle(category + " " + name);
  };

  const handleMouseEnter = (id: string) => {
    setSelectSet(id);
  };

  const handleMouseLeave = () => {
    setSelectSet(null);
  };

  const [isAccordionVisible, setIsAccordionVisible] = useState(
    window.innerHeight < window.innerWidth
  );

  const handleAccordionClick = () => {
    setIsAccordionVisible(!isAccordionVisible);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Dashboard>
      {windowWidth <= 1000 ? (
        <>
          {isCategoryLoading ? (
            <LoadingAnimation />
          ) : (
            <div className="category-wrapper">
              <center>
                {" "}
                <button
                  className="category-btn-main"
                  onClick={handleAccordionClick}
                >
                  Категории
                  {!isAccordionVisible ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </button>
              </center>
              {isAccordionVisible && (
                <div className="categories">
                  {allCategories &&
                    allCategories.map((category) => (
                      <div
                        key={category.category_id}
                        className="category-btn"
                        onClick={() =>
                          changeCategory(
                            category.category_id,
                            category.category_name
                          )
                        }
                      >
                        <p>{category.category_name}</p>
                      </div>
                    ))}
                  {subCategories &&
                    subCategories.map((subCategories) => (
                      // <div key={subCategories.subcategory_id} className="category-btn" onClick={() => changeSubCategory(subCategories.subcategory_id, subCategories.subcategory_name)}>
                      <div
                        key={subCategories.id}
                        className={
                          selectedSubCategory === subCategories.subcategory_id
                            ? "selected category-btn"
                            : "category-btn"
                        }
                        onClick={() => {
                          handleSubcategoryClick(subCategories);
                          changeSubCategory(
                            subCategories.subcategory_id,
                            subCategories.subcategory_name
                          );
                        }}
                      >
                        <p>{subCategories.subcategory_name}</p>
                      </div>
                    ))}
                  {(categoryID || selectedSubCategory) && (
                    <div className="reset-btn" onClick={resetSets}>
                      <RxCrossCircled />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          {isAccordionVisible ? (
            <div className="accordion">
              <center>
                {" "}
                <button
                  className="category-btn-main"
                  onClick={handleAccordionClick}
                >
                  Категории <IoIosArrowDown />
                </button>
              </center>
            </div>
          ) : (
            <>
              <div className="accordion">
                <center>
                  {" "}
                  <button
                    className="category-btn-main"
                    onClick={handleAccordionClick}
                  >
                    Категории <IoIosArrowUp />
                  </button>
                </center>
              </div>
              <div className="panel">
                <div className="category-wrapper">
                  {allCategories &&
                    allCategories.map((category) => (
                      <div
                        key={category.category_id}
                        className="category-btn"
                        onClick={() =>
                          changeCategory(
                            category.category_id,
                            category.category_name
                          )
                        }
                      >
                        <p>{category.category_name}</p>
                      </div>
                    ))}
                  {subCategories &&
                    subCategories.map((subCategories) => (
                      // <div key={subCategories.subcategory_id} className="category-btn" onClick={() => changeSubCategory(subCategories.subcategory_id, subCategories.subcategory_name)}>
                      <div
                        key={subCategories.id}
                        className={
                          selectedSubCategory === subCategories.subcategory_id
                            ? "selected category-btn"
                            : "category-btn"
                        }
                        onClick={() => {
                          handleSubcategoryClick(subCategories);
                          changeSubCategory(
                            subCategories.subcategory_id,
                            subCategories.subcategory_name
                          );
                        }}
                      >
                        <p>{subCategories.subcategory_name}</p>
                      </div>
                    ))}
                  {(categoryID || selectedSubCategory) && (
                    <div className="reset-btn" onClick={resetSets}>
                      <RxCrossCircled />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}

      <div className="set-wrapper">
        <h2 className="category-title">{title} тестета:</h2>
        <div className="sets">
          <div className="sets">
            {isSetLoading ? (
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
                  subcategory={card.subcategory_name}
                />
              ))
            ) : (
              <p>Няма тестета за тази категория</p>
            )}
          </div>
        </div>
        {!isSetLoading && pageSet < totalSetPages && setCards.length > 0 && (
          <MoreBtn onClick={() => handleLoadRecentSet(categoryID)} />
        )}
      </div>
      <div className="set-wrapper">
        <h2 className="category-title">{title} папки:</h2>
        <div className="sets folders">
          {isFolderLoading ? (
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
            <p>Няма папки за тази категория</p>
          )}
        </div>
        {!isFolderLoading &&
          pageFolder < totalFolderPages &&
          folderCards.length > 0 && (
            <MoreBtn onClick={() => handleLoadRecentFolder(categoryID)} />
          )}
      </div>
    </Dashboard>
  );
};
