import React from "react";

const TripCaptionInput = ({ textInput, onChange }) => {
  return (
    <textarea
      value={textInput}
      rows={3}
      onChange={onChange}
      placeholder="What are your experience?"
      className="block w-full mt-7 outline-none p-2 rounded-md border border-gray-300 focus:border-2 focus:border-blue-500 mb-2"
    />
  );
};

export default TripCaptionInput;
