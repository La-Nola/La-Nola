import React, { useState } from "react";
import { Link } from "react-router-dom";
import { requestResetPassword } from "../apiCalls/usersApiCalls";

const ForgotPassword = () => {
  const [emailInput, setEmailInput] = useState("");
  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handleSubmit = async () => {
    const response = await requestResetPassword(emailInput);
    setResponse(response);
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-gray-100 p-8 rounded-xl shadow shadow-slate-300 mt-auto">
      <h1 className="text-4xl font-medium mb-4">Passwort Zurücksetzen</h1>
      <p className="text-slate-500 mb-4">
        Bitte gib deine E-Mail Adresse ein um dein Passwort zu ändern.
      </p>

      <div className="flex flex-col space-y-5">
        <label htmlFor="email">
          <p className="font-medium text-lg text-slate-700 pb-2">E-Mail</p>
          <input
            onChange={handleChange}
            value={emailInput}
            id="email"
            name="email"
            type="email"
            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Enter email address"
          />
        </label>
        {response ? <p className="text-green-500">{response.data}</p> : null}
        <button
          onClick={handleSubmit}
          className="w-full py-3 font-medium text-white bg-secondary hover:bg-gray-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
            />
          </svg>

          <span>Passwort zurücksetzen</span>
        </button>
        <p className="text-center">
        Vergiss es!{" "}
          <Link
            to={"/login"}
            className="text-indigo-600 font-medium inline-flex space-x-1 items-center underline underline-offset-2"
          >
           Zurück zur Anmeldung
          </Link>
        </p>
      </div>
    </div>
  );
};
export default ForgotPassword;
