import { useState } from "react";
import Folder from "./types";
import { v4 as uuidv4 } from "uuid";


const useFolders = () => {
    const [folder, setFolder] = useState<Folder[]>([
      { title: "", description: "", folder_id: uuidv4(), catgeory: "", institution: "" },
    ]);
    const handleChangeFolder = (
        field: "term" | "definition",
        value: string
    ) => {
        setFolder((prevFolder) => {
        return prevFolder.map((folder, i) =>
            i === index ? { ...folder, [field]: value } : folder
        );
        });
    };

    return{
        folder,
        handleChangeFolder
    }
}

export { useFolders };
