import API from "../api/axios.config";
import { createContext, useContext } from "react";
import { useAuthContext } from "./authContext";
import { useUserContext } from "./userContext";

const LogoutContext = createContext();

const LogoutContextProvider = ({ children }) => {
  const { setIsLoggedIn } = useAuthContext();
  const { setUserData } = useUserContext();

  const logout = () => {
    API.get("/logout").then(() => {
      setUserData(null);
      setIsLoggedIn(false);
    });
  };

  return (
    <LogoutContext.Provider value={{ logout }}>
      {children}
    </LogoutContext.Provider>
  );
};

const useLogoutContext = () => {
  const context = useContext(LogoutContext);

  if (context === undefined) {
    throw new Error(
      "useLogoutContext must be used within LogoutContextProvider"
    );
  }
  return context;
};

export { LogoutContextProvider, useLogoutContext };
