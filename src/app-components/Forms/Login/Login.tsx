import React, { useState, useEffect } from "react";
import { Background } from "../FormsBackground/Background";
import { LoginData, LoginErrorRecord } from "./types";
import { initialErrors } from "./utils";

export const Login = () => {
  // const [errors, setErrors] = useState({
  //   username: "",
  //   password: "",
  // });

  const [errors, setErrors] = useState<LoginErrorRecord>(initialErrors);

  const [userData, setUserData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const formHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    const newErrors: { username: string; password: string } = { ...errors }; // TODO(): What is this newErrors? Why does it set the username to something? FIX
    if (userData.username.length < 2) {
      newErrors.username = "Please enter a valid username";
    } else {
      newErrors.username = "";
    }

    if (userData.password.length === 0) {
      newErrors.password = "Please enter a valid password";
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
  }, [userData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = { ...errors };
    if (userData.username.length < 2) {
      newErrors.username = {
        hasError: true,
        message: "Please enter valid username",
      };
    }

    if (userData.password.length === 0) {
      newErrors.password = {
        hasError: true,
        message: "Please enter valid password",
      };
    }

    setErrors(newErrors);
  };

  // TODO(): Extract to different components
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
