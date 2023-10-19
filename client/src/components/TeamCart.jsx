import React from "react";
import { AiFillLinkedin } from 'react-icons/ai';
import { BiSolidUserRectangle} from 'react-icons/bi';
import { BsGithub } from 'react-icons/bs';

import teamData from "./teamData";
const TeamCart = () => {
    return (
        <>
        {teamData.map(person => (
             <div key={person.id} className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-20 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
             <div className="rounded overflow-hidden shadow-md bg-white">
                 <div className="absolute -mt-20 w-full flex justify-center">
                     <div className="h-32 w-32">
                         <img src={person.image} alt="" className="rounded-full object-cover h-full w-full shadow-md" />
                     </div>
                 </div>
                 <div className="px-6 mt-16">
                     <h2 className="font-semibold text-3xl text-center pb-1">{person.name}</h2>
                     <p className="text-center text-yellow-800 text-base pt-3 font-bold">{person.role}</p>
                     <p className="text-center text-gray-800 text-base pt-3 font-normal">{person.description}</p>
                     <div className="w-full flex justify-center pt-5 pb-5">
                         <a href={person.ghLink} className="mx-5">
                             <div className=" text-3xl" >
                                <BsGithub />
                             </div>
                         </a>
                         <a href={person.LinkedinLink} className="mx-5">
                             <div className=" text-3xl">
                             <AiFillLinkedin />
                             </div>
                         </a>
                         <a href={person.Portfolio} className="mx-5">
                         <div className=" text-3xl">
                             <BiSolidUserRectangle />
                             </div>
                         </a>
                     </div>
                 </div>
             </div>
         </div>
        ))}
        </>

    );
};
export default TeamCart;