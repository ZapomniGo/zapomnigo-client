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
                        <div className="option-description">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quaerat amet sunt! Ad soluta quis iste consectetur odio, itaque, dolore nam et voluptates incidunt neque.</p>
                        </div>
                    </a>
                    <a href="/create-folder" className="create-folder-option">
                        <div className="option-svg">
                        <FaRegFolderOpen/>

                        </div>
                        <div className="option-title">
                        <h2>Създай папка</h2>
                        </div>
                        <div className="option-description">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quaerat amet sunt! Ad soluta quis iste consectetur odio, itaque, dolore nam et voluptates incidunt neque.</p>
                        </div>
                    </a>
                </div>

            </div>
        </div>
    )
}