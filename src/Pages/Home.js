import MainBody from "../Components/MainBody";
import SideBarComponent, { SidebarItem } from "../Components/SideBarComponent";
import { Link, useNavigate } from "react-router-dom";
import {
  faTrash,
  faNotesMedical,
  faBook,
  faUser,
  faDoorClosed,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddNoteModal from "../Components/AddNoteModal";
import { useContext, useEffect, useState } from "react";
import { AddFolder } from "../Components/FolderBody";
import AddFolderModal from "../Components/AddFolderModal";
import { LogOut, Share2 } from "lucide-react";
import { Context } from "../index.js";
import axios from "axios";
import toast from "react-hot-toast";
import SharewithModal from "../Components/SharewithModal.js";

const Home = () => {
  const [AddNote, setAddNote] = useState(false);
  const [AddFolder, setAddFolder] = useState(false);
  const [AddShare, setAddShare] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setIsAuthenticated, isAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "https://noti-fy-backend.onrender.com/api/v1/user/logout",
        { withCredentials: true }
      );

      setIsAuthenticated(false);
      localStorage.setItem("isAuthenticated", false);
      toast.success("User Logged Out!");
      navigateTo("/login");
    } catch (err) {
      console.log(err);
      toast.error(err?.response.data.message);
    }
  };
  // useEffect(() => {
  //   const auth = JSON.parse(localStorage.getItem("authenticated"));
  //   if (!auth) {
  //     navigateTo("/login");
  //   }
  // }, []);
  // if (loading) {
  //   return <h1>Loading</h1>;
  // }
  return (
    <>
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
          <Link to={"/shared"}>
            <SidebarItem
              icon={<FontAwesomeIcon icon={faShareAlt} />}
              text="Shared"
            />
          </Link>
          <Link to={"/archieve"}>
            <SidebarItem
              icon={<FontAwesomeIcon icon={faBook} />}
              text="Archive"
            />
          </Link>
          <Link to={"/trash"}>
            <SidebarItem
              icon={<FontAwesomeIcon icon={faTrash} />}
              text="Trash"
            />
          </Link>
          <div className="logout flex" onClick={handleLogout}>
            <SidebarItem icon={<LogOut />} text="Logout" />
          </div>
        </SideBarComponent>
        <MainBody
          onOpen={() => setAddNote(true)}
          onOpenFolder={() => setAddFolder(true)}
          // onOpenShare={() => setAddShare(true)}
        />
        {AddNote && <AddNoteModal onClose={() => setAddNote(false)} />}
        {AddFolder && <AddFolderModal onClose={() => setAddFolder(false)} />}
        {/* {AddShare && <SharewithModal onClose={() => setAddShare(false)} />} */}
      </div>
    </>
  );
};

export default Home;
