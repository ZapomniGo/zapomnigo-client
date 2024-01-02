import React, { useState } from "react";
import { Background } from "../FormsBackground/Background";
import { LoginData, LoginErrorRecord } from "./types";
import { initialErrors } from "./utils";
import instance from "../../../app-utils/axios";
type ErrorFieldName = keyof LoginErrorRecord;

const validateForm = (data: LoginData): LoginErrorRecord => {
  return {
    email_or_username: {
      hasError: data.email_or_username.length < 2,
      message:
        data.email_or_username.length < 2
          ? "Моля, въведете валидно потребителско име или имейл"
          : "",
    },
    password: {
      hasError: data.password.length === 0,
      message:
        data.password.length === 0 ? "Моля, въведете валидна парола" : "",
    },
  };
};

export const Login = () => {
  const [backendError, setBackendError] = useState("");

  const login = async () => {
    try {
      console.log(userData);
      const response = await instance.post(`/login`, userData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        window.location.href = "/";
      }
    } catch (error) {
      if (!navigator.onLine) {
        setBackendError("Нямате интернет връзка.");
      } else if (error.response.status === 404) {
        setBackendError("Хм, грешно потребителско име");
      }else if (error.response.status === 418) {
        window.location.href = "/verify";
      }else if (error.response.status === 401) {
        setBackendError("Грешна парола");
      } else {
        setBackendError("Нещо се обърка.");
      }
    }
  };
  const [userData, setUserData] = useState<LoginData>({
    email_or_username: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrorRecord>(initialErrors);

  const formHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const newErrors = validateForm({
      ...userData,
      [name]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: newErrors[name as ErrorFieldName],
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateForm(userData);
    setErrors(newErrors);
  };

  return (
    <div id="backgroundForm">
      <Background />
      <div id="wrapperForm">
        <form onSubmit={handleSubmit}>
          <div className="title">
            <p>Вход</p>
          </div>
          <section>
            <input
              type="text"
              name="email_or_username"
              placeholder="Потребителско име или имейл"
              minLength={2}
              maxLength={40}
              value={userData.email_or_username}
              onChange={formHandler}
              className={errors.email_or_username.hasError ? "error" : ""}
            />
            <p className="errorText">
              {errors.email_or_username.hasError
                ? errors.email_or_username.message
                : ""}
            </p>

            <input
              type="password"
              name="password"
              placeholder="Парола"
              value={userData.password}
              onChange={formHandler}
              className={errors.password.hasError ? "error" : ""}
            />
            <p className="errorText">
              {errors.password.hasError ? errors.password.message : ""}
            </p>
          </section>
          <div className="errorText">{backendError}</div>
          <div id="buttonWrapper">
            <input type="submit" value={"Вход"} onClick={login} />
          </div>
        </form>
      </div>
    </div>
  );
};
