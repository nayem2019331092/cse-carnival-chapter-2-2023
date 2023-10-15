import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./contexts/userContext";
import { AuthContextProvider } from "./contexts/authContext";
import { LogoutContextProvider } from "./contexts/logoutContext.jsx";
import { ClassroomContextProvider } from "./contexts/classroomContext.jsx";
import { QuestionContextProvider } from "./contexts/questionContext.jsx";
import { ChapterContextProvider } from "./contexts/chapterContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <ClassroomContextProvider>
          <ChapterContextProvider>
            <QuestionContextProvider>
              <LogoutContextProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </LogoutContextProvider>
            </QuestionContextProvider>
          </ChapterContextProvider>
        </ClassroomContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
