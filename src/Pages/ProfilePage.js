import SideBarComponent, { SidebarItem } from "../Components/SideBarComponent";
import { Link, useParams } from "react-router-dom";
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
  const { user, Notes, setIsAuthenticated } = useContext(Context);
  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "https://noti-fy-backend.onrender.com/api/v1/user/logout",
        { withCredentials: true }
      );

      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex">
      <SideBarComponent>
        <Link to={"/"}>
          <SidebarItem
            icon={<FontAwesomeIcon icon={faNotesMedical} />}
            text="Home"
          />
        </Link>
        <Link to={"/"}>
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

      <div className="w-full">
        <HeaderComponent onSearch={() => {}} />
        <div className="bg-home h-[85vh] p-[15px] sm:p-[40px] rounded-3xl">
          <div className="my-heading flex gap-2 items-center ">
            <Link to={"/"}>
              <button className="border-4 rounded-full border-gray-200">
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
