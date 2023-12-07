import React, { useState } from "react";
import { Background } from "../FormsBackground/Background";
import { LoginData, LoginErrorRecord } from "./types";
import { initialErrors } from "./utils";

type ErrorFieldName = keyof LoginErrorRecord;

const validateForm = (data: LoginData): LoginErrorRecord => {
  return {
    username: {
      hasError: data.username.length < 2,
      message: data.username.length < 2 ? "Please enter a valid username" : "",
    },
    password: {
      hasError: data.password.length === 0,
      message:
        data.password.length === 0 ? "Please enter a valid password" : "",
    },
  };
};

export const Login = () => {
  const [userData, setUserData] = useState<LoginData>({
    username: "",
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
            <p>Login</p>
          </div>
          <section>
            <input
              type="text"
              name="username"
              placeholder="Username"
              minLength={2}
              maxLength={40}
              value={userData.username}
              onChange={formHandler}
              className={errors.username.hasError ? "error" : ""}
            />
            <p className="errorText">
              {errors.username.hasError ? errors.username.message : ""}
            </p>

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={formHandler}
              className={errors.password.hasError ? "error" : ""}
            />
            <p className="errorText">
              {errors.password.hasError ? errors.password.message : ""}
            </p>
          </section>
          <div id="buttonWrapper">
            <input type="submit" value={"Submit"} />
          </div>
        </form>
      </div>
    </div>
  );
};
