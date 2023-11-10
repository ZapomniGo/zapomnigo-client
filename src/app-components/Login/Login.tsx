import { useState } from "react";


type LoginData = {
    username: string;
    password: string;
}


export const Login = () => {
    const [errors, setErrors] = useState({
        username: false,
        password: false,
      });
      const [userData, setUserData] = useState<LoginData>({
        username: "",
        password: "",
      });

      const formHandler = (event: { target: HTMLFormElement | undefined; preventDefault: () => void; }) => {
        console.log(event.target.value)
        event.preventDefault();
       setUserData((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }

    return (
        <div id="background">
            <div id="wrapper">
                <form onClick={e=>e.preventDefault()} onChange={formHandler} >
                    <center>  <h1>Login</h1> </center>
                    <section>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            minLength={2}
                            maxLength={40}
                            value={userData.username}
                        />
                        <p>{errors.username ? errors.username : ""}</p>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={userData.password}
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
}