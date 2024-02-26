//ToDo: Call resend email endpoint and handle responses

import React, { useEffect, useState } from "react";
import instance from "../../app-utils/axios";
import { emailPattern } from "./../Forms/Registration/utils";
import { useLocation } from "react-router-dom";
import { Background } from "../Forms/FormsBackground/Background";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [lastSent, setLastSent] = useState(localStorage.getItem("lastSent"));
  const sendEmail = () => {
    if (Date.now() - lastSent < 60000) {
      setMessage("Изчакай 1 минута преди да поискаш нов код");
      return;
    }
    if (!emailPattern.test(email)) {
      setMessage("Невалиден имейл");
      return;
    }
    instance
      .post("/send-email?verification=true", { email })
      .then((res) => {
        setMessage("Имейлът е изпратен! Провери пощата си.");
        setLastSent(Date.now());
        localStorage.setItem("lastSent", Date.now().toString());
      })
      .catch((err) => {
        setMessage("Нещо се обърка. Поискайте нов код.");
      });
  };
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/app/");
    }
  }, []);
  useEffect(() => {
    if (token) {
      instance
        .get("/verify?token=" + token)
        .then((res) => {
          if (res.data.message.includes("has been verified")) {
            setMessage("Потвърдихте имейла си!");
            window.location.href = "/app/login";
            toast.success("Имейлът е потвърден!");
          } else {
            setMessage("Грешен код");
          }
        })
        .catch((err) => {
          setMessage("Нещо се обърка. Поискайте нов код.");
        });
    }
  }, [token]);

  const [isInputVisible, setIsInputVisible] = useState(false);

  const showInput = () => {
    setIsInputVisible(!isInputVisible);
  };
  return (
    <div id="backgroundForm">
      <Background />

      <div className="verify">
        <div className="verifyContainer">
          <h1>Потвърди си имейла</h1>
          <p>
            Изпратихме ти имейл за потвърждение. Провери пощата си и натисни
            линка в него. Ако все пак не си получил имейла, можеш да натиснеш
            бутона за повторно изпращане.
          </p>
          {!isInputVisible && (
            <button onClick={showInput} className="no-email">
              Не съм получил имейл
            </button>
          )}
          {isInputVisible && (
            <div className="reset-psw">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Въведи имейл"
              />
              <button
                onClick={sendEmail}
                className={
                  "button " + (Date.now() - lastSent < 60000) && "disabled"
                }
              >
                Изпрати
              </button>
              {message.length ? <p className="msg">{message}</p> : ""}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
