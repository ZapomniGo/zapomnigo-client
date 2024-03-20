import React, { useEffect, useState } from "react";
import { TbSettings } from "react-icons/tb";
// import { RxCross1 } from "react-icons/rx";

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

  //set toggleOpen to false when the user clicks outside the settings menu
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.closest(".settings-study")) {
        return;
      } else {
        setToggleOpen(false);
      }
    });
  }, []);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    localStorage.setItem(name, checked);
    console.log(name, checked);
  };

  useEffect(() => {
    let modes = [];
    let cat = new Boolean();
    if (props.problematicCategories.includes(props.category)) {
      cat = false;
    } else {
      cat = true;
    }
    if (localStorage.getItem("mutipleChoice") === "true" && cat) {
      modes.push(1);
    }
    if (localStorage.getItem("freeAnswer") === "true") {
      modes.push(2);
    }
    if (localStorage.getItem("selfTest") === "true") {
      modes.push(3);
    }
    if (localStorage.getItem("trueFalse") === "true") {
      modes.push(4);
    }
    if (modes.length === 0) {
      modes.push(1, 2, 3, 4);
      localStorage.setItem("mutipleChoice", "true");
      localStorage.setItem("freeAnswer", "true");
      localStorage.setItem("selfTest", "true");
      localStorage.setItem("trueFalse", "true");
    }
    props.setAllowedModes(modes);
    // setTimeout(() => {
    //   props.GeneratePrompt(undefined, false);
    // }, 2000);
  }, []);

  useEffect(() => {
    console.log(props.allowedModes);
  }, [props]);

  return (
    <div className="settings-study">
      {isMsgShown && (
        <div
          className="msg-box"
          onClick={() => {
            setToggleOpen(true);
            handleClose();
          }}
        >
          <p>Натисни ме, за да избереш режим на учене</p>
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
              name="mutipleChoice"
              checked={props.allowedModes.includes(1)}
              onChange={() => {
                props.setAllowedModes((prev) =>
                  prev.includes(1)
                    ? prev.filter((mode) => mode !== 1)
                    : [...prev, 1]
                );
                handleChange(event);
              }}
            />
            <label for="switch1"></label>
          </div>

          <p className="title">Свободен отговор:</p>
          <div className="settings-option">
            <span>Това е режим със свободен отговор:</span>
            <input
              type="checkbox"
              id="switch2"
              name="freeAnswer"
              checked={props.allowedModes.includes(2)}
              onChange={() => {
                props.setAllowedModes((prev) =>
                  prev.includes(2)
                    ? prev.filter((mode) => mode !== 2)
                    : [...prev, 2]
                );
                handleChange(event);
              }}
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
                name="selfTest"
                id="switch3"
                checked={props.allowedModes.includes(3)}
                onChange={() => {
                  props.setAllowedModes((prev) =>
                    prev.includes(3)
                      ? prev.filter((mode) => mode !== 3)
                      : [...prev, 3]
                  );
                  handleChange(event);
                }}
              />{" "}
              <label for="switch3"></label>
            </div>
            <p className="title">Вярно/Грешно:</p>

            <div className="settings-option">
              <span>
                Това е режим, в който платформата ти дава термин/дефиниция и
                трябва да отговориш дали е вярна или грешна:
              </span>
              <input
                type="checkbox"
                name="trueFalse"
                id="switch4"
                checked={props.allowedModes.includes(4)}
                onChange={() => {
                  props.setAllowedModes((prev) =>
                    prev.includes(4)
                      ? prev.filter((mode) => mode !== 4)
                      : [...prev, 4]
                  );
                  handleChange(event);
                }}
              />{" "}
              <label for="switch4"></label>
            </div>
            {/* <p className="title">Събери:</p>

            <div className="settings-option">
              <span>
              Това е режим, в който платформата ти дава няколко термина и дефиниции и трябва да ги събереш:
              </span>
              <input
                type="checkbox"
                id="switch5"
                checked={props.allowedModes.includes(5)}
                onChange={() =>
                  props.setAllowedModes((prev) =>
                    prev.includes(5)
                      ? prev.filter((mode) => mode !== 5)
                      : [...prev, 5]
                  )
                }
              />{" "}
              <label for="switch5"></label>
            </div> */}
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
