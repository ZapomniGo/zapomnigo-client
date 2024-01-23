import { FaRegFolderOpen } from "react-icons/fa";
import { TbCards } from "react-icons/tb";
import Dashboard from "../Dashboard/Dashboard";
import Tilty from "react-tilty";

export const Create = () => {
  return (
    <Dashboard>
      <div className="create-section">
        <div className="create-header">
          <div className="create-option">
              <a href="/app/create-set" className="create-set-option">
              <Tilty className="tilty" max={10} glare={true} perspective={500} reverse={true}>
                <div className="option-svg">
                  <TbCards />
                </div>
                <div className="option-title">
                  <h2>Тесте с флашкарти</h2>
                </div>
                </Tilty>
              </a>
            <a href="/app/create-folder" className="create-folder-option">
              <Tilty className="tilty" max={10} glare={true} perspective={500} reverse={true}>
                <div className="option-svg">
                  <FaRegFolderOpen />
                </div>
                <div className="option-title">
                  <h2>Папка</h2>
                </div>
              </Tilty>
            </a>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};
