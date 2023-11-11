import React, { useState } from "react";

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

      <div className="spacer top-left-1">
        <svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(9.62908843583125 -5.201989181921277)"><path d="M202.7 -204C259.7 -145.7 300.8 -72.8 299.2 -1.6C297.5 69.5 253.1 139.1 196.1 201.6C139.1 264.1 69.5 319.5 1.6 317.9C-66.3 316.3 -132.6 257.6 -194.4 195.1C-256.3 132.6 -313.6 66.3 -318.2 -4.6C-322.8 -75.4 -274.5 -150.8 -212.7 -209.2C-150.8 -267.5 -75.4 -308.8 -1.3 -307.5C72.8 -306.2 145.7 -262.3 202.7 -204" fill="#ff4e00"></path></g></svg>
      </div>

      <div className="spacer top-left-2">
        <svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(32.102989946671826 1.7334903620054831)"><path d="M141.5 -146.2C170.3 -112.7 171.7 -56.3 161.2 -10.5C150.7 35.4 128.4 70.7 99.5 105.5C70.7 140.4 35.4 174.7 -15.4 190.1C-66.2 205.6 -132.5 202.1 -173.1 167.3C-213.8 132.5 -228.9 66.2 -231.1 -2.2C-233.4 -70.7 -222.8 -141.4 -182.1 -174.9C-141.4 -208.4 -70.7 -204.7 -7.2 -197.5C56.3 -190.3 112.7 -179.7 141.5 -146.2" fill="#ec9f05"></path></g></svg>
      </div>

      <div className="spacer top-right">
        <svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(905.7914520334709 3.2732034807657158)"><path d="M179.4 -170.2C222.6 -136.2 240.8 -68.1 233.9 -6.8C227.1 54.4 195.2 108.9 152.1 140.1C108.9 171.4 54.4 179.5 -8.1 187.6C-70.7 195.7 -141.4 203.9 -186.8 172.7C-232.1 141.4 -252 70.7 -245.8 6.2C-239.6 -58.2 -207.1 -116.4 -161.8 -150.4C-116.4 -184.4 -58.2 -194.2 4.9 -199.2C68.1 -204.1 136.2 -204.2 179.4 -170.2" fill="#ff4e00"></path></g></svg>       
      </div>

      <div className="spacer bottom-left">
        <svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(-39.69502797840494 577.282303311789)"><path d="M273.1 -252.3C360.6 -185.6 442.8 -92.8 454.3 11.5C465.7 115.7 406.5 231.5 319 308.1C231.5 384.8 115.7 422.4 5.8 416.6C-104.2 410.8 -208.4 361.7 -275.2 285C-342 208.4 -371.5 104.2 -375.8 -4.2C-380 -112.7 -359 -225.3 -292.2 -292C-225.3 -358.7 -112.7 -379.3 -9.9 -369.4C92.8 -359.5 185.6 -319 273.1 -252.3" fill="#ff4e00"></path></g></svg>      
      </div>
  
      <div className="spacer bottom-right">
        <svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(892.3250066099987 586.5662612244475)"><path d="M136.6 -140.6C177.9 -95.2 212.9 -47.6 211.2 -1.7C209.5 44.2 171.1 88.4 129.7 138.4C88.4 188.4 44.2 244.2 -10.8 255C-65.8 265.8 -131.5 231.5 -165 181.5C-198.5 131.5 -199.8 65.8 -191.9 7.9C-184 -50 -166.9 -99.9 -133.4 -145.3C-99.9 -190.6 -50 -231.3 -1.2 -230.1C47.6 -228.9 95.2 -185.9 136.6 -140.6" fill="#ec9f05"></path></g></svg>
      </div>

      <div id="wrapperForm">
        <form onSubmit={handleSubmit}>
          <div className="title">
              <p>Registration</p>
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
