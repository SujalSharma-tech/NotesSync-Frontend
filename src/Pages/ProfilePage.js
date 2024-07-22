import SideBarComponent, { SidebarItem } from "../Components/SideBarComponent";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  faTrash,
  faNotesMedical,
  faBook,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import HeaderComponent from "../Components/HeaderComponent";
import NoteBody from "../Components/NoteBody";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext, useEffect } from "react";
import { Context } from "../index";
import { ArrowLeft, LogOut } from "lucide-react";
import axios from "axios";

const ProfilePage = () => {
  const { user, Notes, setIsAuthenticated, isAuthenticated } =
    useContext(Context);
  const navigateTo = useNavigate();
  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "https://noti-fy-backend.onrender.com/api/v1/user/logout",
        { withCredentials: true }
      );

      setIsAuthenticated(false);
      localStorage.setItem("isAuthenticated", false);
      navigateTo("/login");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!isAuthenticated) navigateTo("/login");
  }, []);

  return (
    <div className="flex dark:bg-[#3C3D43]">
      <SideBarComponent>
        <Link to={"/"}>
          <SidebarItem
            icon={<FontAwesomeIcon icon={faNotesMedical} />}
            text="Home"
          />
        </Link>
        <Link to={"/profile"}>
          <SidebarItem
            icon={<FontAwesomeIcon icon={faUser} />}
            text="Profile"
          />
        </Link>
        <Link to={"/archieve"}>
          <SidebarItem
            icon={<FontAwesomeIcon icon={faBook} />}
            text="Archieve"
          />
        </Link>
        <Link to={"/trash"}>
          <SidebarItem icon={<FontAwesomeIcon icon={faTrash} />} text="Trash" />
        </Link>
        <div className="logout flex" onClick={handleLogout}>
          <SidebarItem icon={<LogOut />} text="Logout" />
        </div>
      </SideBarComponent>

      <div className="w-full dark:bg-[#3C3D43]">
        <HeaderComponent onSearch={() => {}} />
        <div className="bg-home min-h-[85vh] h-auto p-[15px] sm:p-[40px] rounded-3xl dark:bg-[#343539] dark:text-white">
          <div className="my-heading flex gap-2 items-center ">
            <Link to={"/"}>
              <button className="border-4 rounded-full border-gray-200 dark:border-[#898989]">
                <ArrowLeft size={30} />
              </button>
            </Link>
            <h1 className="sm:text-4xl text-2xl">Profile</h1>
            <div className="button relative">
              <button
                className="bg-pink-400 text-white rounded-lg px-[3px] py-[6px] "
                onClick={() => setDropdown((prev) => !prev)}
              >
                Logout
              </button>
            </div>
          </div>

          <div className="notes-container mt-5 flex gap-[15px] sm:gap-[25px] flex-wrap justify-normal">
            <div className="user-details">
              <h1 className="sm:text-2xl">Name: {user.name}</h1>
              <h1 className="sm:text-2xl">Email: {user.email}</h1>
              <h1 className="sm:text-2xl">Number of notes: {Notes.length}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
