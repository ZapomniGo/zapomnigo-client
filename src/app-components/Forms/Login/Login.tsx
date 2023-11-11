import React, { useState } from "react";
import { Background } from "../FormsBackground/Background";

type LoginData = {
  username: string;
  password: string;
};

export const Login = () => {
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
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

    const newErrors: any = { ...errors };
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
              className={errors.username ? "error" : ""}
            />
            <p>{errors.username ? errors.username : ""}</p>

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={formHandler}
              className={errors.password ? "error" : ""}
            />
            <p>{errors.password ? errors.password : ""}</p>
          </section>
          <div id="buttonWrapper">
            <input type="submit" value={"Submit"} />
          </div>
        </form>
      </div>
    </div>
  );
};
