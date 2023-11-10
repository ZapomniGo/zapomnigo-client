
import React from 'react';

const PasswordValidator = ({ password }) => {
        const passwordLength = password.length;
        let newErrors = {};
        let errorsExist = false;
      
        if (passwordLength < 8 || passwordLength > 40) {
          newErrors.password = "The password field should be 8-40 characters long";
          errorsExist = true;
        } else {
          newErrors.password = false;
        }
      
        if (!/[\W_]/.test(password)) {
          newErrors.specialSymbol = "Password must contain at least one special symbol";
          errorsExist = true;
        } else {
          newErrors.specialSymbol = false;
        }
      
        if (!/\d/.test(password)) {
          newErrors.number = "Password must contain at least one number";
          errorsExist = true;
        } else {
          newErrors.number = false;
        }
      
        if (!/[A-Z]/.test(password)) {
          newErrors.capitalLetter = "Password must contain at least one capital letter";
          errorsExist = true;
        } else {
          newErrors.capitalLetter = false;
        }
      
        if (!/[a-z]/.test(password)) {
          newErrors.nonCapitalLetter = "Password must contain at least one non-capital letter";
          errorsExist = true;
        } else {
          newErrors.nonCapitalLetter = false;
        }
      
        // Use newErrors and errorsExist as needed in your code
};

export default PasswordValidator;
