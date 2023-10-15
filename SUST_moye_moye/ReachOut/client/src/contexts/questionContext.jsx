import API from "../api/axios.config";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./userContext";
import { useChapterContext } from "./chapterContext"; // Import useChapterContext

const QuestionContext = createContext();

const QuestionContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState();
  const { focusedChap } = useChapterContext(); // Use focusedChap from ChapterContext

  useEffect(() => {
    // console.log(focusedChap);
    if (focusedChap) {
      // console.log(focusedChap);
      // Send a POST request to fetch questions for the focused chapter
      API.post("/fetch-questions", { chapter_id: focusedChap })
        .then((res) => {
          setQuestions(res.data?.questions);
          console.log(questions);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        });
    }
  }, [focusedChap]);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        focusedChap,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

const useQuestionContext = () => {
  const context = useContext(QuestionContext);

  if (context === undefined) {
    throw new Error(
      "useQuestionContext must be used within QuestionContextProvider"
    );
  }

  return context;
};

export { QuestionContextProvider, useQuestionContext };
