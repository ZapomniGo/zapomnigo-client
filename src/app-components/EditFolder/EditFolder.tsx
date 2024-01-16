//to do: Fix select deselect set
import Dashboard from "../Dashboard/Dashboard";
import instance from "../../app-utils/axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SelectSet } from "../CreateFolder/SelectSet";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const EditFolder = () => {
  interface Set {
    id: number;
  }
    
  const [allCategories, setAllCategories] = useState([]);
  const [allInstitutions, setAllInstitutions] = useState([]);
  //change ids to names after backend is fixed also change the select in option
  const [folder, setFolder] = useState<{ folder_title: string; folder_description: string; sets: Set[], organization_id: string, category_id: string }>({ folder_title: '', folder_description: '', sets: [], organization_id: '', category_id: '' }); 
  const [setCards, setSetCards] = useState([]);
  const [allSets, setAllSets] = useState([]);
  const [uniqueSets, setUniqueSets] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

    useEffect(() => {
        
        instance.get(`/folders/${id}/sets`).then((response) => {
            console.log(response.data.sets);
            setSetCards(response.data.sets);
            folder.folder_title = response.data.folder_title;
            folder.folder_description = response.data.folder_description;
            folder.organization_id = "01HGDJEMZKEG4C7BFH6PYG8KM0";
            folder.category_id = "01HJKREA25THZE70QVPWN6W1E6"
          });
          

          instance.get("/sets").then((response) => {
            console.log(response.data.sets);
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
      const folderToSubmit = { ...folder, sets: selectedSetIds };
    
      instance
      .put(`/folders/${id}`, folderToSubmit)
      .then((response) => {
        console.log(response)
        toast("Добре дошъл в новата си папка");
        navigate("/folder/" + id);
      })
      .catch((error) => {
        toast("Възникна грешка");
        console.log(error);
      });
    
      console.log(folderToSubmit)
    }

    const handleSelectSet = (selectedSet) => {
        // Remove the selected set from uniqueSets
        const newUniqueSets = uniqueSets.filter(set => set.set_id !== selectedSet.set_id);
      
        // Add the selected set to setCards
        const newSetCards = [...setCards, selectedSet];
      
        // Update the state
        setUniqueSets(newUniqueSets);
        setSetCards(newSetCards);
      };
    
    // When a set is deselected
    const handleDeselectSet = (deselectedSet) => {
          // Remove the deselected set from setCards
        const newSetCards = setCards.filter(set => set.set_id !== deselectedSet.set_id);

        // Add the deselected set back to uniqueSets
        const newUniqueSets = [...uniqueSets, deselectedSet];

        // Update the state
        setSetCards(newSetCards);
        setUniqueSets(newUniqueSets);
    };

    useEffect(() => {
        const unique = allSets.filter(set1 => !setCards.some(set2 => set2.set_id === set1.set_id));
        setUniqueSets(unique);
        console.log(allInstitutions)
        console.log(folder.category_id)
      }, [allSets, setCards]);

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
            onChange={(e) => handleChangeFolder('category_id', e.target.value)}
            defaultValue={folder.category_id}
                id="categories"
                name="categories"
              >
                <option value="">Без категория</option>
                {allCategories.map((category, index) => (
                  <option key={index} value={category.category_id} selected={category.category_id === folder.category_id}>
                  {category.category_name}
              </option>
                ))}
              </select>
              <select
                    onChange={(e) => handleChangeFolder('organization_id', e.target.value)}
                    defaultValue={""}
                    id="institution"
                    name="institution"
                    >
                    <option value="">Без институция</option>
                    {allInstitutions.map((institution, index) => (
                        <option key={index} value={institution.organization_id} selected={institution.organization_id === folder.organization_id}>
                            {institution.organization_name}
                        </option>
                    ))}
                </select>
            </div>
          </div>
            <h1>Избрани сетове</h1>
          <div className="test">
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
            </div>
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
          <button onClick={handleSubmitFolder}>Създай</button>
        </div>
      </div>
    </Dashboard>
  );
}