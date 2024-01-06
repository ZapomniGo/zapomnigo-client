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
    }, []);

    const handleChangeFolder = (key: string, value: string) => {
      setFolder(prevState => ({ ...prevState, [key]: value }));
    };
    
    
    const handleSubmitFolder = () => {
      if (folder.title.length === 0) {
        toast("Моля въведете заглавие");
        return;
      }
      if (folder.description.length === 0) {
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



  return (
    <Dashboard>
        <ToastContainer />
      <div className="create-folder">
        <div className="create-folder-wrapper">
          <div className="create-folder-title">
            <h1>Create Folder</h1>
          </div>
          <div className="flashcard">
            <Editor
              placeholder={"Термин"}
              value={folder.title}
              onChange={(value: string) =>
                handleChangeFolder("title", value)
              }
            />
            <Editor
              placeholder={"Дефиниция"}
              value={folder.description}
              onChange={(value: string) =>
                handleChangeFolder("description", value)
              }
            />
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