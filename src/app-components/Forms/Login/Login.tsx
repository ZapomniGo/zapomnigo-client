import React, { useState, useEffect } from "react";
import { Background } from "../FormsBackground/Background";
import { LoginData, LoginErrorRecord } from "./types";
import { initialErrors } from "./utils";
import instance from "../../../app-utils/axios";
import { useNavigate } from "react-router-dom";
type ErrorFieldName = keyof LoginErrorRecord;

const validateForm = (data: LoginData): LoginErrorRecord => {
  return {
    email_or_username: {
      hasError: data.email_or_username.length < 2,
      message:
        data.email_or_username.length < 2
          ? "Моля, въведете валидно потребителско име"
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
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("home");
    }
  }, []);

  const login = async () => {
    if (
      userData.email_or_username.length < 2 ||
      userData.email_or_username.length > 40
    ) {
      setBackendError("Моля, въведете валидно потребителско име");
      return;
    }

    if (
      typeof userData.password === "string" &&
      (userData.password.length < 8 || userData.password.length > 40)
    ) {
      setBackendError("Грешна парола");
      return;
    } else if (
      typeof userData.password === "string" &&
      !/[A-Z]/.test(userData.password)
    ) {
      setBackendError("Грешна парола");
      return;
    } else if (
      typeof userData.password === "string" &&
      !/[a-z]/.test(userData.password)
    ) {
      setBackendError("Грешна парола");
      return;
    } else if (
      typeof userData.password === "string" &&
      !/\d/.test(userData.password)
    ) {
      setBackendError("Грешна парола");
      return;
    } else if (
      typeof userData.password === "string" &&
      !/[\W_]/.test(userData.password)
    ) {
      setBackendError("Грешна парола");
      return;
    }
    try {
      const response = await instance.post(`/login`, userData);
      if (response.status === 200) {
        window.location.href = "/app";
      }
    } catch (error) {
      if (!navigator.onLine) {
        setBackendError("Няма интернет връзка");
      } else if (error.response.status === 404) {
        setBackendError("Хм, грешно потребителско име");
      } else if (error.response.status === 418) {
        window.location.href = "verify";
      } else if (error.response.status === 401) {
        setBackendError("Грешна парола");
      } else {
        setBackendError("Нещо се обърка, опитайте отново");
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
  const handleForgotPassword = () => {
    navigate("app/forgot-password");
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
              placeholder="Потребителско име"
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
            <a className="link" onClick={handleForgotPassword}>
              Забравена парола
            </a>

            <p className="errorText">
              {errors.password.hasError ? errors.password.message : ""}
            </p>
          </section>

          <div id="buttonWrapper">
            <a className="link" onClick={() => navigate("/register")}>
              Нямам акаунт
            </a>
            <input type="submit" value={"Вход"} onClick={login} />
          </div>
          <center>
            {" "}
            <div className="errorText">{backendError}</div>
          </center>
        </form>
      </div>
    </div>
  );
};
