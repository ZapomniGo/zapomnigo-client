import React, { useState } from "react";
import instance from "../../../app-utils/axios";
import { emailPattern } from "./../Forms/Registration/utils";
import { useParams } from "react-router-dom";
const VerifyEmail = () => {
  const { id } = useParams();
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
