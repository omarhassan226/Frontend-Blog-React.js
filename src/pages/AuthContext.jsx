import React, { createContext, useContext, useState } from "react";
const AuthContext = createContext();
export default function authContext({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [ isDarkMode, setIsDarkMode ] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn , isDarkMode , setIsDarkMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
