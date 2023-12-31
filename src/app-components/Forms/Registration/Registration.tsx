/*
## ============================================================
## TODO(): Think of a way to refactor the validation logic
## TODO(): Extract Stepper slides as components
## ============================================================
*/

import { SetStateAction, useState } from "react";
import { Stepper } from "react-form-stepper";
import { Background } from "../FormsBackground/Background";
import { emailPattern, initialErrors, initialUserState } from "./utils";
import { RegisterErrorRecord } from "./types";
import { DataError, UserData } from "../../../app-common/types";
import instance from "../../../app-utils/axios";
  
export const Registration = () => {

  const [termsError, setTermsError] = useState<DataError>({ hasError: false, message: "" });
  const [policyError, setPolicyError] = useState<DataError>({ hasError: false, message: "" });
  const [backendError, setBackendError] = useState('');

  const register = async () => {
    setBackendError('');
    try {
      let hasError = false;
  
      if (!userData.terms_and_conditions) {
        setTermsError({
          hasError: true,
          message: "Please accept the terms and conditions.",
        });
        hasError = true;
      } else {
        setTermsError({ hasError: false, message: "" });
      }
  
      if (!userData.privacy_policy) {
        setPolicyError({
          hasError: true,
          message: "Please accept privacy and policy.",
        });
        hasError = true;
      } else {
        setPolicyError({ hasError: false, message: "" });
      }
  
      if (hasError) {
        return; 
      }
  
      console.log("User Data:", userData);
      const response = await instance.post(`/register`, userData);
      console.log(response);
  
    } catch (error) {
      console.error("Error during registration:", error);
      if (!navigator.onLine) {
        setBackendError('You are currently offline.');
      } else if ((error as any).response) {
        if(error.response.status === 409){
          if (error.response.data.error.includes('username')) {
            setBackendError('Username already exists');
          } else if(error.response.data.error.includes('email')){
            setBackendError('Email already exists');
          } else {
            setBackendError(error.response.data.error);
          }
        } else if(error.response.status === 404){
          setBackendError(error.response.data.message);
        }
      } else if (error.request) {
        setBackendError('No response received from server');
      } else {
        setBackendError('Error in setting up the request');
      }
    }
  };

  const [screenIndex, setScreenIndex] = useState(1);
  const [errors, setErrors] = useState<RegisterErrorRecord>(initialErrors);
  const [userData, setUserData] = useState<UserData>(initialUserState);


  const handleCheckboxChange = (checkboxName: keyof UserData) => {
    setUserData((prevUserData) => {
      const updatedValue = !prevUserData[checkboxName];
      return { ...prevUserData, [checkboxName]: updatedValue };
    });
  
    setErrors((prevErrors) => {
      return { ...prevErrors, [checkboxName]: { hasError: !userData[checkboxName], message: "" } };
    });
  
    if (checkboxName === 'terms_and_conditions' && !userData.terms_and_conditions) {
      setTermsError({ hasError: true, message: "" });
    }
  
    if (checkboxName === 'privacy_policy' && !userData.privacy_policy) {
      setPolicyError({ hasError: true, message: "" });
    }
  };

  const validateField = (field: keyof UserData, value: string | number) => {
    console.log(`Validating field: ${field}`);

    if (!value) {
      setErrors((prev) => ({
        ...prev,
        [field]: { hasError: false, message: "" },
      }));
      return;
    }

    let errorInfo: DataError = { hasError: false, message: "" };

    switch (field) {
      case "name":
      case "username":
        if (
          typeof value === "string" &&
          (value.length < 2 || value.length > 40)
        ) {
          errorInfo = {
            hasError: true,
            message: `The ${field} field should be 2-40 characters long`,
          };
        }
        break
      case "organization":
          if (
            typeof value === "string" &&
            (value.length !== 8)
          ) {
            errorInfo = {
              hasError: true,
              message: `The ${field} field should be 8 characters long`,
            };
          }
          break;
      case "age":
        if (typeof value === "number" && (value < 5 || value > 99)) {
          errorInfo = {
            hasError: true,
            message: "The age field should be 5-99",
          };
        }
        break;
      case "password":
        if (
          typeof value === "string" &&
          (value.length < 8 || value.length > 40)
        ) {
          errorInfo = {
            hasError: true,
            message: "The password field should be 8 - 40 characters long",
          };
        } else if (typeof value === "string" && !/[A-Z]/.test(value)) {
          errorInfo = {
            hasError: true,
            message: "Password must contain at least one capital letter",
          };
        } else if (typeof value === "string" && !/[a-z]/.test(value)) {
          errorInfo = {
            hasError: true,
            message: "Password must contain at least one lowercase letter",
          };
        } else if (typeof value === "string" && !/\d/.test(value)) {
          errorInfo = {
            hasError: true,
            message: "Password must contain at least one number",
          };
        } else if (typeof value === "string" && !/[\W_]/.test(value)) {
          errorInfo = {
            hasError: true,
            message: "Password must contain at least one special symbol",
          };
        }
        break;
      case "repeatPassword":
        if (typeof value === "string" && value !== userData.password) {
          errorInfo = { hasError: true, message: "The passwords don't match" };
        }
        break;
      case "email":
        if (
          typeof value === "string" &&
          (value.length < 2 || value.length > 40)
        ) {
          errorInfo = {
            hasError: true,
            message: "The email field should be 2-40 characters long",
          };
        } else if (
          typeof value === "string" &&
          (!emailPattern.test(value))
        ) {
          errorInfo = {
            hasError: true,
            message: "Enter valid email",
          };
        } 
        break;
      // case "organization":
      //   if(typeof value === "string" && value.length > 8){
      //     errorInfo = {
      //       hasError: true,
      //       message: "Please enter valid institution code"
      //     };
      //   }
      //   break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: errorInfo,
    }));
  };

  const formHandler = (event: React.FormEvent<HTMLFormElement>) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
  
    // For checkboxes, handle their checked state
    if (type === 'checkbox') {
      setUserData((prev) => ({ ...prev, [name]: checked }));
    } else {
      // For other input types, update the state based on the input value
      setUserData((prev) => ({
        ...prev,
        [name]: name === 'age' ? parseInt(value, 10) : value,
      }));
      validateField(name as keyof UserData, name === 'age' ? parseInt(value, 10) : value);
    }
  };

  const nextScreen = () => {
    const newErrors = { ...errors };
    let errorsExist = false;

    if (screenIndex === 1) {
      if (userData.name.length < 2 || userData.name.length > 40) {
        newErrors.name = {
          hasError: true,
          message: "The name field should be 2-40 characters long",
        };
        errorsExist = true;
      } else {
        newErrors.name = { hasError: false, message: "" };
      }

      if (userData.age == null || userData.age < 5 || userData.age > 99) {
        newErrors.age = {
          hasError: true,
          message: "The age field should be 5-99",
        };
        errorsExist = true;
      } else {
        newErrors.age = { hasError: false, message: "" };
      }
    }

    if (screenIndex === 2) {
      if (userData.username.length < 2 || userData.username.length > 40) {
        newErrors.username = {
          hasError: true,
          message: "The username field should be 2-40 characters long",
        };
        errorsExist = true;
      } else {
        newErrors.username = { hasError: false, message: "" };
      }

      if (userData.password.length < 8 || userData.password.length > 40) {
        newErrors.password = {
          hasError: true,
          message: "The password field should be 8 - 40 characters long",
        };
        errorsExist = true;
      } else if (!/[A-Z]/.test(userData.password)) {
        newErrors.password = {
          hasError: true,
          message: "Password must contain at least one capital letter",
        };
        errorsExist = true;
      } else if (!/[a-z]/.test(userData.password)) {
        newErrors.password = {
          hasError: true,
          message: "Password must contain at least one lowercase letter",
        };
        errorsExist = true;
      } else if (!/\d/.test(userData.password)) {
        newErrors.password = {
          hasError: true,
          message: "Password must contain at least one number",
        };
        errorsExist = true;
      } else if (!/[\W_]/.test(userData.password)) {
        newErrors.password = {
          hasError: true,
          message: "Password must contain at least one special symbol",
        };
        errorsExist = true;
      } else {
        newErrors.password = { hasError: false, message: "" };
      }

      if (userData.password !== userData.repeatPassword) {
        newErrors.repeatPassword = {
          hasError: true,
          message: "The passwords don't match",
        };
        errorsExist = true;
      } else if (userData.password.length == 0) {
        newErrors.repeatPassword = {
          hasError: true,
          message: "The password field should be 8 - 40 characters long",
        };
      } else {
        newErrors.repeatPassword = { hasError: false, message: "" };
      }

      if (
        userData.email.length < 2 ||
        userData.email.length > 40 ||
        !emailPattern.test(userData.email)
      ) {
        newErrors.email = {
          hasError: true,
          message: "The email field should be 2-40 characters long",
        };
        errorsExist = true;
      } else {
        newErrors.email = { hasError: false, message: "" };
      }
    }

    if (screenIndex === 3) {
      console.log(userData.organization)
      if (
        (userData.organization.length > 8)
      ) {
        newErrors.organization = {
          hasError: true,
          message: `The organization code should be 8 characters long`,
        };
        errorsExist = true;
      } else{
        newErrors.organization  = {hasError: false, message: ""};
      }
    }

    setErrors(newErrors);

    if (!errorsExist) {
      setScreenIndex((prev) => prev + 1);
    }
  };
  const prevScreen = () => {
    const prevUserData = { ...userData };
  
    setUserData(prevUserData);
    setScreenIndex((prev) => prev - 1);
  };

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedValue(event.target.value);
  };
  

  return (
    <div id="backgroundForm">
      <Background />

      <div id="wrapperForm">
        <form onSubmit={(e) => e.preventDefault()} onChange={formHandler}>
          <div className="title">
            <p>Registration</p>
          </div>

          <div className="stepper">
            <Stepper steps={[{}, {}, {}]} activeStep={screenIndex - 1} />
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
                onChange={(e) => validateField("name", e.target.value)}
              />
              <p className="errorText">
                {errors.name.hasError ? errors.name.message : ""}
              </p>
              <input
                type="number"
                name="age"
                min={5}
                max={99}
                placeholder="Age"
                value={userData.age !== null ? userData.age : ""}
                className={errors.age.hasError ? "error" : ""}
                onChange={(e) => validateField("age", e.target.value)}
              />
              <p className="errorText">
                {errors.age.hasError ? errors.age.message : ""}
              </p>
              <select
                value={selectedValue}
                onChange={handleChange}
                className={selectedValue === "" ? "disabled" : ""}
                name="gender"
              >
                <option value="" disabled>
                  Gender
                </option>
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
                onChange={(e) => validateField("username", e.target.value)}

              />
              <p className="errorText">
                {errors.username.hasError ? errors.username.message : ""}
              </p>
              <input
                value={userData.email}
                type="email"
                placeholder="Email"
                name="email"
                className={errors.email.hasError ? "error" : ""}
                onChange={(e) => validateField("email", e.target.value)}
              />
              <p className="errorText">
                {errors.email.hasError ? errors.email.message : ""}
              </p>
              <input
                type="password"
                placeholder="Password"
                name="password"
                minLength={8}
                maxLength={40}
                value={userData.password}
                className={errors.password.hasError ? "error" : ""}
                onChange={(e) => validateField("password", e.target.value)}
              />
              <p className="errorText">
                {errors.password.hasError ? errors.password.message : ""}
              </p>
              <input
                type="password"
                placeholder="Repeat Password"
                name="repeatPassword"
                minLength={8}
                maxLength={40}
                value={userData.repeatPassword}
                className={errors.repeatPassword.hasError ? "error" : ""}
                onChange={(e) =>
                  validateField("repeatPassword", e.target.value)
                }
              />
              <p className="errorText">
                {errors.repeatPassword.hasError
                  ? errors.repeatPassword.message
                  : ""}
              </p>
            </section>
          ) : (
            ""
          )}
          {screenIndex == 3 ? (
            <section>
              <p>
                Do you want to register for an organization?
              </p>
              <input
                type="text"
                name="organization"
                placeholder="organization"
                value={userData.organization}
                onChange={(e) =>
                  validateField("organization", e.target.value)
                }
              />
              <p className="errorText">
                {errors.organization.hasError
                  ? errors.organization.message
                  : ""}
              </p>

              <div className="checkboxes">
              <div className="privacy-policy">
                <a href="#">Privacy Policy</a>
                <input type="checkbox" checked={userData.privacy_policy} onChange={() => handleCheckboxChange('privacy_policy')} />
              </div>
              <div className="terms-and-conditions">
                <label> Terms and conditions</label>
                <input type="checkbox" checked={userData.terms_and_conditions} onChange={() => handleCheckboxChange('terms_and_conditions')} />
              </div>
              <div className="marketing-consent">
                <label>Marketing Consent</label>
                <input type="checkbox" checked={userData.marketing_consent} onChange={() => handleCheckboxChange('marketing_consent')} />
              </div>
              </div>
              <div className="errorText">
                {policyError.message}
              </div>
              <div className="errorText">
                {termsError.message}
              </div> 
              <div className="errorText">
                {backendError}
              </div>
            </section>
          ) : (
            ""
          )}
          <div id="buttonWrapper">
            {screenIndex !== 1 ? (
              <button onClick={prevScreen}>Previous</button>
            ) : (
              ""
            )}
            {screenIndex !== 3 ? (
              <button onClick={nextScreen}>Next</button>
            ) : (
              <input type="submit" value={"Submit"} onClick={register} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
