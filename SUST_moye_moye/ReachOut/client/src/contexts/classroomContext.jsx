import API from "../api/axios.config";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./userContext";

const ClassroomContext = createContext();

const ClassroomContextProvider = ({ children }) => {
  const { userData } = useUserContext();
  const [classList, setClassList] = useState([{
    "class_id": 1,
    "class_name": "Physics 1st paper"
  },
  {
    "class_id": 2,
    "class_name": "Physics 2nd paper"
  },
  {
    "class_id": 3,
    "class_name": "Chemistry 1st paper"
  },
  {
    "class_id": 4,
    "class_name": "Chemistry 2nd paper"
  },
  {
    "class_id": 5,
    "class_name": "Math 1st paper"
  },
  {
    "class_id": 6,
    "class_name": "Math 2nd paper"
  },
]);
  const [isClassAdded, setIsClassAdded] = useState(false);
  const [focusedClass, setFocusedClass] = useState([]);
  const [isRoleChanged, setIsRoleChanged] = useState(false);
  const [classIdToUserIdMap, setClassIdToUserIdMap] = useState(new Map());
  const [userIdToNameMap, setUserIdToNameMap] = useState(new Map());
  const [userIdToEmailMap, setUserIdToEmailMap] = useState(new Map());
  const [userIdToRoleMap, setUserIdToRoleMap] = useState(new Map());

  return (
    <ClassroomContext.Provider
      value={{
        classList,
        setClassList,
        focusedClass,
        setFocusedClass,
        classIdToUserIdMap,
        userIdToNameMap,
        userIdToEmailMap,
        userIdToRoleMap,
        setIsClassAdded,
        setIsRoleChanged,
      }}
    >
      {children}
    </ClassroomContext.Provider>
  );
};

const useClassroomContext = () => {
  const context = useContext(ClassroomContext);

  if (context === undefined) {
    throw new Error(
      "useClassroomContext must be used within ClassroomContextProvider"
    );
  }
  return context;
};

export { ClassroomContextProvider, useClassroomContext };
