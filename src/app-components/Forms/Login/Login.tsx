import React, { useState, useEffect } from "react";
import { Background } from "../FormsBackground/Background";
import { LoginData, LoginErrorRecord } from "./types";
import { initialErrors } from "./utils";

export const Login = () => {
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
    if (Object.values(errors).some(error => error.message !== "")) {
      console.log("Form submitted");
    }
  }, [errors]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({
      username: userData.username.length < 2 ? { hasError: true, message: "Please enter a valid username" } : { hasError: false, message: "" },
      password: userData.password.length === 0 ? { hasError: true, message: "Please enter a valid password" } : { hasError: false, message: "" },
    });
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
