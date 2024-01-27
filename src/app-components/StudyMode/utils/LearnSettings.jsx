import React, { useState } from "react";

const LearnSettings = (props) => {
  const [toggleOpen, setToggleOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setToggleOpen((prev) => !prev)}>Отвори</div>
      {toggleOpen && (
        <div>
          <h3>Настройки на режим учи</h3>
          <label>Избираем отговор</label>
          {!props.allowedModes.length && <b>Избери поне един режим :)</b>}

          <p>
            Това е режим с четири избираеми отговора, един, от които е верен
          </p>
          <input
            type="checkbox"
            checked={props.allowedModes.includes(1)}
            onChange={() =>
              props.setAllowedModes((prev) =>
                prev.includes(1)
                  ? prev.filter((mode) => mode !== 1)
                  : [...prev, 1]
              )
            }
          />
          <label>Свободен отговор</label>
          <p>Това е режим със свободен отговор</p>
          <input
            type="checkbox"
            checked={props.allowedModes.includes(2)}
            onChange={() =>
              props.setAllowedModes((prev) =>
                prev.includes(2)
                  ? prev.filter((mode) => mode !== 2)
                  : [...prev, 2]
              )
            }
          />
          <label>Самоизпитване</label>
          <p>
            Това е режим, в който платформата те пита дали знаеш
            термина/дефиницията
          </p>
          <input
            type="checkbox"
            checked={props.allowedModes.includes(3)}
            onChange={() =>
              props.setAllowedModes((prev) =>
                prev.includes(3)
                  ? prev.filter((mode) => mode !== 3)
                  : [...prev, 3]
              )
            }
          />
        </div>
      )}
    </div>
  );
};

export default LearnSettings;
