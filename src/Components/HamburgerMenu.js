import { BookHeart, Home, LogOut, Share2, Trash2, User, X } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../index";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";

const HamburgerMenu = ({ isOpen, onClose }) => {
  const { setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "https://noti-fy-backend.onrender.com/api/v1/user/logout",
        { withCredentials: true }
      );
      console.log(data);

      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-75  z-50 transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      onClick={onClose}
    >
      <div
        className="bg-white w-2/3 max-w-md h-full p-6 flex flex-col dark:bg-[#3C3D43]"
        onClick={(e) => e.stopPropagation()}
      >
        <button className=" self-end mb-4" onClick={onClose}>
          <span className="text-xl">
            <X />
          </span>
        </button>
        <ul className="flex flex-col gap-8">
          <li>
            <Link to="/" className="text-xl flex gap-[5px]" onClick={onClose}>
              <Home />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="text-xl flex gap-[5px]"
              onClick={onClose}
            >
              <User /> Profile
            </Link>
          </li>
          <li>
            <Link
              to="/shared"
              className="text-xl flex gap-[5px]"
              onClick={onClose}
            >
              <Share2 /> Shared
            </Link>
          </li>
          <li>
            <Link
              to="/archieve"
              className="text-xl flex gap-[5px]"
              onClick={onClose}
            >
              <BookHeart /> Archived
            </Link>
          </li>
          <li>
            <Link
              to="/trash"
              className="text-xl flex gap-[5px]"
              onClick={onClose}
            >
              <Trash2 />
              Trashed
            </Link>
          </li>
          <li>
            <div className="text-xl flex gap-[5px]" onClick={handleLogout}>
              <LogOut /> Logout
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
