"use client";

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Importing Eye and EyeOff from lucide-react

const Forms = ({ fields, onSubmit, validationSchema, buttonText, buttonClassName, inputClassName }) => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({}); // Track visibility of password fields

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateFields = () => {
    let newErrors = {};
    Object.keys(validationSchema).forEach((field) => {
      if (!formValues[field]) {
        newErrors[field] = validationSchema[field].required;
      } else if (validationSchema[field].pattern && !validationSchema[field].pattern.test(formValues[field])) {
        newErrors[field] = validationSchema[field].message;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      onSubmit(formValues);
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = (fieldName) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName], // Toggle visibility state for the specific field
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field, index) => (
        <div key={index} className="space-y-2">
          <label htmlFor={field.name} className="font-bold text-black">{field.label}</label>
          <div className="relative"> {/* Wrapper for input and icon */}
            <input
              id={field.name}
              name={field.name}
              type={field.type === 'password' && showPassword[field.name] ? 'text' : field.type} // Toggle input type
              placeholder={field.placeholder}
              value={formValues[field.name] || ''}
              onChange={handleInputChange}
              required={field.required}
              className={`w-full px-4 py-3 mt-2 text-sm text-gray-900 bg-gray-200 rounded-full focus:bg-gray-300 focus:ring-0 focus:outline-none ${inputClassName}`}
            />
            {field.type === 'password' && ( // Render icon only for password fields
              <span
                onClick={() => togglePasswordVisibility(field.name)} // Toggle visibility on click
                className="absolute right-3 top-5 cursor-pointer"
              >
                {showPassword[field.name] ? <Eye size={20} /> : <EyeOff size={20} />} {/* Use Lucide icons */}
              </span>
            )}
          </div>
          {errors[field.name] && <span className="text-red-500 text-sm">{errors[field.name]}</span>}
        </div>
      ))}
      <button type="submit" className={`w-full py-4 mt-6 font-bold text-white rounded-full ${buttonClassName}`}>
        {buttonText}
      </button>
    </form>
  );
};

export default Forms;
