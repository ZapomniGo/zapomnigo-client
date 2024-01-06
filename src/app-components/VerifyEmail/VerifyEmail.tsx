//ToDo: Call resend email endpoint and handle responses

import React, { useEffect, useState } from "react";
import instance from "../../app-utils/axios";
import { emailPattern } from "./../Forms/Registration/utils";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const sendEmail = () => {
    if (!emailPattern.test(email)) {
      setMessage("Невалиден имейл");
      return;
    }
    setMessage("Имейлът е изпратен успешно! Проверете пак пощата си.");
    console.log("send email");
  };
  useEffect(() => {
    if (token) {
      instance
        .get("/verify?token=" + token)
        .then((res) => {
          if (res.data.message.includes("has been verified")) {
            setMessage("Успешно потвърдихте имейла си!");
            navigate("/login");
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
    <div className="verify">
      <div className="verifyContainer">
        <h1>Потвърдете имейла си</h1>
        <p>
          Проверете пощата си, би трябвало да сте получили имейл от нас.
          Проверете и спам папката. Ако все пак не сте получили, натиснете
          бутона отдолу
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
  );
};

export default VerifyEmail;
