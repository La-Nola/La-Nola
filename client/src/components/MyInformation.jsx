import { React, useContext, useState } from "react";
import inputs from "./inputs";
import { DataContext } from "../store/context";
import { updateUserById } from "../apiCalls/usersApiCalls";
// The reason i created the inputs.js and and map over it, is because i wanted to make use of the react component.
// It is clean to read it this way.
const MyInformation = () => {
  const { dispatchUsers, usersState } = useContext(DataContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChanges = async (e) => {
    e.preventDefault();
    await updateUserById(dispatchUsers, usersState, formData);
  };

  return (
    <div className="p-7 basis-3/6 w-full bg-white rounded h-fit mt-7 md:mt-0">
      <h2 className="md:text-3xl text-2xl text-gray-700 text-center md:text-left mb-7">
      {usersState.user.email} 
      </h2>
      {inputs
        .filter((input) => {
          if (input.name === "birthdate" || input.name === "email") {
            return false;
          } else return true;
        })
        .map((userInput) => (
          <div key={userInput.name} className="mb-7">
            <label
              className="text-sm font-medium leading-none text-gray-800"
              htmlFor={userInput.name}
            >
              {userInput.label}:
            </label>
            <input
              onChange={handleInputChange}
              className="bg-gray-200 border rounded focus:outline-none focus:ring focus:ring-blue-300 text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              type={userInput.type}
              value={formData[userInput.name]}
              name={userInput.name}
              id={userInput.name}
              placeholder={usersState.user[userInput.name]}
            />
          </div>
        ))}
      <button
        onClick={handleChanges}
        className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 p-4 w-full md:w-fit"
      >
        Änderung Speichern
      </button>
    </div>
  );
};
export default MyInformation;
