//ToDo: Call resend email endpoint and handle responses

import React, { useEffect, useState } from "react";
import instance from "../../app-utils/axios";
import { emailPattern } from "../Forms/Registration/utils";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [message, setMessage] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  useEffect(() => {
    if (!token) {
      setMessage("Опс, грешен линк. Върнете се назад и си поискайте нов линк");
    }
  }, [token]);
  const handleSubmit = () => {
    if (password1 !== password2) {
      setMessage("Паролите не съвпадат");
      return;
    }
    if (
      typeof password1 === "string" &&
      (password1.length < 8 || password1.length > 40)
    ) {
      setMessage("Паролата трябва да е между 8 и 40 символа");
    } else if (typeof password1 === "string" && !/[A-Z]/.test(password1)) {
      setMessage("Паролата трябва да съдържа поне една главна буква");
    } else if (typeof password1 === "string" && !/[a-z]/.test(password1)) {
      setMessage("Паролата трябва да съдържа поне една малка буква");
    } else if (typeof password1 === "string" && !/\d/.test(password1)) {
      setMessage("Паролата трябва да съдържа поне една цифра");
    } else if (typeof password1 === "string" && !/[\W_]/.test(password1)) {
      setMessage("Паролата трябва да съдържа поне един специален символ");
    }
    // instance
    //   .post("/send-email?verification=true", {"email": "test@test.com"})
    //   .then((res) => {
    //     setMessage("Успешно променихте паролата си");
    //     setTimeout(() => {
    //       navigate("/login");
    //     }, 2000);
    //   })
    //   .catch((err) => {
    //     if (err.response && err.response.data) {
    //       setMessage(err.response.data.message);
    //     } else {
    //       setMessage("Възникна грешка. Моля опитайте по-късно");
    //     }
    //   });
  };
  return (
    <div className="verify">
      <div className="verifyContainer">
        <input
          onChange={(e) => setPassword1(e.target.value)}
          type="text"
          placeholder="Парола"
        />
        <input
          onChange={(e) => setPassword2(e.target.value)}
          type="text"
          placeholder="Повтори паролата"
        />
        <button onClick={handleSubmit} className="button">
          Промени паролата
        </button>
        {message.length ? <p className="msg">{message}</p> : ""}
      </div>
    </div>
  );
};

export default ForgetPassword;
