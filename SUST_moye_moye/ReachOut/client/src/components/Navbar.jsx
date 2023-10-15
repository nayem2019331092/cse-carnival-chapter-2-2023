import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { useUserContext } from "../contexts/userContext";
import { FiHome } from "react-icons/fi";
import { AiOutlineLogin } from "react-icons/ai";
import { RiUserAddLine } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa"
import UserDropdown from "./UserDropdown";
import NavbarDropdown from "./NavbarDropdown";
import API from "../api/axios.config";
import { PiExamFill } from "react-icons/pi";

export default function Navbar() {
  const { isLoggedIn } = useAuthContext();
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

  return (
    <nav className="fixed w-full z-40 top-0 flex items-center text-lg py-7 px-7 font-medium bg-everforest-bg text-everforest-text">
      <Link to="/" className="flex items-center font-bold">
        <img
          src="./src/assets/logo.png"
          alt="logo"
          className="w-7 h-7 rounded-full"
        />
        <p className="text-white text-2xl">Reach</p>
        <p className="text-[#54DAA8] text-lg">Out</p>
      </Link>
      <div className="flex items-center justify-center ml-auto">
        <Link
          to="/"
          className="mr-10 flex items-center hover:scale-105 transition-all"
        >
          <FiHome className="mr-2" />
          Home
        </Link>
        {isLoggedIn === true && (
          <Link
            to="/community"
            className="mr-10 flex items-center hover:scale-105 transition-all"
          >
            <FaPeopleGroup className="mr-2" />
            Community
          </Link>
        )}

        {isLoggedIn === true && user && user.user_type == "expert" && (
          <Link
            to="/expert"
            className="mr-10 flex items-center hover:scale-105 transition-all"
          >
            <FaPeopleGroup className="mr-2" />
            Help a student
          </Link>
        )}

        {isLoggedIn === true && user && user.user_type != "expert" && (
          <Link
            to="/assessment"
            className="mr-10 flex items-center hover:scale-105 transition-all"
          >
            <PiExamFill className="mr-2" />
            Assessment
          </Link>
        )}

        {isLoggedIn === true && user && user.user_type == "student" && (
          <Link
            to="/help"
            className="mr-10 flex items-center hover:scale-105 transition-all"
          >
            <FaChalkboardTeacher className="mr-2" />
            Book an Expert
          </Link>

        )}
      </div>

      <NavbarDropdown />
      {isLoggedIn === true ? (
        <>
          <div className="relative ml-auto">
            <UserDropdown userName={userData && userData.name} />
          </div>
        </>
      ) : (
        <div className="flex ml-auto">
          <Link
            to="/login"
            className="mr-10 flex items-center hover:scale-105 transition-all"
          >
            <AiOutlineLogin className="mr-2" />
            Login
          </Link>
          <Link
            to="/register"
            className="flex items-center hover:scale-105 transition-all"
          >
            <RiUserAddLine className="mr-2" /> Register
          </Link>
        </div>
      )}
    </nav>
  );
}
