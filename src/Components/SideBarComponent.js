import AppLogo from "../assets/applogo.png";
import userLogo from "../assets/logouser.png";
import { ChevronFirst } from "lucide-react";
const SidebarContext = createContext();
import { createContext, useState } from "react";
const SideBarComponent = ({ children }) => {
  return (
    <>
      <aside className="h-screen hidden sm:block dark:bg-[#3C3D43] dark:text-white">
        <nav className="h-full flex flex-col  shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img src={AppLogo} className="w-32" alt="" />
          </div>
          <ul className="flex-1 gap-2 px-3 mt-5 ">{children}</ul>
        </nav>
      </aside>
    </>
  );
};

export default SideBarComponent;

export function SidebarItem({ icon, text, active, alert }) {
  const [expanded, setexpanded] = useState(true);

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group dark:text-white dark:hover:text-black
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-30 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
    </li>
  );
}
