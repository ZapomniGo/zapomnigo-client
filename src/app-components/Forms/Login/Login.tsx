import React, { useState } from "react";
import { Background } from "../FormsBackground/Background";
import { LoginData, LoginErrorRecord } from "./types";
import { initialErrors } from "./utils";
import instance from "../../../app-utils/axios";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
>>>>>>> footer
type ErrorFieldName = keyof LoginErrorRecord;

const validateForm = (data: LoginData): LoginErrorRecord => {
  return {
    email_or_username: {
      hasError: data.email_or_username.length < 2,
      message:
        data.email_or_username.length < 2
<<<<<<< HEAD
          ? "Моля, въведете валидно потребителско име"
=======
          ? "Please enter a valid username"
>>>>>>> footer
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
<<<<<<< HEAD
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState("");

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
=======
  const [backendError, setBackendError] = useState("");

  const login = async () => {
    try {
      console.log(userData);
      const response = await instance.post(`/login`, userData, {
        withCredentials: true,
      });
>>>>>>> footer
      if (response.status === 200) {
        window.location.href = "/";
      }
    } catch (error) {
      if (!navigator.onLine) {
<<<<<<< HEAD
        setBackendError("Няма интернет връзка");
      } else if (error.response.status === 404) {
        setBackendError("Хм, грешно потребителско име");
      } else if (error.response.status === 418) {
        window.location.href = "/verify";
      } else if (error.response.status === 401) {
        setBackendError("Грешна парола");
      } else {
        setBackendError("Нещо се обърка, опитайте отново");
=======
        setBackendError("You are currently offline.");
      } else if (error.response.status === 404) {
        setBackendError("Хм, грешно потребителско име");
      }else if (error.response.status === 418) {
        window.location.href = "/verify";
      }else if (error.response.status === 401) {
        setBackendError("Грешна парола");
      } else {
        setBackendError("Something went wrong.");
>>>>>>> footer
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
    navigate("/forgot-password");
  }

  return (
    <div id="backgroundForm">
      <Background />
      <div id="wrapperForm">
        <form onSubmit={handleSubmit}>
          <div className="title">
            <p>Влизане</p>
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
                      <a className="link" onClick={handleForgotPassword}>Забравена парола</a>

            <p className="errorText">
              {errors.password.hasError ? errors.password.message : ""}
            </p>
          </section>
          
          <div className="errorText">{backendError}</div>
          <div id="buttonWrapper">
          <a className="link" onClick={() => navigate("/register")}>Нямам акаунт</a>
            <input type="submit" value={"Влезни"} onClick={login} />
          </div>
        </form>
      </div>
    </div>
  );
};
