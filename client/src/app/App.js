import React from 'react';
import './i18next/i18next'; 
import LanguageSelector from './i18next/LanguageSelector'; 

const App = () => {
  return (
    <div>
      <LanguageSelector />
      {/* Other components go here */}
    </div>
  );
};

export default App;
