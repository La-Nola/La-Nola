import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../apiCalls/usersApiCalls";
import { DataContext } from "../store/context.js";

const Logout = () => {
  const { dispatchUsers, usersState } = useContext(DataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log(usersState);
      // Call the logout function to log the user out on the server
      await logout(dispatchUsers, usersState);

      // Redirect the user to the desired page, e.g., the homepage
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Handle any potential errors during logout
    }
  };

  return (
    <div className="p-7 basis-3/6 w-full bg-white rounded h-fit mt-7 md:mt-0">
      <p className="text-3xl text-gray-700 text-center">Abmelden</p>
      <div className="my-7 text-center md:text-lg text-gray-800 text-sm">
        <p>{usersState.user.email},</p>
        <p>Bist du dir sicher, dass du dich abmelden willst ?</p>
      </div>
      <div className="text-center">
        <Link to="/userprofile">
          <button className="mr-4 mb-2 focus:ring-2 focus:ring-offset-2  text-sm font-semibold leading-none text-black focus:outline-none  border rounded hover:bg-slate-100 p-4 w-full md:w-36">
            Nein
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 p-4 w-full md:w-36"
        >
          Ja
        </button>
      </div>
    </div>
  );
};

export default Logout;
