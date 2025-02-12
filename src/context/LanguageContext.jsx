import { createContext, useState, useContext, useEffect } from "react";
import Cookie from "js-cookie";

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const storedLanguage = Cookie.get("language");
  const [language, setLanguage] = useState(storedLanguage);

  useEffect(() => {
    Cookie.set("language", language);
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
