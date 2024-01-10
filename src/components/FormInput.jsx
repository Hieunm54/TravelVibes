/* eslint-disable react/prop-types */
import React from "react";

const FormInput = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  multiline = false,
  label = true,
  className,
  ...otherProps
}) => {
  return (
    <div className="flex flex-col flex-grow">
      <label htmlFor={name}>{label ? name : ""}</label>
      {!multiline ? (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`block w-full rounded-md p-1 border border-gray-300 ${className}`}
          {...otherProps}
        />
      ) : (
        <textarea
          rows={5}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`block resize-none w-full rounded-md p-1 border border-gray-300 ${className}`}
          {...otherProps}
        />
      )}
    </div>
  );
};

export default FormInput;
