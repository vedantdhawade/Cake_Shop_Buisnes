import React from "react";

const IntroPage = ({ heading, heading2 }) => {
  return (
    <div className="text px-20 py-20 ">
      <h1 className="text-7xl font-bold text-gray-900">{heading}</h1>
      <p className="mt-2 text-gray-600 font-medium">
        <span className="font-bold text-gray-900">{heading2}</span> //{" "}
        <span className="text-red-500">{heading}</span>
      </p>
    </div>
  );
};

export default IntroPage;
