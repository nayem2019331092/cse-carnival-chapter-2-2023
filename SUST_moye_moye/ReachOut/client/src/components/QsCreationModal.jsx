import API from "../api/axios.config";
import routineIcon from "../assets/routine.png";
import { useClassroomContext } from "../contexts/classroomContext";
import { IoCloseCircle } from "react-icons/io5";
import { toast, Slide } from "react-toastify";
import { useChapterContext } from "../contexts/chapterContext";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { useUserContext } from "../contexts/userContext";

export default function QsCreationModal() {
  const { focusedClass } = useClassroomContext();
  const { focusedChap } = useChapterContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [correct, setCorrect] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const { userData } = useUserContext();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userData && userData.user_id) {
      API.post("/getuser", { id: userData.user_id })
        .then(function (res) {
          if (res.data.posts[0]) {
            console.log(res.data.posts[0]);
            // Set the user using setUser
            setUser(res.data.posts[0]);
          }
        })
        .catch(function (error) {
          // Handle error
        });
    }
  }, [userData])

  const handleCorrectOptionChange = (event) => {
    console.log(event.target.value);
    setCorrect(event.target.value);
  };

  const handleOptionTextChange = (event, optionNumber) => {
    const value = event.target.value;
    switch (optionNumber) {
      case 1:
        setOption1(value);
        break;
      case 2:
        setOption2(value);
        break;
      case 3:
        setOption3(value);
        break;
      case 4:
        setOption4(value);
        break;
      default:
        break;
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // Check if at least one correct option is selected
  //   const isAtLeastOneCorrect = options.some((option) => option.isCorrect);
  //   if (!isAtLeastOneCorrect) {
  //     alert("Please select at least one correct option.");
  //     return;
  //   }

  //   // Extract options with their correctness
  //   const formattedOptions = options.map((option, index) => ({
  //     text: option.text,
  //     isCorrect: option.isCorrect,
  //   }));

  //   console.log("Question:", question);
  //   console.log("Options:", formattedOptions);
  // };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object for the question and its options
    const questionData = {
      question_text: question,
      chapter_id: focusedChap,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
      correct,
    };

    API.post("/create-qs", questionData)
      .then(function () {
        console.log("asdfasdasd")
        // Clear the form or reset your component's state as needed
        closeModal();
        console.log("hello");
        // setQuestion("");
        // setOption1("");
        // setOption2("");
        // setOption3("");
        // setOption4("");
        // setCorrect("")
        // console.log("hello2");

        toast.success("Question created successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          transition: Slide,
        });
        closeModal();
        // setIsCalendarEventChanged(true);
      })
      .catch(function (error) {
        // Handle any errors here, e.g., setErrorMessage(error.response.data.message)
        console.error("Error creating question:", error);
      });
  };

  return (
    <>
      {user && user.user_type == "admin" && (<img
        src={routineIcon}
        alt="Add/Edit"
        className="h-5 flex ml-auto rounded-md cursor-pointer hover:ring hover:ring-slate-500"
        onClick={openModal}
      />)}

      {isModalOpen && (
        <div className="h-screen w-screen fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-everforest-bgSoft p-2 rounded-lg shadow-lg w-96">
            <div className="flex">
              <div className="flex ml-auto">
                <IoCloseCircle
                  className="text-red-600 hover:text-everforest-red"
                  onClick={closeModal}
                />
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <h2 className="mb-3 font-medium text-xl text-everforest-text">Add a MCQ</h2>
                <label className="mb-1 font-medium text-everforest-text">
                  Question:
                </label>
                <input
                  required
                  type="text"
                  value={question}
                  onChange={handleQuestionChange}
                  className="bg-everforest-select placeholder-gray-500 mb-2 px-4 py-2 w-full focus:outline-none focus:border-b-2 focus:border-everforest-borderFocused"
                />
              </div>

              <div>
                <p>Options:</p>
                <div className="flex justify-center items-center">
                  <label className="mr-2">
                    <input
                      type="radio"
                      value={option1}
                      checked={correct && correct === option1}
                      onChange={handleCorrectOptionChange}
                    />
                    
                  </label>
                  <input
                    required
                    type="text"
                    value={option1}
                    onChange={(event) => handleOptionTextChange(event, 1)}
                    className="text-sm bg-everforest-select placeholder-gray-500 mb-2 px-4 py-2 my-2 w-full focus:outline-none focus:border-b-2 focus:border-everforest-borderFocused"
                  />
                </div>

                <div className="flex justify-center items-center">
                  <label className="mr-2">
                    <input
                      type="radio"
                      value={option2}
                      checked={correct && correct === option2}
                      onChange={handleCorrectOptionChange}
                    />
                    
                  </label>
                  <input
                    required
                    type="text"
                    value={option2}
                    onChange={(event) => handleOptionTextChange(event, 2)}
                    className="text-sm bg-everforest-select placeholder-gray-500 mb-2 px-4 py-2 my-2 w-full focus:outline-none focus:border-b-2 focus:border-everforest-borderFocused"
                  />
                </div>

                <div className="flex justify-center items-center">
                  <label className="mr-2">
                    <input
                      type="radio"
                      value={option3}
                      checked={correct && correct === option3}
                      onChange={handleCorrectOptionChange}
                    />
                    
                  </label>
                  <input
                    required
                    type="text"
                    value={option3}
                    onChange={(event) => handleOptionTextChange(event, 3)}
                    className="text-sm bg-everforest-select placeholder-gray-500 mb-2 px-4 py-2 my-2 w-full focus:outline-none focus:border-b-2 focus:border-everforest-borderFocused"
                  />
                </div>

                <div className="flex justify-center items-center">
                  <label className="mr-2">
                    <input
                      type="radio"
                      value={option4}
                      checked={correct && correct === option4}
                      onChange={handleCorrectOptionChange}
                    />
                    
                  </label>
                  <input
                    required
                    type="text"
                    value={option4}
                    onChange={(event) => handleOptionTextChange(event, 4)}
                    className="text-sm bg-everforest-select placeholder-gray-500 mb-2 px-4 py-2 my-2 w-full focus:outline-none focus:border-b-2 focus:border-everforest-borderFocused"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mx-auto my-4 rounded-sm px-4 h-9 w-20 flex items-center justify-center bg-everforest-blue text-everforest-text hover:bg-everforest-blueHover focus:outline-none focus:ring focus:ring-everforest-border"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
