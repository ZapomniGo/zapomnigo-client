import { SetStateAction, useState } from "react";
import { Stepper } from 'react-form-stepper';


interface ErrorInfo {
  hasError: boolean;
  message: string;
}

type UserData = {
  name: string;
  username: string;
  password: string;
  repeatPassword: string;
  organisation: string;
  gender: string;
  age: number | null;
  email: string;
};

const initialErrors: Record<keyof UserData, ErrorInfo> = {
  name: { hasError: false, message: '' },
  username: { hasError: false, message: '' },
  password: { hasError: false, message: '' },
  repeatPassword: { hasError: false, message: '' },
  organisation: { hasError: false, message: '' },
  gender: { hasError: false, message: '' },
  age: { hasError: false, message: '' },
  email: { hasError: false, message: '' },
};

export const Registration = () => {
  const [screenIndex, setScreenIndex] = useState<number>(1);
  const [errors, setErrors] = useState<Record<keyof UserData, ErrorInfo>>(initialErrors);
  const [userData, setUserData] = useState<UserData>({
      name: '',
      username: '',
      password: '',
      repeatPassword: '',
      organisation: '',
      gender: '',
      age: null,
      email: '',
  });

  const validateEmail = (email: string) => {
      return String(email)
          .toLowerCase()
          .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
  };

  const validateField = (field: keyof UserData, value: string | number) => {
      if (!value) {
          setErrors(prev => ({
              ...prev,
              [field]: { hasError: false, message: '' },
          }));
          return;
      }

      let errorInfo: ErrorInfo = { hasError: false, message: '' };

      switch (field) {
          case 'name':
              if (typeof value === 'string' && (value.length < 2 || value.length > 40)) {
                  errorInfo = { hasError: true, message: 'The name field should be 2-40 characters long' };
              }
              break;
          case 'age':
              if (typeof value === 'number' && (value < 5 || value > 99)) {
                  errorInfo = { hasError: true, message: 'The age field should be 5-99' };
              }
              break;
          case 'username':
              if (typeof value === 'string' && (value.length < 2 || value.length > 40)) {
                  errorInfo = { hasError: true, message: 'The username field should be 2-40 characters long' };
              }
              break;
          case 'password':
              if (typeof value === 'string' && (value.length < 8 || value.length > 40)) {
                  errorInfo = { hasError: true, message: 'The password field should be 8 - 40 characters long' };
              } else if (typeof value === 'string' && !/[A-Z]/.test(value)) {
                  errorInfo = { hasError: true, message: 'Password must contain at least one capital letter' };
              } else if (typeof value === 'string' && !/[a-z]/.test(value)) {
                  errorInfo = { hasError: true, message: 'Password must contain at least one lowercase letter' };
              } //... continue with other conditions for password
              break;
          case 'repeatPassword':
              if (typeof value === 'string' && value !== userData.password) {
                  errorInfo = { hasError: true, message: 'The passwords don\'t match' };
              }
              break;
          case 'email':
              if (typeof value === 'string' && (value.length < 2 || value.length > 40 || !validateEmail(value))) {
                  errorInfo = { hasError: true, message: 'The email field should be a valid email' };
              }
              break;
          case 'organisation':
              if (typeof value === 'string' && (value.length < 2 || value.length > 40)) {
                  errorInfo = { hasError: true, message: 'The organisation field should be 2-40 characters long' };
              }
              break;
          default:
              break;
      }

      setErrors(prev => ({
          ...prev,
          [field]: errorInfo,
      }));
  };

  const formHandler = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const { name, value } = event.target as HTMLInputElement;
      setUserData(prev => ({
          ...prev,
          [name]: name === 'age' ? parseInt(value, 10) : value,
      }));
      validateField(name as keyof UserData, name === 'age' ? parseInt(value, 10) : value);
  };

  const nextScreen = () => {
    const newErrors = { ...errors };
    let errorsExist = false;

    if (screenIndex === 1) {
        if (userData.name.length < 2 || userData.name.length > 40) {
            newErrors.name = { hasError: true, message: 'The name field should be 2-40 characters long' };
            errorsExist = true;
        } else {
            newErrors.name = { hasError: false, message: '' };
        }
        
        if (userData.age !== null) {
          if (userData.age < 5 || userData.age > 99) {
            newErrors.age = { hasError: true, message: 'The age field should be 5-99' };
            errorsExist = true;
        } else {
            newErrors.age = { hasError: false, message: '' };
        }
        }


    }

    if (screenIndex === 2) {
        if (userData.username.length < 2 || userData.username.length > 40) {
            newErrors.username = { hasError: true, message: 'The username field should be 2-40 characters long' };
            errorsExist = true;
        } else {
            newErrors.username = { hasError: false, message: '' };
        }

        if (userData.password.length < 8 || userData.password.length > 40) {
            newErrors.password = { hasError: true, message: 'The password field should be 8 - 40 characters long' };
            errorsExist = true;
        } else if (!/[A-Z]/.test(userData.password)) {
            newErrors.password = { hasError: true, message: 'Password must contain at least one capital letter' };
            errorsExist = true;
        } else if (!/[a-z]/.test(userData.password)) {
            newErrors.password = { hasError: true, message: 'Password must contain at least one lowercase letter' };
            errorsExist = true;
        } else if (!/\d/.test(userData.password)) {
            newErrors.password = { hasError: true, message: 'Password must contain at least one number' };
            errorsExist = true;
        } else if (!/[\W_]/.test(userData.password)) {
            newErrors.password = { hasError: true, message: 'Password must contain at least one special symbol' };
            errorsExist = true;
        } else {
            newErrors.password = { hasError: false, message: '' };
        }

        if (userData.password !== userData.repeatPassword) {
            newErrors.repeatPassword = { hasError: true, message: "The passwords don't match" };
            errorsExist = true;
        } else {
            newErrors.repeatPassword = { hasError: false, message: '' };
        }

        if (userData.email.length < 2 || userData.email.length > 40 || !validateEmail(userData.email)) {
            newErrors.email = { hasError: true, message: 'The email field should be 2-40 characters long' };
            errorsExist = true;
        } else {
            newErrors.email = { hasError: false, message: '' };
        }
    }

    if (screenIndex === 3) {
        if (userData.organisation.length < 2 || userData.organisation.length > 40) {
            newErrors.organisation = { hasError: true, message: 'The organisation field should be 2-40 characters long' };
            errorsExist = true;
        } else {
            newErrors.organisation = { hasError: false, message: '' };
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

  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedValue(event.target.value);
  };


  return (
    <div id="backgroundForm">
      
      <div className="spacer top-left-1">
        <svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(9.62908843583125 -5.201989181921277)"><path d="M202.7 -204C259.7 -145.7 300.8 -72.8 299.2 -1.6C297.5 69.5 253.1 139.1 196.1 201.6C139.1 264.1 69.5 319.5 1.6 317.9C-66.3 316.3 -132.6 257.6 -194.4 195.1C-256.3 132.6 -313.6 66.3 -318.2 -4.6C-322.8 -75.4 -274.5 -150.8 -212.7 -209.2C-150.8 -267.5 -75.4 -308.8 -1.3 -307.5C72.8 -306.2 145.7 -262.3 202.7 -204" fill="#ff4e00"></path></g></svg>
      </div>

      <div className="spacer top-left-2">
        <svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(32.102989946671826 1.7334903620054831)"><path d="M141.5 -146.2C170.3 -112.7 171.7 -56.3 161.2 -10.5C150.7 35.4 128.4 70.7 99.5 105.5C70.7 140.4 35.4 174.7 -15.4 190.1C-66.2 205.6 -132.5 202.1 -173.1 167.3C-213.8 132.5 -228.9 66.2 -231.1 -2.2C-233.4 -70.7 -222.8 -141.4 -182.1 -174.9C-141.4 -208.4 -70.7 -204.7 -7.2 -197.5C56.3 -190.3 112.7 -179.7 141.5 -146.2" fill="#ec9f05"></path></g></svg>
      </div>

      <div className="spacer top-right">
        <svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(905.7914520334709 3.2732034807657158)"><path d="M179.4 -170.2C222.6 -136.2 240.8 -68.1 233.9 -6.8C227.1 54.4 195.2 108.9 152.1 140.1C108.9 171.4 54.4 179.5 -8.1 187.6C-70.7 195.7 -141.4 203.9 -186.8 172.7C-232.1 141.4 -252 70.7 -245.8 6.2C-239.6 -58.2 -207.1 -116.4 -161.8 -150.4C-116.4 -184.4 -58.2 -194.2 4.9 -199.2C68.1 -204.1 136.2 -204.2 179.4 -170.2" fill="#ff4e00"></path></g></svg>       
      </div>

      <div className="spacer bottom-left">
        <svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(-39.69502797840494 577.282303311789)"><path d="M273.1 -252.3C360.6 -185.6 442.8 -92.8 454.3 11.5C465.7 115.7 406.5 231.5 319 308.1C231.5 384.8 115.7 422.4 5.8 416.6C-104.2 410.8 -208.4 361.7 -275.2 285C-342 208.4 -371.5 104.2 -375.8 -4.2C-380 -112.7 -359 -225.3 -292.2 -292C-225.3 -358.7 -112.7 -379.3 -9.9 -369.4C92.8 -359.5 185.6 -319 273.1 -252.3" fill="#ff4e00"></path></g></svg>      
      </div>
  
      <div className="spacer bottom-right">
        <svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(892.3250066099987 586.5662612244475)"><path d="M136.6 -140.6C177.9 -95.2 212.9 -47.6 211.2 -1.7C209.5 44.2 171.1 88.4 129.7 138.4C88.4 188.4 44.2 244.2 -10.8 255C-65.8 265.8 -131.5 231.5 -165 181.5C-198.5 131.5 -199.8 65.8 -191.9 7.9C-184 -50 -166.9 -99.9 -133.4 -145.3C-99.9 -190.6 -50 -231.3 -1.2 -230.1C47.6 -228.9 95.2 -185.9 136.6 -140.6" fill="#ec9f05"></path></g></svg>
      </div>

      <div id="wrapperForm">    
        <form onClick={e=>e.preventDefault()} onChange={formHandler} >
        
        <div className="title">
            <p>Registration</p>
        </div>

        <div className="stepper">
          <Stepper
              steps={[{}, {}, {}]}
              activeStep={screenIndex-1}
            />
        </div>
          {screenIndex == 1 ? (
            <section>
              <input
                type="text"
                name="name"
                placeholder="Name"
                minLength={2}
                maxLength={40}
                value={userData.name}
                className={errors.name.hasError ? "error" : ""}
                onChange={(e)=>validateField('name', e.target.value)}
              />
              <p className="errorText">{errors.name.hasError ? errors.name.message : ''}</p>
              <input
                  type="number"
                  name="age"
                  min={5}
                  max={99}
                  placeholder="Age"
                  value={userData.age !== null ? userData.age : ''}
                  className={errors.age.hasError ? 'error' : ''}
                  onChange={(e) => validateField('age', e.target.value)}
              />
              <p className="errorText">{errors.age.hasError ? errors.age.message : ''}</p>
              <select
                value={selectedValue}
                onChange={handleChange}
                className={selectedValue === '' ? 'disabled' : ''}
              >
                <option value="" disabled>Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Prefer not to say</option>
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
                className={errors.username.hasError ? "error" : ""}
              />
              <p className="errorText">{errors.username.hasError ? errors.username.message : ''}</p>
              <input 
                value={userData.email} 
                type="email" 
                placeholder="Email" 
                name="email" 
                className={errors.email.hasError ? "error" : ""}
                onChange={(e)=>validateField('email', e.target.value)}
              />
              <p className="errorText">{errors.email.hasError ? errors.email.message : ''}</p>
              <input
                type="password"
                placeholder="Password"
                name="password"
                minLength={8}
                maxLength={40}
                value={userData.password}
                className={errors.password.hasError ? "error" : ""}
                onChange={e=>validateField('password', e.target.value)}

              />
              <p className="errorText">{errors.password.hasError ? errors.password.message : ''}</p>
              <input
                type="password"
                placeholder="Repeat Password"
                name="repeatPassword"
                minLength={8}
                maxLength={40}
                value={userData.repeatPassword}
                className={errors.repeatPassword.hasError ? "error" : ""}
                onChange={e=>validateField('repeatPassword', e.target.value)}
              />
              <p className="errorText">{errors.repeatPassword.hasError ? errors.repeatPassword.message : ''}</p>
            </section>
          ) : (
            ""
          )}
          {screenIndex == 3 ? (
            <section>
              <p>If you are part of a school/university/language center or other, enter its name below</p>
              <input type="text" name="organisation" placeholder="Organisation" value={userData.organisation}/>
            </section>
          ) : (
            ""
          )}
          <div id="buttonWrapper">
            {screenIndex !== 1 ? (
              <button onClick={prevScreen}>Previous</button>
            ) : (
                ''
            )}
            {screenIndex !== 3 ? (
              <button onClick={nextScreen}>Next</button>
            ) : (
              <input type="submit" value={"Submit"} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
