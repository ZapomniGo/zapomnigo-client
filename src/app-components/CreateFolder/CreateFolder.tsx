//to do: Fix select deselect set
import Dashboard from "../Dashboard/Dashboard";
import instance from "../../app-utils/axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Editor from "../RichEditor/Editor";
import { SelectSet } from "./SelectSet";

export const CreateFolder = () => {
  
  interface Set {
    id: number;
  }
    
  const [allCategories, setAllCategories] = useState([]);
  const [allInstitutions, setAllInstitutions] = useState([]);
  const [folder, setFolder] = useState<{ title: string; description: string; selectedSets: Set[], institution: string, category: string }>({ title: '', description: '', selectedSets: [], institution: '', category: '' }); 
  const [setCards, setSetCards] = useState([]);
  const [availableSets, setAvailableSets] = useState({});



    useEffect(() => {
        instance.get("/sets").then((response) => {
          console.log(response.data.sets);
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
 
    
      // Map over selectedSets and return an object that only contains the set_id
      const selectedSetIds = folder.selectedSets.map(set => ({ set_id: set.set_id }));
    
      // Use selectedSetIds when making your request
      const folderToSubmit = { ...folder, selectedSets: selectedSetIds };
    
      // Now make your request with folderToSubmit
      console.log(folderToSubmit)

    };

    const handleSelectSet = (set) => {
      setAvailableSets(prevSets => ({
        ...prevSets,
        [set.set_id]: false, // Set the availability of the selected set to false
      }));
    
      setFolder(prevFolder => ({ 
        ...prevFolder, 
        selectedSets: [...prevFolder.selectedSets, set]
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
        selectedSets: prevFolder.selectedSets.filter(set => set.set_id !== set.set_id)
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
            onChange={(e) => handleChangeFolder('title', e.target.value)}
            placeholder="Заглавие"
            className="title"
            minLength={1}
            maxLength={100}
          />
          <div className="other-info">
            <div className="description">
              <textarea
                onChange={(e) => handleChangeFolder('description', e.target.value)}
                placeholder="Описание"
              />
            </div>
            <div className="tags">
              <select
            onChange={(e) => handleChangeFolder('category', e.target.value)}
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
            onChange={(e) => handleChangeFolder('institution', e.target.value)}
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
              image={'src/app-components/Navigation/logo.png'}
              creator_name={card.username}
              isAvb={availableSets[card.set_id] !== false} 
              onSelectSet={() => handleSelectSet(card)}
              onDeselectSet={() => handleDeselectSet(card)}
            />
          
        ))}
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
                image={'src/app-components/Navigation/logo.png'}
                creator_name={card.username}
                isAvb={availableSets[card.set_id] !== false} // The set is available if its ID is not in the availableSets state or if its value is true
                onSelectSet={() => handleSelectSet(card)}
                onDeselectSet={() => handleDeselectSet(card)}
              />
            ))}
            </div>
          <button onClick={handleSubmitFolder}>Създай</button>
        </div>
      </div>
    </Dashboard>
  );
}