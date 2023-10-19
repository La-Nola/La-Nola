import React from "react";
import TeamCart from "./TeamCart";

const Team = () => {
    return (
        <div>
            <div className="container flex justify-center mx-auto pt-4 mt-2">
                <div>
                    <p className="text-gray-600 text-lg text-center font-bold pb-3">DAS ENTWICKLERTEAM</p>
                    <h1 className="xl:text-4xl text-3xl text-center text-secondary font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">Unser Experten-Entwicklerteam: Treffen Sie die Köpfe hinter dem Code.</h1>
                </div>
            </div>
            <div className="w-full bg-gray-100 px-10 pt-8">
                <div className="container mx-auto">
                    <div className="lg:flex md:flex sm:flex items-center flex-wrap md:justify-around sm:justify-around lg:justify-around gap-0.5">
                       <TeamCart />
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Team;