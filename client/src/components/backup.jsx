import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../apiCalls/usersApiCalls";

const ResetPassword = () => {
  const { id, token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
  });
  const [response, setResponse] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleSubmit = () => {
    const response = resetPassword(id, token, formData);
    setResponse(response);
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 mt-auto">
      <h1 className="text-4xl font-medium">Neues Passwort</h1>
      <p className="text-slate-500">Bitte gib dein neues Passwort ein.</p>
      <form action="" className="my-10">
        <div className="flex flex-col space-y-5">
          <label htmlFor="password">
            <p className="font-medium text-slate-700 pb-2">Neues Password</p>
            <input
              onChange={handleInputChange}
              value={formData.password}
              id="password"
              name="password"
              type="password"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter email address"
            />
          </label>
          <label htmlFor="passwordConfirm">
            <p className="font-medium text-slate-700 pb-2">
              Bestätige dein Passwort
            </p>
            <input
              onChange={handleInputChange}
              value={formData.passwordConfirm}
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter email address"
            />
          </label>
          {response ? <p className="text-green-500">{response.data}</p> : null}
          <button
            onClick={handleSubmit}
            className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
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

            <span>Passwort speichern</span>
          </button>
          <p className="text-center">
            Never mind!{" "}
            <Link
              to={"/login"}
              className="text-indigo-600 font-medium inline-flex space-x-1 items-center underline underline-offset-2"
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
