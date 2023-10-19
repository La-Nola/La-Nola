import React from "react";

function ProductColor({ colors }) {
  return (
    <div className="flex mt-2">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`w-6 h-6 mr-2 rounded-xs ${
            color.toLowerCase() === "multi"
              ? "bg-gradient-to-r from-red-300 via-yellow-300 via-green-500 to-blue-500"
              : ""
          } ${
            color.toLowerCase() === "white"
              ? "border-solid border-2 border-gray"
              : ""
          }`}
          style={
            color.toLowerCase() !== "multi" && color.toLowerCase() !== "peach"
              ? { backgroundColor: color }
              : { backgroundColor: "transparent" }
          }
        >
          {color.toLowerCase() === "peach" && (
            <div
              className="w-6 h-6 mr-2 rounded-xs bg-red-400"
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProductColor;
