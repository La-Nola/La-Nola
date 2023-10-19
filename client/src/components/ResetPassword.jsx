import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../apiCalls/usersApiCalls";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { DataContext } from "../store/context.js";

const ResetPassword = () => {
  const { id, token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
  });
  const { error, setError } = useContext(DataContext);
  const [response, setResponse] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [formErrors, setFormErrors] = useState({ password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "passwordConfirm") {
      setPasswordsMatch(value === formData.password);
    }

    if (name === "password") {
      // Use a regular expression to perform the validation
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
      const isValidPassword = passwordRegex.test(value);
      
      if (!isValidPassword) {
        setFormErrors({
          ...formErrors,
          password: "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Ziffer und ein Sonderzeichen enthalten."
        });
      } else {
        // Clear the password error if the password is valid
        setFormErrors({
          ...formErrors,
          password: ""
        });
      }
    }
  };
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setPasswordVisible(!passwordVisible);
    } else if (field === "passwordConfirm") {
      setPasswordConfirmVisible(!passwordConfirmVisible);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        if (!passwordsMatch || formErrors.password) {
      return;
    }

    try {
      const response = await resetPassword(id, token, formData);
      if (response.data ) {
        setResponse(response.data);
      }
    } catch (error) {
      setError("Ein Fehler ist aufgetreten, während das Passwort zurückgesetzt wurde. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-gray-200 p-8 rounded-xl shadow shadow-slate-300 mt-auto">
      <h1 className="text-4xl font-medium">Neues Passwort</h1>
      <p className="text-slate-500">Bitte gib dein neues Passwort ein.</p>
      <form action="" className="my-10">
        <div className="flex flex-col space-y-5">
          <label htmlFor="password" className="relative">
            <p className="font-medium text-slate-700 pb-2">Neues Password</p>
            <input
              required
              onChange={handleInputChange}
              value={formData.password}
              id="password"
              name="password"
              type={passwordVisible ? "text" : "password"}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus-border-slate-500 hover:shadow"
              placeholder="Passwort eingeben"
            />
            <div
              className="absolute top-12 right-3 cursor-pointer z-10"
              onClick={() => togglePasswordVisibility("password")}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </label>
          {formErrors.password && (
            <p className="text-red-500">{formErrors.password}</p>
          )}

          <label htmlFor="passwordConfirm" className="relative">
            <p className="font-medium text-slate-700 pb-2">
              Bestätige dein Passwort
            </p>
            <input
              required
              onChange={handleInputChange}
              value={formData.passwordConfirm}
              id="passwordConfirm"
              name="passwordConfirm"
              type={passwordConfirmVisible ? "text" : "password"}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus-border-slate-500 hover:shadow"
              placeholder="Passwort bestätigen"
            />
            <div
              className="absolute top-12 right-3 cursor-pointer z-10"
              onClick={() => togglePasswordVisibility("passwordConfirm")}
            >
              {passwordConfirmVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </label>
          {response ? <p className="text-green-500">{response.data}</p> : null}
          {!passwordsMatch && (
            <p className="text-red-500">Passwörter stimmen nicht überein.</p>
          )}
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={handleSubmit}
            className="w-full py-3 font-medium text-white bg-secondary hover:bg-gray-400 rounded-lg  hover:shadow inline-flex space-x-2 items-center justify-center"
            disabled={!passwordsMatch || formErrors.password}
          >
            <span>Passwort speichern</span>
          </button>
          <p className="text-center">
          Vergiss es!{" "}
            <Link
              to={"/login"}
              className="text-indigo-600 font-medium inline-flex space-x-1 items-understand-center underline-offset-2"
            >
              Bringen Sie mich zurück zur Anmeldung.
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
