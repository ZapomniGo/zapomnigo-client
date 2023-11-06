import { useState } from "react";
import { useFormik } from "formik";
import { UserData } from "./types";
import { initialFormValues, validationSchema } from "./utils";

export const Registration = () => {
  const [screenIndex, setScreenIndex] = useState<number>(0);
  const [isCurrentScreenValid, setIsCurrentScreenValid] =
    useState<boolean>(false);

  const formik = useFormik<UserData>({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      if (screenIndex < 2) {
        setScreenIndex(screenIndex + 1);
        setIsCurrentScreenValid(false);
      } else {
        // Handle form submission
        console.log("Form submitted:", values);
      }
    },
  });

  const nextButtonClick = () => {
    if (screenIndex < 2) {
      const isSectionValid = formik.validateForm().then((errors) => {
        setIsCurrentScreenValid(Object.keys(errors).length === 0);
        return Object.keys(errors).length === 0;
      });

      isSectionValid.then((isValid) => {
        if (isValid) {
          setScreenIndex(screenIndex + 1);
          setIsCurrentScreenValid(true);
        }
      });
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {screenIndex === 0 ? (
          <section>
            <h2>Panel 1: Personal Information</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="error">{formik.errors.name}</p>
            )}
            <input
              type="number"
              name="age"
              placeholder="Age"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
            />
            {formik.touched.age && formik.errors.age && (
              <p className="error">{formik.errors.age}</p>
            )}
            <select
              name="gender"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.gender}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Prefer not to say</option>
            </select>
          </section>
        ) : screenIndex === 1 ? (
          <section>
            <h2>Panel 2: Account Information</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="error">{formik.errors.username}</p>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="error">{formik.errors.email}</p>
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="error">{formik.errors.password}</p>
            )}
            <input
              type="password"
              name="repeatPassword"
              placeholder="Repeat Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.repeatPassword}
            />
            {formik.touched.repeatPassword && formik.errors.repeatPassword && (
              <p className="error">{formik.errors.repeatPassword}</p>
            )}
          </section>
        ) : screenIndex === 2 ? (
          <section>
            <h2>Panel 3: Additional Information</h2>
            <input
              type="text"
              name="organisation"
              placeholder="Organisation"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.organisation}
            />
          </section>
        ) : (
          <></>
        )}
        <div>
          {screenIndex >= 0 ? (
            <>
              <button
                onClick={() =>
                  screenIndex > 0
                    ? setScreenIndex(screenIndex - 1)
                    : setScreenIndex(0)
                }
              >
                Previous
              </button>
              {screenIndex !== 2 ? (
                <button
                  type="button"
                  onClick={nextButtonClick}
                  disabled={!isCurrentScreenValid}
                >
                  Next
                </button>
              ) : (
                <input type="submit" value="Submit" />
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </form>
    </>
  );
};
