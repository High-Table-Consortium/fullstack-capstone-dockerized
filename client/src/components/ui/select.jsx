import React from 'react';

export const Select = ({ onValueChange, defaultValue, children }) => {
  return (
    <select onChange={(e) => onValueChange(e.target.value)} defaultValue={defaultValue} className="border rounded p-2">
      {children}
    </select>
  );
};

export const SelectTrigger = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const SelectContent = ({ children }) => (
  <div>{children}</div>
);

export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

export const SelectValue = ({ placeholder }) => (
  <option disabled>{placeholder}</option>
);
