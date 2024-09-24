"use client"; 

import { useState } from 'react';

const Forms = ({ fields, onSubmit, validationSchema, buttonText }) => {
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
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formValues[field.name] || ''}
            onChange={handleInputChange}
            required={field.required}
            className="w-full px-3 py-2 border rounded"
          />
          {errors[field.name] && <span className="text-red-500 text-sm">{errors[field.name]}</span>}
        </div>
      ))}
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        {buttonText}
      </button>
    </form>
  );
};

export default Forms;

