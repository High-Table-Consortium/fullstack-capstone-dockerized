import React from 'react';
import i18n from './i18n'; 

const LanguageSelector = () => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); 
  };

  return (
    <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language}>
      <option value="en">English</option>
      <option value="ar">Arabic</option>
      <option value="tr">Turkish</option>
    </select>
  );
};

export default LanguageSelector;
