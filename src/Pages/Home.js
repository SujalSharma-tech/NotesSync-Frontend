import MainBody from "../Components/MainBody";
import SideBarComponent, { SidebarItem } from "../Components/SideBarComponent";
import { Link } from "react-router-dom";
import {
  faTrash,
  faNotesMedical,
  faBook,
  faUser,
  faDoorClosed,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddNoteModal from "../Components/AddNoteModal";
import { useContext, useState } from "react";
import { AddFolder } from "../Components/FolderBody";
import AddFolderModal from "../Components/AddFolderModal";
import { LogOut } from "lucide-react";
import { Context } from "../index.js";
const Home = () => {
  const [AddNote, setAddNote] = useState(false);
  const [AddFolder, setAddFolder] = useState(false);
  const { setIsAuthenticated } = useContext(Context);
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
      <MainBody
        onOpen={() => setAddNote(true)}
        onOpenFolder={() => setAddFolder(true)}
      />
      {AddNote && <AddNoteModal onClose={() => setAddNote(false)} />}
      {AddFolder && <AddFolderModal onClose={() => setAddFolder(false)} />}
    </div>
  );
};

export default Home;
