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
    age: "",
    email: "",
  });

  const formHandler = (event: { target: HTMLFormElement | undefined; preventDefault: () => void; }) => {
    console.log(event.target.value)
    event.preventDefault();
   setUserData((prev) => ({
    ...prev,
    [event.target.name]: event.target.value,
  }));

    console.log(userData);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateData = (data: UserData) => {};
  const nextScreen = () => {
    let newErrors = { ...errors }
    let errorsExist = false
    
    if (screenIndex === 1) {
      if (userData.name.length < 2 || userData.name.length > 40) {
        newErrors.name =  "The name field should be 2-40 characters long";
        errorsExist = true;
      } else {
        newErrors.name = false;
      }
      
      if (userData.age < 5 || userData.age > 99) {
        newErrors.age = "The age field should be 5-99";
        errorsExist = true;
      } else {
        newErrors.age = false;
      }
    }
  
    if (screenIndex === 2) {
      if (userData.username.length < 2 || userData.username.length > 40) {
        newErrors.username = "The username field should be 2-40 characters long";
        errorsExist = true;
      } else {
        newErrors.username = false;
      }
      
      if (userData.password.length < 8 || userData.password.length > 40) {
        newErrors.password = "The password field should be 8-40 characters long";
        errorsExist = true;
      } else {
        newErrors.password = false;
      }
  
      if (userData.password !== userData.repeatPassword) {
        newErrors.repeatPassword = "The passwords don't match";
        errorsExist = true;
      } else {
        newErrors.repeatPassword = false;
      }
      if (userData.email.length < 2 || userData.email.length > 40 || !validateEmail(userData.email))  {
        newErrors.email = "The email field should be 2-40 characters long";
        errorsExist = true;
      } else {
        newErrors.email = false;
      }
      
    }
  
    if (screenIndex === 3) {
      if (userData.organisation.length < 2 || userData.organisation.length > 40) {
        newErrors.organisation = "The organisation field should be 2-40 characters long";
        errorsExist = true;
      } else {
        newErrors.organisation = false;
      }
    }
    
    setErrors(newErrors);
    
    if (!errorsExist) {
      setScreenIndex((prev) => prev + 1);
    }
  }
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
              value={userData.name}
            />
            <p>{errors.name ? errors.name : ""}</p>
            <input
              type="number"
              name="age"
              min={5}
              max={99}
              placeholder="Age"
              value={userData.age}
            />
            <p>{errors.age ? errors.age : ""}</p>
            <select defaultValue={userData.gender} name="gender">
              <option value="" disabled />
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
              value={userData.username}
            />
            <p>{errors.username ? errors.username : ""}</p>
            <input value={userData.email} type="email" placeholder="Email" name="email" />
            <p>{errors.email ? errors.email : ""}</p>
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength={8}
              maxLength={40}
              value={userData.password}
            />
            <p>{errors.password ? errors.password : ""}</p>
            <input
              type="password"
              placeholder="Repeat Password"
              name="repeatPassword"
              minLength={8}
              maxLength={40}
              value={userData.repeatPassword}
            />
            <p>{errors.repeatPassword ? errors.repeatPassword : ""}</p>
          </section>
        ) : (
          ""
        )}
        {screenIndex == 3 ? (
          <section>
            <input type="text" name="organisation" placeholder="Organisation" value={userData.organisation}/>
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
