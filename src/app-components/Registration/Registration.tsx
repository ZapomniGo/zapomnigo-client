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
  const [screenIndex, setScreenIndex] = useState<number>(0);
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

  const validateData = (data: UserData) => {

  }

  return (
    <>
      <form onSubmit={formHandler}>
        <section>
          <input
            type="text"
            name="name"
            placeholder="Name"
            minLength={2}
            maxLength={40}
          />
          <input type="number" name="age" min={5} max={99} placeholder="Age" />
          <select>
            <option selected disabled />
            <option value={"M"}>Male</option>
            <option value={"F"}>Female</option>
            <option value={"O"}>Prefer not to say</option>
          </select>
        </section>
        <section>
          <input
            type="text"
            placeholder="Username"
            name="username"
            minLength={2}
            maxLength={40}
          />
          <input type="email" placeholder="Email" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength={8}
            maxLength={40}
          />
          <input
            type="password"
            placeholder="Repeat Password"
            name="repeatPassword"
            minLength={8}
            maxLength={40}
          />
        </section>
        <section>
          <input type="text" name="organisation" placeholder="Organisation" />
        </section>
        <div>
          <button>Previous</button>
          {screenIndex !== 3 ? (
            <button>Next</button>
          ) : (
            <input type="submit" value={"Submit"} />
          )}
        </div>
      </form>
    </>
  );
};
