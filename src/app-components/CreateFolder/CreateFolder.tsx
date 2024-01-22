//to do: Fix select deselect set
import Dashboard from "../Dashboard/Dashboard";
import instance from "../../app-utils/axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SelectSet } from "./SelectSet";
import { useNavigate } from "react-router-dom";


export const CreateFolder = () => {
  const navigate = useNavigate();

  interface Set {
    id: number;
  }
    
  const [allCategories, setAllCategories] = useState([]);
  const [allInstitutions, setAllInstitutions] = useState([]);
  const [folder, setFolder] = useState<{ folder_title: string; folder_description: string; sets: Set[], organization_id: string, category_id: string }>({ folder_title: '', folder_description: '', sets: [], organization_id: '', category_id: '' }); 
  const [setCards, setSetCards] = useState([]);
  const [availableSets, setAvailableSets] = useState({});



    useEffect(() => {
        instance.get("/sets").then((response) => {
          setSetCards(response.data.sets);
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
      const selectedSetIds = folder.sets.map(set => set.set_id.toString());    
      // Use selectedSetIds when making your request
      const folderToSubmit = { ...folder, sets: selectedSetIds };
    
      instance
      .post("/folders", folderToSubmit)
      .then((response) => {
        console.log(response)
        toast("Добре дошъл в новото си тесте");
        navigate("/folder/" + response.data.folder_id);
      })
      .catch((error) => {
        toast("Възникна грешка");
        console.log(error);
      });
    
      console.log(folderToSubmit)
    }

    const handleSelectSet = (set) => {
      setAvailableSets(prevSets => ({
        ...prevSets,
        [set.set_id]: false, // Set the availability of the selected set to false
      }));
    
      setFolder(prevFolder => ({ 
        ...prevFolder, 
        sets: [...prevFolder.sets, set]
      }));
    };
    
    // When a set is deselected
    const handleDeselectSet = (set) => {
      setAvailableSets(prevSets => ({
        ...prevSets,
        [set.set_id]: true, // Set the availability of the deselected set to true
      }));
    
      setFolder(prevFolder => ({ 
        ...prevFolder, 
        sets: prevFolder.sets.filter(set => set.set_id !== set.set_id)
      }));
    }; 

    const unavailableSetIds = Object.keys(availableSets).filter(id => availableSets[id] === false);
    const unavailableSets = setCards.filter(set => unavailableSetIds.includes(set.set_id.toString()));


  return (
    <Dashboard>
      <ToastContainer />
      <div>

      </div>
      <div className="create-set-wrapper">
        <div className="create-set">
        <h1>Създай папка</h1>
          <input
            type="text"
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
              />
            </div>
            <div className="tags">
              <select
            onChange={(e) => handleChangeFolder('category_id', e.target.value)}
            defaultValue={""}
                id="categories"
                name="categories"
              >
                <option value="">Без категория</option>
                {allCategories.map((category, index) => (
                  <option key={index} value={category.category_id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
              <select
            onChange={(e) => handleChangeFolder('organization_id', e.target.value)}
            defaultValue=""
                id="institution"
                name="institution"
              >
                <option value="">Без институция</option>
                {allInstitutions.map((institution, index) => (
                  <option key={index} value={institution.organization_id}>
                    {institution.organization_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {unavailableSets.length > 0 && (
            <h1>Избрани сетове</h1>
          )}
          <div className="test">

          <div className="sets-wrapper">

          {unavailableSets.map(card => (
            <SelectSet
              key={card.set_id}
              id={card.set_id}
              title={card.set_name}
              description={card.set_description}
              institution={card.organization_name}
              image={'/logo.jpg'}
              creator_name={card.username}
              isAvb={availableSets[card.set_id] !== false} 
              onSelectSet={() => handleSelectSet(card)}
              onDeselectSet={() => handleDeselectSet(card)}
              chosen={true}
            />
          
        ))}
        {unavailableSets.length >= 1 && (
          <div className="submition">
            <button onClick={handleSubmitFolder}>Създай папка</button>
          </div>
        )}

        </div>
        </div>

          <h1>Избери сетове</h1>
          <div className="sets-wrapper">
          {setCards.filter(card => availableSets[card.set_id] !== false).map((card: any) => (
              <SelectSet
                key={card.set_id}
                id={card.set_id}
                title={card.set_name}
                description={card.set_description}
                institution={card.organization_name}
                image={'/logo.jpg'}
                creator_name={card.username}
                isAvb={availableSets[card.set_id] !== false} 
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