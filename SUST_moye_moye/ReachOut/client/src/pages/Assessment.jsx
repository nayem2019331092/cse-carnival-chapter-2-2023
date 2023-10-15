import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useClassroomContext } from "../contexts/classroomContext";
import QsCreationModal from "../components/QsCreationModal";
import { useChapterContext } from "../contexts/chapterContext";
import { useQuestionContext } from "../contexts/questionContext";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Assessment() {
  const { focusedClass } = useClassroomContext();
  const { focusedChap, setFocusedChap } = useChapterContext();
  const { questions } = useQuestionContext();
  const [selectedOption, setSelectedOption] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOptionChange = (selected) => {
    setSelectedOption(selected);
  };

  const check = (correct) => {
    if (selectedOption === correct) {
      toast.success("Correct Answer", {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        transition: Slide,
      });
    } else {
      toast.error("Wrong Answer", {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        transition: Slide,
      });
    }
  };

  const chapters = [
    { chapter_id: 1, sub_id: 1, name: "Ch 01 : Thermodynamics" },
    { chapter_id: 2, sub_id: 3, name: "Ch 02 : Motion" },
    { chapter_id: 3, sub_id: 1, name: "Ch 03 : Elasticity" },
    { chapter_id: 4, sub_id: 1, name: "Ch 04 : Gravity" },
    { chapter_id: 6, sub_id: 1, name: "Ch 05 : Viscosity" },
    { chapter_id: 7, sub_id: 1, name: "Ch 06 : Inertia" },
    // Add more chapters as needed
  ];

  const handleChapFocus = (id) => {
    setFocusedChap(id);
  };

  return (
    <div className="mt-24 flex">
      <div>
        <Sidebar />
      </div>
      <div className="ml-9 w-[calc(100vw-23rem)] mt-6">
        <div className="flex">
          <div className="w-1/3 pr-4 border-r border-everforest-selectFocused">
            <ul>
              {chapters.map(
                (chapter) =>
                  focusedClass.class_id &&
                  focusedClass.class_id === chapter.sub_id && (
                    <li
                      key={chapter.chapter_id}
                      className="mb-2 cursor-pointer"
                      onClick={() => handleChapFocus(chapter.chapter_id)}
                    >
                      <div
                        className={`bg-everforest-sidebar text-everforest-cyan font-medium flex items-center rounded-e-full py-2 px-2 mb-4 cursor-pointer ${
                          focusedChap === chapter.chapter_id
                            ? "focused"
                            : "hover:bg-everforest-select"
                        } transition-all`}
                      >
                        {chapter.name}
                        <div className="flex ml-auto">
                          {focusedChap === chapter.chapter_id && (
                            <QsCreationModal />
                          )}
                        </div>
                      </div>
                    </li>
                  )
              )}
            </ul>
          </div>
          <div className="w-2/3 ml-20">
            <div
              style={{ height: "1000px", overflow: "scroll" }} // Set a fixed height and allow scrolling
            >
              {focusedChap && questions && questions.length > 0 && (
                <div>
                  <ul>
                    {questions
                      .filter((question) => question.chapter_id === focusedChap)
                      .map((question, index) => (
                        <li key={question.question_id}>
                          <p className="font-bold text-xl text-everforest-red">
                            {question.question_text}
                          </p>
                          <ul className="mb-4">
                            <li key={question.option1}>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="option"
                                  onChange={() =>
                                    handleOptionChange(question.option1)
                                  }
                                  checked={selectedOption === question.option1}
                                  className="mr-2"
                                />
                                {question.option1 && question.option1}
                              </label>
                            </li>
                            <li key={question.option2}>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="option"
                                  onChange={() =>
                                    handleOptionChange(question.option2)
                                  }
                                  checked={selectedOption === question.option2}
                                  className="mr-2"
                                />
                                {question.option2 && question.option2}
                              </label>
                            </li>
                            <li key={question.option3}>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="option"
                                  onChange={() =>
                                    handleOptionChange(question.option3)
                                  }
                                  checked={selectedOption === question.option3}
                                  className="mr-2"
                                />
                                {question.option3 && question.option3}
                              </label>
                            </li>
                            <li key={question.option4}>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="option"
                                  onChange={() =>
                                    handleOptionChange(question.option4)
                                  }
                                  checked={selectedOption === question.option4}
                                  className="mr-2"
                                />
                                {question.option4 && question.option4}
                              </label>
                            </li>

                            <button
                              className="mx-auto my-4 rounded-sm px-4 h-9 w-20 flex items-center justify-center bg-everforest-blue text-everforest-text hover:bg-everforest-blueHover focus:outline-none focus:ring focus:ring-everforest-border"
                              onClick={() => check(question.correct)}
                            >
                              Check
                            </button>
                          </ul>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
