import React from "react";

const Card = ({ image, text, imageOnLeft }) => {
  return (
    <div
      className={`flex ${
        imageOnLeft ? "md:flex-row text-center md:text-start" : "md:flex-row-reverse"
      } mb-4 md:p-4 bg-gray-100 rounded-lg shadow-md flex-col items-center md:items-start`}
    >
      <div className={`w-screen ${!imageOnLeft && "md:text-end text-center"}`}>
        <img src={image} alt="Card" className={`rounded-3xl md:h-96 md:w-96 object-cover ${!imageOnLeft && "inline-block"} m-auto md:m-0 h-64 w-2/4`} />
      </div>
      <div className="w-screen p-4 max-w-fit">
        <p>{text}</p>
      </div>
    </div>
  );
};
export default Card;
