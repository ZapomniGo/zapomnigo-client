import React, { useState } from "react";
import instance from "../../../app-utils/axios";
import { emailPattern } from "./../Forms/Registration/utils";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const sendEmail = () => {
    if (!emailPattern.test(email)) {
      setMessage("Невалиден имейл");
      return;
    }

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
      </div>
    </div>
  );
};

export default VerifyEmail;
