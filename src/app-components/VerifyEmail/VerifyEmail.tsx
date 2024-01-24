//ToDo: Call resend email endpoint and handle responses

import React, { useEffect, useState } from "react";
import instance from "../../app-utils/axios";
import { emailPattern } from "./../Forms/Registration/utils";
import { useLocation } from "react-router-dom";
import { Background } from "../Forms/FormsBackground/Background";
import { toast } from "react-toastify";
const VerifyEmail = () => {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = () => {
    if (!emailPattern.test(email)) {
      setMessage("Невалиден имейл");
      return;
    }
    instance
      .post("/send-email?verification=false", { email })
      .then((res) => {
        setMessage("Имейлът е изпратен! Проверете пощата си.");
      })
      .catch((err) => {
        setMessage("Нещо се обърка. Поискайте нов код.");
      });
  };
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
  return (
    <div id="backgroundForm">
      <Background />

      <div className="verify">
        <div className="verifyContainer">
          <h1>Потвърди си имейла</h1>
          <p>
            Изпратихме ти имейл за потвърждение. Провери пощата си и натисни
            линка в него. Ако все пак не си получил имейла, можеш да поискаш нов
            като си въведеш имейла по-долу и натиснеш бутона.
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
