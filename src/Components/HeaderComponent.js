import AppLogo from "../assets/applogo.png";
import userLogo from "../assets/logouser.png";
import hamburger from "../assets/hamburger.png";
import { Search } from "lucide-react";
const HeaderComponent = ({ onSearch }) => {
  return (
    <div className="bg-white h-14 text-black container px-4 flex">
      <div className="navbar flex justify-evenly w-full">
        <div className="navbar-center flex justify-between px-3 sm:px-6 w-full items-center">
          <div className="navbar-title text-xl sm:text-3xl font-normal">
            MY NOTES
          </div>
          <div className="navbar-search flex items-center bg-[#f6f7f9] rounded-lg w-[35%]">
            <Search stroke={"gray"} />
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered px-[3px] py-[5px] rounded-lg bg-[#F6F7F9]  outline-none w-full"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <div className="navbar-end-usericon flex justify-around w-auto gap-[10px]">
            <div>
              <p className="hidden sm:block">Sujal</p>
            </div>
            {/* <img src={userLogo} alt="user" /> */}
            <button className="w-[27px] h-[27px] sm:hidden">
              <img src={hamburger} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
