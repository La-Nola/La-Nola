import { React, useContext, useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { NavLink, Outlet } from "react-router-dom";
import { HiOutlineIdentification } from "react-icons/hi2";
import { IoExitOutline } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import { DataContext } from "../store/context.js";
// Here are 3 subcomponents that are being rendered depending on what link the user clicks.
// By making use of the Navlink and Outlet we are able to achieve this result.
// Dicebear is an avatar library that we can use in our website.
// It offers a lot of different styles, the one i am using now is pixelArt. https://www.dicebear.com/styles for more options
// seed property allows us to change the avatar. By typing a different name the function will return a different avatar.
const UserProfile = () => {
  const { usersState } = useContext(DataContext);

  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      seed: usersState.user.firstName,
      backgroundColor: ["b6e3f4", "c0aede", "d1d4f9", "ffd5dc", "ffdfbf"],
      size: 128,
      // ... other options
    }).toDataUriSync();
  }, [usersState.user.firstName]);
  return (
    <div className="md:flex min-h-screen  gap-11 p-14 bg-gray-100">
      <div className="lg:ml-48">
        <div className="flex items-center bg-white p-9">
          <img
            src={avatar}
            alt=""
            className="rounded-full bg-slate-600 w-24 h-24 object-cover"
          />
          <h2 className="text-xl text-center ml-12">
            Hello, <br /> {usersState.user.firstName}
          </h2>
    
        </div>
        <div className="bg-white mt-7 flex flex-col">
          <NavLink
            className="border p-3 hover:bg-slate-50 cursor-pointer"
            to={"./"}
          >
            <HiOutlineIdentification className="md:text-lg inline-block mr-2" />
            Meine Angaben
          </NavLink>
          <NavLink
            className="border p-3 hover:bg-slate-50 cursor-pointer"
            to={"my-orders"}
          >
            <LiaShippingFastSolid className="md:text-lg inline-block mr-2" />
            Meine Bestellungen{" "}
          </NavLink>

          <NavLink
            className=" border p-3 hover:bg-slate-50 cursor-pointer"
            to={"logout"}
          >
            <IoExitOutline className="md:text-lg inline-block mr-2" />
            Abmelden{" "}
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default UserProfile;
