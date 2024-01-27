//ToDo: Call resend email endpoint and handle responses

import React, { useEffect, useState } from "react";
import instance from "../../app-utils/axios";
import { emailPattern } from "../Forms/Registration/utils";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Background } from "../Forms/FormsBackground/Background";

const ForgetPassword = () => {
  const [message, setMessage] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const handleSubmit = () => {
    if (!token) {
      if (!emailPattern.test(email)) {
        setMessage("Моля, въведете валиден имейл адрес");
        return;
      }
      instance
        .post("/send-email?verification=false", { email: email })
        .then(() => {
          setMessage("Изпратихме ти имейл с линк за промяна на паролата");
        })
        .catch((err) => {
          setMessage("Такъв потребител не съществува :(");
        });
      return;
    }
    if (password1 !== password2) {
      setMessage("Паролите не съвпадат");
      return;
    }
    if (
      typeof password1 === "string" &&
      (password1.length < 8 || password1.length > 40)
    ) {
      setMessage("Паролата трябва да е между 8 и 40 символа");
      return false;
    }
    if (!/[A-Z]/.test(password1)) {
      setMessage("Паролата трябва да съдържа поне една главна буква");
      return false;
    }
    if (!/[a-z]/.test(password1)) {
      setMessage("Паролата трябва да съдържа поне една малка буква");
      return false;
    }
    if (!/\d/.test(password1)) {
      setMessage("Паролата трябва да съдържа поне една цифра");
      return false;
    }
    if (!/[\W_]/.test(password1)) {
      setMessage("Паролата трябва да съдържа поне един специален символ");
      return false;
    }
    instance
      .post("/forgot-password", { new_password: password1, token: token })
      .then((res) => {
        setMessage("Паролата е променена");
        setTimeout(() => {
          navigate("/app/login");
        }, 2000);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Възникна грешка. Опитай по-късно");
        }
      });
  };
  return (
    <div id="backgroundForm">
      <Background />
      <div className="verify">
        {token ? (
          <div className="verifyContainer">
            <p>Оп оп, май е време е да си избереш нова парола</p>
            <input
              onChange={(e) => setPassword1(e.target.value)}
              type="password"
              placeholder="Нова парола"
            />
            <input
              onChange={(e) => setPassword2(e.target.value)}
              type="password"
              placeholder="Повтори новата парола"
            />
            <button onClick={handleSubmit} className="button">
              Промени паролата
            </button>
            {message.length ? <p className="msg">{message}</p> : ""}
          </div>
        ) : (
          <div className="verifyContainer">
            <h1>Забравена парола</h1>
            <p>
              Въведи имейл адреса, с който сте се регистрирал и ние ще ти пратим
              линк
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Имейл"
            />
            <button onClick={handleSubmit} className="button">
              Изпрати
            </button>
            {message.length ? <p className="msg">{message}</p> : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
