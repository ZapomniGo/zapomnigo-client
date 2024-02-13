import React, { useEffect, useState } from "react";
import { TbSettings } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";

const LearnSettings = (props) => {
  const [toggleOpen, setToggleOpen] = useState(false);
  const [isMsgShown, setIsMsgShown] = useState(true);

  const handleClose = () => {
    setIsMsgShown(false);
    localStorage.setItem("settingsMsg", "true");
  };

  useEffect(() => {
    const isMsgShown = localStorage.getItem("settingsMsg");
    if (isMsgShown) {
      setIsMsgShown(false);
    }
  }, []);

  return (
    <div className="settings-study">
      {isMsgShown && (
        <div className="msg-box" onClick={handleClose}>
          <p>Избери режими на учене</p>
          <RxCross1 />
        </div>
      )}

      {toggleOpen && (
        <div className="settings-menu">
          <h3>Настройки на режим учи</h3>
          {!props.allowedModes.length && <b>Избери поне един режим :)</b>}
          <p className="title">Избираем отговор:</p>
          <div className="settings-option">
            <span>
              Това е режим с няколко избираеми отговора, един, от които е верен:
            </span>
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
            />
            <label for="switch1"></label>
          </div>

          <p className="title">Свободен отговор:</p>
          <div className="settings-option">
            <span>Това е режим със свободен отговор:</span>
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
            />
            <label for="switch2"></label>
          </div>
          <p className="title">Самоизпитване:</p>

          <div>
            <div className="settings-option">
              <span>
                Това е режим, в който платформата те пита дали знаеш
                термина/дефиницията:
              </span>
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
              />{" "}
              <label for="switch3"></label>
            </div>
            <div>
              <p className="title">Вярно/Грешно:</p>
              <div className="settings-option">
                <span>
                  Това е режим, в който платформата ти дава термин/дефиниция и
                  трябва да отговориш дали е вярна или грешна:
                </span>
                <input
                  type="checkbox"
                  id="switch4"
                  checked={props.allowedModes.includes(4)}
                  onChange={() =>
                    props.setAllowedModes((prev) =>
                      prev.includes(4)
                        ? prev.filter((mode) => mode !== 4)
                        : [...prev, 4]
                    )
                  }
                />{" "}
              </div>
              <label for="switch4"></label>
            </div>
          </div>
        </div>
      )}
      {toggleOpen ? (
        <div
          onClick={() => {
            setToggleOpen((prev) => !prev);
            handleClose();
          }}
        >
          <TbSettings />
        </div>
      ) : (
        <div
          onClick={() => {
            handleClose(), setToggleOpen((prev) => !prev);
          }}
          className="open"
        >
          <TbSettings />
        </div>
      )}
    </div>
  );
};

export default LearnSettings;
