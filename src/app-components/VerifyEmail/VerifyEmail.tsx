//ToDo: Call resend email endpoint and handle responses

import React, { useEffect, useState } from "react";
import instance from "../../app-utils/axios";
import { emailPattern } from "./../Forms/Registration/utils";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Background } from "../Forms/FormsBackground/Background";
const VerifyEmail = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("home");
    }
  }, []);
  const sendEmail = () => {
    if (!emailPattern.test(email)) {
      setMessage("Невалиден имейл");
      return;
    }
    // console.log(email);
    instance
      .post("/send-email?verification=false", { email })
      .then((res) => {
        setMessage("Имейлът е изпратен! Проверете пощата си.");
      })
      .catch((err) => {
        setMessage("Нещо се обърка. Поискайте нов код.");
      });
    // setMessage("Имейлът е изпратен успешно! Проверете пак пощата си.");
    console.log("send email");
  };
  useEffect(() => {
    if (token) {
      instance
        .get("/verify?token=" + token)
        .then((res) => {
          if (res.data.message.includes("has been verified")) {
            setMessage("Потвърдихте имейла си!");
            window.location.href = "login";
          } else {
            setMessage("Грешен код");
          }
        })
        .catch((err) => {
          setMessage("Нещо се обърка. Поискайте нов код.");
        });
    }
  }, [token]);
  return (
      <div id="backgroundForm">
        <Background />

        <div className="verify">
          <div className="verifyContainer">
            <h1>Потвърди си имейла</h1>
            <p>
              Изпратихме ти имейл за потвърждение. Провери пощата си и натисни
              линка в него. Ако все пак не си получил имейла, можеш да поискаш
              нов като си въведеш имейла по-долу и натиснеш бутона.
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Имейл"
            />
            <button onClick={sendEmail} className="button">
              Изпрати отново
            </button>
            {message.length ? <p className="msg">{message}</p> : ""}
          </div>
        </div>
      </div>
  );
};

export default VerifyEmail;
