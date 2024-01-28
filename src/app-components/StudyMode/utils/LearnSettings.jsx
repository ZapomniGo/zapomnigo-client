import React, { useState } from "react";
import { TbSettings } from "react-icons/tb";

const LearnSettings = (props) => {
  const [toggleOpen, setToggleOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setToggleOpen((prev) => !prev)}><TbSettings/></div>
      {toggleOpen && (
        <div>
          <h3>Настройки на режим учи</h3>
          <p>Избираем отговор</p>
          {!props.allowedModes.length && <b>Избери поне един режим :)</b>}

          <p>
            Това е режим с четири избираеми отговора, един, от които е верен
          </p>
          <input
            type="checkbox"
            id="switch1"
            checked={props.allowedModes.includes(1)}
            onChange={() =>
              props.setAllowedModes((prev) =>
                prev.includes(1)
                  ? prev.filter((mode) => mode !== 1)
                  : [...prev, 1]
              )
            }
          /><label for="switch1"></label>
          <p>Свободен отговор</p>
          <p>Това е режим със свободен отговор</p>
          <input
            type="checkbox"
            id="switch2"
            checked={props.allowedModes.includes(2)}
            onChange={() =>
              props.setAllowedModes((prev) =>
                prev.includes(2)
                  ? prev.filter((mode) => mode !== 2)
                  : [...prev, 2]
              )
            }
          /><label for="switch2"></label>
          <p>Самоизпитване</p>
          <p>
            Това е режим, в който платформата те пита дали знаеш
            термина/дефиницията
          </p>
          <input
            type="checkbox"
            id="switch3"
            checked={props.allowedModes.includes(3)}
            onChange={() =>
              props.setAllowedModes((prev) =>
                prev.includes(3)
                  ? prev.filter((mode) => mode !== 3)
                  : [...prev, 3]
              )
            }
          /> <label for="switch3"></label>
        </div>
      )}
    </div>
  );
};

export default LearnSettings;
