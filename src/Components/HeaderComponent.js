import AppLogo from "../assets/applogo.png";
import userLogo from "../assets/logouser.png";
import hamburger from "../assets/hamburger.png";
import { Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import { Link } from "react-router-dom";
import { Context } from "../index.js";
const HeaderComponent = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mode, setMode, user } = useContext(Context);
  const element = document.documentElement;
  useEffect(() => {
    if (mode == "dark") {
      element.classList.add("dark");
      document.body.classList.add("dark");
      localStorage.setItem("mode", JSON.stringify("dark"));
    } else {
      element.classList.remove("dark");
      document.body.classList.remove("dark");
      localStorage.setItem("mode", JSON.stringify("light"));
    }
  }, [mode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="bg-white dark:bg-[#3C3D43] dark:text-white h-14 text-black container px-4 flex">
      <div className="navbar flex justify-evenly w-full">
        <div className="navbar-center flex justify-between px-3 sm:px-6 w-full items-center">
          <Link to={"/"}>
            <div className="navbar-title text-xl sm:text-3xl font-normal">
              MY NOTES
            </div>
          </Link>
          <div className="navbar-search flex items-center rounded-lg w-[35%] gap-2">
            <Search stroke={"gray"} />
            <input
              type="text"
              placeholder="Search Notes"
              className="outline-none input input-bordered px-[3px] py-[5px] rounded-lg w-full border-none searchbar bg-transparent"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <div className="navbar-end-usericon flex justify-around w-auto gap-[10px] items-center">
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                className="theme-controller"
                value="synthwave"
              />
              <svg
                className="swap-off fill-current w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => setMode(mode == "light" ? "dark" : "light")}
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              <svg
                className="swap-on fill-current w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => setMode(mode == "dark" ? "light" : "dark")}
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
            <div>
              <p className="hidden sm:block capitalize">{user.name}</p>
            </div>
            {/* <img src={userLogo} alt="user" /> */}
            <button
              className="w-[27px] h-[27px] sm:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              <img className=" dark:invert" src={hamburger} />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && <HamburgerMenu isOpen={isMenuOpen} onClose={toggleMenu} />}
    </div>
  );
};

export default HeaderComponent;
