import { useEffect, useState } from "react";

type UserData = {
  name: string;
  username: string;
  password: string;
  repeatPassword: string;
  organisation: string;
  gender: string;
  age: number;
  email: string;
};

export const Registration = () => {
  const [screenIndex, setScreenIndex] = useState<number>(1);
  const [errors, setErrors] = useState({
    name: false,
    username: false,
    password: false,
    repeatPassword: false,
    organisation: false,
    gender: false,
    age: false,
    email: false,
  });
  const [userData, setUserData] = useState<UserData>({
    name: "",
    username: "",
    password: "",
    repeatPassword: "",
    organisation: "",
    gender: "",
    age: 0,
    email: "",
  });

  const formHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    setUserData({
      name: data.get("name") as string,
      username: data.get("username") as string,
      password: data.get("password") as string,
      repeatPassword: data.get("repeatPassword") as string,
      organisation: data.get("organisation") as string,
      gender: data.get("gender") as string,
      age: Number(data.get("age")),
      email: data.get("email") as string,
    });

    console.log(userData);
  };

  const validateData = (data: UserData) => {};
  const nextScreen = () => {
    let errorsExist = false;
    if (screenIndex == 1) {
      if (userData.name.length < 2 || userData.name.length > 40) {
        setErrors((prev) => ({
          ...prev,
          name: "The name field should be 2-40 characters ling",
        }));
        errorsExist = true;
      }else{
        setErrors((prev) => ({
          ...prev,
          name: false,
        }));
        errorsExist = false;
      }
      if (userData.age < 5 || userData.age > 99) {
        setErrors((prev) => ({ ...prev, age: "The age field should be 5-99" }));
        errorsExist = true;
      }else{
        setErrors((prev) => ({
          ...prev,
          age: false,
        }));
        errorsExist = false;

      }
    }
    if (screenIndex == 2) {
      if (userData.username.length < 2 || userData.username.length > 40) {
        setErrors((prev) => ({
          ...prev,
          username: "The username field should be 2-40 characters ling",
        }));
        errorsExist = true;
      }else{
        setErrors((prev) => ({
          ...prev,
          username: false,
        }));
        errorsExist = false;

      }
      if (userData.password.length < 8 || userData.password.length > 40) {
        setErrors((prev) => ({
          ...prev,
          password: "The password field should be 8-40 characters ling",
        }));
        errorsExist = true;
      }else{
        setErrors((prev) => ({
          ...prev,
          password: false,
        }));
        errorsExist = false;

      }
      if (userData.password !== userData.repeatPassword) {
        setErrors((prev) => ({
          ...prev,
          repeatPassword: "The passwords don't match",
        }));
        errorsExist = true;
      }else{
        setErrors((prev) => ({
          ...prev,
          repeatPassword: false,
        }));
        errorsExist = false;

      }
    }
    if (screenIndex == 3) {
      if (
        userData.organisation.length < 2 ||
        userData.organisation.length > 40
      ) {
        setErrors((prev) => ({
          ...prev,
          organisation: "The organisation field should be 2-40 characters ling",
        }));
      }else{
        setErrors((prev) => ({
          ...prev,
          organisation: false,
        }));
        errorsExist = false;

      }

    }
    if (!errorsExist) {
      setScreenIndex((prev) => prev + 1);
    }
  };
  const prevScreen = () => {
    setScreenIndex((prev) => prev - 1);
  };

  return (
    <>
      <form onClick={e=>e.preventDefault()} onChange={formHandler} >
        {screenIndex == 1 ? (
          <section>
            <input
              type="text"
              name="name"
              placeholder="Name"
              minLength={2}
              maxLength={40}
            />
            <p>{errors.name ? errors.name : ""}</p>
            <input
              type="number"
              name="age"
              min={5}
              max={99}
              placeholder="Age"
            />
            <p>{errors.age ? errors.age : ""}</p>
            <select>
              <option selected disabled />
              <option value={"M"}>Male</option>
              <option value={"F"}>Female</option>
              <option value={"O"}>Prefer not to say</option>
            </select>
          </section>
        ) : (
          ""
        )}
        {screenIndex == 2 ? (
          <section>
            <input
              type="text"
              placeholder="Username"
              name="username"
              minLength={2}
              maxLength={40}
            />
            <p>{errors.username ? errors.username : ""}</p>
            <input type="email" placeholder="Email" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength={8}
              maxLength={40}
            />
            <p>{errors.password ? errors.password : ""}</p>
            <input
              type="password"
              placeholder="Repeat Password"
              name="repeatPassword"
              minLength={8}
              maxLength={40}
            />
            <p>{errors.repeatPassword ? errors.repeatPassword : ""}</p>
          </section>
        ) : (
          ""
        )}
        {screenIndex == 3 ? (
          <section>
            <input type="text" name="organisation" placeholder="Organisation" />
          </section>
        ) : (
          ""
        )}
        <div>
          <button onClick={prevScreen}>Previous</button>
          {screenIndex !== 3 ? (
            <button onClick={nextScreen}>Next</button>
          ) : (
            <input type="submit" value={"Submit"} />
          )}
        </div>
      </form>
    </>
  );
};
