import { FaRegFolderOpen } from "react-icons/fa";
import { TbCards } from "react-icons/tb";
import Dashboard from "../Dashboard/Dashboard";

export const Create = () =>{
    return (
        <Dashboard>
        <div className="create-section">
           <div className="create-header">
                <div className="create-option">
                    <a href="/create-set" className="create-set-option">
                        <div className="option-svg">
                            <TbCards/>
                        </div>
                        <div className="option-title">
                            <h2>Тесте с флашкарти</h2>
                        </div>
                    </a>
                    <a href="/create-folder" className="create-folder-option">
                        <div className="option-svg">
                        <FaRegFolderOpen/>

                        </div>
                        <div className="option-title">
                        <h2>Папка</h2>
                        </div>
                     
                    </a>
                </div>
            </div>
        </div>
        </Dashboard>
    )
}