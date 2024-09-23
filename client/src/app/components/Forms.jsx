"use client"; 

import { useState } from 'react';

const Forms = ({ fields, onSubmit, validationSchema, buttonText, buttonClassName }) => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field, index) => (
        <div key={index} className="space-y-2">
          {/* Apply bold and black styling to labels */}
          <label htmlFor={field.name} className="font-bold text-black">{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formValues[field.name] || ''}
            onChange={handleInputChange}
            required={field.required}
            // Thicker outline for input
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
          />
          {errors[field.name] && <span className="text-red-500 text-sm">{errors[field.name]}</span>}
        </div>
      ))}
      {/* Centered button with bold text */}
      <button type="submit" className={`bg-green-900 text-white py-2 ${buttonClassName}`}>
        {buttonText}
      </button>
    </form>
  );
};

export default Forms;





