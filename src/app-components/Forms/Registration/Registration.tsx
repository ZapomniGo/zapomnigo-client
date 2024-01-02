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
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const [termsError, setTermsError] = useState<DataError>({
    hasError: false,
    message: "",
  });
  const [policyError, setPolicyError] = useState<DataError>({
    hasError: false,
    message: "",
  });
  const [backendError, setBackendError] = useState("");

  const errorMessage = {
    name: "Името",
    username: "Потребителското име",
    organization: "Организацията",
    age: "Възрастта",
    password: "Паролата",
    repeatPassword: "Повторете паролата",
    email: "Имейлът",
  };
  const register = async () => {
    setBackendError("");
    try {
      let hasError = false;
      if (!userData.terms_and_conditions) {
        setTermsError({
          hasError: true,
          message: "Моля, съгласете се с условията за ползване",
        });
        hasError = true;
      } else {
        setTermsError({ hasError: false, message: "" });
      }

      if (!userData.privacy_policy) {
        setPolicyError({
          hasError: true,
          message: "Моля, съгласете се с политиката за поверителност",
        });
        hasError = true;
      } else {
        setPolicyError({ hasError: false, message: "" });
      }

      if (hasError) {
        return;
      }

      const response = await instance.post(`/register`, userData);
      if (response.status === 200) {
        navigate("/verify");
      }
    } catch (error) {
      if (!navigator.onLine) {
        setBackendError("Нямате интернет връзка");
      } else if ((error as any).response) {
        if (error.response.status === 409) {
          if (error.response.data.error.includes("username")) {
            setBackendError("Потребителското име вече съществува");
          } else if (error.response.data.error.includes("email")) {
            setBackendError("Имейлът вече съществува");
          } else {
            setBackendError(error.response.data.error);
          }
        } else if (error.response.status === 404) {
          setBackendError(error.response.data.message);
        }
      } else if (error.request) {
        setBackendError("Няма отговор от сървъра, пробвайте по-късно");
      } else {
        setBackendError("Пробвайте по-късно");
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
      return {
        ...prevErrors,
        [checkboxName]: { hasError: !userData[checkboxName], message: "" },
      };
    });

    if (
      checkboxName === "terms_and_conditions" &&
      !userData.terms_and_conditions
    ) {
      setTermsError({ hasError: true, message: "" });
    }

    if (checkboxName === "privacy_policy" && !userData.privacy_policy) {
      setPolicyError({ hasError: true, message: "" });
    }
  };

  const validateField = (field: keyof UserData, value: string | number) => {
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
            message: `${errorMessage[field]} трябва да е между 2-40 символа`,
          };
        }
        break;
      case "organization":
        if (typeof value === "string" && value.length !== 8) {
          errorInfo = {
            hasError: true,
            message: `${errorMessage[field]} трябва да е между 2-40 символа`,
          };
        }
        break;
      case "age":
        if (typeof value === "number" && (value < 5 || value > 99)) {
          errorInfo = {
            hasError: true,
            message: "Възрастта може да е между 5-99 години",
          };
        }
        break;
      case "gender":
        if (typeof value === "string" && value.length === 0) {
          errorInfo = {
            hasError: true,
            message: "Please select gender",
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
            message: "Полето за парола трябва да е между 8-40 символа",
          };
        } else if (typeof value === "string" && !/[A-Z]/.test(value)) {
          errorInfo = {
            hasError: true,
            message: "Паролата трябва да съдържа поне една главна буква",
          };
        } else if (typeof value === "string" && !/[a-z]/.test(value)) {
          errorInfo = {
            hasError: true,
            message: "Паролата трябва да съдържа поне една малка буква",
          };
        } else if (typeof value === "string" && !/\d/.test(value)) {
          errorInfo = {
            hasError: true,
            message: "Паролата трябва да съдържа поне една цифра",
          };
        } else if (typeof value === "string" && !/[\W_]/.test(value)) {
          errorInfo = {
            hasError: true,
            message: "Паролата трябва да съдържа поне един специален символ",
          };
        }
        break;
      case "repeatPassword":
        if (typeof value === "string" && value !== userData.password) {
          errorInfo = { hasError: true, message: "Паролте не съвпадат" };
        }
        break;
      case "email":
        if (
          typeof value === "string" &&
          (value.length < 2 || value.length > 40)
        ) {
          errorInfo = {
            hasError: true,
            message: "Полето за имейл трябва да е между 2-40 символа",
          };
        } else if (typeof value === "string" && !emailPattern.test(value)) {
          errorInfo = {
            hasError: true,
            message: "Въведете валиден имейл",
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
    if (type === "checkbox") {
      setUserData((prev) => ({ ...prev, [name]: checked }));
    } else {
      // For other input types, update the state based on the input value
      setUserData((prev) => ({
        ...prev,
        [name]: name === "age" ? parseInt(value, 10) : value,
      }));
      validateField(
        name as keyof UserData,
        name === "age" ? parseInt(value, 10) : value
      );
    }
  };

  const nextScreen = () => {
    const newErrors = { ...errors };
    let errorsExist = false;

    if (screenIndex === 1) {
      if (userData.name.length < 2 || userData.name.length > 40) {
        newErrors.name = {
          hasError: true,
          message: "Полето за име трябва да е между 2-40 символа",
        };
        errorsExist = true;
      } else {
        newErrors.name = { hasError: false, message: "" };
      }

      if (userData.age == null || userData.age < 5 || userData.age > 99) {
        newErrors.age = {
          hasError: true,
          message: "Полето за възраст трябва да е между 5-99 години",
        };
        errorsExist = true;
      } else {
        newErrors.age = { hasError: false, message: "" };
      }
    }
      if(userData.gender.length === 0){
        newErrors.gender = {
          hasError: true,
          message: "Please enter gender",
      }
      errorsExist = true;
    } else{
      newErrors.gender = {hasError: false, message: ""};
    }

    if (screenIndex === 2) {
      if (userData.username.length < 2 || userData.username.length > 40) {
        newErrors.username = {
          hasError: true,
          message: "Полето за потребителско име трябва да е между 2-40 символа",
        };
        errorsExist = true;
      } else {
        newErrors.username = { hasError: false, message: "" };
      }

      if (userData.password.length < 8 || userData.password.length > 40) {
        newErrors.password = {
          hasError: true,
          message: "Паролата трябва да е между 8-40 символа",
        };
        errorsExist = true;
      } else if (!/[A-Z]/.test(userData.password)) {
        newErrors.password = {
          hasError: true,
          message: "Паролата трябва да съдържа поне една главна буква",
        };
        errorsExist = true;
      } else if (!/[a-z]/.test(userData.password)) {
        newErrors.password = {
          hasError: true,
          message: "Паролата трябва да съдържа поне една малка буква",
        };
        errorsExist = true;
      } else if (!/\d/.test(userData.password)) {
        newErrors.password = {
          hasError: true,
          message: "Паролата трябва да съдържа поне една цифра",
        };
        errorsExist = true;
      } else if (!/[\W_]/.test(userData.password)) {
        newErrors.password = {
          hasError: true,
          message: "Паролата трябва да съдържа поне един специален символ",
        };
        errorsExist = true;
      } else {
        newErrors.password = { hasError: false, message: "" };
      }

      if (userData.password !== userData.repeatPassword) {
        newErrors.repeatPassword = {
          hasError: true,
          message: "Паролите не съвпадат",
        };
        errorsExist = true;
      } else if (userData.password.length == 0) {
        newErrors.repeatPassword = {
          hasError: true,
          message: "Полето за парола е задължително",
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
          message: "Имейлът трябва да е между 2-40 символа",
        };
        errorsExist = true;
      } else {
        newErrors.email = { hasError: false, message: "" };
      }
    }

    if (screenIndex === 3) {
      if (userData.organization.length > 8) {
        newErrors.organization = {
          hasError: true,
          message: `Кодът на организацията трябва да е 8 символа`,
        };
        errorsExist = true;
      } else {
        newErrors.organization = { hasError: false, message: "" };
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
            <p>Регистрация</p>
          </div>

          <div className="stepper">
            <Stepper steps={[{}, {}, {}]} activeStep={screenIndex - 1} />
          </div>
          {screenIndex == 1 ? (
            <section>
              <input
                type="text"
                name="name"
                placeholder="Име"
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
                placeholder="Възраст"
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
                required
                className={selectedValue === "" ? "disabled" : ""}
                name="gender"
              >
                <option value="" disabled>
                  Пол
                </option>
                <option value="M">Мъж</option>
                <option value="F">Жена</option>
                <option value="O">Предпочитам да не споделям</option>
              </select>
            </section>
          ) : (
            ""
          )}
          {screenIndex == 2 ? (
            <section>
              <input
                type="text"
                placeholder="Потребителско име"
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
                placeholder="Имейл"
                name="email"
                className={errors.email.hasError ? "error" : ""}
                onChange={(e) => validateField("email", e.target.value)}
              />
              <p className="errorText">
                {errors.email.hasError ? errors.email.message : ""}
              </p>
              <input
                type="password"
                placeholder="Парола"
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
                placeholder="Повторете паролата"
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
                <center>
                  Част ли сте от организация, която използва нашите услуги?{" "}
                  <br /> Ако да, моля въведете кода на вашата организация
                </center>
              </p>
              <input
                type="text"
                name="organization"
                minLength={8}
                maxLength={8}
                placeholder="Организация"
                value={userData.organization}
                onChange={(e) => validateField("organization", e.target.value)}
              />
              <p className="errorText">
                {errors.organization.hasError
                  ? errors.organization.message
                  : ""}
              </p>

              <div className="checkboxes">
                <div className="privacy-policy">
                  <a href="#">Политика за поверителност</a>
                  <input
                    type="checkbox"
                    checked={userData.privacy_policy}
                    onChange={() => handleCheckboxChange("privacy_policy")}
                  />
                </div>
                <div className="terms-and-conditions">
                  <label>Политика за ползване</label>
                  <input
                    type="checkbox"
                    checked={userData.terms_and_conditions}
                    onChange={() =>
                      handleCheckboxChange("terms_and_conditions")
                    }
                  />
                </div>
                <div className="marketing-consent">
                  <label>Маркетингово съгласие</label>
                  <input
                    type="checkbox"
                    checked={userData.marketing_consent}
                    onChange={() => handleCheckboxChange("marketing_consent")}
                  />
                </div>
              </div>
              <div className="errorText">{policyError.message}</div>
              <div className="errorText">{termsError.message}</div>
              <div className="errorText">{backendError}</div>
            </section>
          ) : (
            ""
          )}
          <div id="buttonWrapper">
            {screenIndex !== 1 ? (
              <button onClick={prevScreen}>Назад</button>
            ) : (
              ""
            )}
            {screenIndex !== 3 ? (
              <button onClick={nextScreen}>Напред</button>
            ) : (
              <input type="submit" value={"Потвърди"} onClick={register} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
