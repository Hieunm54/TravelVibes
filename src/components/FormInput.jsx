import React from "react";

const FormInput = ({ name, value, onChange, placeholder }) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full rounded-md p-1 border border-gray-300"
      />
    </div>
  );
};

export default FormInput;
