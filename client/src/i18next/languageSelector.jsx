import React from 'react';
import i18n from './i18n'; // Import your i18n configuration

const LanguageSelector = () => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Change the language in i18next
  };

  return (
    <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language}>
      <option value="en">English</option>
      <option value="ar">Arabic</option>
      <option value="tr">Turkish</option>
      {/* Add more options for additional languages as needed */}
    </select>
  );
};

export default LanguageSelector;
