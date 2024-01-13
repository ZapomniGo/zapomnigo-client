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

  const [folder, setFolder] = useState<{ title: string; description: string; selectedSets: Set[] }>({ title: '', description: '', selectedSets: [] }); 
  const [setCards, setSetCards] = useState([]);

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
      if (title.length === 0) {
        toast("Моля въведете заглавие");
        return;
      }
      if (description.length === 0) {
        toast("Моля въведете описание");
        return;
      }
    
      // Map over selectedSets and return an object that only contains the set_id
      const selectedSetIds = folder.selectedSets.map(set => ({ set_id: set.set_id }));
    
      // Use selectedSetIds when making your request
      const folderToSubmit = { ...folder, selectedSets: selectedSetIds };
    
      // Now make your request with folderToSubmit
      console.log(folderToSubmit)

    };

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [allCategories, setAllCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [allInstitutions, setAllInstitutions] = useState([]);
    const [institution, setInstitution] = useState("");

  return (
    <Dashboard>
        <ToastContainer />
      <div className="create-set-wrapper">
        <div className="create-set">
        <h1>Създай тесте</h1>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Заглавие"
            className="title"
            minLength={1}
            maxLength={100}
          />
          <div className="other-info">
            <div className="description">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Описание"
              />
            </div>
            <div className="tags">
              <select
                onChange={(e) => setCategory(e.target.value)}
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
                onChange={(e) => setInstitution(e.target.value)}
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
          {setCards.map((card: any) => (
            <SelectSet
            key={card.set_id}
            id={card.set_id}
            title={card.set_name}
            description={card.set_description}
            institution={card.organization_name}
            image={'src/app-components/Navigation/logo.png'}
            creator_name={card.username}
            onSelectSet={(id) => setFolder(prevFolder => ({ 
              ...prevFolder, 
              selectedSets: [...prevFolder.selectedSets, card]
            }))}
            onDeselectSet={() => setFolder(prevFolder => ({ 
              ...prevFolder, 
              selectedSets: prevFolder.selectedSets.filter(set => set.set_id !== card.set_id)
            }))}
          />
        ))}
          <button onClick={handleSubmitFolder}>Създай</button>
        </div>
      </div>
    </Dashboard>
  );
}