import React, { useState } from "react";
import { Background } from "../FormsBackground/Background";

type LoginData = {
  username: string;
  password: string;
};

interface ErrorInfo {
  hasError: boolean;
  message: string;
}

const initialErrors: Record<keyof LoginData, ErrorInfo> = {
  username: { hasError: false, message: '' },
  password: { hasError: false, message: '' },
};

export const Login = () => {
  // const [errors, setErrors] = useState({
  //   username: "",
  //   password: "",
  // });

  const [errors, setErrors] = useState<Record<keyof LoginData, ErrorInfo>>(initialErrors);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = { ...errors };
    if (userData.username.length < 2) {
      newErrors.username = { hasError: true, message: 'Please enter valid username' };
    } 

    if (userData.password.length === 0) {
      newErrors.password = { hasError: true, message: 'Please enter valid password' };
    } 

    setErrors(newErrors);
  };

  return (
    <div id="backgroundForm">

    <Background/>

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
            <p className="errorText">{errors.username.hasError ? errors.username.message : ''}</p>

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={formHandler}
              className={errors.password.hasError ? "error" : ""}
            />
            <p className="errorText">{errors.password.hasError ? errors.password.message : ''}</p>
          </section>
          <div id="buttonWrapper">
            <input type="submit" value={"Submit"} />
          </div>
        </form>
      </div>
    </div>
  );
};
