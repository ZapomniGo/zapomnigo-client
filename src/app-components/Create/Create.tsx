import { FaRegFolderOpen } from "react-icons/fa";
import { TbCards } from "react-icons/tb";


export const Create = () =>{
    return (
        <div className="create-section">
           <div className="create-header">
                <div className="create-title">
                    <h1>Какво искаш да създадеш</h1>
                </div>
                <div className="create-option">
                    <a href="/create-set" className="create-set-option">
                        <div className="option-svg">
                            <TbCards/>
                        </div>
                        <div className="option-title">
                            <h2>Създай сет</h2>
                        </div>
                    </a>
                    <a href="/create-folder" className="create-folder-option">
                        <div className="option-svg">
                        <FaRegFolderOpen/>

                        </div>
                        <div className="option-title">
                        <h2>Създай папка</h2>
                        </div>
                    </a>
                </div>

            </div>
        </div>
    )
}