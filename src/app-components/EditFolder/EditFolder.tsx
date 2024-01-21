//to do: Fix select deselect set
import Dashboard from "../Dashboard/Dashboard";
import instance from "../../app-utils/axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SelectSet } from "../CreateFolder/SelectSet";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const EditFolder = () => {
  interface Set {
    id: number;
  }
    
  const [allCategories, setAllCategories] = useState([]);
  const [allInstitutions, setAllInstitutions] = useState([]);
  //change ids to names after backend is fixed also change the select in option
  const [folder, setFolder] = useState<{ folder_title: string; folder_description: string; sets: Set[], organization_name: string, category_name: string }>({ folder_title: '', folder_description: '', sets: [], organization_name: '', category_name: '' }); 
  const [setCards, setSetCards] = useState([]);
  const [allSets, setAllSets] = useState([]);
  const [uniqueSets, setUniqueSets] = useState([]);
  const [category, setCategory] = useState({ name: "", id: "" });
  const [institution, setInstitution] = useState({ name: "", id: "" });
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

    useEffect(() => {
        
        instance.get(`/folders/${id}/sets`).then((response) => {
            setSetCards(response.data.sets);
            folder.folder_title = response.data.folder_title;
            folder.folder_description = response.data.folder_description;
            setInstitution({name: response.data.organization_name, id: ""});
            setCategory({name: response.data.category_name, id: ""});
          });
          

          instance.get("/sets").then((response) => {

            setAllSets(response.data.sets);
          });

        instance.get("/categories")
        .then((response) => {
          setAllCategories(response.data.categories);
        })
      instance.get("/organizations")
      .then((response) =>{
          setAllInstitutions(response.data.organizations);
        })
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
        organization_id: institution.id  ? institution.id : institutionIdRef.current
      };

      instance
      .put(`/folders/${id}`, folderToSubmit)
      .then((response) => {
        toast("Добре дошъл в новата си папка");
        navigate("/folder/" + id);
      })
      .catch((error) => {
        toast("Възникна грешка");
      });
      
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
    const institutionIdRef = useRef(null);
    
    useEffect(() => {
      if (category && category.name && allCategories.length > 0) {
        const selectedCategory = allCategories.find((cat) => cat.category_name === category.name);
        if (selectedCategory) {
          categoryIdRef.current = selectedCategory.category_id;
        }
      }
    
      if (institution && institution.name && allInstitutions.length > 0) {
        const selectedInstitution = allInstitutions.find((inst) => inst.organization_name === institution.name);
        if (selectedInstitution) {
          institutionIdRef.current = selectedInstitution.organization_id;
        }
      }
    }, [allCategories, allInstitutions]);




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
              }}
            >
              <option value="">Select a category</option>
              {allCategories.map((allCat, index) => (
                <option key={index} value={allCat.category_id} selected={category && category.name === allCat.category_name}>
                  {allCat.category_name}
                </option>
              ))}
            </select>
            

            <select
              onChange={(e) => {
                const selectedInstitution = allInstitutions.find((cat) => cat.organization_id === e.target.value);
                setInstitution({ name: selectedInstitution ? selectedInstitution.organization_name : "", id: selectedInstitution ? selectedInstitution.organization_id : "" });
              }}
            >
              <option value="">Select a category</option>
              {allInstitutions.map((allInst, index) => (
                <option key={index} value={allInst.organization_id} selected={category && institution.name === allInst.organization_name}>
                  {allInst.organization_name}
                </option>
              ))}
            </select>

            </div>
          </div>
          {setCards.length >= 1 && <h1>Избрани сетове</h1>}
            <div className="sets-wrapper">
            {setCards.map((card) => (
                <SelectSet
                    key={card.set_id}
                    id={card.set_id}
                    title={card.set_name}
                    description={card.set_description}
                    institution={card.organization_name}
                    image={'/logo.jpg'}
                    creator_name={card.username}
                    isAvb={false} 
                    onSelectSet={() => handleSelectSet(card)}
                    onDeselectSet={() => handleDeselectSet(card)}
                />
                ))}
                {setCards.length >= 1 && (
                  <div className="submition">
                    <button onClick={handleSubmitFolder}>Създай папка</button>
                  </div>
                )}
        </div>

          <h1>Избери сетове</h1>
          <div className="sets-wrapper">
          {uniqueSets.map((card) => (
            <SelectSet
                key={card.set_id}
                id={card.set_id}
                title={card.set_name}
                description={card.set_description}
                institution={card.organization_name}
                image={'/logo.jpg'}
                creator_name={card.username}
                isAvb={true} 
                onSelectSet={() => handleSelectSet(card)}
                onDeselectSet={() => handleDeselectSet(card)}
            />
            ))}
            </div>
        </div>
      </div>
    </Dashboard>
  );
}