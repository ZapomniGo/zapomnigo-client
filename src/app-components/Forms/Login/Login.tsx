import React, { useState } from "react";
import { Background } from "../FormsBackground/Background";
import { LoginData, LoginErrorRecord } from "./types";
import { initialErrors } from "./utils";
import axios from "axios"
type ErrorFieldName = keyof LoginErrorRecord;
import { url } from "../../../Global";


const validateForm = (data: LoginData): LoginErrorRecord => {
  return {
    email_or_username: {
      hasError: data.email_or_username.length < 2,
      message: data.email_or_username.length < 2 ? "Please enter a valid username" : "",
    },
    password: {
      hasError: data.password.length === 0,
      message:
        data.password.length === 0 ? "Please enter a valid password" : "",
    },
  };
};

export const Login = () => {

  const login = async () => {
    try{
        console.log(userData);
        const response = await axios.post(`${url}/v1/login`, userData, {
      withCredentials: true,
    })
    if (response.status === 200) {
      window.location.href = "/";
    } 
      console.log(response);
      }
      catch(error){
        console.log(error)
      }
  }
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
            <p>Login</p>
          </div>
          <section>
            <input
              type="text"
              name="email_or_username"
              placeholder="Username"
              minLength={2}
              maxLength={40}
              value={userData.email_or_username}
              onChange={formHandler}
              className={errors.email_or_username.hasError ? "error" : ""}
            />
            <p className="errorText">
              {errors.email_or_username.hasError ? errors.email_or_username.message : ""}
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
            <input type="submit" value={"Submit"} onClick={login}/>
          </div>
        </form>
      </div>
    </div>
  );
};
