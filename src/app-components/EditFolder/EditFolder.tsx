//to do: Fix select deselect set
import Dashboard from "../Dashboard/Dashboard";
import instance from "../../app-utils/axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SelectSet } from "../CreateFolder/SelectSet";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MoreBtn } from "../MoreBtn/MoreBtn";
export const EditFolder = () => {
  interface Set {
    id: number;
  }
    
  const [allCategories, setAllCategories] = useState([]);
  // const [allInstitutions, setAllInstitutions] = useState([]);
  //change ids to names after backend is fixed also change the select in option
  const [folder, setFolder] = useState<{ folder_title: string; folder_description: string; sets: Set[], subcategory_name: string, category_name: string }>({ folder_title: '', folder_description: '', sets: [], subcategory_name: '', category_name: '' }); 
  const [setCards, setSetCards] = useState([]);
  const [allSets, setAllSets] = useState([]);
  const [uniqueSets, setUniqueSets] = useState([]);
  const [category, setCategory] = useState({ name: "", id: "" });
  const [institution, setInstitution] = useState({ name: "", id: "" })
  const [subcategory, setSubcategory] = useState({ name: "", id: "" });
  const [allSubcategories, setAllSubcategories] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

    useEffect(() => {
        instance.get(`/folders/${id}/sets`).then((response) => {
            setSetCards(response.data.sets);
            folder.folder_title = response.data.folder.folder_title;
            folder.folder_description = response.data.folder.folder_description;
            // setInstitution({name: response.data.folder.organization_name, id: ""});
            setCategory({name: response.data.folder.category_name, id: ""});
            setSubcategory({ name: response.data.folder.subcategory_name, id: "" })
        })
        .catch((error) => {
          if (error.response.status === 404) {
            window.location.href = "/app/not-found";
          }
          });
          

          instance.get("/sets?page=1&size=20&sort_by_date=false&ascending=true&category_id=").then((response) => {
            setAllSets(response.data.sets);
            setTotalSetPages(response.data.total_pages);

          });

        instance.get("/categories")
        .then((response) => {
          setAllCategories(response.data.categories);
        })
      // instance.get("/organizations")
      // .then((response) =>{
      //     setAllInstitutions(response.data.organizations);
      //   })
    }, []);

    const handleChangeFolder = (key: string, value: string) => {
      setFolder(prevState => ({ ...prevState, [key]: value }));
    };
    
    
    const handleSubmitFolder = () => {
      // Map over sets and return only the set_id
      const selectedSetIds = setCards.map(set => set.set_id.toString());    
      // Use selectedSetIds when making your request
      const folderToSubmit = { 
        ...folder, 
        sets: selectedSetIds, 
        category_id: category.id ? category.id : categoryIdRef.current, 
        subcategory_id: subcategoryIdRef.current
      };
      instance
      .put(`/folders/${id}`, folderToSubmit)
      .then((response) => {
        toast("Добре дошъл в новата си папка");
        navigate("/app/folder/" + id);
      })
      .catch((error) => {
        toast("Възникна грешка");
      });
      
    }

    const getSubcategories = (category_id) => {
      console.log("here")
      instance.get(`/categories/${category_id}/subcategories`).then((response) => {
        setAllSubcategories(response.data.subcategories);
        console.log(response.data.subcategories)
      });
    }

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    console.log(category)
    if (category.name && allCategories.length > 0) {
      console.log("inuseeffect")
      const matchingCategory = allCategories.find(
        (cat) => cat.category_name === category.name
      );
      if (matchingCategory) {
        setSelectedCategoryId(matchingCategory.category_id);
      }
    }
  }, [category, allCategories]);
  
  useEffect(() => {
    if (selectedCategoryId) {
      getSubcategories(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const resetSubcategory = () => {
    setAllSubcategories([]);
  }

    const handleSelectSet = (selectedSet) => {

        const newUniqueSets = uniqueSets.filter(set => set.set_id !== selectedSet.set_id);
      
        const newSetCards = [...setCards, selectedSet];
      
        setUniqueSets(newUniqueSets);
        setSetCards(newSetCards);
      };
    
    const handleDeselectSet = (deselectedSet) => {

        const newSetCards = setCards.filter(set => set.set_id !== deselectedSet.set_id);

        const newUniqueSets = [...uniqueSets, deselectedSet];

        // Update the state
        setSetCards(newSetCards);
        setUniqueSets(newUniqueSets);
    };

    useEffect(() => {
      const unique = allSets.filter(set1 => !setCards.some(set2 => set2.set_id === set1.set_id));
      setUniqueSets(unique);
    }, [allSets, setCards]);


    const categoryIdRef = useRef(null);
    const subcategoryIdRef = useRef(null);
    
    useEffect(() => {
      if (category && category.name && allCategories.length > 0) {
        const selectedCategory = allCategories.find((cat) => cat.category_name === category.name);
        if (selectedCategory) {
          categoryIdRef.current = selectedCategory.category_id;
        }
      }
    
      if (subcategory && subcategory.name && allSubcategories.length > 0) {
        const selectedSubcategory = allSubcategories.find((inst) => inst.subcategory_name === subcategory.name);
        if (selectedSubcategory) {
          subcategoryIdRef.current = selectedSubcategory.subcategory_id;
        }
      }
    }, [allCategories, allSubcategories, subcategory]);


    const [pageSet, setPageSet] = useState(1);
    const [totalSetPages, setTotalSetPages] = useState(1);
  
    const handleLoadRecentSet = () => {
      const newPageSet = pageSet + 1;
      setPageSet(newPageSet);
      instance.get(
        `/sets?page=${newPageSet}&size=20&sort_by_date=false&ascending=true&category_id=`
        ).then((response) => {
          console.log(response.data)
        setTotalSetPages(response.data.total_pages);
        const newCards = [...uniqueSets];
        response.data.sets.forEach(card => newCards.push(card));
        setUniqueSets(newCards);
  
      });
      
    };

  return (
    <Dashboard>
      <ToastContainer />
      <div>

      </div>
      <div className="create-set-wrapper">
        <div className="create-set">
        <h1>Редактирай папка</h1>
        <input
            type="text"
            value={folder.folder_title}
            onChange={(e) => handleChangeFolder('folder_title', e.target.value)}
            placeholder="Заглавие"
            className="title"
            minLength={1}
            maxLength={100}
            />
          <div className="other-info">
            <div className="description">
              <textarea
                onChange={(e) => handleChangeFolder('folder_description', e.target.value)}
                placeholder="Описание"
                value={folder.folder_description}
              />
            </div>
            <div className="tags">
              <select
              onChange={(e) => {
                const selectedCategory = allCategories.find((cat) => cat.category_id === e.target.value);
                setCategory({ name: selectedCategory ? selectedCategory.category_name : "", id: selectedCategory ? selectedCategory.category_id : "" });
                resetSubcategory();
                getSubcategories(selectedCategory.category_id);
              }}
            >
              <option value="">Категория</option>
              {allCategories.map((allCat, index) => (
                <option key={index} value={allCat.category_id} selected={category && category.name === allCat.category_name}>
                  {allCat.category_name}
                </option>
              ))}
            </select>
            

            <select
              onChange={(e) => {
                const selectedSubcategory = allSubcategories.find((cat) => cat.subcategory_id === e.target.value);
                setSubcategory({
                  name: selectedSubcategory
                    ? selectedSubcategory.subcategory_name
                    : "",
                  id: selectedSubcategory
                    ? selectedSubcategory.subcategory_id
                    : "",
                });              }}
            >
              <option value="">Събкатекогия</option>
              {allSubcategories.map((allSubc, index) => (
                <option key={index} value={allSubc.subcategory_id} selected={subcategory && subcategory.name === allSubc.subcategory_name}>
                  {allSubc.subcategory_name}
                </option>
              ))}
            </select>

            </div>
          </div>
          {setCards.length >= 1 && <h1>Избрани тестета</h1>}
            <div className="sets-wrapper">
            {setCards.map((card) => (
                <SelectSet
                    key={card.set_id}
                    id={card.set_id}
                    title={card.set_name}
                    description={card.set_description}
                    institution={card.subcategory_name}
                    image={'/logo.jpg'}
                    creator_name={card.username}
                    isAvb={false} 
                    onSelectSet={() => handleSelectSet(card)}
                    onDeselectSet={() => handleDeselectSet(card)}
                    chosen={true}
                />
                ))}
                {setCards.length >= 1 && (
                  <div className="submition">
                    <button onClick={handleSubmitFolder}>Редактирай папка</button>
                  </div>
                )}
        </div>

          <h1>Избери тестета</h1>
          <div className="sets-wrapper">
          {uniqueSets.map((card) => (
            <SelectSet
                key={card.set_id}
                id={card.set_id}
                title={card.set_name}
                description={card.set_description}
                institution={card.subcategory_name}
                image={'/logo.jpg'}
                creator_name={card.username}
                isAvb={true} 
                onSelectSet={() => handleSelectSet(card)}
                onDeselectSet={() => handleDeselectSet(card)}
            />
            ))}
            </div>
            { pageSet < totalSetPages && setCards.length > 0 && <MoreBtn onClick={() => handleLoadRecentSet()} />}

        </div>

      </div>
    </Dashboard>
  );
}