import API from "../api/axios.config";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./userContext";

const ChapterContext = createContext();

const ChapterContextProvider = ({ children }) => {
  //   const [isClassAdded, setIsClassAdded] = useState(false);
  const [focusedChap, setFocusedChap] = useState();

  return (
    <ChapterContext.Provider
      value={{
        focusedChap,
        setFocusedChap,
      }}
    >
      {children}
    </ChapterContext.Provider>
  );
};

const useChapterContext = () => {
  const context = useContext(ChapterContext);

  if (context === undefined) {
    throw new Error(
      "useChapterContext must be used within ChapterContextProvider"
    );
  }
  return context;
};

export { ChapterContextProvider, useChapterContext };
